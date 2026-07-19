import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, Building2 } from 'lucide-react';
import { Badge } from '@components';
import { useProjects } from '@hooks/useProjects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProjectsPage() {
  const { t } = useTranslation();
  const { data: projects, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 text-center">
        <p className="text-lg text-muted-foreground">{t('common.error')}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {t('common.retry')}
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('projects.seo.title')}</title>
        <meta name="description" content={t('projects.seo.description')} />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-muted/30 py-20 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0000000a_1px,transparent_1px),linear-gradient(to_bottom,#0000000a_1px,transparent_1px)] bg-[size:3rem_3rem]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {t('projects.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('projects.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects?.map((project) => (
              <motion.div key={project.id} variants={itemVariants}>
                <Link
                  to={`/projects/${project.id}`}
                  className="group block overflow-hidden rounded-2xl bg-background shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted">
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
                      <Building2 className="h-16 w-16 text-primary/40" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <Badge variant="secondary">
                        {t(`projects.categories.${project.category}`)}
                      </Badge>
                      <Badge variant={project.status === 'completed' ? 'default' : 'outline'}>
                        {project.status === 'completed' ? t('common.completed') : t('common.inProgress')}
                      </Badge>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-foreground group-hover:text-primary">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {project.year}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground lg:text-4xl">
              {t('projects.cta.title')}
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/80">
              {t('projects.cta.description')}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-8 py-3 font-semibold text-primary transition-colors hover:bg-background/90"
            >
              {t('projects.cta.button')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}