import { Link } from 'react-router-dom';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { type Product, getStockStatus, formatPrice } from '@/lib/api';
import { StockBadge } from '@/components/ui/stock-badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface ProductTableProps {
  products: Product[];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  onSort: (field: string) => void;
}

export function ProductTable({ products, sortBy, sortOrder, onSort }: ProductTableProps) {
  const SortIcon = ({ field }: { field: string }) => {
    if (sortBy !== field) return <ArrowUpDown className="w-4 h-4 ml-1 opacity-50" />;
    return sortOrder === 'asc' 
      ? <ArrowUp className="w-4 h-4 ml-1" /> 
      : <ArrowDown className="w-4 h-4 ml-1" />;
  };

  const SortButton = ({ field, children }: { field: string; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => onSort(field)}
      className={cn(
        '-ml-3 h-8 font-medium',
        sortBy === field && 'text-primary'
      )}
    >
      {children}
      <SortIcon field={field} />
    </Button>
  );

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-16">Image</TableHead>
            <TableHead>
              <SortButton field="title">Name</SortButton>
            </TableHead>
            <TableHead>
              <SortButton field="price">Price</SortButton>
            </TableHead>
            <TableHead className="hidden md:table-cell">Brand</TableHead>
            <TableHead className="hidden sm:table-cell">Category</TableHead>
            <TableHead>
              <SortButton field="stock">Stock</SortButton>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock);
            return (
              <TableRow key={product.id} className="group">
                <TableCell>
                  <Link to={`/products/${product.id}`}>
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        loading="lazy"
                      />
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <Link 
                    to={`/products/${product.id}`}
                    className="font-medium hover:text-primary transition-colors line-clamp-2"
                  >
                    {product.title}
                  </Link>
                </TableCell>
                <TableCell className="font-semibold">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {product.brand || '—'}
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground capitalize">
                    {product.category.replace('-', ' ')}
                  </span>
                </TableCell>
                <TableCell>
                  <StockBadge status={stockStatus} stock={product.stock} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
