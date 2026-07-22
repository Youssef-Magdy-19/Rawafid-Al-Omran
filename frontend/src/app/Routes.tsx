import { BrowserRouter, Routes as ReactRoutes, Route } from 'react-router-dom';
import { MainLayout } from '@layouts/MainLayout/MainLayout';
import { DashboardLayout } from '@layouts/DashboardLayout/DashboardLayout';
import { AuthGuard } from '@components/auth/AuthGuard';
import { HomePage } from '@pages/Home/HomePage';
import { AboutPage } from '@pages/About/AboutPage';
import { ServicesPage } from '@pages/Services/ServicesPage';
import { ProjectsPage } from '@pages/Projects/ProjectsPage';
import { TeamPage } from '@pages/Team/TeamPage';
import { ContactPage } from '@pages/Contact/ContactPage';
import { BlogPage } from '@pages/Blog/BlogPage';
import { BlogDetailsPage } from '@pages/Blog/BlogDetailsPage';
import { CareersPage } from '@pages/Careers/CareersPage';
import { CareerDetailsPage } from '@pages/Careers/CareerDetailsPage';
import { FAQPage } from '@pages/FAQ/FAQPage';
import { ServiceDetailsPage } from '@pages/Services/ServiceDetailsPage';
import { ProjectDetailsPage } from '@pages/Projects/ProjectDetailsPage';
import { PartnersPage } from '@pages/Partners/PartnersPage';
import { TestimonialsPage } from '@pages/Testimonials/TestimonialsPage';
import { QuoteRequestPage } from '@pages/Quote/QuoteRequestPage';
import { SearchPage } from '@pages/Search/SearchPage';
import { PrivacyPolicyPage } from '@pages/Legal/PrivacyPolicyPage';
import { TermsOfServicePage } from '@pages/Legal/TermsOfServicePage';
import { CookiePolicyPage } from '@pages/Legal/CookiePolicyPage';
import { NotFoundPage } from '@pages/NotFound/NotFoundPage';
import { DashboardHome, DashboardLogin, ProjectsList, AddProject, EditProject, ProjectDetails, ServicesList, AddService, EditService, ServiceDetails, EquipmentList, AddEquipment, EditEquipment, EquipmentDetails, TeamList, AddTeamMember, EditTeamMember, TeamMemberDetails, BlogList, AddBlogPost, EditBlogPost, BlogPostDetails, TestimonialsList, AddTestimonial, EditTestimonial, TestimonialDetails, PartnersList, AddPartner, EditPartner, PartnerDetails, FaqList, AddFaq, EditFaq, FaqDetails, QuoteRequestsList, QuoteRequestDetails, ContactMessagesList, ContactMessageDetails, SubscribersList, SubscriberDetails, Administration, CompanyInformation, GeneralSettings, AdminProfile, EditProfile, ChangePassword, ReportsDashboard, NotificationsCenter, RecentActivity, DashboardPlaceholder } from '@pages/Dashboard';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/dashboard/login" element={<DashboardLogin />} />
        <Route
          path="/dashboard"
          element={
            <AuthGuard>
              <DashboardLayout />
            </AuthGuard>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/add" element={<AddProject />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="projects/:id/edit" element={<EditProject />} />
          <Route path="services" element={<ServicesList />} />
          <Route path="services/add" element={<AddService />} />
          <Route path="services/:id" element={<ServiceDetails />} />
          <Route path="services/:id/edit" element={<EditService />} />
          <Route path="equipment" element={<EquipmentList />} />
          <Route path="equipment/add" element={<AddEquipment />} />
          <Route path="equipment/:id" element={<EquipmentDetails />} />
          <Route path="equipment/:id/edit" element={<EditEquipment />} />
          <Route path="team" element={<TeamList />} />
          <Route path="team/add" element={<AddTeamMember />} />
          <Route path="team/:id" element={<TeamMemberDetails />} />
          <Route path="team/:id/edit" element={<EditTeamMember />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/add" element={<AddBlogPost />} />
          <Route path="blog/:id" element={<BlogPostDetails />} />
          <Route path="blog/:id/edit" element={<EditBlogPost />} />
          <Route path="testimonials" element={<TestimonialsList />} />
          <Route path="testimonials/add" element={<AddTestimonial />} />
          <Route path="testimonials/:id" element={<TestimonialDetails />} />
          <Route path="testimonials/:id/edit" element={<EditTestimonial />} />
          <Route path="partners" element={<PartnersList />} />
          <Route path="partners/add" element={<AddPartner />} />
          <Route path="partners/:id" element={<PartnerDetails />} />
          <Route path="partners/:id/edit" element={<EditPartner />} />
          <Route path="faq" element={<FaqList />} />
          <Route path="faq/add" element={<AddFaq />} />
          <Route path="faq/:id" element={<FaqDetails />} />
          <Route path="faq/:id/edit" element={<EditFaq />} />
          <Route path="quote-requests" element={<QuoteRequestsList />} />
          <Route path="quote-requests/:id" element={<QuoteRequestDetails />} />
          <Route path="contact-messages" element={<ContactMessagesList />} />
          <Route path="contact-messages/:id" element={<ContactMessageDetails />} />
          <Route path="subscribers" element={<SubscribersList />} />
          <Route path="subscribers/:id" element={<SubscriberDetails />} />
          <Route path="invoices" element={<DashboardPlaceholder section="invoices" />} />
          <Route path="reports" element={<ReportsDashboard />} />
          <Route path="notifications" element={<NotificationsCenter />} />
          <Route path="activity" element={<RecentActivity />} />
          <Route path="administration" element={<Administration />} />
          <Route path="administration/company-info" element={<CompanyInformation />} />
          <Route path="administration/general-settings" element={<GeneralSettings />} />
          <Route path="administration/profile" element={<AdminProfile />} />
          <Route path="administration/profile/edit" element={<EditProfile />} />
          <Route path="administration/change-password" element={<ChangePassword />} />
          <Route path="settings" element={<DashboardPlaceholder section="settings" />} />
          <Route path="support" element={<DashboardPlaceholder section="support" />} />
        </Route>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="services/:slug" element={<ServiceDetailsPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:slug" element={<ProjectDetailsPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogDetailsPage />} />
          <Route path="partners" element={<PartnersPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="careers/:id" element={<CareerDetailsPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="quote" element={<QuoteRequestPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-of-service" element={<TermsOfServicePage />} />
          <Route path="cookie-policy" element={<CookiePolicyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </ReactRoutes>
    </BrowserRouter>
  );
}