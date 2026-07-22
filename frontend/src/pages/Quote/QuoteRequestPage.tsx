import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle,
  FileText,
  DollarSign,
  Clock,
  AlertCircle,
  Mail,
  Phone,
  Shield,
  Target,
  Award,
} from 'lucide-react';
import { Button, Input, Textarea, Select } from '@components';
import { useLanguage } from '@providers/LanguageProvider';
import { apiClient } from '@services/api/client';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  projectDescription: string;
  howDidYouHear: string;
}

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const sidebarFade = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.3 } },
};

export function QuoteRequestPage() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    projectDescription: '',
    howDidYouHear: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const serviceOptions: SelectOption[] = [
    { value: 'construction', label: t('quote.form.serviceOptions.construction') },
    { value: 'design', label: t('quote.form.serviceOptions.design') },
    { value: 'infrastructure', label: t('quote.form.serviceOptions.infrastructure') },
    { value: 'renovation', label: t('quote.form.serviceOptions.renovation') },
    { value: 'consulting', label: t('quote.form.serviceOptions.consulting') },
    { value: 'other', label: t('quote.form.serviceOptions.other') },
  ];

  const budgetOptions: SelectOption[] = [
    { value: 'under-5k', label: t('quote.form.budgetOptions.under-5k') },
    { value: '5k-15k', label: t('quote.form.budgetOptions.5k-15k') },
    { value: '15k-50k', label: t('quote.form.budgetOptions.15k-50k') },
    { value: '50k-100k', label: t('quote.form.budgetOptions.50k-100k') },
    { value: 'over-100k', label: t('quote.form.budgetOptions.over-100k') },
    { value: 'not-sure', label: t('quote.form.budgetOptions.not-sure') },
  ];

  const timelineOptions: SelectOption[] = [
    { value: 'asap', label: t('quote.form.timelineOptions.asap') },
    { value: '1-2-months', label: t('quote.form.timelineOptions.1-2-months') },
    { value: '3-6-months', label: t('quote.form.timelineOptions.3-6-months') },
    { value: 'flexible', label: t('quote.form.timelineOptions.flexible') },
  ];

  const trustItems = [
    { icon: Shield, text: t('quote.trust.projects') },
    { icon: Target, text: t('quote.trust.pricing') },
    { icon: Award, text: t('quote.trust.costs') },
    { icon: CheckCircle, text: t('quote.trust.support') },
  ];

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await apiClient.post('/quotes', formData);
      setSubmitted(true);
    } catch {
      setError(t('quote.form.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Helmet>
          <title>{t('quote.seo.title')}</title>
          <meta name="description" content={t('quote.seo.description')} />
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
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mb-4 text-3xl font-bold text-foreground"
            >
              {t('quote.success.title')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-10 text-lg text-muted-foreground"
            >
              {t('quote.success.description')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <a
                href="/"
                className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary-dark"
              >
                {t('quote.success.backHome')}
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border-2 border-border px-8 py-3 font-semibold text-foreground transition-all hover:bg-muted/30"
              >
                {t('quote.success.contactDirectly')}
              </a>
            </motion.div>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t('quote.seo.title')}</title>
        <meta name="description" content={t('quote.seo.description')} />
      </Helmet>

      {/* Hero */}
      <section className="section-gradient-alt relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.04)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container relative mx-auto px-4"
        >
          <div className={`mx-auto max-w-3xl text-center`}>
            <span className="premium-subtitle mb-6 justify-center">{t('quote.subtitle')}</span>
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground lg:text-5xl">
              {t('quote.hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('quote.hero.description')}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Form + Sidebar */}
      <section className="section-gradient py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Form Column */}
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="lg:col-span-2"
            >
              <div className="premium-card p-8 lg:p-10">
                <motion.h2 variants={fadeUp} className="mb-8 text-2xl font-bold text-foreground">
                  {t('quote.title')}
                </motion.h2>

                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-8 flex items-center gap-3 rounded-lg bg-destructive/10 p-4 text-sm text-destructive"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                  {/* Section 1: Project Details */}
                  <motion.div variants={fadeUp}>
                    <div className="mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{t('quote.form.projectDetails')}</h3>
                      </div>
                      <div className="mt-3 h-px w-full bg-border" />
                    </div>
                    <div className="space-y-6">
                      <Select
                        label={`${t('quote.form.service')} *`}
                        value={formData.service}
                        onChange={(e) => handleChange('service', e.target.value)}
                        options={serviceOptions}
                        placeholder={t('quote.form.service')}
                        required
                      />
                      <Textarea
                        label={`${t('quote.form.projectDescription')} *`}
                        value={formData.projectDescription}
                        onChange={(e) => handleChange('projectDescription', e.target.value)}
                        required
                        rows={6}
                        placeholder={t('quote.form.projectDescription')}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </motion.div>

                  {/* Section 2: Contact Information */}
                  <motion.div variants={fadeUp}>
                    <div className="mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <Mail className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{t('quote.form.fullName')}</h3>
                      </div>
                      <div className="mt-3 h-px w-full bg-border" />
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Input
                        label={`${t('quote.form.fullName')} *`}
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        placeholder={t('quote.form.fullName')}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                      <Input
                        label={`${t('quote.form.email')} *`}
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required
                        placeholder={t('quote.form.email')}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                      <Input
                        label={t('quote.form.phone')}
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        placeholder="+1 234 567 8900"
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                      <Input
                        label={t('quote.form.company')}
                        type="text"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        placeholder={t('quote.form.company')}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </motion.div>

                  {/* Section 3: Budget & Timeline */}
                  <motion.div variants={fadeUp}>
                    <div className="mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground">{t('quote.form.budget')}</h3>
                      </div>
                      <div className="mt-3 h-px w-full bg-border" />
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <Select
                        label={t('quote.form.budget')}
                        value={formData.budget}
                        onChange={(e) => handleChange('budget', e.target.value)}
                        options={budgetOptions}
                        placeholder={t('quote.form.budget')}
                      />
                      <Select
                        label={t('quote.form.timeline')}
                        value={formData.timeline}
                        onChange={(e) => handleChange('timeline', e.target.value)}
                        options={timelineOptions}
                        placeholder={t('quote.form.timeline')}
                      />
                    </div>
                    <div className="mt-6">
                      <Input
                        label={t('quote.form.howDidYouHear')}
                        type="text"
                        value={formData.howDidYouHear}
                        onChange={(e) => handleChange('howDidYouHear', e.target.value)}
                        placeholder={t('quote.form.howDidYouHear')}
                        dir={isRTL ? 'rtl' : 'ltr'}
                      />
                    </div>
                  </motion.div>

                  {/* Submit */}
                  <motion.div variants={fadeUp}>
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
                          {t('common.submitting') || t('quote.form.submit')}
                        </span>
                      ) : (
                        t('quote.form.submit')
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              variants={sidebarFade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8 lg:col-span-1"
            >
              {/* What to Expect */}
              <div className="premium-card p-6">
                <h3 className="mb-5 text-lg font-bold text-foreground">{t('quote.whatToExpect')}</h3>
                <div className="space-y-5">
                  {[
                    { icon: FileText, title: t('quote.review'), desc: t('quote.reviewDesc') },
                    { icon: DollarSign, title: t('quote.quote'), desc: t('quote.quoteDesc') },
                    { icon: Clock, title: t('quote.response'), desc: t('quote.responseDesc') },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 ${isRTL ? 'flex-row-reverse text-right' : ''}`}
                    >
                      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <p className="mt-0.5 text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Need Help */}
              <div className="premium-glass overflow-hidden rounded-2xl p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
                <div className="relative">
                  <h3 className="mb-3 text-lg font-bold text-foreground">{t('quote.needHelp')}</h3>
                  <p className="mb-5 text-sm text-muted-foreground">{t('quote.needHelpDesc')}</p>
                  <div className="space-y-3">
                    <a
                      href="mailto:hello@company.com"
                      className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">hello@company.com</span>
                    </a>
                    <a
                      href="tel:+1234567890"
                      className="flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium">+1 234 567 890</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Why Choose Us */}
              <div className="premium-card p-6">
                <h3 className="mb-5 text-lg font-bold text-foreground">{t('quote.whyChooseUs')}</h3>
                <div className="space-y-4">
                  {trustItems.map((item, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/5">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm text-muted-foreground">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
