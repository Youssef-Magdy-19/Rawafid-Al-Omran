import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { ApiFieldErrors } from '@utils/api';
import { Dropdown } from '@components/ui/Dropdown';

export interface FaqFormData {
  question: string;
  questionAr: string;
  answer: string;
  answerAr: string;
  category: string;
  categoryAr: string;
  order: number;
  isActive: boolean;
}

interface FaqFormProps {
  initialData?: FaqFormData;
  onSubmit: (data: FaqFormData) => void;
  isSubmitting: boolean;
  serverErrors?: ApiFieldErrors;
}

export function FaqForm({ initialData, onSubmit, isSubmitting, serverErrors = {} }: FaqFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<FaqFormData>({
    question: initialData?.question || '',
    questionAr: initialData?.questionAr || '',
    answer: initialData?.answer || '',
    answerAr: initialData?.answerAr || '',
    category: initialData?.category || '',
    categoryAr: initialData?.categoryAr || '',
    order: initialData?.order ?? 0,
    isActive: initialData?.isActive ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (Object.keys(serverErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...serverErrors }));
    }
  }, [serverErrors]);

  const updateField = (field: keyof FaqFormData, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) { const n = { ...errors }; delete n[field]; setErrors(n); }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.question.trim()) e.question = t('dashboard.addFaq.validation.questionRequired');
    if (!form.questionAr.trim()) e.questionAr = t('dashboard.addFaq.validation.questionArRequired');
    if (!form.answer.trim()) e.answer = t('dashboard.addFaq.validation.answerRequired');
    if (!form.answerAr.trim()) e.answerAr = t('dashboard.addFaq.validation.answerArRequired');
    if (!form.category.trim()) e.category = t('dashboard.addFaq.validation.categoryRequired');
    if (!form.categoryAr.trim()) e.categoryAr = t('dashboard.addFaq.validation.categoryArRequired');
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (validate()) onSubmit(form); };

  const fCls = (name: string) =>
    `w-full h-11 px-4 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'}`;
  const taCls = (name: string) =>
    `w-full min-h-[120px] px-4 py-3 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y ${errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addFaq.basicInfo')}</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Dropdown
              label={t('dashboard.addFaq.category')}
              value={form.category}
              onChange={(val) => updateField('category', val)}
              placeholder={t('dashboard.addFaq.categoryPlaceholder')}
              options={['general', 'pricing', 'process', 'technical'].map((cat) => ({ value: cat, label: cat }))}
              className="w-full"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.categoryAr')}</label>
            <input value={form.categoryAr} onChange={(e) => updateField('categoryAr', e.target.value)}
              placeholder={t('dashboard.addFaq.categoryArPlaceholder')} className={fCls('categoryAr')} />
            {errors.categoryAr && <p className="mt-1 text-xs text-destructive">{errors.categoryAr}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addFaq.displayOrder')}</label>
            <input type="number" value={form.order} onChange={(e) => updateField('order', parseInt(e.target.value) || 0)}
              placeholder={t('dashboard.addFaq.displayOrderPlaceholder')} className={fCls('order')} min={0} />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={form.isActive} onChange={(e) => updateField('isActive', e.target.checked)}
              className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
            <span className="text-sm font-medium text-foreground">{t('dashboard.addFaq.active')}</span>
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addFaq.bilingualContent')}</h3>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addFaq.question')} <span className="text-destructive">*</span>
            </label>
            <input value={form.question} onChange={(e) => updateField('question', e.target.value)}
              placeholder={t('dashboard.addFaq.questionPlaceholder')} className={fCls('question')} />
            {errors.question && <p className="mt-1 text-xs text-destructive">{errors.question}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addFaq.questionAr')} <span className="text-destructive">*</span>
            </label>
            <input value={form.questionAr} onChange={(e) => updateField('questionAr', e.target.value)}
              placeholder={t('dashboard.addFaq.questionArPlaceholder')} className={fCls('questionAr')} />
            {errors.questionAr && <p className="mt-1 text-xs text-destructive">{errors.questionAr}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addFaq.answer')} <span className="text-destructive">*</span>
            </label>
            <textarea value={form.answer} onChange={(e) => updateField('answer', e.target.value)}
              placeholder={t('dashboard.addFaq.answerPlaceholder')} className={taCls('answer')} rows={4} />
            {errors.answer && <p className="mt-1 text-xs text-destructive">{errors.answer}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addFaq.answerAr')} <span className="text-destructive">*</span>
            </label>
            <textarea value={form.answerAr} onChange={(e) => updateField('answerAr', e.target.value)}
              placeholder={t('dashboard.addFaq.answerArPlaceholder')} className={taCls('answerAr')} rows={4} />
            {errors.answerAr && <p className="mt-1 text-xs text-destructive">{errors.answerAr}</p>}
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
