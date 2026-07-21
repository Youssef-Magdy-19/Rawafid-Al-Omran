import { useState, useRef, useEffect, useMemo, KeyboardEvent } from 'react';
import { useLanguage } from '@providers/LanguageProvider';
import { cn } from '@utils/cn';
import { ChevronDown, X } from 'lucide-react';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  className?: string;
}

export function Dropdown({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  error,
  required = false,
  disabled = false,
  searchable = false,
  clearable = false,
  className,
}: DropdownProps) {
  const { isRTL } = useLanguage();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selected = options.find((o) => o.value === value);
  const filtered = useMemo(
    () =>
      searchable && search
        ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
        : options,
    [options, searchable, search]
  );

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (open && listRef.current && highlightIndex >= 0) {
      const item = listRef.current.children[highlightIndex] as HTMLLIElement;
      item?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightIndex, open]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === 'ArrowDown') {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }
    switch (e.key) {
      case 'ArrowDown':
        setHighlightIndex((prev) => Math.min(prev + 1, filtered.length - 1));
        e.preventDefault();
        break;
      case 'ArrowUp':
        setHighlightIndex((prev) => Math.max(prev - 1, 0));
        e.preventDefault();
        break;
      case 'Enter':
        if (highlightIndex >= 0 && filtered[highlightIndex]) {
          onChange(filtered[highlightIndex].value);
          setOpen(false);
          setSearch('');
        }
        e.preventDefault();
        break;
      case 'Escape':
        setOpen(false);
        setSearch('');
        e.preventDefault();
        break;
    }
  };

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setOpen(false);
    setSearch('');
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange('');
    setSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className={cn('relative', className)} ref={containerRef}>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'flex w-full items-center rounded-lg border bg-background px-3 py-2.5 text-sm transition-colors',
          'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
          disabled && 'cursor-not-allowed opacity-50',
          error ? 'border-destructive' : 'border-border hover:border-primary/50',
          isRTL && 'text-right'
        )}
      >
        <span className={cn('flex-1 truncate', !selected && 'text-muted-foreground')}>
          {selected ? selected.label : placeholder}
        </span>
        {clearable && value && (
          <span
            role="button"
            tabIndex={-1}
            onClick={handleClear}
            className="ml-1 mr-1 rounded p-0.5 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </span>
        )}
        <ChevronDown className={cn('h-4 w-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <div
          className={cn(
            'absolute z-50 mt-1 w-full rounded-lg border border-border bg-card shadow-lg',
            isRTL ? 'right-0' : 'left-0'
          )}
        >
          {searchable && (
            <div className="p-2 border-b border-border">
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => { setSearch(e.target.value); setHighlightIndex(0); }}
                placeholder="Search..."
                className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                autoFocus
                dir={isRTL ? 'rtl' : 'ltr'}
              />
            </div>
          )}
          <ul
            ref={listRef}
            role="listbox"
            className="max-h-60 overflow-auto py-1"
          >
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-muted-foreground">No results found</li>
            ) : (
              filtered.map((opt, idx) => (
                <li
                  key={opt.value}
                  role="option"
                  aria-selected={opt.value === value}
                  onClick={() => handleSelect(opt.value)}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  className={cn(
                    'cursor-pointer px-3 py-2 text-sm transition-colors',
                    opt.value === value && 'bg-primary/10 text-primary font-medium',
                    idx === highlightIndex && opt.value !== value && 'bg-muted',
                    isRTL && 'text-right'
                  )}
                >
                  {opt.label}
                </li>
              ))
            )}
          </ul>
        </div>
      )}

      {error && (
        <p className="mt-1 text-xs text-destructive">{error}</p>
      )}
    </div>
  );
}
