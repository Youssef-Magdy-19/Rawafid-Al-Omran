import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { uploadSingleImage as cloudinaryUpload, deleteImage } from '../services/fileUpload.service.js';
import config from '../config/index.js';

// Ensure upload directory exists
const uploadDir = config.upload.folder;
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  }
});

// File filter
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
    'image/svg+xml',
    'application/pdf',
    'video/mp4',
    'video/webm'
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

// Helper function to upload file to Cloudinary
export const uploadFileToCloudinary = async (
  filePath: string,
  folder: string = 'rawafid-omran'
) => {
  return cloudinaryUpload(filePath, folder);
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
  uploadFileToCloudinary,
  deleteFileFromCloudinary
};