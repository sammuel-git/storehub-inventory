import { Link, useLocation } from 'react-router-dom';
import { Package, Search, Bell, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeaderProps {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
}

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Inventory', path: '/inventory' },
  { label: 'Catalogue', path: '/catalogue' },
];

export function Header({ searchValue, onSearchChange, showSearch = true }: HeaderProps) {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-header text-header-foreground shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-lg hidden sm:inline">StoreDB</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-header-foreground/80 hover:text-header-foreground hover:bg-sidebar-accent'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search & Actions */}
          <div className="flex items-center gap-3">
            {showSearch && onSearchChange && (
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="w-64 pl-9 bg-sidebar-accent border-sidebar-border text-header-foreground placeholder:text-muted-foreground"
                />
              </div>
            )}
            <Button variant="ghost" size="icon" className="text-header-foreground/80 hover:text-header-foreground">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-header-foreground/80 hover:text-header-foreground">
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-sidebar-border">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'px-4 py-2 text-sm font-medium transition-colors',
                location.pathname === item.path
                  ? 'text-primary'
                  : 'text-header-foreground/70'
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
