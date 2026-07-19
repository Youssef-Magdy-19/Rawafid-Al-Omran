import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Upload,
  X,
  ImagePlus,
  Globe,
  Star,
  Power,
} from 'lucide-react';
import { type DashboardService } from '@data/servicesMockData';

export interface ServiceFormData {
  nameAr: string;
  nameEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  fullDescriptionAr: string;
  fullDescriptionEn: string;
  slug: string;
  category: string;
  displayOrder: number;
  featured: boolean;
  active: boolean;
  icon: string;
  coverImage: string;
  galleryImages: string[];
  seoTitleAr: string;
  seoTitleEn: string;
  seoDescriptionAr: string;
  seoDescriptionEn: string;
  seoKeywords: string;
}

interface ServiceFormProps {
  initialData?: DashboardService;
  onSubmit: (data: ServiceFormData) => void;
  isSubmitting: boolean;
}

export function ServiceForm({ initialData, onSubmit, isSubmitting }: ServiceFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<ServiceFormData>({
    nameAr: initialData?.nameAr || '',
    nameEn: initialData?.nameEn || '',
    shortDescriptionAr: initialData?.shortDescriptionAr || '',
    shortDescriptionEn: initialData?.shortDescriptionEn || '',
    fullDescriptionAr: initialData?.fullDescriptionAr || '',
    fullDescriptionEn: initialData?.fullDescriptionEn || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    displayOrder: initialData?.displayOrder || 0,
    featured: initialData?.featured || false,
    active: initialData?.active ?? true,
    icon: initialData?.icon || 'HardHat',
    coverImage: initialData?.coverImage || '',
    galleryImages: initialData?.galleryImages || [],
    seoTitleAr: initialData?.seo?.titleAr || '',
    seoTitleEn: initialData?.seo?.titleEn || '',
    seoDescriptionAr: initialData?.seo?.descriptionAr || '',
    seoDescriptionEn: initialData?.seo?.descriptionEn || '',
    seoKeywords: initialData?.seo?.keywords || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof ServiceFormData, value: string | boolean | number | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const autoGenerateSlug = () => {
    const slug = form.nameEn
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    updateField('slug', slug);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.nameAr.trim()) newErrors.nameAr = t('dashboard.addService.validation.nameArRequired');
    if (!form.nameEn.trim()) newErrors.nameEn = t('dashboard.addService.validation.nameEnRequired');
    if (!form.shortDescriptionAr.trim()) newErrors.shortDescriptionAr = t('dashboard.addService.validation.shortDescriptionArRequired');
    if (!form.shortDescriptionEn.trim()) newErrors.shortDescriptionEn = t('dashboard.addService.validation.shortDescriptionEnRequired');
    if (!form.slug.trim()) newErrors.slug = t('dashboard.addService.validation.slugRequired');
    if (!form.category) newErrors.category = t('dashboard.addService.validation.categoryRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  const handleCoverUpload = () => {
    const url = prompt(t('dashboard.addService.coverImageDescription') || 'Enter image URL:');
    if (url) updateField('coverImage', url);
  };

  const handleGalleryUpload = () => {
    const url = prompt('Enter image URL for gallery:');
    if (url) updateField('galleryImages', [...form.galleryImages, url]);
  };

  const removeGalleryImage = (index: number) => {
    updateField('galleryImages', form.galleryImages.filter((_, i) => i !== index));
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
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addService.basicInfo')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.nameAr')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.nameAr}
              onChange={(e) => updateField('nameAr', e.target.value)}
              placeholder={t('dashboard.addService.nameArPlaceholder')}
              className={fieldClass('nameAr')}
            />
            {errors.nameAr && <p className="mt-1 text-xs text-destructive">{errors.nameAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.nameEn')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.nameEn}
              onChange={(e) => updateField('nameEn', e.target.value)}
              placeholder={t('dashboard.addService.nameEnPlaceholder')}
              className={fieldClass('nameEn')}
            />
            {errors.nameEn && <p className="mt-1 text-xs text-destructive">{errors.nameEn}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.shortDescriptionAr')} <span className="text-destructive">*</span>
            </label>
            <textarea
              value={form.shortDescriptionAr}
              onChange={(e) => updateField('shortDescriptionAr', e.target.value)}
              placeholder={t('dashboard.addService.shortDescriptionArPlaceholder')}
              className={textareaClass('shortDescriptionAr')}
              rows={3}
            />
            {errors.shortDescriptionAr && <p className="mt-1 text-xs text-destructive">{errors.shortDescriptionAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.shortDescriptionEn')} <span className="text-destructive">*</span>
            </label>
            <textarea
              value={form.shortDescriptionEn}
              onChange={(e) => updateField('shortDescriptionEn', e.target.value)}
              placeholder={t('dashboard.addService.shortDescriptionEnPlaceholder')}
              className={textareaClass('shortDescriptionEn')}
              rows={3}
            />
            {errors.shortDescriptionEn && <p className="mt-1 text-xs text-destructive">{errors.shortDescriptionEn}</p>}
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.fullDescriptionAr')}
            </label>
            <textarea
              value={form.fullDescriptionAr}
              onChange={(e) => updateField('fullDescriptionAr', e.target.value)}
              placeholder={t('dashboard.addService.fullDescriptionArPlaceholder')}
              className={textareaClass('fullDescriptionAr')}
              rows={4}
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.fullDescriptionEn')}
            </label>
            <textarea
              value={form.fullDescriptionEn}
              onChange={(e) => updateField('fullDescriptionEn', e.target.value)}
              placeholder={t('dashboard.addService.fullDescriptionEnPlaceholder')}
              className={textareaClass('fullDescriptionEn')}
              rows={4}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.slug')} <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2">
              <input
                value={form.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                placeholder={t('dashboard.addService.slugPlaceholder')}
                className={`${fieldClass('slug')} flex-1`}
              />
              <button
                type="button"
                onClick={autoGenerateSlug}
                className="shrink-0 h-11 px-3 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted transition-colors"
                title={t('dashboard.addService.slugAutoGenerate')}
              >
                <Globe className="h-4 w-4" />
              </button>
            </div>
            {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('dashboard.addService.category')} <span className="text-destructive">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => updateField('category', e.target.value)}
                className={fieldClass('category')}
              >
                <option value="">{t('dashboard.addService.categoryPlaceholder')}</option>
                <option value="construction">Construction</option>
                <option value="engineering">Engineering</option>
                <option value="infrastructure">Infrastructure</option>
                <option value="maintenance">Maintenance</option>
                <option value="consulting">Consulting</option>
              </select>
              {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('dashboard.addService.displayOrder')}
              </label>
              <input
                type="number"
                value={form.displayOrder}
                onChange={(e) => updateField('displayOrder', parseInt(e.target.value) || 0)}
                placeholder={t('dashboard.addService.displayOrderPlaceholder')}
                className={fieldClass('displayOrder')}
                min={0}
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => updateField('featured', !form.featured)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${
                form.featured
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              <Star className={`h-4 w-4 ${form.featured ? 'fill-secondary' : ''}`} />
              {t('dashboard.addService.featured')}
            </button>
            <span className="text-xs text-muted-foreground">{t('dashboard.addService.featuredDescription')}</span>

            <div className="h-6 w-px bg-border" />

            <button
              type="button"
              onClick={() => updateField('active', !form.active)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${
                form.active
                  ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              <Power className={`h-4 w-4 ${form.active ? 'fill-emerald-500' : ''}`} />
              {t('dashboard.addService.active')}
            </button>
            <span className="text-xs text-muted-foreground">{t('dashboard.addService.activeDescription')}</span>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.icon')}
            </label>
            <select
              value={form.icon}
              onChange={(e) => updateField('icon', e.target.value)}
              className={fieldClass('icon')}
            >
              <option value="HardHat">Hard Hat</option>
              <option value="Ruler">Ruler</option>
              <option value="Truck">Truck</option>
              <option value="Wrench">Wrench</option>
              <option value="Building2">Building</option>
              <option value="PencilRuler">Design</option>
              <option value="Drill">Drill</option>
              <option value="PaintBucket">Paint</option>
              <option value="Shovel">Shovel</option>
            </select>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addService.coverImage')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addService.coverImageDescription')}</p>

        <div className="flex items-center gap-4">
          {form.coverImage ? (
            <div className="relative group">
              <img src={form.coverImage} alt="Cover" className="h-32 w-48 rounded-lg object-cover border border-border" />
              <button
                type="button"
                onClick={() => updateField('coverImage', '')}
                className="absolute top-2 right-2 h-7 w-7 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCoverUpload}
              className="flex flex-col items-center justify-center h-32 w-48 rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
            >
              <Upload className="h-6 w-6 mb-1" />
              <span className="text-xs font-medium">{t('dashboard.addService.uploadImage')}</span>
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addService.galleryImages')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addService.galleryImagesDescription')}</p>

        <div className="flex flex-wrap gap-3">
          {form.galleryImages.map((img, i) => (
            <div key={i} className="relative group">
              <img src={img} alt={`Gallery ${i + 1}`} className="h-24 w-24 rounded-lg object-cover border border-border" />
              <button
                type="button"
                onClick={() => removeGalleryImage(i)}
                className="absolute top-1 right-1 h-6 w-6 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleGalleryUpload}
            className="flex flex-col items-center justify-center h-24 w-24 rounded-lg border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            <ImagePlus className="h-5 w-5 mb-1" />
            <span className="text-[10px] font-medium">{t('dashboard.addService.addImages')}</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addService.seoSection')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.seoTitleAr')}
            </label>
            <input
              value={form.seoTitleAr}
              onChange={(e) => updateField('seoTitleAr', e.target.value)}
              placeholder={t('dashboard.addService.seoTitleArPlaceholder')}
              className={fieldClass('seoTitleAr')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.seoTitleEn')}
            </label>
            <input
              value={form.seoTitleEn}
              onChange={(e) => updateField('seoTitleEn', e.target.value)}
              placeholder={t('dashboard.addService.seoTitleEnPlaceholder')}
              className={fieldClass('seoTitleEn')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.seoDescriptionAr')}
            </label>
            <textarea
              value={form.seoDescriptionAr}
              onChange={(e) => updateField('seoDescriptionAr', e.target.value)}
              placeholder={t('dashboard.addService.seoDescriptionArPlaceholder')}
              className={textareaClass('seoDescriptionAr')}
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.seoDescriptionEn')}
            </label>
            <textarea
              value={form.seoDescriptionEn}
              onChange={(e) => updateField('seoDescriptionEn', e.target.value)}
              placeholder={t('dashboard.addService.seoDescriptionEnPlaceholder')}
              className={textareaClass('seoDescriptionEn')}
              rows={3}
            />
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addService.seoKeywords')}
            </label>
            <input
              value={form.seoKeywords}
              onChange={(e) => updateField('seoKeywords', e.target.value)}
              placeholder={t('dashboard.addService.seoKeywordsPlaceholder')}
              className={fieldClass('seoKeywords')}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          {t('dashboard.addService.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('dashboard.addService.saving') : t('dashboard.addService.save')}
        </button>
      </div>
    </form>
  );
}
