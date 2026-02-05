import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { cn } from '@/lib/utils';
import { Plus, Trash2 } from 'lucide-react';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
}

const customers = ['Rajesh Enterprises', 'Priya Traders', 'Sharma Industries', 'Gupta Distributors'];
const products = [
  { id: '1', name: 'Premium Widget A', price: 4500 },
  { id: '2', name: 'Standard Gadget B', price: 2800 },
  { id: '3', name: 'Deluxe Component C', price: 1900 },
  { id: '4', name: 'Basic Part D', price: 1200 },
];

export function OrderModal({ isOpen, onClose, mode }: OrderModalProps) {
  const [formData, setFormData] = useState({
    customer: '',
    items: [{ productId: '', quantity: 1 }],
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productId: '', quantity: 1 }],
    });
  };

  const removeItem = (index: number) => {
    if (formData.items.length > 1) {
      setFormData({
        ...formData,
        items: formData.items.filter((_, i) => i !== index),
      });
    }
  };

  const updateItem = (index: number, field: 'productId' | 'quantity', value: string | number) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData({ ...formData, items: newItems });
  };

  const calculateTotal = () => {
    return formData.items.reduce((sum, item) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.customer) newErrors.customer = 'Please select a customer';
    if (formData.items.some((item) => !item.productId)) newErrors.items = 'Please select products for all items';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={mode === 'add' ? 'Create New Order' : 'Edit Order'} size="xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Customer *</label>
          <select
            value={formData.customer}
            onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
            className={cn(
              "w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow",
              errors.customer && "ring-2 ring-destructive/50"
            )}
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer} value={customer}>{customer}</option>
            ))}
          </select>
          {errors.customer && <p className="text-xs text-destructive mt-1">{errors.customer}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-foreground">Order Items *</label>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>
          
          <div className="space-y-2">
            {formData.items.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <select
                  value={item.productId}
                  onChange={(e) => updateItem(index, 'productId', e.target.value)}
                  className="flex-1 h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                >
                  <option value="">Select product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name} - ₹{product.price.toLocaleString()}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 1)}
                  min="1"
                  className="w-20 h-10 px-3 rounded-lg bg-secondary border-0 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  disabled={formData.items.length === 1}
                  className="p-2 rounded-lg hover:bg-destructive/10 text-destructive disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          {errors.items && <p className="text-xs text-destructive mt-1">{errors.items}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Notes</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={2}
            maxLength={500}
            className="w-full px-4 py-3 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow resize-none"
            placeholder="Add any notes for this order..."
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <p className="text-sm text-muted-foreground">Order Total</p>
            <p className="text-xl font-semibold text-foreground">₹{calculateTotal().toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-3">
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
              {mode === 'add' ? 'Create Order' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
