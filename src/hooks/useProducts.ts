import { useQuery } from '@tanstack/react-query';
import {
  fetchProducts,
  fetchProductById,
  searchProducts,
  fetchCategories,
  fetchProductsByCategory,
  type ProductsResponse,
  type Product,
  type Category,
} from '@/lib/api';

export function useProducts(params: {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useProduct(id: number) {
  return useQuery<Product>({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSearchProducts(query: string, limit = 20) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', 'search', query, limit],
    queryFn: () => searchProducts(query, limit),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000,
  });
}

export function useCategories() {
  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useProductsByCategory(
  category: string,
  params: { limit?: number; skip?: number; sortBy?: string; order?: 'asc' | 'desc' } = {}
) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', 'category', category, params],
    queryFn: () => fetchProductsByCategory(category, params),
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}

export function useSimilarProducts(category: string, excludeId: number) {
  return useQuery<ProductsResponse>({
    queryKey: ['products', 'similar', category, excludeId],
    queryFn: async () => {
      const result = await fetchProductsByCategory(category, { limit: 7 });
      return {
        ...result,
        products: result.products.filter(p => p.id !== excludeId).slice(0, 6),
      };
    },
    enabled: !!category,
    staleTime: 5 * 60 * 1000,
  });
}
