import mongoose from 'mongoose';

const strategySchema = new mongoose.Schema({
  objective: { type: String, default: '' },
  audience: { type: String, default: '' },
  valueProposition: { type: String, default: '' },
  contentPillars: { type: String, default: '' },
  videosPerWeek: { type: Number, default: 1 },
  videosPerPlanningRun: { type: Number, default: 1 },
  defaultFormat: { 
    type: String, 
    enum: ['Explainer', 'Tutorial', 'Listicle'], 
    default: 'Explainer' 
  },
  defaultLength: { 
    type: String, 
    enum: ['Short - 2-4 min', 'Medium - 8-12 min', 'Long - 15-20 min'], 
    default: 'Short - 2-4 min' 
  },
  primaryOutcome: { 
    type: String, 
    enum: ['Views', 'Subscribers', 'Engagement'], 
    default: 'Views' 
  },
  targetValue: { type: Number, default: 100 },
  targetWindow: { 
    type: String, 
    enum: ['7 days', '28 days', '90 days', '365 days'], 
    default: '28 days' 
  },
  budgetCurrency: { 
    type: String, 
    enum: ['USD', 'CAD', 'EUR', 'GBP', 'AUD'], 
    default: 'USD' 
  },
  outcomeContext: { type: String, default: '' },
  boundaries: { type: String, default: '' },
  isActive: { type: Boolean, default: false }
}, {
  timestamps: true
});

export default mongoose.model('Strategy', strategySchema);
