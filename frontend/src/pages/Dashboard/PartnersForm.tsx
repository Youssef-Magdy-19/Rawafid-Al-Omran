import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Upload, X } from 'lucide-react';
import { type Partner } from '@data/partnersMockData';

export interface PartnerFormData {
  name: string;
  logoUrl: string;
  website: string;
  descriptionAr: string;
  descriptionEn: string;
  partnershipType: string;
  since: string;
  isActive: boolean;
}

interface PartnersFormProps {
  initialData?: Partner;
  onSubmit: (data: PartnerFormData) => void;
  isSubmitting: boolean;
}

export function PartnersForm({ initialData, onSubmit, isSubmitting }: PartnersFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<PartnerFormData>({
    name: initialData?.name || '',
    logoUrl: initialData?.logoUrl || '',
    website: initialData?.website || '',
    descriptionAr: initialData?.descriptionAr || '',
    descriptionEn: initialData?.descriptionEn || '',
    partnershipType: initialData?.partnershipType || '',
    since: initialData?.since || '',
    isActive: initialData?.isActive ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof PartnerFormData, value: string | boolean) => {
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
    if (!form.descriptionAr.trim()) newErrors.descriptionAr = t('dashboard.addPartner.validation.descriptionArRequired');
    if (!form.descriptionEn.trim()) newErrors.descriptionEn = t('dashboard.addPartner.validation.descriptionEnRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  const handleLogoUpload = () => {
    const url = prompt(t('dashboard.addPartner.logoImageDescription') || 'Enter image URL:');
    if (url) updateField('logoUrl', url);
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
            <input
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder={t('dashboard.addPartner.partnerNamePlaceholder')}
              className={fieldClass('name')}
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addPartner.partnershipType')}
            </label>
            <input
              value={form.partnershipType}
              onChange={(e) => updateField('partnershipType', e.target.value)}
              placeholder={t('dashboard.addPartner.partnershipTypePlaceholder')}
              className={fieldClass('partnershipType')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addPartner.website')}
            </label>
            <input
              value={form.website}
              onChange={(e) => updateField('website', e.target.value)}
              placeholder={t('dashboard.addPartner.websitePlaceholder')}
              className={fieldClass('website')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addPartner.since')}
            </label>
            <input
              value={form.since}
              onChange={(e) => updateField('since', e.target.value)}
              placeholder={t('dashboard.addPartner.sincePlaceholder')}
              className={fieldClass('since')}
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(e) => updateField('isActive', e.target.checked)}
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium text-foreground">{t('dashboard.addPartner.active')}</span>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addPartner.bilingualDescription')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addPartner.descriptionAr')} <span className="text-destructive">*</span>
            </label>
            <textarea
              value={form.descriptionAr}
              onChange={(e) => updateField('descriptionAr', e.target.value)}
              placeholder={t('dashboard.addPartner.descriptionArPlaceholder')}
              className={textareaClass('descriptionAr')}
              rows={4}
            />
            {errors.descriptionAr && <p className="mt-1 text-xs text-destructive">{errors.descriptionAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addPartner.descriptionEn')} <span className="text-destructive">*</span>
            </label>
            <textarea
              value={form.descriptionEn}
              onChange={(e) => updateField('descriptionEn', e.target.value)}
              placeholder={t('dashboard.addPartner.descriptionEnPlaceholder')}
              className={textareaClass('descriptionEn')}
              rows={4}
            />
            {errors.descriptionEn && <p className="mt-1 text-xs text-destructive">{errors.descriptionEn}</p>}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addPartner.logoImage')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addPartner.logoImageDescription')}</p>

        <div className="flex items-center gap-4">
          {form.logoUrl ? (
            <div className="relative group">
              <img src={form.logoUrl} alt="Logo" className="h-20 w-20 rounded-lg object-cover border border-border" />
              <button
                type="button"
                onClick={() => updateField('logoUrl', '')}
                className="absolute top-0 right-0 h-6 w-6 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleLogoUpload}
              className="flex flex-col items-center justify-center h-20 w-20 rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Upload className="h-5 w-5 mb-1" />
              <span className="text-[10px] font-medium">{t('dashboard.addPartner.uploadImage')}</span>
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
          {t('dashboard.addPartner.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('dashboard.addPartner.saving') : t('dashboard.addPartner.save')}
        </button>
      </div>
    </form>
  );
}
