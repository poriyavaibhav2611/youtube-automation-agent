import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  PEXELS_API_KEY: process.env.PEXELS_API_KEY,
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  JWT_SECRET: process.env.JWT_SECRET || 'secret'
};
