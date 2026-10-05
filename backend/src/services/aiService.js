import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env.js';

const genAI = new GoogleGenerativeAI(env.GEMINI_API_KEY);

export const generateScript = async (topic, strategy) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = `Write a viral YouTube Shorts script about: ${topic}. 
Strategy: ${strategy}. 
The output should be ONLY a valid JSON array where each element represents a scene. 
Each scene object should have a single "text" field representing the voiceover text for that scene. 
Make sure the scenes are concise and engaging. 
No markdown formatting, just the raw JSON.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Attempt to parse JSON (sometimes model wraps in markdown code blocks)
    let jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Gemini Error:', error);
    throw new Error('Failed to generate script');
  }
};
