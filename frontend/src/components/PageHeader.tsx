import { useLanguage } from '@providers/LanguageProvider';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  backgroundImage?: string;
  variant?: 'default' | 'centered' | 'minimal';
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  backgroundImage,
  variant = 'default',
  children,
}: PageHeaderProps) {
  const { isRTL } = useLanguage();

  const variants = {
    default: 'py-16 lg:py-24',
    centered: 'py-16 lg:py-24 text-center',
    minimal: 'py-8 lg:py-12',
  };

  const backgroundStyle = backgroundImage
    ? {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }
    : {};

  return (
    <header
      className={`bg-muted/30 ${variants[variant]}`}
      style={backgroundStyle}
    >
      <div className="container mx-auto px-4">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className={`mb-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        
        <div className={`max-w-3xl ${variant === 'centered' ? 'mx-auto' : ''}`}>
          <h1
            className={`text-4xl lg:text-5xl font-bold text-foreground mb-4 ${
              backgroundImage ? 'text-white' : ''
            }`}
          >
            {title}
          </h1>
          
          {description && (
            <p
              className={`text-lg text-muted-foreground ${
                backgroundImage ? 'text-white/80' : ''
              }`}
            >
              {description}
            </p>
          )}
        </div>

        {children && (
          <div className="mt-8">{children}</div>
        )}
      </div>
    </header>
  );
}