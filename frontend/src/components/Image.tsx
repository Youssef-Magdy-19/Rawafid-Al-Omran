import { useState } from 'react';
import { cn } from '@utils/cn';
import { ImageIcon } from 'lucide-react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  fallbackIcon?: React.ReactNode;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill';
  showFallbackOnError?: boolean;
}

export function Image({
  src,
  alt,
  fallbackSrc,
  fallbackIcon,
  aspectRatio = 'auto',
  objectFit = 'cover',
  showFallbackOnError = true,
  className,
  ...props
}: ImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
  };

  const handleError = () => {
    setHasError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const shouldShowFallback = hasError && showFallbackOnError;
  const finalSrc = shouldShowFallback ? fallbackSrc : src;

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-gray-100',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      {/* Loading skeleton */}
      {!isLoaded && !shouldShowFallback && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      )}
      
      {/* Main image */}
      {finalSrc && (
        <img
          src={finalSrc}
          alt={alt}
          onError={handleError}
          onLoad={handleLoad}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            objectFitClasses[objectFit],
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          loading="lazy"
          decoding="async"
          {...props}
        />
      )}
      
      {/* Fallback display */}
      {shouldShowFallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          {fallbackIcon || (
            <ImageIcon className="h-12 w-12 text-gray-300" />
          )}
        </div>
      )}
    </div>
  );
}