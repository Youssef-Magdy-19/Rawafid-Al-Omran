import { useRef, useState, useCallback, useEffect, type DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@utils/cn';
import { Upload, X, Loader2, ImageIcon, AlertCircle } from 'lucide-react';
import { uploadApi } from '@services/api/endpoints';

interface GalleryImage {
  url: string;
  uploading?: boolean;
  error?: string;
}

interface GalleryUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
  label?: string;
  className?: string;
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
}

export function GalleryUpload({
  value = [],
  onChange,
  label,
  className,
  accept = 'image/jpeg,image/png,image/gif,image/webp,image/svg+xml',
  maxSize = 10 * 1024 * 1024,
  maxFiles = 10,
}: GalleryUploadProps) {
  const { t } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [gallery, setGallery] = useState<GalleryImage[]>(() => value.map((url) => ({ url })));

  const maxSizeMB = Math.round(maxSize / 1024 / 1024);

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const galleryRef = useRef(gallery);
  galleryRef.current = gallery;

  const prevValueRef = useRef(value);
  useEffect(() => {
    if (prevValueRef.current !== value) {
      prevValueRef.current = value;
      setGallery(value.map((url) => ({ url })));
    }
  }, [value]);

  const uploadFile = useCallback(async (file: File): Promise<string | null> => {
    const allowedTypes = accept.split(',').map((t) => t.trim());
    const fileExt = file.type;
    const isAllowed = allowedTypes.some((allowed) =>
      allowed.endsWith('/*') ? fileExt.startsWith(allowed.replace('/*', '')) : allowed === fileExt
    );
    if (!isAllowed) return null;
    if (file.size > maxSize) return null;
    const response = await uploadApi.uploadFile(file);
    return response.data.data.url;
  }, [accept, maxSize]);

  const processFiles = useCallback(async (files: FileList) => {
    const remaining = maxFiles - galleryRef.current.length;
    if (remaining <= 0) return;

    const fileArray = Array.from(files).slice(0, remaining);
    const newEntries: GalleryImage[] = fileArray.map(() => ({ url: '', uploading: true }));
    setGallery((prev) => [...prev, ...newEntries]);

    const uploadPromises = fileArray.map(async (file, idx) => {
      try {
        const url = await uploadFile(file);
        if (url) {
          setGallery((prev) => {
            const next = [...prev];
            const targetIdx = next.length - fileArray.length + idx;
            if (next[targetIdx]) next[targetIdx] = { url, uploading: false };
            return next;
          });
          return url;
        } else {
          setGallery((prev) => {
            const next = [...prev];
            const targetIdx = next.length - fileArray.length + idx;
            if (next[targetIdx]) next[targetIdx] = { url: '', uploading: false, error: t('common.unsupportedFormat') };
            return next;
          });
          return null;
        }
      } catch {
        setGallery((prev) => {
          const next = [...prev];
          const targetIdx = next.length - fileArray.length + idx;
          if (next[targetIdx]) next[targetIdx] = { url: '', uploading: false, error: t('common.uploadFailed') };
          return next;
        });
        return null;
      }
    });

    await Promise.allSettled(uploadPromises);
    const urls = galleryRef.current.filter((img) => img.url).map((img) => img.url);
    onChangeRef.current(urls);
  }, [maxFiles, uploadFile, t]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processFiles(files);
    if (inputRef.current) inputRef.current.value = '';
  }, [processFiles]);

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;
    processFiles(files);
  }, [processFiles]);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const removeImage = useCallback((idx: number) => {
    setGallery((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      onChangeRef.current(next.filter((img) => img.url).map((img) => img.url));
      return next;
    });
  }, []);

  const hasUploading = gallery.some((img) => img.uploading);
  const completedCount = gallery.filter((img) => img.url && !img.uploading).length;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-foreground">
          {label}
          {completedCount > 0 && (
            <span className="ml-2 text-xs text-muted-foreground">
              ({t('common.imagesCount', { count: completedCount })})
            </span>
          )}
        </label>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
        {gallery.map((img, idx) => (
          <div
            key={`${img.url || 'new'}-${idx}`}
            className={cn(
              'relative rounded-lg overflow-hidden border border-input group',
              img.uploading && 'animate-pulse',
              img.error && 'border-destructive'
            )}
          >
            {img.url ? (
              <div className="aspect-square">
                <img
                  src={img.url}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="p-1.5 rounded-full bg-white/90 hover:bg-white text-destructive transition-colors"
                    title={t('common.removeImage')}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="aspect-square flex flex-col items-center justify-center bg-muted/30 p-2">
                {img.uploading ? (
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : img.error ? (
                  <>
                    <AlertCircle className="h-6 w-6 text-destructive mb-1" />
                    <span className="text-[10px] text-destructive text-center leading-tight">{img.error}</span>
                  </>
                ) : (
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
            )}
          </div>
        ))}

        {gallery.length < maxFiles && !hasUploading && (
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              'aspect-square rounded-lg border-2 border-dashed transition-colors cursor-pointer',
              'flex flex-col items-center justify-center gap-1 p-2',
              isDragOver
                ? 'border-primary bg-primary/10'
                : 'border-input hover:border-primary hover:bg-primary/5',
            )}
          >
            <div className="rounded-full bg-primary/10 p-2">
              <Upload className="h-4 w-4 text-primary" />
            </div>
            <span className="text-[11px] text-muted-foreground text-center leading-tight">
              {t('common.clickToUpload')}
            </span>
            <span className="text-[10px] text-muted-foreground text-center">
              {t('common.dragDropHint')}
            </span>
          </div>
        )}
      </div>

      {gallery.length === 0 && !hasUploading && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'w-full h-36 rounded-lg border-2 border-dashed transition-colors cursor-pointer',
            'flex flex-col items-center justify-center gap-2',
            isDragOver
              ? 'border-primary bg-primary/10'
              : 'border-input hover:border-primary hover:bg-primary/5',
          )}
        >
          <div className="rounded-full bg-primary/10 p-3">
            <ImageIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="text-center px-4">
            <span className="text-sm font-medium text-foreground">{t('common.clickToUpload')}</span>
            <span className="text-sm text-muted-foreground"> {t('common.dragDropHint')}</span>
          </div>
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xs text-muted-foreground">{t('common.maxFileSize', { maxSize: maxSizeMB })}</span>
            <span className="text-xs text-muted-foreground">{t('common.supportedFormats')}</span>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
