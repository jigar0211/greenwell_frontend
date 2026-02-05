import { cn } from '@/lib/utils';

interface Order {
  id: string;
  customer: string;
  products: number;
  total: string;
  status: 'pending' | 'confirmed' | 'packed' | 'dispatched' | 'delivered';
  date: string;
}

const statusColors = {
  pending: 'bg-muted text-muted-foreground',
  confirmed: 'bg-primary/10 text-primary',
  packed: 'bg-chart-4/10 text-chart-4',
  dispatched: 'bg-warning/10 text-warning',
  delivered: 'bg-success/10 text-success',
};

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  return (
    <div className="bg-card rounded-xl border border-border card-shadow">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Recent Orders</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View all
        </button>
      </div>
      <div className="divide-y divide-border">
        {orders.map((order) => (
          <div key={order.id} className="px-5 py-4 hover:bg-secondary/30 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">#{order.id}</span>
                  <span className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize",
                    statusColors[order.status]
                  )}>
                    {order.status}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{order.customer}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{order.total}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{order.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
