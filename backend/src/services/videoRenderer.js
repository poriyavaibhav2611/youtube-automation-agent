import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import path from 'path';

/**
 * Parses the script into scenes based on [ON SCREEN: ...] beats
 */
const parseScriptToScenes = (script) => {
  const scenes = [];
  const lines = script.split('\n');
  
  let currentVisual = "Dark mode terminal or code editor"; // Default fallback
  let currentVoiceover = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Detect [ON SCREEN: ...] cues
    const visualMatch = trimmed.match(/\[ON SCREEN:\s*(.*?)\]/i);
    
    if (visualMatch) {
      // If we already have voiceover accumulated, save the previous scene
      if (currentVoiceover.length > 0) {
        scenes.push({
          visual: currentVisual,
          voiceover: currentVoiceover.join(' ')
        });
        currentVoiceover = [];
      }
      currentVisual = visualMatch[1];
    } else {
      // It's a voiceover line
      currentVoiceover.push(trimmed);
    }
  }

  // Push the final scene
  if (currentVoiceover.length > 0) {
    scenes.push({
      visual: currentVisual,
      voiceover: currentVoiceover.join(' ')
    });
  }

  return scenes;
};

/**
 * Generates the video based on the parsed script and uploads it to Cloudinary.
 * Contains a mock fallback for local rendering complexity.
 */
export const renderVideoAndUpload = async (script, videoId) => {
  try {
    // 1. Parse Script
    const scenes = parseScriptToScenes(script);
    console.log(`Parsed script into ${scenes.length} scenes for technical rendering.`);
    scenes.forEach((scene, i) => {
      console.log(`Scene ${i+1} Visual: ${scene.visual}`);
    });

    // 2. Render Video (Mocked fallback for heavy local FFmpeg)
    // In a real scenario, this would use fluent-ffmpeg or Remotion to generate code snippets, 
    // syntax highlighting, terminal animations, etc. based on the 'visual' text.
    console.log('Rendering video locally (mock process)...');
    
    // We mock the generated output file path
    // For the sake of this implementation, we assume we have a placeholder video 
    // or we upload a mock buffer if we don't have a local file.
    
    // 3. Upload to Cloudinary
    console.log('Uploading final render to Cloudinary...');
    
    // Fallback: If credentials are not set, return null so we use the clean dark-mode UI placeholder
    if (!process.env.CLOUDINARY_API_KEY) {
      console.warn("Cloudinary credentials missing! Returning null for video URL to maintain professional placeholder.");
      return null;
    }

    // Actual Cloudinary upload logic (assuming we generated a file at `outputPath`)
    // const uploadResult = await cloudinary.uploader.upload(outputPath, {
    //   resource_type: "video",
    //   folder: "youtube_automation",
    //   public_id: videoId
    // });
    // return uploadResult.secure_url;

    // Since we don't have a real file rendered yet, we return null to use the sleek dark mode placeholder
    return null;
    
  } catch (error) {
    console.error('Error rendering or uploading video:', error);
    throw error;
  }
};
