import { useState } from 'react';
import { Search, Plus, Filter, Download, MoreHorizontal, Package, Edit, Trash2, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductModal } from '@/components/modals/ProductModal';

interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: number;
  minStock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

const mockProducts: Product[] = [
  { id: '1', name: 'Premium Widget A', sku: 'PWA-001', category: 'Widgets', price: '₹4,500', stock: 145, minStock: 20, status: 'in-stock', lastUpdated: '2 hours ago' },
  { id: '2', name: 'Standard Gadget B', sku: 'SGB-002', category: 'Gadgets', price: '₹2,800', stock: 89, minStock: 30, status: 'in-stock', lastUpdated: '5 hours ago' },
  { id: '3', name: 'Deluxe Component C', sku: 'DCC-003', category: 'Components', price: '₹1,900', stock: 23, minStock: 25, status: 'low-stock', lastUpdated: '1 day ago' },
  { id: '4', name: 'Basic Part D', sku: 'BPD-004', category: 'Parts', price: '₹1,200', stock: 234, minStock: 50, status: 'in-stock', lastUpdated: '3 days ago' },
  { id: '5', name: 'Critical Item E', sku: 'CIE-005', category: 'Items', price: '₹3,750', stock: 5, minStock: 15, status: 'low-stock', lastUpdated: '1 hour ago' },
  { id: '6', name: 'Essential Part F', sku: 'EPF-006', category: 'Parts', price: '₹2,100', stock: 0, minStock: 20, status: 'out-of-stock', lastUpdated: '6 hours ago' },
  { id: '7', name: 'Key Component G', sku: 'KCG-007', category: 'Components', price: '₹5,200', stock: 67, minStock: 30, status: 'in-stock', lastUpdated: '2 days ago' },
  { id: '8', name: 'Vital Widget H', sku: 'VWH-008', category: 'Widgets', price: '₹3,900', stock: 12, minStock: 20, status: 'low-stock', lastUpdated: '4 hours ago' },
];

const categories = ['All', 'Widgets', 'Gadgets', 'Components', 'Parts', 'Items'];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products] = useState<Product[]>(mockProducts);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    setModalMode('add');
    setSelectedProduct(undefined);
    setModalOpen(true);
  };

  const handleEdit = (product: Product) => {
    setModalMode('edit');
    setSelectedProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="space-y-2 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your inventory and stock levels</p>
        </div>
        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border card-shadow p-2">
        <div className="flex flex-col lg:flex-row gap-2">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-2.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors">
              <Download className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-card rounded-xl border border-border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-foreground transition-colors">
                    Product <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Category</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Price</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Stock</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3 hidden md:table-cell">Updated</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-secondary/30 transition-colors group">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-foreground">{product.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-foreground">{product.price}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-foreground">{product.stock}</span>
                      <span className="text-xs text-muted-foreground hidden sm:inline">(min: {product.minStock})</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
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
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-muted-foreground">{product.lastUpdated}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-destructive/10 text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> of <span className="font-medium text-foreground">{products.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground bg-secondary rounded-lg transition-colors">
              Previous
            </button>
            <button className="px-3 py-1.5 text-sm font-medium bg-primary text-primary-foreground rounded-lg">
              1
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground bg-secondary rounded-lg transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground bg-secondary rounded-lg transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
        product={selectedProduct}
      />
    </div>
  );
}
