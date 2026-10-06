import Idea from '../models/Idea.js';
import Video from '../models/Video.js';
import { writeScriptFromIdea } from '../services/aiService.js';
import { renderVideoAndUpload } from '../services/videoRenderer.js';

export const getIdeas = async (req, res) => {
  try {
    const { status } = req.query;
    
    // Build query object
    const query = {};
    if (status) {
      query.status = status;
    }
    
    // Fetch ideas, sorted by latest first
    const ideas = await Idea.find(query).sort({ createdAt: -1 });
    
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
    res.json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const generateVideoForIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }

    // Generate script using AI
    const generatedScript = await writeScriptFromIdea(idea);

    // Create the video document
    const newVideo = new Video({
      ideaId: idea._id,
      title: idea.topic,
      script: generatedScript,
      status: 'needs_review'
    });
    
    // Render the video and upload to Cloudinary
    const cloudinaryUrl = await renderVideoAndUpload(generatedScript, newVideo._id.toString());
    
    newVideo.voiceoverUrl = cloudinaryUrl; // Or add a videoUrl field, reusing voiceoverUrl for now
    await newVideo.save();

    // Update Idea status
    idea.status = 'scheduled';
    await idea.save();

    res.status(201).json(newVideo);
  } catch (error) {
    console.error('Error generating video:', error);
    res.status(500).json({ message: error.message || 'Failed to generate video' });
  }
};
