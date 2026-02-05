import { useState } from 'react';
import { Search, Filter, Download, Plus, Calendar, MapPin, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderModal } from '@/components/modals/OrderModal';

interface Order {
  id: string;
  customer: string;
  products: string[];
  total: string;
  status: 'pending' | 'confirmed' | 'packed' | 'dispatched' | 'delivered';
  date: string;
  city: string;
  marketingPerson: string;
}

const mockOrders: Order[] = [
  { id: 'ORD-1234', customer: 'Rajesh Kumar', products: ['Widget A', 'Gadget B'], total: '₹12,450', status: 'pending', date: '2024-01-15', city: 'Mumbai', marketingPerson: 'Amit S.' },
  { id: 'ORD-1233', customer: 'Priya Sharma', products: ['Component C', 'Part D', 'Item E'], total: '₹28,900', status: 'confirmed', date: '2024-01-15', city: 'Delhi', marketingPerson: 'Neha P.' },
  { id: 'ORD-1232', customer: 'Amit Patel', products: ['Widget H'], total: '₹8,750', status: 'packed', date: '2024-01-14', city: 'Ahmedabad', marketingPerson: 'Raj K.' },
  { id: 'ORD-1231', customer: 'Sunita Verma', products: ['Gadget B', 'Component G'], total: '₹15,200', status: 'dispatched', date: '2024-01-14', city: 'Bangalore', marketingPerson: 'Amit S.' },
  { id: 'ORD-1230', customer: 'Vikram Singh', products: ['Part F'], total: '₹5,500', status: 'delivered', date: '2024-01-13', city: 'Chennai', marketingPerson: 'Neha P.' },
  { id: 'ORD-1229', customer: 'Anita Desai', products: ['Widget A', 'Item E', 'Part D'], total: '₹19,800', status: 'pending', date: '2024-01-13', city: 'Pune', marketingPerson: 'Raj K.' },
  { id: 'ORD-1228', customer: 'Suresh Reddy', products: ['Component C'], total: '₹6,200', status: 'confirmed', date: '2024-01-12', city: 'Hyderabad', marketingPerson: 'Amit S.' },
];

const statusColumns = [
  { id: 'pending', label: 'Pending', color: 'bg-muted' },
  { id: 'confirmed', label: 'Confirmed', color: 'bg-primary/10' },
  { id: 'packed', label: 'Packed', color: 'bg-chart-4/10' },
  { id: 'dispatched', label: 'Dispatched', color: 'bg-warning/10' },
  { id: 'delivered', label: 'Delivered', color: 'bg-success/10' },
];

const statusColors = {
  pending: 'border-muted-foreground/30 bg-muted',
  confirmed: 'border-primary/30 bg-primary/5',
  packed: 'border-chart-4/30 bg-chart-4/5',
  dispatched: 'border-warning/30 bg-warning/5',
  delivered: 'border-success/30 bg-success/5',
};

const statusTextColors = {
  pending: 'text-muted-foreground',
  confirmed: 'text-primary',
  packed: 'text-chart-4',
  dispatched: 'text-warning',
  delivered: 'text-success',
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedOrder, setDraggedOrder] = useState<Order | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleDragStart = (order: Order) => {
    setDraggedOrder(order);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: Order['status']) => {
    if (draggedOrder) {
      setOrders(orders.map(order =>
        order.id === draggedOrder.id ? { ...order, status } : order
      ));
      setDraggedOrder(null);
    }
  };

  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => {
      const matchesSearch = order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id.toLowerCase().includes(searchQuery.toLowerCase());
      return order.status === status && matchesSearch;
    });
  };

  return (
    <div className="space-y-2 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Orders</h1>
          <p className="text-muted-foreground mt-1">Track and manage order workflow</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm hover:bg-secondary/80 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Order
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border card-shadow p-2">
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              <MapPin className="w-4 h-4" />
              Location
            </button>
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              <User className="w-4 h-4" />
              Marketing
            </button>
            <button className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 overflow-x-auto pb-4">
        {statusColumns.map((column) => (
          <div
            key={column.id}
            className="min-w-[280px]"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id as Order['status'])}
          >
            <div className={cn("rounded-t-xl px-4 py-3", column.color)}>
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-foreground text-sm">{column.label}</h3>
                <span className="px-2 py-0.5 rounded-full bg-card text-xs font-medium text-foreground">
                  {getOrdersByStatus(column.id as Order['status']).length}
                </span>
              </div>
            </div>
            <div className="bg-secondary/30 rounded-b-xl p-3 min-h-[400px] space-y-3">
              {getOrdersByStatus(column.id as Order['status']).map((order) => (
                <div
                  key={order.id}
                  draggable
                  onDragStart={() => handleDragStart(order)}
                  className={cn(
                    "bg-card rounded-lg p-2 border-l-4 cursor-grab active:cursor-grabbing card-shadow hover:card-shadow-lg transition-all",
                    statusColors[order.status]
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={cn("text-xs font-semibold", statusTextColors[order.status])}>
                      {order.id}
                    </span>
                    <span className="text-xs text-muted-foreground">{order.date}</span>
                  </div>
                  <h4 className="font-medium text-foreground text-sm mb-1">{order.customer}</h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {order.products.slice(0, 2).join(', ')}
                    {order.products.length > 2 && ` +${order.products.length - 2} more`}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {order.city}
                    </div>
                    <span className="text-sm font-semibold text-foreground">{order.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode="add"
      />
    </div>
  );
}
