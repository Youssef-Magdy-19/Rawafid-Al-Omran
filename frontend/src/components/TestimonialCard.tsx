import { type HTMLAttributes } from 'react';
import { cn } from '@utils/cn';
import { Card } from '@components/ui';
import { Star } from 'lucide-react';

export interface TestimonialCardProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  role: string;
  company: string;
  content: string;
  rating?: number;
  avatar?: string;
}

export function TestimonialCard({
  className,
  name,
  role,
  company,
  content,
  rating = 5,
  avatar,
  ...props
}: TestimonialCardProps) {
  return (
    <Card
      className={cn('h-full', className)}
      {...props}
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 flex">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                'h-4 w-4',
                i < rating ? 'fill-secondary text-secondary' : 'text-muted-foreground/30'
              )}
            />
          ))}
        </div>
        <p className="mb-6 flex-1 text-muted-foreground">
          "{content}"
        </p>
        <div className="flex items-center gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="h-12 w-12 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
              {name.charAt(0)}
            </div>
          )}
          <div>
            <div className="font-semibold text-foreground">{name}</div>
            <div className="text-sm text-muted-foreground">
              {role}, {company}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}