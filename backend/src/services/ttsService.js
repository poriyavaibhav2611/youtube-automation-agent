import { exec } from 'child_process';
import util from 'util';
import path from 'path';

const execAsync = util.promisify(exec);

export const generateAudio = async (text, outputPath) => {
  try {
    // Requires edge-tts to be installed globally or via python: pip install edge-tts
    const command = `edge-tts --text "${text.replace(/"/g, '\\"')}" --write-media "${outputPath}"`;
    await execAsync(command);
    return outputPath;
  } catch (error) {
    console.error('TTS Error:', error);
    throw new Error('Failed to generate audio via edge-tts');
  }
};
