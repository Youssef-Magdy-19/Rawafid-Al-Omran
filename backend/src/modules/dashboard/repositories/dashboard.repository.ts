import { Model, Types } from 'mongoose';
import { IBlog } from '../../blog/models/blog.model.js';
import { IProject } from '../../project/models/project.model.js';
import { IService } from '../../service/models/service.model.js';
import { ITeam } from '../../team/models/team.model.js';
import { ITestimonial } from '../../testimonial/models/testimonial.model.js';
import { IContact } from '../../contact/models/contact.model.js';
import { IQuote } from '../../quote/models/quote.model.js';
import { INewsletter } from '../../newsletter/models/newsletter.model.js';
import {
  OverviewStats,
  QuickStats,
  RecentActivity,
  ChartData,
  DashboardNotification
} from '../dtos/dashboard.dto.js';

interface LeanContact {
  _id: Types.ObjectId;
  name: string;
  email: string;
  subject: string;
  createdAt: Date;
}

interface LeanQuote {
  _id: Types.ObjectId;
  name: string;
  email: string;
  serviceType: string;
  status: string;
  createdAt: Date;
}

interface LeanBlog {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  category: string;
  isPublished: boolean;
  publishedAt: Date | null;
  createdAt: Date;
}

interface LeanProject {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  createdAt: Date;
}

interface LeanNewsletter {
  _id: Types.ObjectId;
  email: string;
  subscribedAt: Date;
}

export class DashboardRepository {
  constructor(
    private readonly blogModel: Model<IBlog>,
    private readonly projectModel: Model<IProject>,
    private readonly serviceModel: Model<IService>,
    private readonly teamModel: Model<ITeam>,
    private readonly testimonialModel: Model<ITestimonial>,
    private readonly contactModel: Model<IContact>,
    private readonly quoteModel: Model<IQuote>,
    private readonly newsletterModel: Model<INewsletter>
  ) {}

  async getOverviewStats(): Promise<OverviewStats> {
    const [
      totalProjects,
      totalServices,
      totalBlogPosts,
      totalTeamMembers,
      totalTestimonials,
      totalContactMessages,
      totalQuoteRequests,
      totalNewsletterSubscribers
    ] = await Promise.all([
      this.projectModel.countDocuments({ isActive: true }),
      this.serviceModel.countDocuments({ isActive: true }),
      this.blogModel.countDocuments({ isActive: true }),
      this.teamModel.countDocuments({ isActive: true }),
      this.testimonialModel.countDocuments({ isActive: true }),
      this.contactModel.countDocuments({}),
      this.quoteModel.countDocuments({}),
      this.newsletterModel.countDocuments({})
    ]);

    return {
      totalProjects,
      totalServices,
      totalBlogPosts,
      totalTeamMembers,
      totalTestimonials,
      totalContactMessages,
      totalQuoteRequests,
      totalNewsletterSubscribers
    };
  }

  async getQuickStats(): Promise<QuickStats> {
    const [
      publishedProjects,
      draftBlogPosts,
      activeTeamMembers,
      featuredProjects,
      featuredTestimonials,
      unreadContactMessages,
      pendingQuotes,
      activeNewsletterSubscribers
    ] = await Promise.all([
      this.projectModel.countDocuments({ isActive: true }),
      this.blogModel.countDocuments({ isActive: true, isPublished: false }),
      this.teamModel.countDocuments({ isActive: true }),
      this.projectModel.countDocuments({ isActive: true, isFeatured: true }),
      this.testimonialModel.countDocuments({ isActive: true, isFeatured: true }),
      this.contactModel.countDocuments({ isRead: false }),
      this.quoteModel.countDocuments({ status: 'pending' }),
      this.newsletterModel.countDocuments({ isActive: true })
    ]);

    return {
      publishedProjects,
      draftBlogPosts,
      activeTeamMembers,
      featuredProjects,
      featuredTestimonials,
      unreadContactMessages,
      pendingQuotes,
      activeNewsletterSubscribers
    };
  }

  async getRecentActivity(limit: number = 5): Promise<RecentActivity> {
    const [contactMessages, quoteRequests, blogPosts, projects] = await Promise.all([
      this.contactModel
        .find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('_id name email subject createdAt')
        .lean<LeanContact[]>(),
      this.quoteModel
        .find({})
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('_id name email serviceType status createdAt')
        .lean<LeanQuote[]>(),
      this.blogModel
        .find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('_id title slug category isPublished publishedAt createdAt')
        .lean<LeanBlog[]>(),
      this.projectModel
        .find({ isActive: true })
        .sort({ createdAt: -1 })
        .limit(limit)
        .select('_id title slug category isFeatured createdAt')
        .lean<LeanProject[]>()
    ]);

    return {
      contactMessages: contactMessages.map((c) => ({
        _id: c._id.toString(),
        name: c.name,
        email: c.email,
        subject: c.subject,
        createdAt: c.createdAt
      })),
      quoteRequests: quoteRequests.map((q) => ({
        _id: q._id.toString(),
        name: q.name,
        email: q.email,
        serviceType: q.serviceType,
        status: q.status,
        createdAt: q.createdAt
      })),
      blogPosts: blogPosts.map((b) => ({
        _id: b._id.toString(),
        title: b.title,
        slug: b.slug,
        category: b.category,
        isPublished: b.isPublished,
        publishedAt: b.publishedAt,
        createdAt: b.createdAt
      })),
      projects: projects.map((p) => ({
        _id: p._id.toString(),
        title: p.title,
        slug: p.slug,
        category: p.category,
        isFeatured: p.isFeatured,
        createdAt: p.createdAt
      }))
    };
  }

  async getChartData(): Promise<ChartData> {
    const [
      projectsByCategory,
      blogPostsByCategory,
      quotesByStatus,
      contactsByMonth,
      newsletterGrowth
    ] = await Promise.all([
      this.projectModel.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { category: '$_id', count: 1, _id: 0 } },
        { $sort: { count: -1 } }
      ]),
      this.blogModel.aggregate([
        { $match: { isActive: true } },
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { category: '$_id', count: 1, _id: 0 } },
        { $sort: { count: -1 } }
      ]),
      this.quoteModel.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $project: { status: '$_id', count: 1, _id: 0 } },
        { $sort: { count: -1 } }
      ]),
      this.getContactsByMonth(),
      this.getNewsletterGrowth()
    ]);

    return {
      projectsByCategory,
      blogPostsByCategory,
      quotesByStatus,
      contactsByMonth,
      newsletterGrowth
    };
  }

  private async getContactsByMonth(): Promise<Array<{ month: string; count: number }>> {
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    return this.contactModel.aggregate([
      {
        $match: {
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          month: {
            $dateToString: {
              format: '%Y-%m',
              date: {
                $dateFromParts: {
                  year: '$_id.year',
                  month: '$_id.month',
                  day: 1
                }
              }
            }
          },
          count: 1,
          _id: 0
        }
      },
      { $sort: { month: 1 } }
    ]);
  }

  private async getNewsletterGrowth(): Promise<Array<{ month: string; count: number }>> {
    const now = new Date();
    const twelveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 11, 1);

    return this.newsletterModel.aggregate([
      {
        $match: {
          subscribedAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$subscribedAt' },
            month: { $month: '$subscribedAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          month: {
            $dateToString: {
              format: '%Y-%m',
              date: {
                $dateFromParts: {
                  year: '$_id.year',
                  month: '$_id.month',
                  day: 1
                }
              }
            }
          },
          count: 1,
          _id: 0
        }
      },
      { $sort: { month: 1 } }
    ]);
  }

  async getNotifications(limit: number = 10): Promise<DashboardNotification[]> {
    const [recentContacts, recentQuotes, recentNewsletters] = await Promise.all([
      this.contactModel
        .find({ isRead: false })
        .sort({ createdAt: -1 })
        .limit(3)
        .select('_id name subject createdAt')
        .lean<LeanContact[]>(),
      this.quoteModel
        .find({ status: 'pending' })
        .sort({ createdAt: -1 })
        .limit(3)
        .select('_id name serviceType createdAt')
        .lean<LeanQuote[]>(),
      this.newsletterModel
        .find({})
        .sort({ subscribedAt: -1 })
        .limit(3)
        .select('_id email subscribedAt')
        .lean<LeanNewsletter[]>()
    ]);

    const notifications: DashboardNotification[] = [];

    recentContacts.forEach((contact) => {
      notifications.push({
        _id: contact._id.toString(),
        type: 'contact',
        title: 'New Contact Message',
        message: `${contact.name}: ${contact.subject}`,
        isRead: false,
        createdAt: contact.createdAt
      });
    });

    recentQuotes.forEach((quote) => {
      notifications.push({
        _id: quote._id.toString(),
        type: 'quote',
        title: 'New Quote Request',
        message: `${quote.name} requested: ${quote.serviceType}`,
        isRead: false,
        createdAt: quote.createdAt
      });
    });

    recentNewsletters.forEach((newsletter) => {
      notifications.push({
        _id: newsletter._id.toString(),
        type: 'newsletter',
        title: 'New Subscriber',
        message: `Email: ${newsletter.email}`,
        isRead: false,
        createdAt: newsletter.subscribedAt
      });
    });

    return notifications
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, limit);
  }
}