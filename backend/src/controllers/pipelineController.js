import Video from '../models/Video.js';

export const getPipelineVideos = async (req, res) => {
  try {
    const { status } = req.query;
    const query = {};
    if (status) {
      query.status = status;
    }

    const videos = await Video.find(query)
      .populate('ideaId')
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateVideoStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // Validate status
    if (!['needs_review', 'needs_attention', 'approved', 'published'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // Return the updated document
    ).populate('ideaId');

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
