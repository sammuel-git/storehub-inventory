import { cn } from '@/lib/utils';
import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

interface StockBadgeProps {
  status: StockStatus;
  stock?: number;
  showIcon?: boolean;
  className?: string;
}

const statusConfig = {
  'in-stock': {
    label: 'In Stock',
    icon: CheckCircle,
    className: 'bg-success/10 text-success border-success/20',
  },
  'low-stock': {
    label: 'Low Stock',
    icon: AlertTriangle,
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  'out-of-stock': {
    label: 'Out of Stock',
    icon: XCircle,
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
};

export function StockBadge({ status, stock, showIcon = true, className }: StockBadgeProps) {
  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {showIcon && <Icon className="w-3.5 h-3.5" />}
      {stock !== undefined ? `${stock} ${config.label}` : config.label}
    </span>
  );
}
