import { useState } from 'react';
import { Package, X } from 'lucide-react';
import { Modal } from '@/components/ui/modal';
import { cn } from '@/lib/utils';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  product?: {
    id: string;
    name: string;
    sku: string;
    category: string;
    price: string;
    stock: number;
    minStock: number;
  };
}

const categories = ['Widgets', 'Gadgets', 'Components', 'Parts', 'Items'];

export function ProductModal({ isOpen, onClose, mode, product }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    sku: product?.sku || '',
    category: product?.category || categories[0],
    price: product?.price?.replace('₹', '').replace(',', '') || '',
    stock: product?.stock?.toString() || '',
    minStock: product?.minStock?.toString() || '20',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (formData.name.length > 100) newErrors.name = 'Name must be less than 100 characters';
    if (!formData.sku.trim()) newErrors.sku = 'SKU is required';
    if (!formData.price || isNaN(Number(formData.price))) newErrors.price = 'Valid price is required';
    if (!formData.stock || isNaN(Number(formData.stock))) newErrors.stock = 'Valid stock quantity is required';
    if (!formData.minStock || isNaN(Number(formData.minStock))) newErrors.minStock = 'Valid minimum stock is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Handle form submission
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'add' ? 'Add New Product' : 'Edit Product'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-foreground mb-1.5">Product Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={cn(
                "w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow",
                errors.name && "ring-2 ring-destructive/50"
              )}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">SKU *</label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
              className={cn(
                "w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow",
                errors.sku && "ring-2 ring-destructive/50"
              )}
              placeholder="e.g., PWA-001"
            />
            {errors.sku && <p className="text-xs text-destructive mt-1">{errors.sku}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Price (₹) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className={cn(
                "w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow",
                errors.price && "ring-2 ring-destructive/50"
              )}
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Current Stock *</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className={cn(
                "w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow",
                errors.stock && "ring-2 ring-destructive/50"
              )}
              placeholder="0"
              min="0"
            />
            {errors.stock && <p className="text-xs text-destructive mt-1">{errors.stock}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1.5">Minimum Stock Level</label>
            <input
              type="number"
              value={formData.minStock}
              onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
              className={cn(
                "w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow",
                errors.minStock && "ring-2 ring-destructive/50"
              )}
              placeholder="20"
              min="0"
            />
            {errors.minStock && <p className="text-xs text-destructive mt-1">{errors.minStock}</p>}
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            {mode === 'add' ? 'Add Product' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
