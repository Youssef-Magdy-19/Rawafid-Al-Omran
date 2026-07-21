import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageUpload } from '@components/ui';
import type { ApiFieldErrors } from '@utils/api';

export interface PartnerFormData {
  name: string;
  nameAr: string;
  logo: string;
  website: string;
  description: string;
  category: string;
  categoryAr: string;
  order: number;
  isActive: boolean;
}

interface PartnersFormProps {
  initialData?: PartnerFormData;
  onSubmit: (data: PartnerFormData) => void;
  isSubmitting: boolean;
  serverErrors?: ApiFieldErrors;
}

export function PartnersForm({ initialData, onSubmit, isSubmitting, serverErrors = {} }: PartnersFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<PartnerFormData>({
    name: initialData?.name || '',
    nameAr: initialData?.nameAr || '',
    logo: initialData?.logo || '',
    website: initialData?.website || '',
    description: initialData?.description || '',
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

  const updateField = (field: keyof PartnerFormData, value: string | number | boolean) => {
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
    if (!form.name.trim()) newErrors.name = t('dashboard.addPartner.validation.nameRequired');
    if (!form.nameAr.trim()) newErrors.nameAr = t('dashboard.addPartner.validation.nameArRequired');
    if (!form.category.trim()) newErrors.category = t('dashboard.addPartner.validation.categoryRequired');
    if (!form.categoryAr.trim()) newErrors.categoryAr = t('dashboard.addPartner.validation.categoryArRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
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
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addPartner.basicInfo')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addPartner.partnerName')} <span className="text-destructive">*</span>
            </label>
            <input value={form.name} onChange={(e) => updateField('name', e.target.value)}
              placeholder={t('dashboard.addPartner.partnerNamePlaceholder')} className={fieldClass('name')} />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addPartner.partnerNameAr')} <span className="text-destructive">*</span>
            </label>
            <input value={form.nameAr} onChange={(e) => updateField('nameAr', e.target.value)}
              placeholder={t('dashboard.addPartner.partnerNameArPlaceholder')} className={fieldClass('nameAr')} />
            {errors.nameAr && <p className="mt-1 text-xs text-destructive">{errors.nameAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addPartner.website')}</label>
            <input value={form.website} onChange={(e) => updateField('website', e.target.value)}
              placeholder={t('dashboard.addPartner.websitePlaceholder')} className={fieldClass('website')} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addPartner.category')} <span className="text-destructive">*</span>
            </label>
            <input value={form.category} onChange={(e) => updateField('category', e.target.value)}
              placeholder={t('dashboard.addPartner.categoryPlaceholder')} className={fieldClass('category')} />
            {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addPartner.categoryAr')} <span className="text-destructive">*</span>
            </label>
            <input value={form.categoryAr} onChange={(e) => updateField('categoryAr', e.target.value)}
              placeholder={t('dashboard.addPartner.categoryArPlaceholder')} className={fieldClass('categoryAr')} />
            {errors.categoryAr && <p className="mt-1 text-xs text-destructive">{errors.categoryAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addPartner.order')}</label>
            <input type="number" value={form.order} onChange={(e) => updateField('order', Number(e.target.value))}
              placeholder={t('dashboard.addPartner.orderPlaceholder')} className={fieldClass('order')} min={0} />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={form.isActive}
                onChange={(e) => updateField('isActive', e.target.checked)}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary" />
              <span className="text-sm font-medium text-foreground">{t('dashboard.addPartner.active')}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addPartner.bilingualDescription')}</h3>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">{t('dashboard.addPartner.description')}</label>
          <textarea value={form.description} onChange={(e) => updateField('description', e.target.value)}
            placeholder={t('dashboard.addPartner.descriptionPlaceholder')} className={textareaClass('description')} rows={4} />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addPartner.logoImage')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addPartner.logoImageDescription')}</p>

        <ImageUpload
          value={form.logo}
          onChange={(url) => updateField('logo', url)}
          label={t('dashboard.addPartner.logoImage')}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <button type="button" onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors">
          {t('dashboard.addPartner.cancel')}
        </button>
        <button type="submit" disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
          {isSubmitting ? t('dashboard.addPartner.saving') : t('dashboard.addPartner.save')}
        </button>
      </div>
    </form>
  );
}
