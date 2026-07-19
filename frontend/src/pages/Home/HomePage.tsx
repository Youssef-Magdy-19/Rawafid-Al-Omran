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
import { mockServices, mockProjects, mockTestimonials, mockStatistics } from '@data/mockData';
import { Building2, Users, Award, Globe } from 'lucide-react';

const iconMap = {
  Award,
  Building2,
  Users,
  Globe,
};

export function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('hero.title')} | Rawafid Al Omran</title>
        <meta
          name="description"
          content={t('hero.description')}
        />
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
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {mockServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceCard
                  title={t(service.titleKey)}
                  description={t(service.descriptionKey)}
                  icon={<service.icon className="h-6 w-6" />}
                  slug={service.slug}
                />
              </motion.div>
            ))}
          </div>
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {mockProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard
                  title={project.title}
                  category={t(project.categoryKey)}
                  image={project.image}
                  slug={project.slug}
                />
              </motion.div>
            ))}
          </div>
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
            {mockStatistics.map((stat, index) => {
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
          <div className="grid gap-8 md:grid-cols-3">
            {mockTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role}
                  company={testimonial.company}
                  content={testimonial.content}
                  rating={testimonial.rating}
                />
              </motion.div>
            ))}
          </div>
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