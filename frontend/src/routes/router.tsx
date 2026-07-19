import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout/MainLayout';
import { MinimalLayout } from '../layouts/MinimalLayout/MinimalLayout';
import { DashboardLayout } from '../layouts/DashboardLayout/DashboardLayout';
import { ROUTES } from '../constants/route.constants';
import { HomePage } from '../pages/Home/HomePage';
import { NotFoundPage } from '../pages/NotFound/NotFoundPage';
import { DashboardHome } from '../pages/Dashboard/DashboardHome';
import { DashboardLogin } from '../pages/Dashboard/DashboardLogin';
import { ProjectsList } from '../pages/Dashboard/ProjectsList';
import { AddProject } from '../pages/Dashboard/AddProject';
import { EditProject } from '../pages/Dashboard/EditProject';
import { ProjectDetails } from '../pages/Dashboard/ProjectDetails';
import { ServicesList } from '../pages/Dashboard/ServicesList';
import { AddService } from '../pages/Dashboard/AddService';
import { EditService } from '../pages/Dashboard/EditService';
import { ServiceDetails } from '../pages/Dashboard/ServiceDetails';
import { EquipmentList } from '../pages/Dashboard/EquipmentList';
import { AddEquipment } from '../pages/Dashboard/AddEquipment';
import { EditEquipment } from '../pages/Dashboard/EditEquipment';
import { EquipmentDetails } from '../pages/Dashboard/EquipmentDetails';
import { TeamList } from '../pages/Dashboard/TeamList';
import { AddTeamMember } from '../pages/Dashboard/AddTeamMember';
import { EditTeamMember } from '../pages/Dashboard/EditTeamMember';
import { TeamMemberDetails } from '../pages/Dashboard/TeamMemberDetails';
import { TestimonialsList } from '../pages/Dashboard/TestimonialsList';
import { AddTestimonial } from '../pages/Dashboard/AddTestimonial';
import { EditTestimonial } from '../pages/Dashboard/EditTestimonial';
import { TestimonialDetails } from '../pages/Dashboard/TestimonialDetails';
import { BlogList } from '../pages/Dashboard/BlogList';
import { AddBlogPost } from '../pages/Dashboard/AddBlogPost';
import { EditBlogPost } from '../pages/Dashboard/EditBlogPost';
import { BlogPostDetails } from '../pages/Dashboard/BlogPostDetails';
import { FaqList } from '../pages/Dashboard/FaqList';
import { AddFaq } from '../pages/Dashboard/AddFaq';
import { EditFaq } from '../pages/Dashboard/EditFaq';
import { FaqDetails } from '../pages/Dashboard/FaqDetails';
import { QuoteRequestsList } from '../pages/Dashboard/QuoteRequestsList';
import { QuoteRequestDetails } from '../pages/Dashboard/QuoteRequestDetails';
import { ContactMessagesList } from '../pages/Dashboard/ContactMessagesList';
import { ContactMessageDetails } from '../pages/Dashboard/ContactMessageDetails';
import { DashboardPlaceholder } from '../pages/Dashboard/DashboardPlaceholder';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: ROUTES.NOT_FOUND,
    element: <MinimalLayout />,
    children: [
      {
        index: true,
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: ROUTES.DASHBOARD_LOGIN,
    element: <DashboardLogin />,
  },
  {
    path: ROUTES.DASHBOARD,
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: 'projects',
        element: <ProjectsList />,
      },
      {
        path: 'projects/add',
        element: <AddProject />,
      },
      {
        path: 'projects/:id',
        element: <ProjectDetails />,
      },
      {
        path: 'projects/:id/edit',
        element: <EditProject />,
      },
      {
        path: 'services',
        element: <ServicesList />,
      },
      {
        path: 'services/add',
        element: <AddService />,
      },
      {
        path: 'services/:id',
        element: <ServiceDetails />,
      },
      {
        path: 'services/:id/edit',
        element: <EditService />,
      },
      {
        path: 'equipment',
        element: <EquipmentList />,
      },
      {
        path: 'equipment/add',
        element: <AddEquipment />,
      },
      {
        path: 'equipment/:id',
        element: <EquipmentDetails />,
      },
      {
        path: 'equipment/:id/edit',
        element: <EditEquipment />,
      },
      {
        path: 'team',
        element: <TeamList />,
      },
      {
        path: 'team/add',
        element: <AddTeamMember />,
      },
      {
        path: 'team/:id',
        element: <TeamMemberDetails />,
      },
      {
        path: 'team/:id/edit',
        element: <EditTeamMember />,
      },
      {
        path: 'blog',
        element: <BlogList />,
      },
      {
        path: 'blog/add',
        element: <AddBlogPost />,
      },
      {
        path: 'blog/:id',
        element: <BlogPostDetails />,
      },
      {
        path: 'blog/:id/edit',
        element: <EditBlogPost />,
      },
      {
        path: 'testimonials',
        element: <TestimonialsList />,
      },
      {
        path: 'testimonials/add',
        element: <AddTestimonial />,
      },
      {
        path: 'testimonials/:id',
        element: <TestimonialDetails />,
      },
      {
        path: 'testimonials/:id/edit',
        element: <EditTestimonial />,
      },
      {
        path: 'faq',
        element: <FaqList />,
      },
      {
        path: 'faq/add',
        element: <AddFaq />,
      },
      {
        path: 'faq/:id',
        element: <FaqDetails />,
      },
      {
        path: 'faq/:id/edit',
        element: <EditFaq />,
      },
      {
        path: 'quote-requests',
        element: <QuoteRequestsList />,
      },
      {
        path: 'quote-requests/:id',
        element: <QuoteRequestDetails />,
      },
      {
        path: 'contact-messages',
        element: <ContactMessagesList />,
      },
      {
        path: 'contact-messages/:id',
        element: <ContactMessageDetails />,
      },
      {
        path: 'invoices',
        element: <DashboardPlaceholder section="invoices" />,
      },
      {
        path: 'reports',
        element: <DashboardPlaceholder section="reports" />,
      },
      {
        path: 'settings',
        element: <DashboardPlaceholder section="settings" />,
      },
      {
        path: 'support',
        element: <DashboardPlaceholder section="support" />,
      },
      {
        path: 'profile',
        element: <DashboardPlaceholder section="profile" />,
      },
      {
        path: 'notifications',
        element: <DashboardPlaceholder section="notifications" />,
      },
      {
        path: 'activity',
        element: <DashboardPlaceholder section="activity" />,
      },
    ],
  },
]);
