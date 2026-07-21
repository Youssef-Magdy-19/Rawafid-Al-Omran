import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { uploadSingleFile, uploadBufferToCloudinary } from '../middlewares/upload.middleware.js';
import logger from '../logger/logger.js';

const router = Router();

router.post(
  '/',
  authenticate,
  (req: Request, res: Response, next: NextFunction) => {
    uploadSingleFile(req, res, (err) => {
      if (err) {
        logger.error('Multer upload error', { error: err.message, stack: err.stack });
        return next(err);
      }
      next();
    });
  },
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.file) {
        res.status(400).json({
          success: false,
          message: 'No file provided',
        });
        return;
      }

      logger.info('Upload request received', {
        fileSize: req.file.size,
        mimetype: req.file.mimetype,
        fieldname: req.file.fieldname
      });

      // Use buffer for Vercel serverless compatibility
      const result = await uploadBufferToCloudinary(req.file.buffer, 'rawafid-omran');

      logger.info('Upload successful', { publicId: result.public_id });

      res.status(200).json({
        success: true,
        data: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      });
    } catch (error) {
      logger.error('Upload failed', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      });
      next(error);
    }
  }
);

export default router;