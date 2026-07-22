import { type AnchorHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@utils/cn';
import { Badge } from '@components/ui';
import { ArrowUpRight } from 'lucide-react';

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
      className={cn('group block', className)}
      {...props}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80" />
          
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-500 group-hover:bg-black/40">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/80 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 backdrop-blur-sm">
              <ArrowUpRight className="h-6 w-6" />
            </div>
          </div>

          <div className="absolute left-5 top-5">
            <Badge variant="primary" size="sm" className="backdrop-blur-sm">
              {category}
            </Badge>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="text-lg font-bold text-white leading-snug transition-all duration-300 group-hover:translate-y-[-4px]">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}