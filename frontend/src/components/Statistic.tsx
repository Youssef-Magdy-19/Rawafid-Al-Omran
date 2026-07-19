import { type HTMLAttributes } from 'react';
import { cn } from '@utils/cn';

export interface StatisticProps extends HTMLAttributes<HTMLDivElement> {
  value: number | string;
  label: string;
  suffix?: string;
  icon?: React.ReactNode;
}

export function Statistic({
  className,
  value,
  label,
  suffix = '',
  icon,
  ...props
}: StatisticProps) {
  return (
    <div
      className={cn('flex flex-col items-center text-center', className)}
      {...props}
    >
      {icon && (
        <div className="mb-3 text-white/80">
          {icon}
        </div>
      )}
      <div className="text-4xl font-bold text-white md:text-5xl">
        {value}{suffix}
      </div>
      <div className="mt-1 text-sm font-medium text-white/80 md:text-base">
        {label}
      </div>
    </div>
  );
}