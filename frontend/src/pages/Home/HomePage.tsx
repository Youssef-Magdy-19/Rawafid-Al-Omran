import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HeroSection,
  SectionHeader,
  ServiceCard,
  ProjectCard,
  Statistic,
  TestimonialCard,
  CTABanner,
  NewsletterForm,
} from '@components';
import { Button } from '@components/ui';
import { useServices } from '@hooks/useServices';
import { useProjects } from '@hooks/useProjects';
import { useTestimonials } from '@hooks/useTestimonials';
import { useLanguage } from '@providers/LanguageProvider';
import { Building2, Users, Award, Globe, Loader2 } from 'lucide-react';

const iconMap = {
  Award,
  Building2,
  Users,
  Globe,
};

const statistics = [
  { id: 'stat-1', value: '25+', labelKey: 'statistics.yearsExperience', icon: 'Award' },
  { id: 'stat-2', value: '500+', labelKey: 'statistics.projectsCompleted', icon: 'Building2' },
  { id: 'stat-3', value: '200+', labelKey: 'statistics.teamMembers', icon: 'Users' },
  { id: 'stat-4', value: '98%', labelKey: 'statistics.clientSatisfaction', icon: 'Globe' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export function HomePage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: services, isLoading: servicesLoading } = useServices();
  const { data: projects, isLoading: projectsLoading } = useProjects({ limit: '4', isFeatured: 'true' });
  const { data: testimonials, isLoading: testimonialsLoading } = useTestimonials();

  const isLoading = servicesLoading || projectsLoading || testimonialsLoading;

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('hero.title')} | Rawafid Al Omran</title>
        <meta name="description" content={t('hero.description')} />
      </Helmet>

      {/* Hero Section */}
      <HeroSection
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
        description={t('hero.description')}
        primaryCtaText={t('hero.primaryCta')}
        primaryCtaLink="/contact"
        secondaryCtaText={t('hero.secondaryCta')}
        secondaryCtaLink="/projects"
        backgroundImage="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80"
      />

      {/* Services Preview Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t('services.title')}
            subtitle={t('services.subtitle')}
            description={t('services.description')}
            className="mb-12"
          />
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services?.slice(0, 4).map((service) => {
              const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Building2;
              const title = language === 'ar' ? service.titleAr : service.title;
              const description = language === 'ar' ? service.shortDescriptionAr || service.descriptionAr : service.shortDescription || service.description;
              return (
                <motion.div key={service.id} variants={itemVariants}>
                  <ServiceCard
                    title={title}
                    description={description}
                    icon={<IconComponent className="h-6 w-6" />}
                    slug={service.slug}
                  />
                </motion.div>
              );
            })}
          </motion.div>
          <div className="mt-12 text-center">
            <Link to="/services">
              <Button variant="outline" rightIcon={<span>←</span>}>
                {t('services.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="bg-gray-50 py-24 dark:bg-gray-900/50">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t('projects.title')}
            subtitle={t('projects.subtitle')}
            description={t('projects.description')}
            className="mb-12"
          />
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects?.slice(0, 4).map((project) => {
              const title = language === 'ar' ? project.titleAr : project.title;
              const category = language === 'ar' ? project.categoryAr : project.category;
              return (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard
                    title={title}
                    category={category}
                    image={project.thumbnail || project.images?.[0] || ''}
                    slug={project.slug}
                  />
                </motion.div>
              );
            })}
          </motion.div>
          <div className="mt-12 text-center">
            <Link to="/projects">
              <Button variant="outline" rightIcon={<span>←</span>}>
                {t('projects.viewAll')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-4">
            {statistics.map((stat, index) => {
              const IconComponent = iconMap[stat.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={stat.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Statistic
                    value={stat.value}
                    label={t(stat.labelKey)}
                    icon={<IconComponent className="h-8 w-8" />}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <SectionHeader
            title={t('testimonials.title')}
            subtitle={t('testimonials.subtitle')}
            description={t('testimonials.description')}
            className="mb-12"
          />
          <motion.div
            className="grid gap-8 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {testimonials?.slice(0, 3).map((testimonial) => {
              const name = language === 'ar' ? testimonial.nameAr || testimonial.name : testimonial.name;
              const content = language === 'ar' ? testimonial.contentAr || testimonial.content : testimonial.content;
              const company = language === 'ar' ? testimonial.companyAr || testimonial.company : testimonial.company;
              const position = language === 'ar' ? testimonial.roleAr || testimonial.position : testimonial.position;
              return (
                <motion.div key={testimonial._id || testimonial.id} variants={itemVariants}>
                  <TestimonialCard
                    name={name}
                    role={position || ''}
                    company={company || ''}
                    content={content}
                    rating={testimonial.rating || 5}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Banner */}
      <CTABanner
        title={t('cta.title')}
        description={t('cta.description')}
        buttonText={t('cta.button')}
        buttonLink="/contact"
        variant="secondary"
      />

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">{t('newsletter.title')}</h2>
            <p className="mt-4 text-muted-foreground">
              {t('newsletter.description')}
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
