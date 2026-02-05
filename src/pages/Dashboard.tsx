import { Package, ShoppingCart, Users, TrendingUp, AlertTriangle, IndianRupee } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ProductTable } from '@/components/dashboard/ProductTable';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import { QuickActions } from '@/components/dashboard/QuickActions';

const stats = [
  { title: 'Total Products', value: '1,284', change: '+12% from last month', changeType: 'positive' as const, icon: Package, iconColor: 'text-primary' },
  { title: 'Total Orders', value: '856', change: '+8% from last month', changeType: 'positive' as const, icon: ShoppingCart, iconColor: 'text-success' },
  { title: 'Active Parties', value: '342', change: '+5% from last month', changeType: 'positive' as const, icon: Users, iconColor: 'text-chart-4' },
  { title: 'Revenue', value: '₹12.4L', change: '+15% from last month', changeType: 'positive' as const, icon: IndianRupee, iconColor: 'text-warning' },
];

const topSellingProducts = [
  { id: '1', name: 'Premium Widget A', sku: 'PWA-001', stock: 145, sold: 892, revenue: '₹4.2L', status: 'in-stock' as const },
  { id: '2', name: 'Standard Gadget B', sku: 'SGB-002', stock: 89, sold: 654, revenue: '₹2.8L', status: 'in-stock' as const },
  { id: '3', name: 'Deluxe Component C', sku: 'DCC-003', stock: 23, sold: 445, revenue: '₹1.9L', status: 'low-stock' as const },
  { id: '4', name: 'Basic Part D', sku: 'BPD-004', stock: 234, sold: 398, revenue: '₹1.2L', status: 'in-stock' as const },
];

const lowStockProducts = [
  { id: '5', name: 'Critical Item E', sku: 'CIE-005', stock: 5, sold: 120, revenue: '₹45K', status: 'low-stock' as const },
  { id: '6', name: 'Essential Part F', sku: 'EPF-006', stock: 8, sold: 89, revenue: '₹32K', status: 'low-stock' as const },
  { id: '7', name: 'Key Component G', sku: 'KCG-007', stock: 0, sold: 156, revenue: '₹58K', status: 'out-of-stock' as const },
  { id: '8', name: 'Vital Widget H', sku: 'VWH-008', stock: 12, sold: 67, revenue: '₹28K', status: 'low-stock' as const },
];

const recentOrders = [
  { id: 'ORD-1234', customer: 'Rajesh Kumar', products: 3, total: '₹12,450', status: 'pending' as const, date: '2 min ago' },
  { id: 'ORD-1233', customer: 'Priya Sharma', products: 5, total: '₹28,900', status: 'confirmed' as const, date: '15 min ago' },
  { id: 'ORD-1232', customer: 'Amit Patel', products: 2, total: '₹8,750', status: 'packed' as const, date: '1 hour ago' },
  { id: 'ORD-1231', customer: 'Sunita Verma', products: 4, total: '₹15,200', status: 'dispatched' as const, date: '3 hours ago' },
  { id: 'ORD-1230', customer: 'Vikram Singh', products: 1, total: '₹5,500', status: 'delivered' as const, date: '5 hours ago' },
];

export default function Dashboard() {
  return (
    <div className="space-y-2 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Low Stock Alert Banner */}
      <div className="bg-warning/10 border border-warning/20 rounded-xl p-2 flex items-center gap-3">
        <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">Low Stock Alert</p>
          <p className="text-sm text-muted-foreground">7 products are running low on stock. Consider restocking soon.</p>
        </div>
        <button className="px-4 py-2 text-sm font-medium text-warning hover:text-warning/80 transition-colors">
          View Products
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Left Column - Tables */}
        <div className="lg:col-span-2 space-y-2">
          <ProductTable
            title="Top Selling Products"
            products={topSellingProducts}
            type="top-selling"
          />
          <ProductTable
            title="Low Stock Alerts"
            products={lowStockProducts}
            type="low-stock"
          />
        </div>

        {/* Right Column - Orders & Actions */}
        <div className="space-y-2">
          <QuickActions />
          <RecentOrders orders={recentOrders} />
        </div>
      </div>
    </div>
  );
}
