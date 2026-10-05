import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  channelName: { type: String, required: true },
  strategy: { type: String },
  guardrails: { type: String }
}, { timestamps: true });

export default mongoose.model('Settings', settingsSchema);
