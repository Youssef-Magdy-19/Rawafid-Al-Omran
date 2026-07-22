import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: '/' | '>' | 'chevron';
  showHomeIcon?: boolean;
  maxItems?: number;
}

export function Breadcrumb({
  items,
  separator = 'chevron',
  showHomeIcon = true,
  maxItems = 5,
}: BreadcrumbProps) {
  const { t } = useTranslation();

  const renderSeparator = () => {
    if (separator === 'chevron') {
      return <ChevronRight className="h-4 w-4 text-muted-foreground" />;
    }
    return <span className="text-muted-foreground">{separator}</span>;
  };

  const displayItems = items.length > maxItems
    ? [
        items[0],
        { label: '...' },
        ...items.slice(-(maxItems - 1)),
      ]
    : items;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex items-center gap-2 flex-wrap">
        {showHomeIcon && (
          <li>
            <Link
              to="/"
              className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-150"
              aria-label={t('navigation.home')}
            >
              <Home className="h-4 w-4" />
            </Link>
          </li>
        )}
        
        {displayItems.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && renderSeparator()}
            {item.href && index !== displayItems.length - 1 ? (
              <Link
                to={item.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-150"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={index === displayItems.length - 1 ? 'text-foreground font-medium' : 'text-muted-foreground'}
                aria-current={index === displayItems.length - 1 ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}