import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Building2 } from 'lucide-react';
import { Button, Input, Textarea, Select } from '@components';
import { useLanguage } from '@providers/LanguageProvider';
import { apiClient } from '@services/api/client';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.12 } }),
};

const infoItems = [
  { key: 'address', Icon: MapPin },
  { key: 'phone', Icon: Phone },
  { key: 'email', Icon: Mail },
  { key: 'hours', Icon: Clock },
];

const serviceOptions = [
  { value: 'construction', labelKey: 'services.items.constructionManagement.title' },
  { value: 'design', labelKey: 'services.items.designEngineering.title' },
  { value: 'infrastructure', labelKey: 'services.items.infrastructureDevelopment.title' },
  { value: 'renovation', labelKey: 'services.items.renovationRestoration.title' },
  { value: 'other', labelKey: 'contact.form.otherService' },
];

export function ContactPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');
    try {
      await apiClient.post('/contacts', formData);
      setIsSubmitted(true);
    } catch {
      setFormError(t('contact.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>{t('contact.seo.title')}</title>
        </Helmet>
        <section className="section-gradient flex min-h-[70vh] items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mx-auto max-w-lg text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.15, type: 'spring', stiffness: 250 }}
              className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10"
            >
              <CheckCircle className="h-12 w-12 text-primary" />
            </motion.div>
            <h2 className="mb-4 text-3xl font-bold text-foreground">{t('contact.success.title')}</h2>
            <p className="mb-10 text-lg text-muted-foreground">{t('contact.success.description')}</p>
            <Button size="lg" onClick={() => setIsSubmitted(false)}>
              {t('contact.success.another')}
            </Button>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('contact.seo.title')}</title>
        <meta name="description" content={t('contact.seo.description')} />
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
            <span className="premium-subtitle mb-6 justify-center">{t('contact.info.title')}</span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {t('contact.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('contact.hero.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-gradient py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="grid gap-12 lg:grid-cols-5"
          >
            {/* Left: Contact Info */}
            <motion.div variants={fadeLeft} className="lg:col-span-2 lg:pr-8">
              <h2 className="mb-2 text-2xl font-bold text-foreground">{t('contact.info.title')}</h2>
              <p className="mb-10 text-muted-foreground">{t('contact.info.description')}</p>

              <div className="space-y-6">
                {infoItems.map(({ key, Icon }, i) => (
                  <motion.div
                    key={key}
                    custom={i}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className={`premium-card flex gap-5 p-5 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold text-foreground">
                        {t(`contact.info.${key}.label`)}
                      </h3>
                      <p className="text-muted-foreground">
                        {key === 'email'
                          ? 'info@rawafidomran.com'
                          : t(`contact.info.${key}.value`)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="premium-card mt-10 aspect-video overflow-hidden p-0"
              >
                <div className="flex h-full items-center justify-center bg-muted/50">
                  <div className="text-center">
                    <MapPin className="mx-auto mb-2 h-10 w-10 text-muted-foreground/40" />
                    <span className="text-sm text-muted-foreground/60">{t('contact.info.address.value')}</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div variants={fadeRight} className="lg:col-span-3">
              <div className="premium-card p-8 lg:p-10">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground">{t('contact.form.title')}</h2>
                  <div className="mt-3 h-1 w-16 rounded-full bg-primary/30" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Input
                      label={`${t('contact.form.name')} *`}
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      required
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    <Input
                      label={`${t('contact.form.email')} *`}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      required
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Input
                      label={t('contact.form.phone')}
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={t('contact.form.phonePlaceholder')}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                    <Input
                      label={t('contact.form.company')}
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t('contact.form.companyPlaceholder')}
                      dir={isRTL ? 'rtl' : 'ltr'}
                    />
                  </div>

                  <Select
                    label={t('contact.form.service')}
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    placeholder={t('contact.form.servicePlaceholder')}
                    options={serviceOptions.map((o) => ({ value: o.value, label: t(o.labelKey) }))}
                  />

                  <Textarea
                    label={`${t('contact.form.message')} *`}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.form.messagePlaceholder')}
                    rows={5}
                    required
                    dir={isRTL ? 'rtl' : 'ltr'}
                  />

                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-sm text-destructive"
                    >
                      <Building2 className="h-5 w-5 shrink-0" />
                      <span>{formError}</span>
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full"
                    rightIcon={!isSubmitting ? <Send className="h-5 w-5" /> : undefined}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        {t('contact.form.submitting')}
                      </span>
                    ) : (
                      t('contact.form.submit')
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
