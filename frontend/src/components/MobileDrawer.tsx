import { useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@providers/LanguageProvider';
import { cn } from '@utils/cn';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function MobileDrawer({ isOpen, onClose, children, title }: MobileDrawerProps) {
  const { isRTL } = useLanguage();

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      const drawer = document.getElementById('mobile-drawer');
      if (drawer) {
        drawer.focus();
      }
    }
  }, [isOpen]);

  const drawerVariants = {
    hidden: {
      x: isRTL ? '-100%' : '100%',
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: {
      x: isRTL ? '-100%' : '100%',
      opacity: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
        ease: [0.4, 0, 1, 1],
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            id="mobile-drawer"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className={cn(
              'fixed top-0 bottom-0 z-50 w-[320px] max-w-[85vw] bg-background shadow-2xl',
              isRTL ? 'right-0' : 'left-0'
            )}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'drawer-title' : undefined}
            tabIndex={-1}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
              {title ? (
                <h2 id="drawer-title" className="text-lg font-semibold">
                  {title}
                </h2>
              ) : (
                <div />
              )}
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="h-full overflow-y-auto py-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

interface MobileNavLinkProps {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}

export function MobileNavLink({ to, onClick, children }: MobileNavLinkProps) {
  const { isRTL } = useLanguage();

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'block px-6 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground',
        isRTL && 'text-right'
      )}
    >
      {children}
    </Link>
  );
}