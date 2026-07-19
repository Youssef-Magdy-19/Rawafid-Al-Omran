import { ReactNode } from 'react';
import { ThemeProvider } from '@providers/ThemeProvider';
import { LanguageProvider } from '@providers/LanguageProvider';
import { ToastProvider } from '@providers/ToastProvider';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>{children}</ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}