import { GoogleGenAI } from '@google/genai';
import { env } from '../config/env.js';
import Idea from '../models/Idea.js';

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export const generateScript = async (topic, strategy) => {
  try {
    const prompt = `Write a viral YouTube Shorts script about: ${topic}. 
Strategy: ${strategy}. 
The output should be ONLY a valid JSON array where each element represents a scene. 
Each scene object should have a single "text" field representing the voiceover text for that scene. 
Make sure the scenes are concise and engaging. 
No markdown formatting, just the raw JSON.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt
    });
    
    const text = response.text;
    
    // Attempt to parse JSON (sometimes model wraps in markdown code blocks)
    let jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error('Gemini Error:', error);
    throw new Error('Failed to generate script');
  }
};

const PLANNING_LOGIC = `
A plan that does not fit the week is a list of regrets. Ask two questions before writing anything:
how many hours do you actually have, and what is already half-made.

## Before you write
1. Read the user's voice profile: how they talk on camera, the words they never use, who they are talking to, what they will not claim. 
2. Never invent a number, a result or a source. If a figure would strengthen it and you do not have one, ask for it or write the line without it.

## The shape of a week
- One anchor. The video the week is for. It gets the most time and it goes out on the day the channel's own analytics say is best.
- One cheap one. Built from something that exists: a clip, a reaction, a follow-up to the comment that got the most replies last week.
- Shorts from the anchor. Three, cut from the long video, not written separately.

Three uploads on a seven-day week, not seven.
`;

const VOICE_PERSONA = `
## Who I am talking to
One person. Name them properly - not "creators", but "someone with under a thousand subs who has made nine videos and cannot work out why none of them break 400 views".

## Words I never use
The ones that are not mine. Be specific: "unlock", "game-changer", "dive in", "let's get into it". No hype words. Target audience is software developers. Focus on architecture.

## What I will not claim
Numbers I cannot show, results that are not mine, tools I have not used.
`;

export const generateIdeasFromStrategy = async (strategyData) => {
  try {
    const prompt = `
You are an expert YouTube content strategist. 
Based on the following Channel Strategy, Planning Logic, and Voice Persona, generate EXACTLY ${strategyData.videosPerPlanningRun || 1} video idea(s).

Channel Strategy:
- Objective: ${strategyData.objective}
- Audience: ${strategyData.audience}
- Value Proposition: ${strategyData.valueProposition}
- Content Pillars: ${strategyData.contentPillars}
- Default Format: ${strategyData.defaultFormat}

Planning Logic:
${PLANNING_LOGIC}

Voice & Persona:
${VOICE_PERSONA}

STRICT INSTRUCTIONS: 
You must return ONLY a valid JSON array of objects representing the generated ideas. 
DO NOT include markdown formatting, backticks (\`\`\`), or any conversational text. 
Each object in the array MUST match this schema exactly:
{
  "topic": "String (The main topic/title)",
  "angle": "String (What makes this take distinctive?)",
  "whyWorthMaking": "String (Why this fits the strategy and audience)",
  "format": "String (Must be one of: 'Explainer', 'Tutorial', 'Listicle' - default to ${strategyData.defaultFormat || 'Explainer'})"
}
    `.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

export const triggerInitialPlanningRun = async (strategyData) => {
  try {
    console.log('Triggering initial planning run with Gemini...');
    const rawResponse = await generateIdeasFromStrategy(strategyData);
    
    let ideasArray = [];
    try {
      let jsonStr = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
      ideasArray = JSON.parse(jsonStr);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", rawResponse);
      throw new Error("AI returned invalid JSON.");
    }

    if (!Array.isArray(ideasArray)) {
      throw new Error("AI did not return an array of ideas.");
    }

    const savedIdeas = [];
    for (const ideaObj of ideasArray) {
      const newIdea = new Idea({
        topic: ideaObj.topic,
        angle: ideaObj.angle,
        whyWorthMaking: ideaObj.whyWorthMaking,
        format: ideaObj.format || strategyData.defaultFormat || 'Explainer',
        status: 'backlog'
      });
      const saved = await newIdea.save();
      savedIdeas.push(saved);
    }

    console.log(`Successfully generated and saved ${savedIdeas.length} idea(s).`);
    return savedIdeas;
  } catch (error) {
    console.error("Error in triggerInitialPlanningRun:", error);
    throw error;
  }
};

export const writeScriptFromIdea = async (idea) => {
  try {
    const prompt = `
You are an expert YouTube scriptwriter for software developers.
Write a YouTube video script from the following raw idea.

Topic: ${idea.topic}
Angle: ${idea.angle}
Format: ${idea.format}

# Script Structure
The first 15 seconds is the whole job. It does three things: confirm the click the title promised, open a question the viewer cannot close, and prove the payoff exists.
- Hook: Use one of the 21 formulas to start.
- The turn (0:15-0:45): Say what the video is going to do, in one sentence, and start doing it. No channel intro.
- The body: One idea per beat. Mark each beat with what is ON SCREEN.
- The payoff: Deliver the thing the hook promised.

# Hook Formulas Rules:
- Confirm the title in the first sentence.
- One idea. A hook carrying two promises keeps neither.
- Specific beats big.
- Show the artifact inside 20 seconds.
- Never open with who you are.
Formulas available: The Statistic, Someone Else's Result, The Mistake, Contrarian Flip, The Reveal, The Superlative, The Clock, I Tried It, The Question, Before and After, The Teardown, The Stack, The Warning, The List, The Receipt, The Insider, The Impossible Claim, The Comparison, The Origin, The Deadline, The Direct Address.

# YouTube Shorts Rules (if applicable):
- A NEW first line. 
- On-screen text for the first two seconds.
- A loop point: what the last line sets up so the first line answers it.

# Voice & Persona
${VOICE_PERSONA}

STRICT CONSTRAINTS:
1. NO hype words.
2. Focus purely on system logic, architecture, and technical reality.
3. Output ONLY the raw script text. Do not use markdown blocks, JSON, or any conversational filler. Just the script ready for narration.
`.trim();

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt
    });
    
    return response.text;
  } catch (error) {
    console.error("Error in writeScriptFromIdea:", error);
    throw new Error('Failed to generate script');
  }
};
