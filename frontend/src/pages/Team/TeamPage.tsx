import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  User,
  Users,
  RefreshCw,
  Briefcase,
} from 'lucide-react';
import { Button } from '@components';
import { useTeamMembers } from '@hooks/useTeam';
import { useLanguage } from '@providers/LanguageProvider';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function TeamPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: team, isLoading, error, refetch } = useTeamMembers();
  const [activeDepartment, setActiveDepartment] = useState<string>('all');

  const departments = useMemo(() => {
    if (!team) return [];
    const deps = new Set<string>();
    team.forEach((m) => {
      const dep = language === 'ar' ? m.departmentAr || m.department : m.department;
      if (dep) deps.add(dep);
    });
    return Array.from(deps);
  }, [team, language]);

  const filteredTeam = useMemo(() => {
    if (!team) return [];
    if (activeDepartment === 'all') return team;
    return team.filter((m) => {
      const dep = language === 'ar' ? m.departmentAr || m.department : m.department;
      return dep === activeDepartment;
    });
  }, [team, activeDepartment, language]);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>{t('team.pageTitle')}</title>
        </Helmet>
        <section className="section-gradient min-h-[70vh] py-20">
          <div className="container mx-auto px-4">
            {/* Hero Skeleton */}
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <div className="mx-auto mb-4 h-5 w-32 animate-pulse rounded bg-muted" />
              <div className="mx-auto mb-4 h-12 w-3/4 animate-pulse rounded-lg bg-muted" />
              <div className="mx-auto h-5 w-2/3 animate-pulse rounded bg-muted" />
            </div>
            {/* Filter Skeleton */}
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 w-28 animate-pulse rounded-full bg-muted" />
              ))}
            </div>
            {/* Grid Skeleton */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="premium-card overflow-hidden p-6">
                  <div className="mx-auto mb-5 h-28 w-28 animate-pulse rounded-full bg-muted" />
                  <div className="mx-auto mb-2 h-5 w-3/4 animate-pulse rounded bg-muted" />
                  <div className="mx-auto mb-1 h-4 w-1/2 animate-pulse rounded bg-muted" />
                  <div className="mx-auto mb-4 h-3 w-2/3 animate-pulse rounded bg-muted" />
                  <div className="mx-auto h-4 w-3/4 animate-pulse rounded bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Helmet>
          <title>{t('team.pageTitle')}</title>
        </Helmet>
        <section className="section-gradient flex min-h-[70vh] flex-col items-center justify-center py-20">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
              <Users className="h-10 w-10 text-destructive" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-foreground">{t('team.error')}</h2>
            <p className="mb-8 text-muted-foreground">{t('team.errorDescription')}</p>
            <Button
              onClick={() => refetch?.()}
              variant="primary"
              size="lg"
              leftIcon={<RefreshCw className="h-5 w-5" />}
            >
              {t('team.retry')}
            </Button>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('team.pageTitle')}</title>
        <meta name="description" content={t('team.pageDescription')} />
      </Helmet>

      {/* Hero */}
      <section className="section-gradient-alt relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="premium-subtitle mb-6 justify-center">{t('team.pageTitle')}</span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {t('team.pageTitle')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('team.pageDescription')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Department Filters */}
      <section className="section-gradient pb-0 pt-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 flex flex-wrap justify-center gap-3"
          >
            <button
              onClick={() => setActiveDepartment('all')}
              className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeDepartment === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {t('team.all')}
            </button>
            {departments.map((dep) => (
              <button
                key={dep}
                onClick={() => setActiveDepartment(dep)}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeDepartment === dep
                    ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {dep}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="section-gradient py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {filteredTeam.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Users className="h-10 w-10 text-muted-foreground/50" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">{t('team.noTeam')}</h3>
              <p className="text-muted-foreground">{t('team.noTeamDescription')}</p>
            </div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {filteredTeam.map((member) => (
                <motion.div
                  key={member.id || member._id}
                  variants={itemVariants}
                  className="group premium-card overflow-hidden p-6 text-center transition-all duration-500 hover:-translate-y-1"
                >
                  {/* Portrait */}
                  <div className="relative mx-auto mb-5">
                    <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 ring-2 ring-primary/10 transition-all duration-500 group-hover:ring-primary/30">
                      {member.image || member.thumbnail ? (
                        <img
                          src={member.image || member.thumbnail}
                          alt={language === 'ar' ? member.nameAr || member.name : member.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-primary/40" />
                      )}
                    </div>
                    {/* Online indicator decoration */}
                    <div className="absolute -bottom-1 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-primary shadow-sm shadow-primary/30" />
                  </div>

                  {/* Info */}
                  <h3 className="mb-1 text-lg font-bold text-foreground">
                    {language === 'ar' ? member.nameAr || member.name : member.name}
                  </h3>
                  <p className="mb-1 text-sm font-medium text-primary">
                    {language === 'ar' ? member.positionAr || member.position : member.position}
                  </p>
                  <p className="mb-4 text-xs text-muted-foreground">
                    {language === 'ar'
                      ? member.departmentAr || member.department
                      : member.department}
                  </p>

                  {member.bio && (
                    <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                      {language === 'ar' ? member.bioAr || member.bio : member.bio}
                    </p>
                  )}

                  {/* Social / Contact */}
                  <div className="flex justify-center gap-2">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                        aria-label={member.email}
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                        aria-label={member.phone}
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA - Join Our Team */}
      <section className="section-gradient-alt relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.06),transparent_50%)]" />
        <div className="container relative mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl"
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              {t('careers.hero.title')}
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              {t('careers.hero.description')}
            </p>
            <Button size="lg" onClick={() => window.location.href = '/careers'}>
              {t('careers.viewPosition')}
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
