import { type HTMLAttributes } from 'react';
import { cn } from '@utils/cn';
import { Button } from '@components/ui';
import { ArrowRight } from 'lucide-react';

export interface CTABannerProps extends HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink: string;
  variant?: 'primary' | 'secondary' | 'accent';
}

export function CTABanner({
  className,
  title,
  description,
  buttonText,
  buttonLink,
  variant = 'accent',
  ...props
}: CTABannerProps) {
  const variants = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
  };

  return (
    <section
      className={cn('py-16 md:py-24', variants[variant], className)}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-lg text-white/80">
              {description}
            </p>
          )}
          <div className="mt-8">
            <Button
              size="lg"
              variant="ghost"
              className="bg-white text-foreground hover:bg-white/90"
              rightIcon={<ArrowRight className="h-5 w-5" />}
              onClick={() => window.location.href = buttonLink}
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}