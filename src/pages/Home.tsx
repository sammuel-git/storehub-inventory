import { Link } from 'react-router-dom';
import { Package, LayoutGrid, ArrowRight, BarChart3, Box, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Header } from '@/components/layout/Header';

const features = [
  {
    icon: Package,
    title: 'Inventory Management',
    description: 'Browse and manage your complete product inventory with powerful filtering and sorting.',
  },
  {
    icon: LayoutGrid,
    title: 'Category Overview',
    description: 'Explore products organized by categories with visual drill-down navigation.',
  },
  {
    icon: BarChart3,
    title: 'Stock Monitoring',
    description: 'Real-time stock status tracking with visual indicators for quick decisions.',
  },
];

const stats = [
  { label: 'Products', value: '500+', icon: Box },
  { label: 'Categories', value: '20+', icon: LayoutGrid },
  { label: 'Active Users', value: '1.2K', icon: Users },
];

export default function Home() {
  return (
    <div className="page-container">
      <Header showSearch={false} />
      
      {/* Hero Section */}
      <section className="bg-header text-header-foreground py-16 lg:py-24">
        <div className="content-container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary-foreground mb-6">
              <Package className="w-4 h-4" />
              <span className="text-sm font-medium">StoreDB Admin Portal</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Modern Inventory Management for Your Store
            </h1>
            <p className="text-lg text-header-foreground/80 mb-8 max-w-2xl mx-auto">
              A fast, intuitive dashboard for store managers to browse, analyze, and manage product inventory across all categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/inventory">
                <Button size="lg" className="w-full sm:w-auto gap-2">
                  View Inventory
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/catalogue">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent border-header-foreground/30 text-header-foreground hover:bg-header-foreground/10">
                  Browse Catalogue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="content-container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage your store inventory efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary/5">
        <div className="content-container">
          <Card className="bg-header text-header-foreground">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-header-foreground/80 mb-6 max-w-lg mx-auto">
                Explore your product inventory or browse categories to find exactly what you're looking for.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/inventory">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                    <Package className="w-4 h-4" />
                    Inventory Overview
                  </Button>
                </Link>
                <Link to="/catalogue">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2 bg-transparent border-header-foreground/30 text-header-foreground hover:bg-header-foreground/10">
                    <LayoutGrid className="w-4 h-4" />
                    Catalogue Overview
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="content-container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold">StoreDB</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 StoreDB Admin Portal. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
