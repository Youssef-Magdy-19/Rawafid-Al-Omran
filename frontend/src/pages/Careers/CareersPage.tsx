import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { MapPin, Clock, Briefcase, DollarSign, ArrowRight, Search, Building2, GraduationCap, HeartHandshake } from 'lucide-react';
import { Badge, Button } from '@components/ui';
import { useLanguage } from '@providers/LanguageProvider';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'remote';
  salary?: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    department: 'Engineering',
    location: 'Cairo, Egypt',
    type: 'full-time',
    salary: '$80,000 - $120,000',
    description: 'We are looking for an experienced Frontend Developer to join our team and help build amazing web applications.',
    requirements: ['5+ years of experience with React', 'Strong TypeScript skills', 'Experience with modern CSS frameworks', 'Excellent problem-solving skills'],
    postedDate: '2024-01-15',
  },
  {
    id: '2',
    title: 'Backend Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'remote',
    salary: '$90,000 - $130,000',
    description: 'Join our team to build scalable backend systems and APIs that power our products.',
    requirements: ['4+ years of backend development experience', 'Proficiency in Node.js or Python', 'Experience with databases and caching', 'Understanding of microservices architecture'],
    postedDate: '2024-01-12',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Cairo, Egypt',
    type: 'full-time',
    salary: '$60,000 - $90,000',
    description: 'Create beautiful and intuitive user interfaces for our web and mobile applications.',
    requirements: ['3+ years of UI/UX design experience', 'Proficiency in Figma and Adobe XD', 'Strong portfolio demonstrating design skills', 'Experience with design systems'],
    postedDate: '2024-01-10',
  },
  {
    id: '4',
    title: 'DevOps Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'remote',
    salary: '$85,000 - $120,000',
    description: 'Help us build and maintain our cloud infrastructure and deployment pipelines.',
    requirements: ['4+ years of DevOps experience', 'Experience with AWS or GCP', 'Strong knowledge of Docker and Kubernetes', 'CI/CD pipeline expertise'],
    postedDate: '2024-01-08',
  },
  {
    id: '5',
    title: 'Product Manager',
    department: 'Product',
    location: 'Cairo, Egypt',
    type: 'full-time',
    salary: '$70,000 - $100,000',
    description: 'Lead product strategy and work closely with engineering and design teams.',
    requirements: ['5+ years of product management experience', 'Strong analytical skills', 'Experience with agile methodologies', 'Excellent communication skills'],
    postedDate: '2024-01-05',
  },
  {
    id: '6',
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Cairo, Egypt',
    type: 'full-time',
    salary: '$45,000 - $65,000',
    description: 'Drive our marketing efforts and help grow our brand presence.',
    requirements: ['3+ years of marketing experience', 'Experience with digital marketing', 'Strong analytical skills', 'Creative thinking'],
    postedDate: '2024-01-03',
  },
];

const departments = ['all', 'Engineering', 'Design', 'Product', 'Marketing'] as const;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function CareersPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'remote': return 'success' as const;
      case 'full-time': return 'primary' as const;
      case 'part-time': return 'secondary' as const;
      case 'contract': return 'warning' as const;
      default: return 'secondary' as const;
    }
  };

  return (
    <>
      <Helmet>
        <title>{t('careers.seo.title')} | Rawafid Al Omran</title>
        <meta name="description" content={t('careers.seo.description')} />
      </Helmet>

      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 lg:min-h-[60vh] lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative z-10 mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="premium-subtitle mb-6 inline-flex justify-center">
              {t('careers.subtitle')}
            </span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {t('careers.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground lg:text-xl">
              {t('careers.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('careers.description')}
            </p>
          </motion.div>

          <div className="mb-12 space-y-6">
            <div className="mx-auto max-w-xl">
              <div className="relative">
                <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground`} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('common.search') || 'Search jobs...'}
                  className={`w-full h-12 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-foreground placeholder:text-muted-foreground transition-colors`}
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedDepartment === dept
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {dept === 'all' ? t('common.all') || 'All' : dept}
                </button>
              ))}
            </div>
          </div>

          {filteredJobs.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="mx-auto max-w-4xl space-y-6"
            >
              {filteredJobs.map((job) => (
                <motion.div
                  key={job.id}
                  variants={itemVariants}
                  className="premium-card p-6 lg:p-8"
                >
                  <div className={`flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between ${isRTL ? 'text-right' : ''}`}>
                    <div className="flex-1">
                      <div className={`flex flex-wrap items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                        <Badge variant={getTypeBadgeVariant(job.type)} size="sm">
                          {job.type.replace('-', ' ')}
                        </Badge>
                      </div>

                      <div className={`flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <span className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Briefcase className="h-4 w-4" />
                          {job.department}
                        </span>
                        <span className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <Clock className="h-4 w-4" />
                          {new Date(job.postedDate).toLocaleDateString()}
                        </span>
                        {job.salary && (
                          <span className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                          </span>
                        )}
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed">{job.description}</p>

                      <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                        {job.requirements.slice(0, 2).map((req, index) => (
                          <Badge key={index} variant="secondary" size="sm">
                            {req}
                          </Badge>
                        ))}
                        {job.requirements.length > 2 && (
                          <Badge variant="secondary" size="sm">
                            +{job.requirements.length - 2} {t('common.more') || 'more'}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className={`flex-shrink-0 ${isRTL ? 'text-right' : ''}`}>
                      <Link to={`/careers/${job.id}`}>
                        <Button variant="primary" rightIcon={<ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />}>
                          {t('careers.viewPosition')}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-20 text-center"
            >
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted">
                <Briefcase className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="mb-2 text-xl font-bold text-foreground">{t('careers.noPositions')}</h3>
              <p className="text-muted-foreground">{t('careers.checkBack')}</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="section-gradient-alt py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <span className="premium-subtitle mb-4 inline-flex justify-center">
              {t('careers.benefits')}
            </span>
            <h2 className="text-3xl font-bold text-foreground lg:text-4xl">
              {t('careers.benefits') || 'Why Work With Us'}
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {[
              { icon: Briefcase, title: 'Competitive Salary', desc: 'We offer top-market compensation packages' },
              { icon: HeartHandshake, title: 'Health Insurance', desc: 'Comprehensive health coverage for you and family' },
              { icon: GraduationCap, title: 'Learning Budget', desc: 'Annual budget for courses and conferences' },
              { icon: Building2, title: 'Great Team Culture', desc: 'Work with talented and passionate people' },
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="premium-card p-8 text-center"
                >
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="premium-card mx-auto max-w-3xl overflow-hidden p-8 text-center lg:p-12"
          >
            <h2 className="mb-4 text-3xl font-bold text-foreground lg:text-4xl">
              {t('careers.hero.title')}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {t('careers.hero.description')}
            </p>
            <Link to="/contact">
              <Button size="lg" variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
                {t('common.contactUs')}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}