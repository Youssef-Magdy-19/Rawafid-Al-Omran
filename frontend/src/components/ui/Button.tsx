import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@utils/cn';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      relative inline-flex items-center justify-center gap-2
      font-semibold rounded-xl
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background
      disabled:pointer-events-none disabled:opacity-50
      overflow-hidden
    `;

    const variants = {
      primary: `
        bg-primary text-primary-foreground
        hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/25
        focus:ring-primary
        shadow-md hover:-translate-y-0.5 active:translate-y-0
      `,
      secondary: `
        bg-secondary text-secondary-foreground
        hover:bg-secondary-dark hover:shadow-lg hover:shadow-secondary/25
        focus:ring-secondary
        shadow-md hover:-translate-y-0.5 active:translate-y-0
      `,
      outline: `
        border-2 border-primary/20 bg-transparent text-primary
        hover:border-primary hover:bg-primary/5 hover:shadow-lg hover:shadow-primary/10
        focus:ring-primary
        hover:-translate-y-0.5 active:translate-y-0
      `,
      ghost: `
        bg-transparent text-foreground
        hover:bg-muted focus:ring-primary
      `,
      destructive: `
        bg-destructive text-destructive-foreground
        hover:bg-destructive/90 hover:shadow-lg hover:shadow-destructive/25
        focus:ring-destructive
        shadow-md hover:-translate-y-0.5 active:translate-y-0
      `,
      link: `
        bg-transparent text-primary underline-offset-4
        hover:underline focus:ring-primary
        p-0 h-auto
      `,
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-6 text-base',
      lg: 'h-14 px-8 text-lg',
      icon: 'h-11 w-11',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Shimmer Effect for Primary & Secondary */}
        {(variant === 'primary' || variant === 'secondary') && (
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 hover:translate-x-full" />
        )}
        
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          leftIcon
        )}
        <span className="relative z-10">{children}</span>
        {!isLoading && rightIcon && (
          <span className="relative z-10">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
