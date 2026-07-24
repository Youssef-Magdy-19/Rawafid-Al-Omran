import multer from 'multer';
import { Request } from 'express';
import { uploadBufferSafe, deleteImage } from '../services/fileUpload.service.js';
import config from '../config/index.js';

// Use memory storage for Vercel serverless compatibility
const storage = multer.memoryStorage();

// File filter - images only for dashboard
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type. Allowed: ${allowedMimes.join(', ')}`));
  }
};

// Create multer instance
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: config.upload.maxFileSize
  }
});

// Helper function to upload buffer to Cloudinary (uses safe base64 approach)
export const uploadBufferToCloudinary = async (
  buffer: Buffer,
  folder: string = 'rawafid-omran'
) => {
  return uploadBufferSafe(buffer, folder);
};

// Helper function to delete file from Cloudinary
export const deleteFileFromCloudinary = async (publicId: string) => {
  return deleteImage(publicId);
};

// Middleware for single image upload
export const uploadSingleImage = upload.single('image');

// Middleware for multiple images upload
export const uploadMultipleImages = upload.array('images', 10);

// Middleware for single file upload
export const uploadSingleFile = upload.single('file');

// Type for Cloudinary upload result
export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
}

export default {
  upload,
  uploadSingleImage,
  uploadMultipleImages,
  uploadSingleFile,
  uploadBufferToCloudinary,
  deleteFileFromCloudinary
};