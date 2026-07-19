import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Clock, DollarSign, ArrowLeft, CheckCircle, Send } from 'lucide-react';
import { PageHeader, Badge, Button, Input, Textarea } from '@components';
import { useLanguage } from '@providers/LanguageProvider';
import { useState } from 'react';

const mockJobs: Record<string, {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  postedDate: string;
}> = {
  '1': {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Cairo, Egypt',
    type: 'full-time',
    salary: '$80,000 - $120,000',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing web applications. You will work with a talented team of engineers and designers to create cutting-edge digital experiences.',
    responsibilities: [
      'Develop new user-facing features using React and TypeScript',
      'Build reusable components and front-end libraries',
      'Optimize components for maximum performance across devices',
      'Collaborate with designers and backend developers',
      'Mentor junior developers and conduct code reviews',
    ],
    requirements: [
      '5+ years of experience with React',
      'Strong TypeScript skills',
      'Experience with modern CSS frameworks (Tailwind, Styled Components)',
      'Excellent problem-solving skills',
      'Strong communication skills in English',
    ],
    niceToHave: [
      'Experience with Next.js or Remix',
      'Knowledge of testing frameworks (Jest, Cypress)',
      'Experience with GraphQL',
      'Open source contributions',
    ],
    benefits: [
      'Competitive salary',
      'Health insurance',
      'Remote work options',
      'Learning budget',
      'Flexible working hours',
    ],
    postedDate: '2024-01-15',
  },
  '2': {
    id: '2',
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'remote',
    salary: '$90,000 - $130,000',
    description: 'Join our team to build scalable backend systems and APIs that power our products. You will design and implement microservices that handle millions of requests daily.',
    responsibilities: [
      'Design and implement scalable backend services',
      'Build RESTful and GraphQL APIs',
      'Optimize database queries and performance',
      'Implement security best practices',
      'Write comprehensive tests and documentation',
    ],
    requirements: [
      '4+ years of backend development experience',
      'Proficiency in Node.js or Python',
      'Experience with databases (PostgreSQL, MongoDB)',
      'Understanding of microservices architecture',
      'Strong problem-solving skills',
    ],
    niceToHave: [
      'Experience with Kubernetes',
      'Knowledge of message queues (RabbitMQ, Kafka)',
      'Experience with AWS or GCP',
      'Contributions to open source',
    ],
    benefits: [
      'Fully remote position',
      'Competitive salary',
      'Health insurance',
      'Home office budget',
      'Unlimited PTO',
    ],
    postedDate: '2024-01-12',
  },
};

export function CareerDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    coverLetter: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const job = id ? mockJobs[id] : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600 mb-6">This position is no longer available.</p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            View All Jobs
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
          <p className="text-gray-600 mb-8">
            Thank you for applying for the {job.title} position. We'll review your application and get back to you soon.
          </p>
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            View More Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title={job.title}
        description={job.description}
        breadcrumbs={[
          { label: t('nav.careers') || 'Careers', href: '/careers' },
          { label: job.title },
        ]}
        variant="default"
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Meta */}
            <div className={`flex flex-wrap items-center gap-4 ${isRTL ? 'justify-end' : ''}`}>
              <Badge variant="primary">{job.department}</Badge>
              <span className={`flex items-center gap-1 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              <span className={`flex items-center gap-1 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="h-4 w-4" />
                {job.type.replace('-', ' ')}
              </span>
              {job.salary && (
                <span className={`flex items-center gap-1 text-gray-600 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </span>
              )}
            </div>

            {/* Responsibilities */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((item, index) => (
                  <li key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((item, index) => (
                  <li key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle className="h-5 w-5 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Nice to Have */}
            {job.niceToHave.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Nice to Have</h2>
                <ul className="space-y-3">
                  {job.niceToHave.map((item, index) => (
                    <li key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <CheckCircle className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Benefits */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {job.benefits.map((benefit, index) => (
                  <div key={index} className={`flex items-center gap-3 p-4 bg-white rounded-lg ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Application Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Apply for this position</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="John Doe"
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="john@example.com"
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 234 567 8900"
                />
                <Input
                  label="LinkedIn URL"
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  placeholder="https://linkedin.com/in/johndoe"
                />
                <Textarea
                  label="Cover Letter"
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  rows={4}
                  placeholder="Tell us why you're a great fit for this role..."
                />
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                  className="w-full"
                  rightIcon={<Send className="h-4 w-4" />}
                >
                  Submit Application
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-12">
          <Link
            to="/careers"
            className={`inline-flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
            Back to All Jobs
          </Link>
        </div>
      </div>
    </div>
  );
}