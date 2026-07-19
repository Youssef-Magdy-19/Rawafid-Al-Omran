import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Pencil, Trash2, Calendar, Clock, HelpCircle, Hash, Star } from 'lucide-react';
import { mockFaqs } from '@data/faqMockData';

export function FaqDetails() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const faq = useMemo(() => mockFaqs.find((f) => f.id === id), [id]);
  if (!faq) return (
    <div className="flex flex-col items-center justify-center py-20">
      <HelpCircle className="h-12 w-12 text-muted-foreground/50 mb-4" />
      <p className="text-lg font-medium text-foreground">FAQ not found</p>
      <button onClick={() => navigate('/dashboard/faq')} className="mt-4 text-sm text-primary hover:underline">{t('dashboard.faqDetails.backToFaq')}</button>
    </div>
  );

  const InfoRow = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center shrink-0"><Icon className="h-4 w-4 text-muted-foreground" /></div>
      <div className="min-w-0"><p className="text-xs text-muted-foreground">{label}</p><p className="text-sm font-medium text-foreground truncate">{value}</p></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/dashboard/faq')}
            className="h-10 w-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"><ArrowLeft className="h-4 w-4" /></button>
          <div><h1 className="text-2xl font-bold text-foreground">{t('dashboard.faqDetails.pageTitle')}</h1><p className="text-muted-foreground mt-1">{t('dashboard.faqDetails.pageDescription')}</p></div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(`/dashboard/faq/${faq.id}/edit`)}
            className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"><Pencil className="h-4 w-4" />{t('dashboard.faqDetails.editFaq')}</button>
          <button className="inline-flex items-center gap-2 h-10 px-4 rounded-xl border border-border text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"><Trash2 className="h-4 w-4" />{t('dashboard.faqDetails.deleteFaq')}</button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-1">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4"><HelpCircle className="h-8 w-8 text-primary" /></div>
              <h2 className="text-lg font-bold text-foreground">{faq.questionEn.length > 50 ? faq.questionEn.substring(0, 50) + '...' : faq.questionEn}</h2>
              <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20">
                  {t(`faq.categories.${faq.category}` as any)}</span>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${faq.isActive ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-muted text-muted-foreground border-border'}`}>
                  {faq.isActive ? t('dashboard.faqDetails.active') : t('dashboard.faqDetails.inactive')}</span>
                {faq.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20">
                    <Star className="h-3 w-3" />
                    {t('dashboard.faqDetails.featured')}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 mt-3 text-muted-foreground"><Hash className="h-3.5 w-3.5" /><span className="text-xs">{t('dashboard.faqDetails.displayOrder')}: {faq.displayOrder}</span></div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }} className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.faqDetails.questionInformation')}</h3>
            <div className="grid grid-cols-1 gap-4">
              <div><p className="text-xs text-muted-foreground mb-2">{t('dashboard.faqDetails.arabicQuestion')}</p>
                <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed font-medium">{faq.questionAr}</div></div>
              <div><p className="text-xs text-muted-foreground mb-2">{t('dashboard.faqDetails.englishQuestion')}</p>
                <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed font-medium">{faq.questionEn}</div></div>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.faqDetails.arabicAnswer')}</h3>
            <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed">{faq.answerAr}</div>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.faqDetails.englishAnswer')}</h3>
            <div className="rounded-lg bg-muted/50 p-4 text-sm text-foreground leading-relaxed">{faq.answerEn}</div>
          </div>
          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.faqDetails.seoInformation')}</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.faqDetails.arabicSeo')}</p>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t('dashboard.faqDetails.seoTitle')}</p>
                  <p className="text-sm text-foreground">{faq.seoTitleAr || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t('dashboard.faqDetails.seoDescription')}</p>
                  <p className="text-sm text-foreground">{faq.seoDescriptionAr || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t('dashboard.faqDetails.seoKeywords')}</p>
                  <div className="flex flex-wrap gap-1">
                    {faq.seoKeywordsAr ? faq.seoKeywordsAr.split(',').map((kw, i) => (
                      <span key={i} className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground bg-muted/50">
                        {kw.trim()}
                      </span>
                    )) : <span className="text-sm text-muted-foreground">-</span>}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{t('dashboard.faqDetails.englishSeo')}</p>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t('dashboard.faqDetails.seoTitle')}</p>
                  <p className="text-sm text-foreground">{faq.seoTitleEn || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t('dashboard.faqDetails.seoDescription')}</p>
                  <p className="text-sm text-foreground">{faq.seoDescriptionEn || '-'}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">{t('dashboard.faqDetails.seoKeywords')}</p>
                  <div className="flex flex-wrap gap-1">
                    {faq.seoKeywordsEn ? faq.seoKeywordsEn.split(',').map((kw, i) => (
                      <span key={i} className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground bg-muted/50">
                        {kw.trim()}
                      </span>
                    )) : <span className="text-sm text-muted-foreground">-</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-4">
            <h3 className="text-lg font-semibold text-foreground">{t('dashboard.faqDetails.metadata')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={Calendar} label={t('dashboard.faqDetails.createdAt')} value={faq.createdAt} />
              <InfoRow icon={Clock} label={t('dashboard.faqDetails.updatedAt')} value={faq.updatedAt} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
