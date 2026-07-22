import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, User } from 'lucide-react';
import { SectionHeader } from '@components';
import { useTeamMembers } from '@hooks/useTeam';
import { useLanguage } from '@providers/LanguageProvider';

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

export function TeamPage() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { data: team, isLoading, error } = useTeamMembers();

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
        <title>{t('team.seo.title')}</title>
        <meta name="description" content={t('team.seo.description')} />
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
              {t('team.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('team.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {team?.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="group overflow-hidden rounded-2xl bg-background p-6 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="mb-4 flex justify-center">
                  <div className="relative">
                    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-muted">
                      <User className="h-16 w-16 text-muted-foreground" />
                    </div>

                  </div>
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold text-foreground">{language === 'ar' ? member.nameAr || member.name : member.name}</h3>
                  <p className="mb-2 text-sm font-medium text-primary">{language === 'ar' ? member.positionAr || member.position : member.position}</p>
                  <p className="mb-4 text-xs text-muted-foreground">{language === 'ar' ? member.departmentAr || member.department : member.department}</p>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-3">{language === 'ar' ? member.bioAr || member.bio : member.bio}</p>
                  <div className="flex justify-center gap-3">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <Mail className="h-4 w-4" />
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        <Phone className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-muted/30 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeader
            title={t('team.culture.title')}
            subtitle={t('team.culture.subtitle')}
            description={t('team.culture.description')}
            className="mb-12"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { title: t('team.culture.values.growth.title'), desc: t('team.culture.values.growth.description') },
              { title: t('team.culture.values.collaboration.title'), desc: t('team.culture.values.collaboration.description') },
              { title: t('team.culture.values.excellence.title'), desc: t('team.culture.values.excellence.description') },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl bg-background p-6 shadow-sm"
              >
                <h4 className="mb-2 font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}