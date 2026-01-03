import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingProps {
  value: number;
  maxValue?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5',
};

export function Rating({ value, maxValue = 5, showValue = true, size = 'md', className }: RatingProps) {
  const stars = Array.from({ length: maxValue }, (_, i) => {
    const filled = i + 1 <= Math.floor(value);
    const partial = !filled && i < value;
    return { filled, partial };
  });

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <div className="flex">
        {stars.map((star, i) => (
          <Star
            key={i}
            className={cn(
              sizeClasses[size],
              star.filled
                ? 'fill-warning text-warning'
                : star.partial
                ? 'fill-warning/50 text-warning'
                : 'fill-muted text-muted'
            )}
          />
        ))}
      </div>
      {showValue && (
        <span className="text-sm text-muted-foreground ml-1">{value.toFixed(1)}/5</span>
      )}
    </div>
  );
}
