import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@components/ui';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  error?: Error | null;
}

export function ErrorState({
  title = 'Something went wrong',
  description = 'We encountered an error while loading this content. Please try again.',
  onRetry,
  error,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-6 text-error-500">
        <AlertCircle className="h-16 w-16" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground max-w-md mb-6">
        {description}
      </p>
      {error && (
        <pre className="text-left text-sm bg-muted p-4 rounded-lg mb-6 max-w-2xl overflow-auto text-muted-foreground">
          {error.message}
        </pre>
      )}
      {onRetry && (
        <Button onClick={onRetry} variant="primary" leftIcon={<RefreshCw className="h-4 w-4" />}>
          Try Again
        </Button>
      )}
    </div>
  );
}