import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.config({
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
  secure: true,
});

export const saveFileToCloudinary = async (file) => {
  try {
    const response = await cloudinary.uploader.upload(file.path);

    await fs.unlink(file.path);
    return response.secure_url;
  } catch (error) {
    throw error;
  }
};
