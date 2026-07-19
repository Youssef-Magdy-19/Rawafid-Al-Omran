import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { type FaqItem, faqCategoryLabels } from '@data/faqMockData';

export interface FaqFormData {
  questionAr: string;
  questionEn: string;
  answerAr: string;
  answerEn: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
  featured: boolean;
  seoTitleAr: string;
  seoTitleEn: string;
  seoDescriptionAr: string;
  seoDescriptionEn: string;
  seoKeywordsAr: string;
  seoKeywordsEn: string;
}

interface FaqFormProps {
  initialData?: FaqItem;
  onSubmit: (data: FaqFormData) => void;
  isSubmitting: boolean;
}

export function FaqForm({ initialData, onSubmit, isSubmitting }: FaqFormProps) {
  const { t } = useTranslation();
  const [form, setForm] = useState<FaqFormData>({
    questionAr: initialData?.questionAr || '',
    questionEn: initialData?.questionEn || '',
    answerAr: initialData?.answerAr || '',
    answerEn: initialData?.answerEn || '',
    category: initialData?.category || '',
    displayOrder: initialData?.displayOrder ?? 0,
    isActive: initialData?.isActive ?? true,
    featured: initialData?.featured ?? false,
    seoTitleAr: initialData?.seoTitleAr || '',
    seoTitleEn: initialData?.seoTitleEn || '',
    seoDescriptionAr: initialData?.seoDescriptionAr || '',
    seoDescriptionEn: initialData?.seoDescriptionEn || '',
    seoKeywordsAr: initialData?.seoKeywordsAr || '',
    seoKeywordsEn: initialData?.seoKeywordsEn || '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof FaqFormData, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) { const n = { ...errors }; delete n[field]; setErrors(n); }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.questionAr.trim()) e.questionAr = t('dashboard.addFaq.validation.questionArRequired');
    if (!form.questionEn.trim()) e.questionEn = t('dashboard.addFaq.validation.questionEnRequired');
    if (!form.answerAr.trim()) e.answerAr = t('dashboard.addFaq.validation.answerArRequired');
    if (!form.answerEn.trim()) e.answerEn = t('dashboard.addFaq.validation.answerEnRequired');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) onSubmit(form); };

  const fCls = (name: string) =>
    `w-full h-11 px-4 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'}`;
  const taCls = (name: string) =>
    `w-full min-h-[120px] px-4 py-3 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y ${errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'}`;
  const catOptions = Object.entries(faqCategoryLabels);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addFaq.basicInfo')}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.category')}</label>
            <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className={fCls('category')}>
              <option value="">{t('dashboard.addFaq.categoryPlaceholder')}</option>
              {catOptions.map(([key]) => (<option key={key} value={key}>{t(`faq.categories.${key}` as any)}</option>))}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.displayOrder')}</label>
            <input type="number" value={form.displayOrder} onChange={(e) => updateField('displayOrder', parseInt(e.target.value) || 0)}
              placeholder={t('dashboard.addFaq.displayOrderPlaceholder')} className={fCls('displayOrder')} min={0} />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={(e) => updateField('isActive', e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
            <span className="text-sm font-medium text-foreground">{t('dashboard.addFaq.active')}</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)}
              className="h-4 w-4 rounded border-input text-amber-500 focus:ring-amber-500" />
            <span className="text-sm font-medium text-foreground">{t('dashboard.addFaq.featured')}</span>
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addFaq.bilingualContent')}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.questionAr')} <span className="text-destructive">*</span></label>
            <input value={form.questionAr} onChange={(e) => updateField('questionAr', e.target.value)}
              placeholder={t('dashboard.addFaq.questionArPlaceholder')} className={fCls('questionAr')} />
            {errors.questionAr && <p className="mt-1 text-xs text-destructive">{errors.questionAr}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.questionEn')} <span className="text-destructive">*</span></label>
            <input value={form.questionEn} onChange={(e) => updateField('questionEn', e.target.value)}
              placeholder={t('dashboard.addFaq.questionEnPlaceholder')} className={fCls('questionEn')} />
            {errors.questionEn && <p className="mt-1 text-xs text-destructive">{errors.questionEn}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.answerAr')} <span className="text-destructive">*</span></label>
            <textarea value={form.answerAr} onChange={(e) => updateField('answerAr', e.target.value)}
              placeholder={t('dashboard.addFaq.answerArPlaceholder')} className={taCls('answerAr')} rows={4} />
            {errors.answerAr && <p className="mt-1 text-xs text-destructive">{errors.answerAr}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.answerEn')} <span className="text-destructive">*</span></label>
            <textarea value={form.answerEn} onChange={(e) => updateField('answerEn', e.target.value)}
              placeholder={t('dashboard.addFaq.answerEnPlaceholder')} className={taCls('answerEn')} rows={4} />
            {errors.answerEn && <p className="mt-1 text-xs text-destructive">{errors.answerEn}</p>}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addFaq.seoSection')}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.seoTitleAr')}</label>
            <input value={form.seoTitleAr} onChange={(e) => updateField('seoTitleAr', e.target.value)}
              placeholder={t('dashboard.addFaq.seoTitleArPlaceholder')} className={fCls('seoTitleAr')} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.seoTitleEn')}</label>
            <input value={form.seoTitleEn} onChange={(e) => updateField('seoTitleEn', e.target.value)}
              placeholder={t('dashboard.addFaq.seoTitleEnPlaceholder')} className={fCls('seoTitleEn')} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.seoDescriptionAr')}</label>
            <input value={form.seoDescriptionAr} onChange={(e) => updateField('seoDescriptionAr', e.target.value)}
              placeholder={t('dashboard.addFaq.seoDescriptionArPlaceholder')} className={fCls('seoDescriptionAr')} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.seoDescriptionEn')}</label>
            <input value={form.seoDescriptionEn} onChange={(e) => updateField('seoDescriptionEn', e.target.value)}
              placeholder={t('dashboard.addFaq.seoDescriptionEnPlaceholder')} className={fCls('seoDescriptionEn')} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.seoKeywordsAr')}</label>
            <textarea value={form.seoKeywordsAr} onChange={(e) => updateField('seoKeywordsAr', e.target.value)}
              placeholder={t('dashboard.addFaq.seoKeywordsArPlaceholder')} className={taCls('seoKeywordsAr')} rows={3} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.seoKeywordsEn')}</label>
            <textarea value={form.seoKeywordsEn} onChange={(e) => updateField('seoKeywordsEn', e.target.value)}
              placeholder={t('dashboard.addFaq.seoKeywordsEnPlaceholder')} className={taCls('seoKeywordsEn')} rows={3} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">{t('dashboard.addFaq.cancel')}</button>
        <button type="submit" disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? t('dashboard.addFaq.saving') : t('dashboard.addFaq.save')}</button>
      </div>
    </form>
  );
}
