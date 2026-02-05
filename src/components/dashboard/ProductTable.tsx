import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  sku: string;
  stock: number;
  sold: number;
  revenue: string;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
}

interface ProductTableProps {
  title: string;
  products: Product[];
  type: 'top-selling' | 'low-moving' | 'low-stock';
}

export function ProductTable({ title, products, type }: ProductTableProps) {
  return (
    <div className="bg-card rounded-xl border border-border card-shadow">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          {type === 'top-selling' && <TrendingUp className="w-4 h-4 text-success" />}
          {type === 'low-moving' && <TrendingDown className="w-4 h-4 text-warning" />}
          {type === 'low-stock' && <AlertTriangle className="w-4 h-4 text-destructive" />}
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View all
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              <th className="px-5 py-3">Product</th>
              <th className="px-5 py-3">Stock</th>
              <th className="px-5 py-3">Sold</th>
              <th className="px-5 py-3">Revenue</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                <td className="px-5 py-3.5">
                  <div>
                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.sku}</p>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-sm text-foreground">{product.stock}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-sm text-foreground">{product.sold}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="text-sm font-medium text-foreground">{product.revenue}</span>
                </td>
                <td className="px-5 py-3.5">
                  <span className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    product.status === 'in-stock' && "bg-success/10 text-success",
                    product.status === 'low-stock' && "bg-warning/10 text-warning",
                    product.status === 'out-of-stock' && "bg-destructive/10 text-destructive"
                  )}>
                    {product.status === 'in-stock' && 'In Stock'}
                    {product.status === 'low-stock' && 'Low Stock'}
                    {product.status === 'out-of-stock' && 'Out of Stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
