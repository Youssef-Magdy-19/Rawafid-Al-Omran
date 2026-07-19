import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Upload,
  X,
  Star,
} from 'lucide-react';
import { type Testimonial } from '@data/testimonialsMockData';

export interface TestimonialFormData {
  clientName: string;
  clientPosition: string;
  companyName: string;
  contentAr: string;
  contentEn: string;
  rating: number;
  avatarUrl: string;
  projectName: string;
  featured: boolean;
  isActive: boolean;
}

interface TestimonialsFormProps {
  initialData?: Testimonial;
  onSubmit: (data: TestimonialFormData) => void;
  isSubmitting: boolean;
}

export function TestimonialsForm({ initialData, onSubmit, isSubmitting }: TestimonialsFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<TestimonialFormData>({
    clientName: initialData?.clientName || '',
    clientPosition: initialData?.clientPosition || '',
    companyName: initialData?.companyName || '',
    contentAr: initialData?.contentAr || '',
    contentEn: initialData?.contentEn || '',
    rating: initialData?.rating || 5,
    avatarUrl: initialData?.avatarUrl || '',
    projectName: initialData?.projectName || '',
    featured: initialData?.featured || false,
    isActive: initialData?.isActive ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof TestimonialFormData, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.clientName.trim()) newErrors.clientName = t('dashboard.addTestimonial.validation.clientNameRequired');
    if (!form.contentAr.trim()) newErrors.contentAr = t('dashboard.addTestimonial.validation.contentArRequired');
    if (!form.contentEn.trim()) newErrors.contentEn = t('dashboard.addTestimonial.validation.contentEnRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  const handleAvatarUpload = () => {
    const url = prompt(t('dashboard.addTestimonial.avatarImageDescription') || 'Enter image URL:');
    if (url) updateField('avatarUrl', url);
  };

  const fieldClass = (name: string) =>
    `w-full h-11 px-4 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  const textareaClass = (name: string) =>
    `w-full min-h-[100px] px-4 py-3 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTestimonial.basicInfo')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTestimonial.clientName')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.clientName}
              onChange={(e) => updateField('clientName', e.target.value)}
              placeholder={t('dashboard.addTestimonial.clientNamePlaceholder')}
              className={fieldClass('clientName')}
            />
            {errors.clientName && <p className="mt-1 text-xs text-destructive">{errors.clientName}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTestimonial.clientPosition')}
            </label>
            <input
              value={form.clientPosition}
              onChange={(e) => updateField('clientPosition', e.target.value)}
              placeholder={t('dashboard.addTestimonial.clientPositionPlaceholder')}
              className={fieldClass('clientPosition')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTestimonial.companyName')}
            </label>
            <input
              value={form.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              placeholder={t('dashboard.addTestimonial.companyNamePlaceholder')}
              className={fieldClass('companyName')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTestimonial.projectName')}
            </label>
            <input
              value={form.projectName}
              onChange={(e) => updateField('projectName', e.target.value)}
              placeholder={t('dashboard.addTestimonial.projectNamePlaceholder')}
              className={fieldClass('projectName')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTestimonial.rating')}
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => updateField('rating', r)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                >
                  <Star
                    className={`h-7 w-7 ${
                      r <= form.rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-muted-foreground/30'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField('featured', e.target.checked)}
                className="h-4 w-4 rounded border-input text-amber-500 focus:ring-amber-500"
              />
              <span className="text-sm font-medium text-foreground">{t('dashboard.addTestimonial.featured')}</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => updateField('isActive', e.target.checked)}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-foreground">{t('dashboard.addTestimonial.active')}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTestimonial.bilingualContent')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTestimonial.contentAr')} <span className="text-destructive">*</span>
            </label>
            <textarea
              value={form.contentAr}
              onChange={(e) => updateField('contentAr', e.target.value)}
              placeholder={t('dashboard.addTestimonial.contentArPlaceholder')}
              className={textareaClass('contentAr')}
              rows={4}
            />
            {errors.contentAr && <p className="mt-1 text-xs text-destructive">{errors.contentAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addTestimonial.contentEn')} <span className="text-destructive">*</span>
            </label>
            <textarea
              value={form.contentEn}
              onChange={(e) => updateField('contentEn', e.target.value)}
              placeholder={t('dashboard.addTestimonial.contentEnPlaceholder')}
              className={textareaClass('contentEn')}
              rows={4}
            />
            {errors.contentEn && <p className="mt-1 text-xs text-destructive">{errors.contentEn}</p>}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTestimonial.avatarImage')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addTestimonial.avatarImageDescription')}</p>

        <div className="flex items-center gap-4">
          {form.avatarUrl ? (
            <div className="relative group">
              <img src={form.avatarUrl} alt="Avatar" className="h-20 w-20 rounded-full object-cover border border-border" />
              <button
                type="button"
                onClick={() => updateField('avatarUrl', '')}
                className="absolute top-0 right-0 h-6 w-6 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAvatarUpload}
              className="flex flex-col items-center justify-center h-20 w-20 rounded-full border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Upload className="h-5 w-5 mb-1" />
              <span className="text-[10px] font-medium">{t('dashboard.addTestimonial.uploadImage')}</span>
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          {t('dashboard.addTestimonial.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('dashboard.addTestimonial.saving') : t('dashboard.addTestimonial.save')}
        </button>
      </div>
    </form>
  );
}
