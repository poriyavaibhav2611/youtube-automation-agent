import { v2 as cloudinary } from 'cloudinary';
import { env } from '../config/env.js';
import fs from 'fs';

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET
});

export const uploadVideo = async (localFilePath) => {
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'video',
      folder: 'youtube_shorts'
    });
    
    // Strictly cleanup local file
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    throw new Error('Failed to upload video to Cloudinary');
  }
};
