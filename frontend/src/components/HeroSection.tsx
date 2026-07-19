import { type HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@utils/cn';
import { Button } from '@components/ui';

export interface HeroSectionProps extends HTMLAttributes<HTMLElement> {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  backgroundImage: string;
}

export function HeroSection({
  className,
  title,
  subtitle,
  description,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  backgroundImage,
  ...props
}: HeroSectionProps) {
  return (
    <section
      className={cn(
        'relative flex min-h-[85vh] items-center justify-center overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      
      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-secondary/10 blur-3xl" />
      </div>
      
      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {subtitle && (
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-1.5 text-sm font-medium uppercase tracking-wider text-white/90 backdrop-blur-sm"
            >
              {subtitle}
            </motion.span>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            {title}
          </motion.h1>
          
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-10 text-lg leading-relaxed text-white/80 md:text-xl"
            >
              {description}
            </motion.p>
          )}
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to={primaryCtaLink}>
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-white text-foreground shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10">{primaryCtaText}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/50 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Button>
            </Link>
            {secondaryCtaText && secondaryCtaLink && (
              <Link to={secondaryCtaLink}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group border-2 border-white/30 bg-white/10 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20"
                >
                  {secondaryCtaText}
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </div>
      
      {/* Premium Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-white/50">
            Scroll
          </span>
          <div className="relative h-10 w-6 rounded-full border-2 border-white/30">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1 h-2 w-1 -translate-x-1/2 rounded-full bg-white"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
