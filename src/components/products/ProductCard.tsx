import { Link } from 'react-router-dom';
import { type Product, getStockStatus, formatPrice } from '@/lib/api';
import { StockBadge } from '@/components/ui/stock-badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  className?: string;
  variant?: 'default' | 'compact';
}

export function ProductCard({ product, className, variant = 'default' }: ProductCardProps) {
  const stockStatus = getStockStatus(product.stock);

  if (variant === 'compact') {
    return (
      <Link to={`/products/${product.id}`}>
        <Card className={cn('group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1', className)}>
          <CardContent className="p-4">
            <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-3">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
            <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            <p className="text-lg font-semibold text-primary">{formatPrice(product.price)}</p>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/products/${product.id}`}>
      <Card className={cn('group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1', className)}>
        <CardContent className="p-4">
          <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            {product.brand && (
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            )}
            <div className="flex items-center justify-between pt-2">
              <p className="text-lg font-semibold text-primary">{formatPrice(product.price)}</p>
              <StockBadge status={stockStatus} showIcon={false} />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
