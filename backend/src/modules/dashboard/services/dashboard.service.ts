import { DashboardRepository } from '../repositories/dashboard.repository.js';
import { DashboardResponse } from '../dtos/dashboard.dto.js';

export class DashboardService {
  constructor(private readonly repository: DashboardRepository) {}

  async getDashboardData(): Promise<DashboardResponse> {
    const [overview, quickStats, recentActivity, chartData, notifications] = await Promise.all([
      this.repository.getOverviewStats(),
      this.repository.getQuickStats(),
      this.repository.getRecentActivity(5),
      this.repository.getChartData(),
      this.repository.getNotifications(10)
    ]);

    return {
      overview,
      quickStats,
      recentActivity,
      chartData,
      notifications
    };
  }

  async getOverviewStats() {
    return this.repository.getOverviewStats();
  }

  async getQuickStats() {
    return this.repository.getQuickStats();
  }

  async getRecentActivity(limit: number = 5) {
    return this.repository.getRecentActivity(limit);
  }

  async getChartData() {
    return this.repository.getChartData();
  }

  async getNotifications(limit: number = 10) {
    return this.repository.getNotifications(limit);
  }
}