import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { uploadSingleFile, uploadFileToCloudinary } from '../middlewares/upload.middleware.js';

const router = Router();

router.post(
  '/',
  authenticate,
  (req: Request, res: Response, next: NextFunction) => {
    uploadSingleFile(req, res, (err) => {
      if (err) return next(err);
      next();
    });
  },
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file provided',
        });
      }

      const result = await uploadFileToCloudinary(req.file.path, 'rawafid-omran');

      return res.status(200).json({
        success: true,
        data: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
