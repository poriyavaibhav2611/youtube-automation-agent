import axios from 'axios';
import { env } from '../config/env.js';
import fs from 'fs';
import path from 'path';

export const fetchAsset = async (query, outputPath) => {
  try {
    const response = await axios.get(`https://api.pexels.com/videos/search?query=${encodeURIComponent(query)}&per_page=1&orientation=portrait`, {
      headers: {
        Authorization: env.PEXELS_API_KEY
      }
    });

    if (response.data.videos && response.data.videos.length > 0) {
      const videoUrl = response.data.videos[0].video_files[0].link;
      const videoResponse = await axios.get(videoUrl, { responseType: 'stream' });
      
      return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(outputPath);
        videoResponse.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
          error = err;
          writer.close();
          reject(err);
        });
        writer.on('close', () => {
          if (!error) {
            resolve(outputPath);
          }
        });
      });
    }
    throw new Error('No video found');
  } catch (error) {
    console.error('Asset Fetch Error:', error);
    throw new Error('Failed to fetch asset from Pexels');
  }
};
