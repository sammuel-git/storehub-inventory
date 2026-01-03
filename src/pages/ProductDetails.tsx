import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Package, Truck, Shield, RotateCcw } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { ProductCard } from '@/components/products/ProductCard';
import { StockBadge } from '@/components/ui/stock-badge';
import { Rating } from '@/components/ui/rating';
import { ProductDetailSkeleton, ProductGridSkeleton } from '@/components/ui/product-skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useProduct, useSimilarProducts } from '@/hooks/useProducts';
import { getStockStatus, formatPrice } from '@/lib/api';
import { cn } from '@/lib/utils';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0', 10);
  
  const { data: product, isLoading, error, refetch } = useProduct(productId);
  const { data: similarData, isLoading: isLoadingSimilar } = useSimilarProducts(
    product?.category || '',
    productId
  );

  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="page-container">
        <Header showSearch={false} />
        <div className="content-container">
          <ProductDetailSkeleton />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="page-container">
        <Header showSearch={false} />
        <div className="content-container">
          <ErrorState
            title="Product not found"
            message="We couldn't find this product. It may have been removed or the link is incorrect."
            onRetry={refetch}
          />
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.stock);
  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="page-container">
      <Header showSearch={false} />
      
      <div className="content-container">
        {/* Back Link */}
        <Link
          to="/inventory"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Inventory
        </Link>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 animate-fade-in">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-card border rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImage] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      'w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all',
                      selectedImage === i
                        ? 'border-primary ring-2 ring-primary/20'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="capitalize">
                  {product.category.replace('-', ' ')}
                </Badge>
                {product.brand && (
                  <span className="text-muted-foreground">{product.brand}</span>
                )}
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-3">{product.title}</h1>
              <Rating value={product.rating} size="lg" />
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-primary">
                {formatPrice(discountedPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                  <Badge className="bg-success text-success-foreground">
                    {Math.round(product.discountPercentage)}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3">
              <StockBadge status={stockStatus} stock={product.stock} />
              <span className="text-sm text-muted-foreground">
                {product.availabilityStatus}
              </span>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4 py-4 border-t border-b">
              <div>
                <span className="text-sm text-muted-foreground">SKU</span>
                <p className="font-medium">{product.sku}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Weight</span>
                <p className="font-medium">{product.weight}g</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Dimensions</span>
                <p className="font-medium">
                  {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                </p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Min. Order</span>
                <p className="font-medium">{product.minimumOrderQuantity} units</p>
              </div>
            </div>

            {/* Policies */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Shipping</p>
                  <p className="text-xs text-muted-foreground">{product.shippingInformation}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Warranty</p>
                  <p className="text-xs text-muted-foreground">{product.warrantyInformation}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg col-span-2">
                <RotateCcw className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Returns</p>
                  <p className="text-xs text-muted-foreground">{product.returnPolicy}</p>
                </div>
              </div>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        <section className="mt-16">
          <h2 className="text-xl font-bold mb-6">Browse Similar Products</h2>
          {isLoadingSimilar ? (
            <ProductGridSkeleton count={6} />
          ) : similarData?.products && similarData.products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {similarData.products.map((p) => (
                <ProductCard key={p.id} product={p} variant="compact" />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No similar products found.</p>
          )}
        </section>
      </div>
    </div>
  );
}
