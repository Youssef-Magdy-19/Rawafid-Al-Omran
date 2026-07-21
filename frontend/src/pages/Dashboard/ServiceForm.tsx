import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Star, Power } from 'lucide-react';
import { ImageUpload, Dropdown } from '@components/ui';
import type { Service } from '@services/api/types';
import type { ApiFieldErrors } from '@utils/api';

export interface ServiceFormData {
  titleAr: string;
  titleEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  fullDescriptionAr: string;
  fullDescriptionEn: string;
  slug: string;
  icon: string;
  order: number;
  isFeatured: boolean;
  isActive: boolean;
  image: string;
}

interface ServiceFormProps {
  initialData?: Service;
  onSubmit: (data: Record<string, unknown>) => void;
  isSubmitting: boolean;
  serverErrors?: ApiFieldErrors;
}

export function ServiceForm({ initialData, onSubmit, isSubmitting, serverErrors = {} }: ServiceFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<ServiceFormData>({
    titleAr: initialData?.titleAr || '',
    titleEn: initialData?.title || '',
    shortDescriptionAr: initialData?.shortDescriptionAr || '',
    shortDescriptionEn: initialData?.shortDescription || '',
    fullDescriptionAr: initialData?.descriptionAr || '',
    fullDescriptionEn: initialData?.description || '',
    slug: initialData?.slug || '',
    icon: initialData?.icon || 'HardHat',
    order: initialData?.order || 0,
    isFeatured: initialData?.isFeatured || false,
    isActive: initialData?.isActive ?? true,
    image: initialData?.image || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (Object.keys(serverErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...serverErrors }));
    }
  }, [serverErrors]);

  const updateField = (field: keyof ServiceFormData, value: string | boolean | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const autoGenerateSlug = () => {
    const slug = form.titleEn.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/^-+|-+$/g, '');
    updateField('slug', slug);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.titleAr.trim()) newErrors.titleAr = t('dashboard.addService.validation.titleArRequired');
    if (!form.titleEn.trim()) newErrors.titleEn = t('dashboard.addService.validation.titleEnRequired');
    if (!form.fullDescriptionAr.trim()) newErrors.fullDescriptionAr = t('dashboard.addService.validation.descriptionArRequired');
    if (!form.fullDescriptionEn.trim()) newErrors.fullDescriptionEn = t('dashboard.addService.validation.descriptionEnRequired');
    if (!form.slug.trim()) newErrors.slug = t('dashboard.addService.validation.slugRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload: Record<string, unknown> = {
      title: form.titleEn,
      titleAr: form.titleAr,
      slug: form.slug,
      description: form.fullDescriptionEn,
      descriptionAr: form.fullDescriptionAr,
      shortDescription: form.shortDescriptionEn || form.fullDescriptionEn.slice(0, 200),
      shortDescriptionAr: form.shortDescriptionAr || form.fullDescriptionAr.slice(0, 200),
      icon: form.icon,
      image: form.image || '',
      order: form.order,
      isActive: form.isActive,
      isFeatured: form.isFeatured,
    };

    onSubmit(payload);
  };

  const fieldClass = (name: string) =>
    `w-full h-11 px-4 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  const textareaClass = (name: string) =>
    `w-full min-h-[120px] px-4 py-3 rounded-lg border text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y ${
      errors[name] ? 'border-destructive focus:ring-destructive' : 'border-input'
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addService.basicInfo')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addService.titleAr')} <span className="text-destructive">*</span></label>
            <input value={form.titleAr} onChange={(e) => updateField('titleAr', e.target.value)} placeholder={t('dashboard.addService.titleArPlaceholder')} className={fieldClass('titleAr')} />
            {errors.titleAr && <p className="mt-1 text-xs text-destructive">{errors.titleAr}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addService.titleEn')} <span className="text-destructive">*</span></label>
            <input value={form.titleEn} onChange={(e) => updateField('titleEn', e.target.value)} placeholder={t('dashboard.addService.titleEnPlaceholder')} className={fieldClass('titleEn')} />
            {errors.titleEn && <p className="mt-1 text-xs text-destructive">{errors.titleEn}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addService.descriptionAr')} <span className="text-destructive">*</span></label>
            <textarea value={form.fullDescriptionAr} onChange={(e) => updateField('fullDescriptionAr', e.target.value)} placeholder={t('dashboard.addService.descriptionArPlaceholder')} className={textareaClass('fullDescriptionAr')} rows={4} />
            {errors.fullDescriptionAr && <p className="mt-1 text-xs text-destructive">{errors.fullDescriptionAr}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addService.descriptionEn')} <span className="text-destructive">*</span></label>
            <textarea value={form.fullDescriptionEn} onChange={(e) => updateField('fullDescriptionEn', e.target.value)} placeholder={t('dashboard.addService.descriptionEnPlaceholder')} className={textareaClass('fullDescriptionEn')} rows={4} />
            {errors.fullDescriptionEn && <p className="mt-1 text-xs text-destructive">{errors.fullDescriptionEn}</p>}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addService.shortDescriptionAr')}</label>
            <textarea value={form.shortDescriptionAr} onChange={(e) => updateField('shortDescriptionAr', e.target.value)} placeholder={t('dashboard.addService.shortDescriptionArPlaceholder')} className="w-full h-20 px-4 py-3 rounded-lg border border-input text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y" rows={2} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addService.shortDescriptionEn')}</label>
            <textarea value={form.shortDescriptionEn} onChange={(e) => updateField('shortDescriptionEn', e.target.value)} placeholder={t('dashboard.addService.shortDescriptionEnPlaceholder')} className="w-full h-20 px-4 py-3 rounded-lg border border-input text-sm text-foreground bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors resize-y" rows={2} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addService.slug')} <span className="text-destructive">*</span></label>
            <div className="flex gap-2">
              <input value={form.slug} onChange={(e) => updateField('slug', e.target.value)} placeholder={t('dashboard.addService.slugPlaceholder')} className={`${fieldClass('slug')} flex-1`} />
              <button type="button" onClick={autoGenerateSlug} className="shrink-0 h-11 px-3 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted transition-colors" title={t('dashboard.addService.slugAutoGenerate')}>
                <Globe className="h-4 w-4" />
              </button>
            </div>
            {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addService.order')}</label>
              <input type="number" value={form.order} onChange={(e) => updateField('order', parseInt(e.target.value) || 0)} className={fieldClass('order')} />
            </div>
            <div>
              <Dropdown
                label={t('dashboard.addService.icon')}
                value={form.icon}
                onChange={(val) => updateField('icon', val)}
                options={[
                  { value: 'HardHat', label: t('dashboard.addService.iconOptions.hardHat') },
                  { value: 'Ruler', label: t('dashboard.addService.iconOptions.ruler') },
                  { value: 'Truck', label: t('dashboard.addService.iconOptions.truck') },
                  { value: 'Wrench', label: t('dashboard.addService.iconOptions.wrench') },
                  { value: 'Building2', label: t('dashboard.addService.iconOptions.building') },
                  { value: 'PencilRuler', label: t('dashboard.addService.iconOptions.pencilRuler') },
                  { value: 'Drill', label: t('dashboard.addService.iconOptions.drill') },
                  { value: 'PaintBucket', label: t('dashboard.addService.iconOptions.paintBucket') },
                  { value: 'Shovel', label: t('dashboard.addService.iconOptions.shovel') },
                  { value: 'Construction', label: t('dashboard.addService.iconOptions.construction') },
                ]}
                className="w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button type="button" onClick={() => updateField('isFeatured', !form.isFeatured)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${form.isFeatured ? 'border-secondary bg-secondary/10 text-secondary' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <Star className={`h-4 w-4 ${form.isFeatured ? 'fill-secondary' : ''}`} />
              {t('dashboard.addService.featured')}
            </button>
            <button type="button" onClick={() => updateField('isActive', !form.isActive)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${form.isActive ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600' : 'border-border text-muted-foreground hover:bg-muted'}`}>
              <Power className={`h-4 w-4 ${form.isActive ? '' : ''}`} />
              {form.isActive ? t('dashboard.addService.active') : t('dashboard.addService.inactive')}
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addService.image')}</h3>
        <ImageUpload
          value={form.image}
          onChange={(url) => updateField('image', url)}
          label={t('dashboard.addService.image')}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
          {t('dashboard.addService.cancel')}
        </button>
        <button type="submit" disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? t('dashboard.addService.saving') : t('dashboard.addService.save')}
        </button>
      </div>
    </form>
  );
}
