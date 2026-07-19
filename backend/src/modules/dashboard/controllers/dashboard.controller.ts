import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboard.service.js';
import { sendSuccess } from '../../../utils/apiResponse.js';

export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  getDashboardData = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getDashboardData();
      sendSuccess(res, data, 'Dashboard data retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getOverviewStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getOverviewStats();
      sendSuccess(res, data, 'Overview stats retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getQuickStats = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getQuickStats();
      sendSuccess(res, data, 'Quick stats retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getRecentActivity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const data = await this.service.getRecentActivity(limit);
      sendSuccess(res, data, 'Recent activity retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getChartData = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data = await this.service.getChartData();
      sendSuccess(res, data, 'Chart data retrieved successfully');
    } catch (error) {
      next(error);
    }
  };

  getNotifications = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const data = await this.service.getNotifications(limit);
      sendSuccess(res, data, 'Notifications retrieved successfully');
    } catch (error) {
      next(error);
    }
  };
}