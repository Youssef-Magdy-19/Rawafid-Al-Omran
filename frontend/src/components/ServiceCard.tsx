import { useTranslation } from 'react-i18next';
import { useLanguage } from '@providers/LanguageProvider';
import { cn } from '@utils/cn';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
  className?: string;
  index?: number;
}

export function ServiceCard({
  className,
  title,
  description,
  icon,
  slug,
  index = 0,
}: ServiceCardProps) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <Link
      to={`/services/${slug}`}
      className={cn('group block', className)}
    >
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1">
        {/* Decorative index number */}
        <div className="absolute -right-4 -top-4 text-[5rem] font-black leading-none text-muted/30 select-none transition-all duration-500 group-hover:text-primary/10">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10">
          {/* Icon with ring */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 text-primary ring-1 ring-primary/20 transition-all duration-500 group-hover:from-primary group-hover:to-primary/80 group-hover:text-primary-foreground group-hover:ring-primary/30 group-hover:shadow-lg group-hover:shadow-primary/20">
            {icon}
          </div>

          <h3 className="mb-3 text-xl font-bold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>

          <p className="mb-6 text-sm leading-relaxed text-muted-foreground line-clamp-2">
            {description}
          </p>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
            {t('common.learnMore')}
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}