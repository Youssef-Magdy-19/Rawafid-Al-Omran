import { FileQuestion, Search, Inbox, Heart } from 'lucide-react';
import { Button } from '@components/ui';

type EmptyStateVariant = 'no-results' | 'no-data' | 'no-favorites' | 'custom';

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  customIcon?: React.ReactNode;
}

const variantIcons = {
  'no-results': Search,
  'no-data': Inbox,
  'no-favorites': Heart,
  'custom': FileQuestion,
};

export function EmptyState({
  variant = 'no-data',
  title,
  description,
  action,
  customIcon,
}: EmptyStateProps) {
  const IconComponent = customIcon ? null : variantIcons[variant];
  const icon = customIcon || (IconComponent ? <IconComponent className="h-16 w-16 text-gray-300" /> : null);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {icon && (
        <div className="mb-6 text-gray-300">
          {icon}
        </div>
      )}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-gray-500 max-w-md mb-6">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="primary">
          {action.label}
        </Button>
      )}
    </div>
  );
}