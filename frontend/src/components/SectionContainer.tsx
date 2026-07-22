import { cn } from '@utils/cn';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: 'section' | 'div' | 'main' | 'aside';
  size?: 'default' | 'sm' | 'lg' | 'full';
  background?: 'default' | 'light' | 'dark' | 'primary' | 'none';
  padding?: 'default' | 'none' | 'sm' | 'lg';
}

export function SectionContainer({
  children,
  className,
  as: Component = 'section',
  size = 'default',
  background = 'default',
  padding = 'default',
}: SectionContainerProps) {
  const sizeClasses = {
    default: 'max-w-7xl mx-auto',
    sm: 'max-w-5xl mx-auto',
    lg: 'max-w-6xl mx-auto',
    full: 'w-full',
  };

  const backgroundClasses = {
    default: 'bg-background',
    light: 'bg-muted/30',
    dark: 'bg-muted',
    primary: 'bg-primary',
    none: '',
  };

  const paddingClasses = {
    default: 'py-16 lg:py-24',
    none: '',
    sm: 'py-8 lg:py-12',
    lg: 'py-24 lg:py-32',
  };

  return (
    <Component
      className={cn(
        sizeClasses[size],
        backgroundClasses[background],
        paddingClasses[padding],
        className
      )}
    >
      <div className="container mx-auto px-4">
        {children}
      </div>
    </Component>
  );
}