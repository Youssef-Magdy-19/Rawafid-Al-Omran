import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@providers/LanguageProvider';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  size?: 'sm' | 'md' | 'lg';
  showClearButton?: boolean;
  autoFocus?: boolean;
}

export function SearchBox({
  onSearch,
  placeholder,
  initialValue = '',
  size = 'md',
  showClearButton = true,
  autoFocus = false,
}: SearchBoxProps) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [value, setValue] = useState(initialValue);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  }, [value, onSearch]);

  const handleClear = useCallback(() => {
    setValue('');
    onSearch('');
  }, [onSearch]);

  const sizeClasses = {
    sm: 'h-10 text-sm',
    md: 'h-12 text-base',
    lg: 'h-14 text-lg',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <Search
          className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-gray-400 ${iconSizes[size]}`}
          aria-hidden="true"
        />
        <input
          type="search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder || t('common.search') || 'Search...'}
          autoFocus={autoFocus}
          className={`
            w-full ${sizeClasses[size]} ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'}
            bg-white border border-gray-300 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            placeholder:text-gray-400 text-gray-900
            transition-colors duration-150
          `}
          aria-label={placeholder || t('common.search') || 'Search'}
        />
        {showClearButton && value && (
          <button
            type="button"
            onClick={handleClear}
            className={`absolute ${isRTL ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-150`}
            aria-label={t('common.clear') || 'Clear search'}
          >
            <X className={iconSizes[size]} />
          </button>
        )}
      </div>
    </form>
  );
}