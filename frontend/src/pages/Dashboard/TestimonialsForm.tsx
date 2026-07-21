import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Power } from 'lucide-react';
import { ImageUpload } from '@components/ui';
import type { Testimonial } from '@services/api/types';
import type { ApiFieldErrors } from '@utils/api';

export interface TestimonialFormData {
  clientName: string;
  clientNameAr: string;
  clientPosition: string;
  clientRoleAr: string;
  companyName: string;
  companyNameAr: string;
  content: string;
  contentAr: string;
  rating: number;
  image: string;
  thumbnail: string;
  isActive: boolean;
}

interface TestimonialsFormProps {
  initialData?: Testimonial;
  onSubmit: (data: Record<string, unknown>) => void;
  isSubmitting: boolean;
  serverErrors?: ApiFieldErrors;
}

export function TestimonialsForm({ initialData, onSubmit, isSubmitting, serverErrors = {} }: TestimonialsFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<TestimonialFormData>({
    clientName: initialData?.name || '',
    clientNameAr: initialData?.nameAr || '',
    clientPosition: initialData?.position || '',
    clientRoleAr: initialData?.roleAr || '',
    companyName: initialData?.company || '',
    companyNameAr: initialData?.companyAr || '',
    content: initialData?.content || '',
    contentAr: initialData?.contentAr || '',
    rating: initialData?.rating || 5,
    image: initialData?.image || '',
    thumbnail: initialData?.thumbnail || '',
    isActive: initialData?.isActive ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (Object.keys(serverErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...serverErrors }));
    }
  }, [serverErrors]);

  const updateField = (field: keyof TestimonialFormData, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.clientName.trim()) newErrors.clientName = t('dashboard.addTestimonial.validation.clientNameRequired');
    if (!form.clientNameAr.trim()) newErrors.clientNameAr = t('dashboard.addTestimonial.validation.clientNameArRequired');
    if (!form.clientRoleAr.trim()) newErrors.clientRoleAr = t('dashboard.addTestimonial.validation.clientRoleArRequired');
    if (!form.companyNameAr.trim()) newErrors.companyNameAr = t('dashboard.addTestimonial.validation.companyNameArRequired');
    if (!form.content.trim()) newErrors.content = t('dashboard.addTestimonial.validation.contentRequired');
    if (!form.contentAr.trim()) newErrors.contentAr = t('dashboard.addTestimonial.validation.contentArRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: Record<string, unknown> = {
      name: form.clientName,
      nameAr: form.clientNameAr,
      role: form.clientPosition,
      roleAr: form.clientRoleAr,
      company: form.companyName,
      companyAr: form.companyNameAr,
      content: form.content,
      contentAr: form.contentAr,
      rating: form.rating,
      image: form.image || '',
      thumbnail: form.thumbnail,
      isActive: form.isActive,
    };

    onSubmit(payload);
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
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTestimonial.clientName')} <span className="text-destructive">*</span></label>
            <input value={form.clientName} onChange={(e) => updateField('clientName', e.target.value)} placeholder={t('dashboard.addTestimonial.clientNamePlaceholder')} className={fieldClass('clientName')} />
            {errors.clientName && <p className="mt-1 text-xs text-destructive">{errors.clientName}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTestimonial.clientNameAr')} <span className="text-destructive">*</span></label>
            <input value={form.clientNameAr} onChange={(e) => updateField('clientNameAr', e.target.value)} placeholder={t('dashboard.addTestimonial.clientNameArPlaceholder')} className={fieldClass('clientNameAr')} />
            {errors.clientNameAr && <p className="mt-1 text-xs text-destructive">{errors.clientNameAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTestimonial.clientPosition')}</label>
            <input value={form.clientPosition} onChange={(e) => updateField('clientPosition', e.target.value)} placeholder={t('dashboard.addTestimonial.clientPositionPlaceholder')} className={fieldClass('clientPosition')} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTestimonial.clientRoleAr')} <span className="text-destructive">*</span></label>
            <input value={form.clientRoleAr} onChange={(e) => updateField('clientRoleAr', e.target.value)} placeholder={t('dashboard.addTestimonial.clientRoleArPlaceholder')} className={fieldClass('clientRoleAr')} />
            {errors.clientRoleAr && <p className="mt-1 text-xs text-destructive">{errors.clientRoleAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTestimonial.companyName')}</label>
            <input value={form.companyName} onChange={(e) => updateField('companyName', e.target.value)} placeholder={t('dashboard.addTestimonial.companyNamePlaceholder')} className={fieldClass('companyName')} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTestimonial.companyNameAr')} <span className="text-destructive">*</span></label>
            <input value={form.companyNameAr} onChange={(e) => updateField('companyNameAr', e.target.value)} placeholder={t('dashboard.addTestimonial.companyNameArPlaceholder')} className={fieldClass('companyNameAr')} />
            {errors.companyNameAr && <p className="mt-1 text-xs text-destructive">{errors.companyNameAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTestimonial.rating')}</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((r) => (
                <button key={r} type="button" onClick={() => updateField('rating', r)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors">
                  <Star className={`h-7 w-7 ${r <= form.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button type="button" onClick={() => updateField('isActive', !form.isActive)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${form.isActive ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <Power className="h-4 w-4" />
              {form.isActive ? t('dashboard.addTestimonial.active') : t('dashboard.addTestimonial.inactive')}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTestimonial.content')}</h3>
        <div>
          <textarea value={form.content} onChange={(e) => updateField('content', e.target.value)}
            placeholder={t('dashboard.addTestimonial.contentPlaceholder')}
            className={textareaClass('content')} rows={4} />
          {errors.content && <p className="mt-1 text-xs text-destructive">{errors.content}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addTestimonial.contentAr')} <span className="text-destructive">*</span></label>
          <textarea value={form.contentAr} onChange={(e) => updateField('contentAr', e.target.value)}
            placeholder={t('dashboard.addTestimonial.contentArPlaceholder')}
            className={textareaClass('contentAr')} rows={4} />
          {errors.contentAr && <p className="mt-1 text-xs text-destructive">{errors.contentAr}</p>}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTestimonial.avatarImage')}</h3>
        <ImageUpload
          value={form.image}
          onChange={(url) => updateField('image', url)}
          label={t('dashboard.addTestimonial.avatarImage')}
        />
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addTestimonial.thumbnailImage')}</h3>
        <ImageUpload
          value={form.thumbnail}
          onChange={(url) => updateField('thumbnail', url)}
          label={t('dashboard.addTestimonial.thumbnailImage')}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
          {t('dashboard.addTestimonial.cancel')}
        </button>
        <button type="submit" disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? t('dashboard.addTestimonial.saving') : t('dashboard.addTestimonial.save')}
        </button>
      </div>
    </form>
  );
}
