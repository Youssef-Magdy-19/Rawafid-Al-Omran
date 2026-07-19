import { type HTMLAttributes } from 'react';
import { cn } from '@utils/cn';

export interface SectionHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

export function SectionHeader({
  className,
  title,
  subtitle,
  description,
  align = 'center',
  size = 'md',
  ...props
}: SectionHeaderProps) {
  const alignStyles = {
    left: 'text-left items-start',
    center: 'text-center mx-auto',
    right: 'text-right items-end ml-auto',
  };

  const titleSizes = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
  };

  return (
    <div
      className={cn('max-w-3xl', alignStyles[align], className)}
      {...props}
    >
      {subtitle && (
        <span className="mb-2 block text-sm font-medium uppercase tracking-wider text-primary">
          {subtitle}
        </span>
      )}
      <h2 className={cn('font-heading font-bold text-foreground', titleSizes[size])}>
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}