import { cn } from '@/lib/utils';

export function ProductTableSkeleton({ rows = 10 }: { rows?: number }) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-muted/50 grid grid-cols-6 gap-4 px-4 py-3">
        {['Image', 'Name', 'Price', 'Brand', 'Category', 'Stock'].map((_, i) => (
          <div key={i} className="h-4 skeleton-shimmer rounded" />
        ))}
      </div>
      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4 px-4 py-4 border-t">
          <div className="w-12 h-12 skeleton-shimmer rounded" />
          <div className="space-y-2">
            <div className="h-4 skeleton-shimmer rounded w-3/4" />
            <div className="h-3 skeleton-shimmer rounded w-1/2" />
          </div>
          <div className="h-4 skeleton-shimmer rounded w-16" />
          <div className="h-4 skeleton-shimmer rounded w-20" />
          <div className="h-4 skeleton-shimmer rounded w-24" />
          <div className="h-6 skeleton-shimmer rounded-full w-20" />
        </div>
      ))}
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-card border rounded-xl p-4 animate-fade-in">
      <div className="aspect-square skeleton-shimmer rounded-lg mb-4" />
      <div className="space-y-2">
        <div className="h-4 skeleton-shimmer rounded w-3/4" />
        <div className="h-4 skeleton-shimmer rounded w-1/2" />
        <div className="flex justify-between items-center mt-3">
          <div className="h-5 skeleton-shimmer rounded w-16" />
          <div className="h-6 skeleton-shimmer rounded-full w-20" />
        </div>
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="animate-fade-in">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="aspect-square skeleton-shimmer rounded-xl" />
        {/* Details */}
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="h-8 skeleton-shimmer rounded w-3/4" />
            <div className="h-5 skeleton-shimmer rounded w-1/4" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 skeleton-shimmer rounded w-24" />
            <div className="h-6 skeleton-shimmer rounded-full w-16" />
          </div>
          <div className="space-y-2">
            <div className="h-4 skeleton-shimmer rounded w-full" />
            <div className="h-4 skeleton-shimmer rounded w-full" />
            <div className="h-4 skeleton-shimmer rounded w-3/4" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 skeleton-shimmer rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="bg-card border rounded-xl p-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 skeleton-shimmer rounded-lg" />
        <div className="space-y-2 flex-1">
          <div className="h-5 skeleton-shimmer rounded w-24" />
          <div className="h-4 skeleton-shimmer rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
