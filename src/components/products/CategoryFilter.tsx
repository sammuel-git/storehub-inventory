import { type Category } from '@/lib/api';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: Category[];
  selected: string[];
  onChange: (categories: string[]) => void;
  className?: string;
}

export function CategoryFilter({ categories, selected, onChange, className }: CategoryFilterProps) {
  const handleToggle = (slug: string) => {
    if (selected.includes(slug)) {
      onChange(selected.filter(s => s !== slug));
    } else {
      onChange([...selected, slug]);
    }
  };

  return (
    <div className={cn('bg-card border rounded-lg p-4', className)}>
      <h3 className="font-semibold mb-4">Category Filters</h3>
      <ScrollArea className="h-64">
        <div className="space-y-3 pr-4">
          {categories.map((category) => (
            <div key={category.slug} className="flex items-center space-x-2">
              <Checkbox
                id={category.slug}
                checked={selected.includes(category.slug)}
                onCheckedChange={() => handleToggle(category.slug)}
              />
              <Label
                htmlFor={category.slug}
                className="text-sm font-normal cursor-pointer capitalize"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
      {selected.length > 0 && (
        <button
          onClick={() => onChange([])}
          className="mt-4 text-sm text-primary hover:underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
