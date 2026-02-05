import { Plus, Package, ShoppingCart, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const actions = [
  { icon: Plus, label: 'Add Product', path: '/products/new', color: 'bg-primary text-primary-foreground' },
  { icon: ShoppingCart, label: 'New Order', path: '/orders/new', color: 'bg-success text-success-foreground' },
  { icon: Users, label: 'Add Party', path: '/parties/new', color: 'bg-chart-4 text-white' },
  { icon: FileText, label: 'Generate Report', path: '/reports', color: 'bg-warning text-warning-foreground' },
];

export function QuickActions() {
  return (
    <div className="bg-card rounded-xl border border-border card-shadow p-5">
      <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
          >
            <div className={`p-2 rounded-lg ${action.color} transition-transform group-hover:scale-105`}>
              <action.icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-foreground">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
