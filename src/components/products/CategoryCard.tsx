import { Link } from 'react-router-dom';
import { type Category } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Laptop, 
  Smartphone, 
  Watch, 
  Shirt, 
  Gem, 
  Car, 
  Home, 
  Flower2,
  Dumbbell,
  Baby,
  ShoppingBag,
  Utensils,
  Palette,
  Glasses,
  Sparkles,
  LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
  className?: string;
}

const categoryIcons: Record<string, LucideIcon> = {
  'laptops': Laptop,
  'smartphones': Smartphone,
  'tablets': Laptop,
  'watches': Watch,
  'mens-watches': Watch,
  'womens-watches': Watch,
  'mens-shirts': Shirt,
  'mens-shoes': ShoppingBag,
  'womens-dresses': Shirt,
  'womens-shoes': ShoppingBag,
  'womens-bags': ShoppingBag,
  'womens-jewellery': Gem,
  'sunglasses': Glasses,
  'automotive': Car,
  'motorcycle': Car,
  'furniture': Home,
  'home-decoration': Home,
  'kitchen-accessories': Utensils,
  'groceries': Utensils,
  'beauty': Sparkles,
  'skin-care': Flower2,
  'fragrances': Sparkles,
  'sports-accessories': Dumbbell,
  'tops': Shirt,
  'mobile-accessories': Smartphone,
};

const categoryColors: Record<string, string> = {
  'laptops': 'bg-blue-100 text-blue-600',
  'smartphones': 'bg-purple-100 text-purple-600',
  'tablets': 'bg-indigo-100 text-indigo-600',
  'watches': 'bg-amber-100 text-amber-600',
  'mens-watches': 'bg-amber-100 text-amber-600',
  'womens-watches': 'bg-rose-100 text-rose-600',
  'mens-shirts': 'bg-cyan-100 text-cyan-600',
  'mens-shoes': 'bg-slate-100 text-slate-600',
  'womens-dresses': 'bg-pink-100 text-pink-600',
  'womens-shoes': 'bg-red-100 text-red-600',
  'womens-bags': 'bg-orange-100 text-orange-600',
  'womens-jewellery': 'bg-yellow-100 text-yellow-600',
  'sunglasses': 'bg-sky-100 text-sky-600',
  'automotive': 'bg-zinc-100 text-zinc-600',
  'motorcycle': 'bg-stone-100 text-stone-600',
  'furniture': 'bg-emerald-100 text-emerald-600',
  'home-decoration': 'bg-teal-100 text-teal-600',
  'kitchen-accessories': 'bg-lime-100 text-lime-600',
  'groceries': 'bg-green-100 text-green-600',
  'beauty': 'bg-fuchsia-100 text-fuchsia-600',
  'skin-care': 'bg-violet-100 text-violet-600',
  'fragrances': 'bg-rose-100 text-rose-600',
  'sports-accessories': 'bg-orange-100 text-orange-600',
  'tops': 'bg-indigo-100 text-indigo-600',
  'mobile-accessories': 'bg-blue-100 text-blue-600',
};

export function CategoryCard({ category, productCount, className }: CategoryCardProps) {
  const Icon = categoryIcons[category.slug] || ShoppingBag;
  const colorClass = categoryColors[category.slug] || 'bg-primary/10 text-primary';

  return (
    <Link to={`/catalogue/${category.slug}`}>
      <Card className={cn(
        'group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer',
        className
      )}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', colorClass)}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold capitalize group-hover:text-primary transition-colors truncate">
                {category.name}
              </h3>
              {productCount !== undefined && (
                <p className="text-sm text-muted-foreground">
                  {productCount} items
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
