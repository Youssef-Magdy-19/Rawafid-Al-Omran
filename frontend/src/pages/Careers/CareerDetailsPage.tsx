import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Clock, DollarSign, ArrowLeft, CheckCircle, Send, Briefcase, ChevronLeft } from 'lucide-react';
import { Badge, Button } from '@components/ui';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
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
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (!job) {
    return (
      <>
        <Helmet>
          <title>{t('careers.seo.title')} | Rawafid Al Omran</title>
          <meta name="description" content={t('careers.seo.description')} />
        </Helmet>
        <section className="section-gradient flex min-h-[60vh] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
              <Briefcase className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground">{t('careers.noPositions')}</h1>
            <p className="mb-8 text-muted-foreground">{t('careers.checkBack')}</p>
            <Link to="/careers">
              <Button variant="primary" leftIcon={<ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />}>
                {t('common.viewAll') || 'View All Jobs'}
              </Button>
            </Link>
          </motion.div>
        </section>
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>{t('careers.seo.title')} | Rawafid Al Omran</title>
          <meta name="description" content={t('careers.seo.description')} />
        </Helmet>
        <section className="section-gradient flex min-h-[60vh] items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mx-auto max-w-lg px-4 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary/20">
              <CheckCircle className="h-10 w-10 text-secondary" />
            </div>
            <h1 className="mb-4 text-3xl font-bold text-foreground">{t('careers.success.title')}</h1>
            <p className="mb-8 text-muted-foreground leading-relaxed">
              {t('careers.success.description')}
            </p>
            <Link to="/careers">
              <Button variant="primary" leftIcon={<ArrowLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />}>
                {t('common.viewAll') || 'View More Jobs'}
              </Button>
            </Link>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{job.title} | Rawafid Al Omran</title>
        <meta name="description" content={job.description} />
      </Helmet>

      <section className="section-gradient relative overflow-hidden py-16 lg:py-24">
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link
              to="/careers"
              className={`inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ChevronLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              {t('common.back') || 'Back to Careers'}
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className={`flex flex-wrap items-center gap-3 mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <Badge variant="primary" size="md">{job.department}</Badge>
              <Badge variant="outline" size="md">{job.type.replace('-', ' ')}</Badge>
            </div>
            <h1 className="text-4xl font-bold text-foreground lg:text-5xl">{job.title}</h1>
            <div className={`mt-4 flex flex-wrap items-center gap-6 text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
              {job.salary && (
                <span className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <DollarSign className="h-4 w-4" />
                  {job.salary}
                </span>
              )}
              <span className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <Clock className="h-4 w-4" />
                {new Date(job.postedDate).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-10 lg:col-span-2"
            >
              <motion.div variants={itemVariants}>
                <p className="text-lg text-muted-foreground leading-relaxed">{job.description}</p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="mb-5 text-2xl font-bold text-foreground">{t('careers.responsibilities')}</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h2 className="mb-5 text-2xl font-bold text-foreground">{t('careers.requirements')}</h2>
                <ul className="space-y-3">
                  {job.requirements.map((item, index) => (
                    <li key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                      <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {job.niceToHave.length > 0 && (
                <motion.div variants={itemVariants}>
                  <h2 className="mb-5 text-2xl font-bold text-foreground">{t('careers.niceToHave')}</h2>
                  <ul className="space-y-3">
                    {job.niceToHave.map((item, index) => (
                      <li key={index} className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-muted-foreground/40" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}

              <motion.div variants={itemVariants}>
                <h2 className="mb-5 text-2xl font-bold text-foreground">{t('careers.benefits')}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {job.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 rounded-xl border border-border/50 bg-card p-4 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                    >
                      <CheckCircle className="h-5 w-5 flex-shrink-0 text-secondary" />
                      <span className="font-medium text-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <div className="premium-glass sticky top-24 rounded-2xl p-6 lg:p-8">
                <h2 className="mb-6 text-xl font-bold text-foreground">{t('careers.application.title')}</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t('careers.application.fullName')} *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t('careers.application.email')} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t('careers.application.phone')}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="+1 234 567 8900"
                    />
                  </div>

                  <div>
                    <label htmlFor="linkedin" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t('careers.application.linkedin')}
                    </label>
                    <input
                      id="linkedin"
                      type="url"
                      value={formData.linkedin}
                      onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                      className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      placeholder="https://linkedin.com/in/johndoe"
                    />
                  </div>

                  <div>
                    <label htmlFor="coverLetter" className="mb-1.5 block text-sm font-medium text-foreground">
                      {t('careers.application.coverLetter')}
                    </label>
                    <textarea
                      id="coverLetter"
                      value={formData.coverLetter}
                      onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                      rows={4}
                      className="flex min-h-[100px] w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-y"
                      placeholder="Tell us why you're a great fit for this role..."
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    className="w-full"
                    rightIcon={!isSubmitting ? <Send className="h-4 w-4" /> : undefined}
                  >
                    {isSubmitting ? t('careers.application.submitting') : t('careers.application.submit')}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Link
              to="/careers"
              className={`inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary/80 ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <ChevronLeft className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
              {t('common.viewAll') || 'Back to All Jobs'}
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}