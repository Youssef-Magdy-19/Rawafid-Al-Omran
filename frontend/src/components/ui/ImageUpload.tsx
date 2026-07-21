import { useRef, useState, useCallback, type DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@providers/LanguageProvider';
import { cn } from '@utils/cn';
import { Upload, X, Loader2, ImageIcon, AlertCircle } from 'lucide-react';
import { uploadApi } from '@services/api/endpoints';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
  accept?: string;
  maxSize?: number;
}

export function ImageUpload({
  value,
  onChange,
  label,
  className,
  accept = 'image/jpeg,image/png,image/gif,image/webp,image/svg+xml',
  maxSize = 10 * 1024 * 1024,
}: ImageUploadProps) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const maxSizeMB = Math.round(maxSize / 1024 / 1024);

  const processFile = useCallback(async (file: File) => {
    setError(null);

    const allowedTypes = accept.split(',').map((t) => t.trim());
    const fileExt = file.type;
    const isAllowed = allowedTypes.some((allowed) =>
      allowed.endsWith('/*') ? fileExt.startsWith(allowed.replace('/*', '')) : allowed === fileExt
    );
    if (!isAllowed) {
      setError(t('common.unsupportedFormat'));
      return;
    }

    if (file.size > maxSize) {
      setError(t('common.fileTooLarge', { maxSize: maxSizeMB }));
      return;
    }

    setIsUploading(true);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    try {
      const response = await uploadApi.uploadFile(file);
      onChange(response.data.data.url);
      setPreview(null);
    } catch {
      setError(t('common.uploadFailed'));
      setPreview(null);
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  }, [maxSize, maxSizeMB, onChange, t, accept]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
  }, [processFile]);

  const handleDrop = useCallback(async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await processFile(file);
  }, [processFile]);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleRemove = useCallback(() => {
    onChange('');
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
  }, [onChange]);

  const displaySrc = preview || value;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="mb-2 block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      {displaySrc ? (
        <div className="relative group rounded-lg overflow-hidden border border-input">
          <img
            src={displaySrc}
            alt="Preview"
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="p-2 rounded-full bg-white/90 hover:bg-white text-foreground transition-colors"
              title={t('common.replaceImage')}
            >
              <Upload className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 rounded-full bg-white/90 hover:bg-white text-destructive transition-colors"
              title={t('common.removeImage')}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => !isUploading && inputRef.current?.click()}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); inputRef.current?.click(); } }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            'w-full h-48 rounded-lg border-2 border-dashed transition-colors cursor-pointer',
            'flex flex-col items-center justify-center gap-2',
            isDragOver
              ? 'border-primary bg-primary/10'
              : 'border-input hover:border-primary hover:bg-primary/5',
            isUploading && 'pointer-events-none opacity-50',
          )}
        >
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">{t('common.uploading')}</span>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
      {error && (
        <div className={cn('mt-1.5 flex items-center gap-1.5 text-sm', isRTL ? 'flex-row-reverse' : '')}>
          <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
          <span className="text-destructive">{error}</span>
        </div>
      )}
    </div>
  );
}
