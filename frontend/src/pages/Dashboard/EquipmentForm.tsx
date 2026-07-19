import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Upload,
  X,
  ImagePlus,
  CheckCircle2,
  AlertTriangle,
  Ban,
} from 'lucide-react';
import { type EquipmentItem, equipmentCategoryLabels, operatingStatusLabels, projectOptions } from '@data/equipmentMockData';

export interface EquipmentFormData {
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  purchaseDate: string;
  purchaseCost: number;
  currentValue: number;
  warrantyExpiration: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  operatingStatus: string;
  assignedProject: string;
  location: string;
  notes: string;
  coverImage: string;
  galleryImages: string[];
  seoTitleAr: string;
  seoTitleEn: string;
  seoDescriptionAr: string;
  seoDescriptionEn: string;
  seoKeywords: string;
}

interface EquipmentFormProps {
  initialData?: EquipmentItem;
  onSubmit: (data: EquipmentFormData) => void;
  isSubmitting: boolean;
}

export function EquipmentForm({ initialData, onSubmit, isSubmitting }: EquipmentFormProps) {
  const { t, i18n } = useTranslation();

  const [form, setForm] = useState<EquipmentFormData>({
    nameAr: initialData?.nameAr || '',
    nameEn: initialData?.nameEn || '',
    descriptionAr: initialData?.descriptionAr || '',
    descriptionEn: initialData?.descriptionEn || '',
    category: initialData?.category || '',
    manufacturer: initialData?.manufacturer || '',
    model: initialData?.model || '',
    serialNumber: initialData?.serialNumber || '',
    purchaseDate: initialData?.purchaseDate || '',
    purchaseCost: initialData?.purchaseCost || 0,
    currentValue: initialData?.currentValue || 0,
    warrantyExpiration: initialData?.warrantyExpiration || '',
    lastMaintenanceDate: initialData?.lastMaintenanceDate || '',
    nextMaintenanceDate: initialData?.nextMaintenanceDate || '',
    operatingStatus: initialData?.operatingStatus || 'operational',
    assignedProject: initialData?.assignedProject || '',
    location: initialData?.location || '',
    notes: initialData?.notes || '',
    coverImage: initialData?.coverImage || '',
    galleryImages: initialData?.galleryImages || [],
    seoTitleAr: initialData?.seo?.titleAr || '',
    seoTitleEn: initialData?.seo?.titleEn || '',
    seoDescriptionAr: initialData?.seo?.descriptionAr || '',
    seoDescriptionEn: initialData?.seo?.descriptionEn || '',
    seoKeywords: initialData?.seo?.keywords || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateField = (field: keyof EquipmentFormData, value: string | boolean | number | string[]) => {
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
    if (!form.nameAr.trim()) newErrors.nameAr = t('dashboard.addEquipment.validation.nameArRequired');
    if (!form.nameEn.trim()) newErrors.nameEn = t('dashboard.addEquipment.validation.nameEnRequired');
    if (!form.serialNumber.trim()) newErrors.serialNumber = t('dashboard.addEquipment.validation.serialNumberRequired');
    if (!form.category) newErrors.category = t('dashboard.addEquipment.validation.categoryRequired');
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
    const url = prompt(t('dashboard.addEquipment.coverImageDescription') || 'Enter image URL:');
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

  const categoryOptions = Object.entries(equipmentCategoryLabels);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addEquipment.basicInfo')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.nameAr')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.nameAr}
              onChange={(e) => updateField('nameAr', e.target.value)}
              placeholder={t('dashboard.addEquipment.nameArPlaceholder')}
              className={fieldClass('nameAr')}
            />
            {errors.nameAr && <p className="mt-1 text-xs text-destructive">{errors.nameAr}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.nameEn')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.nameEn}
              onChange={(e) => updateField('nameEn', e.target.value)}
              placeholder={t('dashboard.addEquipment.nameEnPlaceholder')}
              className={fieldClass('nameEn')}
            />
            {errors.nameEn && <p className="mt-1 text-xs text-destructive">{errors.nameEn}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.descriptionAr')}
            </label>
            <textarea
              value={form.descriptionAr}
              onChange={(e) => updateField('descriptionAr', e.target.value)}
              placeholder={t('dashboard.addEquipment.descriptionArPlaceholder')}
              className={textareaClass('descriptionAr')}
              rows={3}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.descriptionEn')}
            </label>
            <textarea
              value={form.descriptionEn}
              onChange={(e) => updateField('descriptionEn', e.target.value)}
              placeholder={t('dashboard.addEquipment.descriptionEnPlaceholder')}
              className={textareaClass('descriptionEn')}
              rows={3}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.category')} <span className="text-destructive">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
              className={fieldClass('category')}
            >
              <option value="">{t('dashboard.addEquipment.categoryPlaceholder')}</option>
              {categoryOptions.map(([key]) => (
                <option key={key} value={key}>{t(`dashboard.equipmentDetails.${key}` as any)}</option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.manufacturer')}
            </label>
            <input
              value={form.manufacturer}
              onChange={(e) => updateField('manufacturer', e.target.value)}
              placeholder={t('dashboard.addEquipment.manufacturerPlaceholder')}
              className={fieldClass('manufacturer')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.model')}
            </label>
            <input
              value={form.model}
              onChange={(e) => updateField('model', e.target.value)}
              placeholder={t('dashboard.addEquipment.modelPlaceholder')}
              className={fieldClass('model')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.serialNumber')} <span className="text-destructive">*</span>
            </label>
            <input
              value={form.serialNumber}
              onChange={(e) => updateField('serialNumber', e.target.value)}
              placeholder={t('dashboard.addEquipment.serialNumberPlaceholder')}
              className={fieldClass('serialNumber')}
            />
            {errors.serialNumber && <p className="mt-1 text-xs text-destructive">{errors.serialNumber}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.purchaseDate')}
            </label>
            <input
              type="date"
              value={form.purchaseDate}
              onChange={(e) => updateField('purchaseDate', e.target.value)}
              className={fieldClass('purchaseDate')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.purchaseCost')}
            </label>
            <input
              type="number"
              value={form.purchaseCost}
              onChange={(e) => updateField('purchaseCost', parseFloat(e.target.value) || 0)}
              placeholder={t('dashboard.addEquipment.purchaseCostPlaceholder')}
              className={fieldClass('purchaseCost')}
              min={0}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.currentValue')}
            </label>
            <input
              type="number"
              value={form.currentValue}
              onChange={(e) => updateField('currentValue', parseFloat(e.target.value) || 0)}
              placeholder={t('dashboard.addEquipment.currentValuePlaceholder')}
              className={fieldClass('currentValue')}
              min={0}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.warrantyExpiration')}
            </label>
            <input
              type="date"
              value={form.warrantyExpiration}
              onChange={(e) => updateField('warrantyExpiration', e.target.value)}
              className={fieldClass('warrantyExpiration')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.lastMaintenanceDate')}
            </label>
            <input
              type="date"
              value={form.lastMaintenanceDate}
              onChange={(e) => updateField('lastMaintenanceDate', e.target.value)}
              className={fieldClass('lastMaintenanceDate')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.nextMaintenanceDate')}
            </label>
            <input
              type="date"
              value={form.nextMaintenanceDate}
              onChange={(e) => updateField('nextMaintenanceDate', e.target.value)}
              className={fieldClass('nextMaintenanceDate')}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.operatingStatus')}
            </label>
            <div className="flex flex-wrap items-center gap-2">
              {Object.entries(operatingStatusLabels).map(([key]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => updateField('operatingStatus', key)}
                  className={`inline-flex items-center gap-1.5 h-11 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    form.operatingStatus === key
                      ? key === 'operational'
                        ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : key === 'underMaintenance'
                        ? 'border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'border-red-500 bg-red-500/10 text-red-600 dark:text-red-400'
                      : 'border-border text-muted-foreground hover:bg-muted'
                  }`}
                >
                  {key === 'operational' && <CheckCircle2 className="h-4 w-4" />}
                  {key === 'underMaintenance' && <AlertTriangle className="h-4 w-4" />}
                  {key === 'outOfService' && <Ban className="h-4 w-4" />}
                  {t(`dashboard.equipment.${operatingStatusLabels[key]}_badge` as any)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.assignedProject')}
            </label>
            <select
              value={form.assignedProject}
              onChange={(e) => updateField('assignedProject', e.target.value)}
              className={fieldClass('assignedProject')}
            >
              <option value="">{t('dashboard.addEquipment.assignedProjectPlaceholder')}</option>
              {projectOptions.map((p) => (
                <option key={p.id} value={p.id}>
                  {i18n.language === 'ar' ? p.nameAr : p.nameEn}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.location')}
            </label>
            <input
              value={form.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder={t('dashboard.addEquipment.locationPlaceholder')}
              className={fieldClass('location')}
            />
          </div>

          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.notes')}
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => updateField('notes', e.target.value)}
              placeholder={t('dashboard.addEquipment.notesPlaceholder')}
              className={textareaClass('notes')}
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addEquipment.coverImage')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addEquipment.coverImageDescription')}</p>

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
              <span className="text-xs font-medium">{t('dashboard.addEquipment.uploadImage')}</span>
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addEquipment.galleryImages')}</h3>
        <p className="text-xs text-muted-foreground -mt-4">{t('dashboard.addEquipment.galleryImagesDescription')}</p>

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
            <span className="text-[10px] font-medium">{t('dashboard.addEquipment.addImages')}</span>
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm p-6 space-y-6">
        <h3 className="text-lg font-semibold text-foreground">{t('dashboard.addEquipment.seoSection')}</h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.seoTitleAr')}
            </label>
            <input
              value={form.seoTitleAr}
              onChange={(e) => updateField('seoTitleAr', e.target.value)}
              placeholder={t('dashboard.addEquipment.seoTitleArPlaceholder')}
              className={fieldClass('seoTitleAr')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.seoTitleEn')}
            </label>
            <input
              value={form.seoTitleEn}
              onChange={(e) => updateField('seoTitleEn', e.target.value)}
              placeholder={t('dashboard.addEquipment.seoTitleEnPlaceholder')}
              className={fieldClass('seoTitleEn')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.seoDescriptionAr')}
            </label>
            <textarea
              value={form.seoDescriptionAr}
              onChange={(e) => updateField('seoDescriptionAr', e.target.value)}
              placeholder={t('dashboard.addEquipment.seoDescriptionArPlaceholder')}
              className={textareaClass('seoDescriptionAr')}
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.seoDescriptionEn')}
            </label>
            <textarea
              value={form.seoDescriptionEn}
              onChange={(e) => updateField('seoDescriptionEn', e.target.value)}
              placeholder={t('dashboard.addEquipment.seoDescriptionEnPlaceholder')}
              className={textareaClass('seoDescriptionEn')}
              rows={3}
            />
          </div>
          <div className="lg:col-span-2">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              {t('dashboard.addEquipment.seoKeywords')}
            </label>
            <input
              value={form.seoKeywords}
              onChange={(e) => updateField('seoKeywords', e.target.value)}
              placeholder={t('dashboard.addEquipment.seoKeywordsPlaceholder')}
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
          {t('dashboard.addEquipment.cancel')}
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 px-6 rounded-xl bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('dashboard.addEquipment.saving') : t('dashboard.addEquipment.save')}
        </button>
      </div>
    </form>
  );
}
