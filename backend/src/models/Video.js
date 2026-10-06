import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Idea',
    required: true
  },
  title: {
    type: String
  },
  script: {
    type: String
  },
  voiceoverUrl: {
    type: String
  },
  status: {
    type: String,
    enum: ['needs_review', 'needs_attention', 'approved', 'published'],
    default: 'needs_review'
  }
}, {
  timestamps: true
});

const Video = mongoose.model('Video', videoSchema);

export default Video;
