import { useState, useMemo, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { ProductTable } from '@/components/products/ProductTable';
import { CategoryFilter } from '@/components/products/CategoryFilter';
import { Pagination } from '@/components/products/Pagination';
import { ProductTableSkeleton } from '@/components/ui/product-skeleton';
import { ErrorState } from '@/components/ui/error-state';
import { Input } from '@/components/ui/input';
import { useProducts, useCategories, useSearchProducts } from '@/hooks/useProducts';
import { useDebounce } from '@/hooks/useDebounce';

const ITEMS_PER_PAGE = 20;

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('title');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(searchQuery, 300);

  // Fetch all products for browsing
  const { 
    data: productsData, 
    isLoading: isLoadingProducts, 
    error: productsError,
    refetch: refetchProducts 
  } = useProducts({
    limit: 194, // Get all products for client-side filtering
    sortBy,
    order: sortOrder,
  });

  // Search products when there's a search query
  const { 
    data: searchData, 
    isLoading: isSearching 
  } = useSearchProducts(debouncedSearch, 100);

  const { data: categories = [] } = useCategories();

  const handleSort = useCallback((field: string) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setCurrentPage(1);
  }, [sortBy]);

  const handleCategoryChange = useCallback((newCategories: string[]) => {
    setSelectedCategories(newCategories);
    setCurrentPage(1);
  }, []);

  // Filter and paginate products
  const { paginatedProducts, totalPages, totalItems } = useMemo(() => {
    const sourceData = debouncedSearch ? searchData : productsData;
    let filtered = sourceData?.products || [];

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    // Sort (already sorted by API for main list, need to sort search results)
    if (debouncedSearch) {
      filtered = [...filtered].sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'price') {
          comparison = a.price - b.price;
        } else if (sortBy === 'stock') {
          comparison = a.stock - b.stock;
        } else {
          comparison = a.title.localeCompare(b.title);
        }
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }

    const total = filtered.length;
    const pages = Math.ceil(total / ITEMS_PER_PAGE);
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginated = filtered.slice(start, start + ITEMS_PER_PAGE);

    return { paginatedProducts: paginated, totalPages: pages, totalItems: total };
  }, [productsData, searchData, debouncedSearch, selectedCategories, sortBy, sortOrder, currentPage]);

  const isLoading = isLoadingProducts || (debouncedSearch && isSearching);

  return (
    <div className="page-container">
      <Header showSearch={false} />
      
      <div className="content-container">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Inventory Overview</h1>
          <p className="text-muted-foreground">Scan your complete stock</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <CategoryFilter
              categories={categories}
              selected={selectedCategories}
              onChange={handleCategoryChange}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products by name..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 w-full max-w-md"
                />
              </div>
            </div>

            {/* Results Info */}
            {!isLoading && !productsError && (
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} items
              </div>
            )}

            {/* Error State */}
            {productsError && (
              <ErrorState
                title="Failed to load inventory"
                message="We couldn't fetch the product data. Please check your connection and try again."
                onRetry={refetchProducts}
                variant="network"
              />
            )}

            {/* Loading State */}
            {isLoading && <ProductTableSkeleton rows={10} />}

            {/* Products Table */}
            {!isLoading && !productsError && paginatedProducts.length > 0 && (
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
            {!isLoading && !productsError && paginatedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found matching your criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
