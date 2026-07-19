import { type HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@utils/cn';
import { Card } from '@components/ui';
import { ArrowRight } from 'lucide-react';

export interface ServiceCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
}

export function ServiceCard({
  className,
  title,
  description,
  icon,
  slug,
  ...props
}: ServiceCardProps) {
  return (
    <Card
      className={cn('group h-full', className)}
      hover
      {...props}
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <h3 className="mb-2 text-xl font-semibold text-foreground">
          {title}
        </h3>
        <p className="mb-4 flex-1 text-muted-foreground line-clamp-2">
          {description}
        </p>
        <Link
          to={`/services/${slug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:gap-3"
        >
          Learn More
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}