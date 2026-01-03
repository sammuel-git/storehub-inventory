import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Search } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { CategoryCard } from '@/components/products/CategoryCard';
import { ProductTable } from '@/components/products/ProductTable';
import { Pagination } from '@/components/products/Pagination';
import { CategoryCardSkeleton, ProductTableSkeleton } from '@/components/ui/product-skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { Input } from '@/components/ui/input';
import { useCategories, useProductsByCategory } from '@/hooks/useProducts';
import { useDebounce } from '@/hooks/useDebounce';

const ITEMS_PER_PAGE = 20;

export default function Catalogue() {
  const { category } = useParams<{ category?: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: categories = [], isLoading: isLoadingCategories, error: categoriesError, refetch: refetchCategories } = useCategories();
  
  const { 
    data: categoryProducts, 
    isLoading: isLoadingProducts, 
    error: productsError,
    refetch: refetchProducts 
  } = useProductsByCategory(category || '', {
    limit: 100,
    sortBy,
    order: sortOrder,
  });

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  };

  // Filter and paginate products
  const { paginatedProducts, totalPages, totalItems } = useMemo(() => {
    let filtered = categoryProducts?.products || [];

    // Filter by search
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.brand?.toLowerCase().includes(query)
      );
    }

    const total = filtered.length;
    const pages = Math.ceil(total / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

    return { paginatedProducts: paginated, totalPages: pages, totalItems: total };
  }, [categoryProducts, debouncedSearch, currentPage]);

  // Category Overview (no category selected)
  if (!category) {
    return (
      <div className="page-container">
        <Header showSearch={false} />
        
        <div className="content-container">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2">Catalogue Overview</h1>
            <p className="text-muted-foreground">Explore your product categories</p>
          </div>

          {categoriesError && (
            <ErrorState
              title="Failed to load categories"
              message="We couldn't fetch the category data. Please try again."
              onRetry={refetchCategories}
              variant="network"
            />
          )}

          {isLoadingCategories && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <CategoryCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!isLoadingCategories && !categoriesError && categories.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {categories.map((cat) => (
                <CategoryCard key={cat.slug} category={cat} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Category Drill-Down View
  const currentCategory = categories.find(c => c.slug === category);

  return (
    <div className="page-container">
      <Header showSearch={false} />
      
      <div className="content-container">
        {/* Back Link */}
        <Link
          to="/catalogue"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Categories
        </Link>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2 capitalize">
            {currentCategory?.name || category.replace('-', ' ')}
          </h1>
          <p className="text-muted-foreground">
            {totalItems} products in this category
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search in this category..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 w-full max-w-md"
            />
          </div>
        </div>

        {/* Error State */}
        {productsError && (
          <ErrorState
            title="Failed to load products"
            message="We couldn't fetch the products for this category. Please try again."
            onRetry={refetchProducts}
            variant="network"
          />
        )}

        {/* Loading State */}
        {isLoadingProducts && <ProductTableSkeleton rows={10} />}

        {/* Products Table */}
        {!isLoadingProducts && !productsError && paginatedProducts.length > 0 && (
          <>
            <ProductTable
              products={paginatedProducts}
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSort={handleSort}
            />
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}

        {/* Empty State */}
        {!isLoadingProducts && !productsError && paginatedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {debouncedSearch 
                ? 'No products found matching your search.' 
                : 'No products in this category.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
