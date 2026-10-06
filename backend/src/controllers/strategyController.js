import Strategy from '../models/Strategy.js';
import { triggerInitialPlanningRun } from '../services/aiService.js';

export const getStrategy = async (req, res) => {
  try {
    let strategy = await Strategy.findOne();
    if (!strategy) {
      strategy = {
        objective: '',
        audience: '',
        valueProposition: '',
        contentPillars: '',
        videosPerWeek: 1,
        videosPerPlanningRun: 1,
        defaultFormat: 'Explainer',
        defaultLength: 'Short - 2-4 min',
        primaryOutcome: 'Views',
        targetValue: 100,
        targetWindow: '28 days',
        budgetCurrency: 'USD',
        outcomeContext: '',
        boundaries: '',
        isActive: false
      };
    }
    res.json(strategy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const saveStrategy = async (req, res) => {
  try {
    const strategyData = req.body;
    
    // Using findOneAndUpdate with no filter matches the first document or creates a new one
    // But to ensure strictly ONE document, we can use an empty filter object {} and upsert
    const strategy = await Strategy.findOneAndUpdate(
      {}, 
      strategyData, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    
    res.json(strategy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const activateStrategy = async (req, res) => {
  try {
    const strategyData = req.body;
    
    // Explicitly set isActive: true
    const updatedData = {
      ...strategyData,
      isActive: true
    };
    
    const strategy = await Strategy.findOneAndUpdate(
      {}, 
      updatedData, 
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    // Call real AI planning function
    await triggerInitialPlanningRun(strategy);

    res.json({
      message: 'Operator activated and initial planning run started successfully.',
      strategy
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
