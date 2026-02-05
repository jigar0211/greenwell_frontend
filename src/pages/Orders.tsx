import { useState } from 'react';
import { Search, Filter, Download, Plus, Calendar, MapPin, User, MoreHorizontal, Eye, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderModal } from '@/components/modals/OrderModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

const statusColors = {
  pending: 'bg-muted text-muted-foreground',
  confirmed: 'bg-primary/10 text-primary',
  packed: 'bg-chart-4/10 text-chart-4',
  dispatched: 'bg-warning/10 text-warning',
  delivered: 'bg-success/10 text-success',
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredOrders = orders.filter(order =>
    order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Orders List</h1>
          <p className="text-muted-foreground mt-1">Manage and view all customer orders</p>
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
      <div className="bg-card rounded-xl border border-border card-shadow p-4">
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders, customers, or cities..."
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
            <button className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-border bg-card card-shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              filteredOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{order.customer}</span>
                      <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                        {order.products.slice(0, 2).join(', ')}
                        {order.products.length > 2 && ` +${order.products.length - 2} more`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.city}</TableCell>
                  <TableCell>
                    <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium capitalize", statusColors[order.status])}>
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="font-semibold">{order.total}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="h-8 w-8 p-0 hover:bg-secondary rounded-md inline-flex items-center justify-center transition-colors">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Truck className="mr-2 h-4 w-4" /> Track Order
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
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
