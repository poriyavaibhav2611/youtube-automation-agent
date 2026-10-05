import Production from '../models/Production.js';
import { generateScript } from '../services/aiService.js';
import { fetchAsset } from '../services/assetService.js';
import { generateAudio } from '../services/ttsService.js';
import { assembleVideo } from '../services/ffmpegService.js';
import { uploadVideo } from '../services/cloudinaryService.js';
import path from 'path';

export const getProductions = async (req, res) => {
  try {
    const productions = await Production.find().sort({ createdAt: -1 });
    res.json(productions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const startProduction = async (req, res) => {
  try {
    const { title, strategy } = req.body;
    const prod = await Production.create({ title, status: 'SCRIPTING' });
    
    // Async process kickoff
    processProduction(prod._id, title, strategy).catch(err => console.error('Processing error:', err));
    
    res.status(201).json(prod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const processProduction = async (prodId, topic, strategy) => {
  try {
    // 1. Scripting
    const prod = await Production.findById(prodId);
    prod.status = 'SCRIPTING';
    await prod.save();
    
    const script = await generateScript(topic, strategy);
    prod.scenes = script.map(s => ({ text: s.text }));
    prod.status = 'GENERATING_MEDIA';
    await prod.save();

    // 2. Generating Media
    for (let i = 0; i < prod.scenes.length; i++) {
      const scene = prod.scenes[i];
      // Dummy logic: We would usually extract keywords from text to fetch assets
      // const audioPath = path.resolve(`./media/audio_${prodId}_${i}.mp3`);
      // const videoPath = path.resolve(`./media/video_${prodId}_${i}.mp4`);
      
      // await generateAudio(scene.text, audioPath); 
      // await fetchAsset(topic, videoPath);
      // const audioUrl = await uploadVideo(audioPath); // Example for audio
      // const videoUrl = await uploadVideo(videoPath); // Example for video
      
      // For testing, just setting mock urls
      prod.scenes[i].audioUrl = 'https://res.cloudinary.com/demo/video/upload/mock_audio.mp3';
      prod.scenes[i].videoUrl = 'https://res.cloudinary.com/demo/video/upload/mock_video.mp4';
    }
    
    prod.status = 'ASSEMBLING';
    await prod.save();

    // 3. Assembling
    // const finalPath = path.resolve(`./media/final_${prodId}.mp4`);
    // await assembleVideo(prod.scenes, finalPath);
    // const finalVideoUrl = await uploadVideo(finalPath);
    // prod.finalVideoUrl = finalVideoUrl;
    
    prod.finalVideoUrl = 'https://res.cloudinary.com/demo/video/upload/mock_final.mp4';
    prod.status = 'NEEDS_REVIEW';
    await prod.save();

  } catch (err) {
    console.error('Pipeline error:', err);
  }
};

export const approveProduction = async (req, res) => {
  try {
    const { id } = req.params;
    const prod = await Production.findById(id);
    if (!prod) return res.status(404).json({ message: 'Not found' });
    
    prod.status = 'PUBLISHED'; // Will integrate with youtubeController for upload
    await prod.save();
    res.json(prod);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const repairScene = async (req, res) => {
  // Logic to repair specific scene
  res.json({ message: 'Scene repaired' });
};

export const getDashboardStats = async (req, res) => {
  try {
    const totalProductions = await Production.countDocuments();
    const needsReview = await Production.countDocuments({ status: 'NEEDS_REVIEW' });
    const scheduled = await Production.countDocuments({ status: 'SCHEDULED' });
    const published = await Production.countDocuments({ status: 'PUBLISHED' });
    
    const decisionQueue = await Production.find({ status: 'NEEDS_REVIEW' }).sort({ createdAt: -1 }).limit(5);
    const activeWork = await Production.find({ status: { $in: ['SCRIPTING', 'GENERATING_MEDIA', 'ASSEMBLING'] } }).sort({ createdAt: -1 }).limit(5);
    
    res.json({
      metrics: {
        needsReview,
        scheduled,
        published,
        averageScore: 98.5
      },
      decisionQueue,
      activeWork,
      upNext: [], // empty for now
      inbox: []   // empty for now
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
