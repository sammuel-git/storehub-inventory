const BASE_URL = 'https://dummyjson.com';

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export async function fetchProducts(params: {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
  select?: string[];
}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.skip) searchParams.set('skip', params.skip.toString());
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.order) searchParams.set('order', params.order);
  if (params.select?.length) searchParams.set('select', params.select.join(','));

  const response = await fetch(`${BASE_URL}/products?${searchParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
}

export async function searchProducts(query: string, limit = 20): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  if (!response.ok) throw new Error('Failed to search products');
  return response.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function fetchProductsByCategory(
  category: string,
  params: { limit?: number; skip?: number; sortBy?: string; order?: 'asc' | 'desc' } = {}
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();
  
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.skip) searchParams.set('skip', params.skip.toString());
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.order) searchParams.set('order', params.order);

  const response = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}?${searchParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch products by category');
  return response.json();
}

export function getStockStatus(stock: number): 'in-stock' | 'low-stock' | 'out-of-stock' {
  if (stock === 0) return 'out-of-stock';
  if (stock <= 10) return 'low-stock';
  return 'in-stock';
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
