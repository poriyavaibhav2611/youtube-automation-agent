import mongoose from 'mongoose';

const ideaSchema = new mongoose.Schema({
  topic: { type: String, required: true },
  angle: { type: String, default: '' },
  whyWorthMaking: { type: String, default: '' },
  format: { 
    type: String, 
    enum: ['Explainer', 'Tutorial', 'Listicle'], 
    default: 'Explainer' 
  },
  status: { 
    type: String, 
    enum: ['backlog', 'scheduled', 'published', 'pending_approval'], 
    default: 'backlog' 
  }
}, {
  timestamps: true
});

export default mongoose.model('Idea', ideaSchema);
