import { Router } from 'express';
import { DashboardController } from '../controllers/dashboard.controller.js';
import { DashboardService } from '../services/dashboard.service.js';
import { DashboardRepository } from '../repositories/dashboard.repository.js';
import { Blog } from '../../blog/models/blog.model.js';
import { Project } from '../../project/models/project.model.js';
import { Service } from '../../service/models/service.model.js';
import { Team } from '../../team/models/team.model.js';
import { Testimonial } from '../../testimonial/models/testimonial.model.js';
import { Contact } from '../../contact/models/contact.model.js';
import { Quote } from '../../quote/models/quote.model.js';
import { Newsletter } from '../../newsletter/models/newsletter.model.js';
import { authenticate } from '../../../middlewares/auth.middleware.js';
import { authorize } from '../../../middlewares/authorize.middleware.js';

const router = Router();

// Initialize repository, service, and controller
const repository = new DashboardRepository(
  Blog,
  Project,
  Service,
  Team,
  Testimonial,
  Contact,
  Quote,
  Newsletter
);
const service = new DashboardService(repository);
const controller = new DashboardController(service);

router.use(authenticate);
router.use(authorize('admin'));

// Dashboard routes
router.get('/', controller.getDashboardData);
router.get('/overview', controller.getOverviewStats);
router.get('/quick-stats', controller.getQuickStats);
router.get('/recent-activity', controller.getRecentActivity);
router.get('/chart-data', controller.getChartData);
router.get('/notifications', controller.getNotifications);

export default router;