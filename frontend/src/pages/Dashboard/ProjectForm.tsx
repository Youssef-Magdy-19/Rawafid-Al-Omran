import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  Star,
} from 'lucide-react';
import { ImageUpload, Dropdown, GalleryUpload } from '@components/ui';
import type { Project } from '@services/api/types';
import type { ApiFieldErrors } from '@utils/api';

export interface ProjectFormData {
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  shortDescriptionAr: string;
  shortDescriptionEn: string;
  slug: string;
  category: string;
  categoryAr: string;
  isFeatured: boolean;
  location: string;
  locationAr: string;
  client: string;
  clientAr: string;
  year: number;
  duration: string;
  durationAr: string;
  budget: string;
  budgetAr: string;
  thumbnail: string;
  images: string[];
}

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: Record<string, unknown>) => void;
  isSubmitting: boolean;
  serverErrors?: ApiFieldErrors;
}

export function ProjectForm({ initialData, onSubmit, isSubmitting, serverErrors = {} }: ProjectFormProps) {
  const { t } = useTranslation();

  const [form, setForm] = useState<ProjectFormData>({
    titleAr: initialData?.titleAr || '',
    titleEn: initialData?.title || '',
    descriptionAr: initialData?.descriptionAr || '',
    descriptionEn: initialData?.description || '',
    shortDescriptionAr: initialData?.shortDescriptionAr || '',
    shortDescriptionEn: initialData?.shortDescription || '',
    slug: initialData?.slug || '',
    category: initialData?.category || '',
    categoryAr: initialData?.categoryAr || '',
    isFeatured: initialData?.isFeatured || false,
    location: initialData?.location || '',
    locationAr: initialData?.locationAr || '',
    client: initialData?.client || '',
    clientAr: initialData?.clientAr || '',
    year: initialData?.year || new Date().getFullYear(),
    duration: initialData?.duration || '',
    durationAr: initialData?.durationAr || '',
    budget: initialData?.budget || '',
    budgetAr: initialData?.budgetAr || '',
    thumbnail: initialData?.thumbnail || '',
    images: initialData?.images || [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (Object.keys(serverErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...serverErrors }));
    }
  }, [serverErrors]);

  const updateField = (field: keyof ProjectFormData, value: string | boolean | number | string[]) => {
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
    const slug = form.titleEn
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_]+/g, '-')
      .replace(/^-+|-+$/g, '');
    updateField('slug', slug);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.titleAr.trim()) newErrors.titleAr = t('dashboard.addProject.validation.titleArRequired');
    if (!form.titleEn.trim()) newErrors.titleEn = t('dashboard.addProject.validation.titleEnRequired');
    if (!form.descriptionAr.trim()) newErrors.descriptionAr = t('dashboard.addProject.validation.descriptionArRequired');
    if (!form.descriptionEn.trim()) newErrors.descriptionEn = t('dashboard.addProject.validation.descriptionEnRequired');
    if (!form.slug.trim()) newErrors.slug = t('dashboard.addProject.validation.slugRequired');
    if (!form.category) newErrors.category = t('dashboard.addProject.validation.categoryRequired');
    if (!form.location.trim()) newErrors.location = t('dashboard.addProject.validation.required');
    if (!form.client.trim()) newErrors.client = t('dashboard.addProject.validation.required');
    if (!form.year) newErrors.year = t('dashboard.addProject.validation.required');
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
      description: form.descriptionEn,
      descriptionAr: form.descriptionAr,
      shortDescription: form.shortDescriptionEn || form.descriptionEn.slice(0, 200),
      shortDescriptionAr: form.shortDescriptionAr || form.descriptionAr.slice(0, 200),
      category: form.category,
      categoryAr: form.categoryAr || form.category,
      location: form.location,
      locationAr: form.locationAr || form.location,
      client: form.client,
      clientAr: form.clientAr || form.client,
      year: form.year,
      duration: form.duration,
      durationAr: form.durationAr || form.duration,
      budget: form.budget,
      budgetAr: form.budgetAr || form.budget,
      thumbnail: form.thumbnail,
      images: form.images,
      isFeatured: form.isFeatured,
      isActive: true,
      order: initialData?.order || 0,
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
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addProject.basicInfo')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.titleAr')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.titleAr}
              onChange={(e) => updateField('titleAr', e.target.value)}
              placeholder={t('dashboard.addProject.titleArPlaceholder')}
              className={fieldClass('titleAr')}
            />
            {errors.titleAr && <p className="mt-1 text-xs text-destructive">{errors.titleAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.titleEn')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.titleEn}
              onChange={(e) => updateField('titleEn', e.target.value)}
              placeholder={t('dashboard.addProject.titleEnPlaceholder')}
              className={fieldClass('titleEn')}
            />
            {errors.titleEn && <p className="mt-1 text-xs text-destructive">{errors.titleEn}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.descriptionAr')} <span className="text-destructive">*</span>
            </label>
            <textarea
              value={form.descriptionAr}
              onChange={(e) => updateField('descriptionAr', e.target.value)}
              placeholder={t('dashboard.addProject.descriptionArPlaceholder')}
              className={textareaClass('descriptionAr')}
              rows={4}
            />
            {errors.descriptionAr && <p className="mt-1 text-xs text-destructive">{errors.descriptionAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.descriptionEn')} <span className="text-destructive">*</span>
            </label>
            <textarea
              value={form.descriptionEn}
              onChange={(e) => updateField('descriptionEn', e.target.value)}
              placeholder={t('dashboard.addProject.descriptionEnPlaceholder')}
              className={textareaClass('descriptionEn')}
              rows={4}
            />
            {errors.descriptionEn && <p className="mt-1 text-xs text-destructive">{errors.descriptionEn}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.slug')} <span className="text-destructive">*</span>
            </label>
            <div className="flex gap-2">
              <input
                value={form.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                placeholder={t('dashboard.addProject.slugPlaceholder')}
                className={`${fieldClass('slug')} flex-1`}
              />
              <button
                type="button"
                onClick={autoGenerateSlug}
                className="shrink-0 h-11 px-3 rounded-lg border border-border text-xs text-muted-foreground hover:bg-muted transition-colors"
                title={t('dashboard.addProject.slugAutoGenerate')}
              >
                <Globe className="h-4 w-4" />
              </button>
            </div>
            {errors.slug && <p className="mt-1 text-xs text-destructive">{errors.slug}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Dropdown
                label={t('dashboard.addProject.category')}
                value={form.category}
                onChange={(val) => updateField('category', val)}
                placeholder={t('dashboard.addProject.categoryPlaceholder')}
                options={[
                  { value: 'commercial', label: t('dashboard.home.categoryCommercial') },
                  { value: 'residential', label: t('dashboard.home.categoryResidential') },
                  { value: 'infrastructure', label: t('dashboard.home.categoryInfrastructure') },
                  { value: 'industrial', label: t('dashboard.home.categoryIndustrial') },
                  { value: 'educational', label: t('dashboard.home.categoryEducational') },
                ]}
                className="w-full"
                error={errors.category}
                required
              />
            </div>

            <div className="col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                {t('dashboard.addProject.categoryAr')}
              </label>
              <input
                value={form.categoryAr}
                onChange={(e) => updateField('categoryAr', e.target.value)}
                placeholder={t('dashboard.addProject.categoryArPlaceholder')}
                className={fieldClass('categoryAr')}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => updateField('isFeatured', !form.isFeatured)}
              className={`flex items-center gap-2 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${
                form.isFeatured
                  ? 'border-secondary bg-secondary/10 text-secondary'
                  : 'border-border text-muted-foreground hover:bg-muted'
              }`}
            >
              <Star className={`h-4 w-4 ${form.isFeatured ? 'fill-secondary' : ''}`} />
              {t('dashboard.addProject.featured')}
            </button>
            <span className="text-xs text-muted-foreground">
              {t('dashboard.addProject.featuredDescription')}
            </span>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addProject.projectDetails')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.location')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder={t('dashboard.addProject.locationPlaceholder')}
              className={fieldClass('location')}
            />
            {errors.location && <p className="mt-1 text-xs text-destructive">{errors.location}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.locationAr')}
            </label>
            <input
              value={form.locationAr}
              onChange={(e) => updateField('locationAr', e.target.value)}
              placeholder={t('dashboard.addProject.locationArPlaceholder')}
              className={fieldClass('locationAr')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.client')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.client}
              onChange={(e) => updateField('client', e.target.value)}
              placeholder={t('dashboard.addProject.clientPlaceholder')}
              className={fieldClass('client')}
            />
            {errors.client && <p className="mt-1 text-xs text-destructive">{errors.client}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.clientAr')}
            </label>
            <input
              value={form.clientAr}
              onChange={(e) => updateField('clientAr', e.target.value)}
              placeholder={t('dashboard.addProject.clientArPlaceholder')}
              className={fieldClass('clientAr')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.year')} <span className="text-destructive">*</span>
            </label>
            <input
              type="number"
              value={form.year}
              onChange={(e) => updateField('year', parseInt(e.target.value) || new Date().getFullYear())}
              className={fieldClass('year')}
            />
            {errors.year && <p className="mt-1 text-xs text-destructive">{errors.year}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.duration')}
            </label>
            <input
              value={form.duration}
              onChange={(e) => updateField('duration', e.target.value)}
              placeholder={t('dashboard.addProject.durationPlaceholder')}
              className={fieldClass('duration')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addProject.budget')}
            </label>
            <input
              value={form.budget}
              onChange={(e) => updateField('budget', e.target.value)}
              placeholder={t('dashboard.addProject.budgetPlaceholder')}
              className={fieldClass('budget')}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addProject.coverImage')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addProject.coverImageDescription')}</p>

        <ImageUpload
          value={form.thumbnail}
          onChange={(url) => updateField('thumbnail', url)}
          label={t('dashboard.addProject.coverImage')}
        />
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addProject.galleryImages')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addProject.galleryImagesDescription')}</p>

        <GalleryUpload
          value={form.images}
          onChange={(urls) => updateField('images', urls)}
        />
      </div>

      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => window.history.back()}
          className="h-11 px-6 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
        >
          {t('dashboard.addProject.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('dashboard.addProject.saving') : t('dashboard.addProject.save')}
        </button>
      </div>
    </form>
  );
}
