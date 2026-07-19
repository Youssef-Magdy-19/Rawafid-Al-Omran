import { type AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@utils/cn';
import { Badge } from '@components/ui';
import { Eye } from 'lucide-react';

export interface ProjectCardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  category: string;
  image: string;
  slug: string;
}

export function ProjectCard({
  className,
  title,
  category,
  image,
  slug,
  ...props
}: ProjectCardProps) {
  return (
    <Link
      to={`/projects/${slug}`}
      className={cn('group block overflow-hidden rounded-xl', className)}
      {...props}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/50">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 opacity-0 transition-opacity group-hover:opacity-100">
            <Eye className="h-5 w-5 text-gray-900" />
          </div>
        </div>
        <div className="absolute left-4 top-4">
          <Badge variant="primary" size="sm">
            {category}
          </Badge>
        </div>
      </div>
      <div className="mt-3">
        <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
          {title}
        </h3>
      </div>
    </Link>
  );
}