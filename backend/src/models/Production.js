import mongoose from 'mongoose';

const sceneSchema = new mongoose.Schema({
  text: { type: String, required: true },
  audioUrl: { type: String },
  videoUrl: { type: String }
});

const productionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ['RESEARCHING', 'SCRIPTING', 'GENERATING_MEDIA', 'ASSEMBLING', 'NEEDS_REVIEW', 'PUBLISHED'],
    default: 'RESEARCHING'
  },
  scenes: [sceneSchema],
  finalVideoUrl: { type: String },
  youtubeId: { type: String }
}, { timestamps: true });

export default mongoose.model('Production', productionSchema);
