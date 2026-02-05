import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { cn } from '@/lib/utils';
import type { Party } from '@/pages/Parties';

interface PartyModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: Partial<Party>; // Pass existing party data when in 'edit' mode
}

export function PartyModal({ isOpen, onClose, mode, initialData }: PartyModalProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    gst: initialData?.gst || '',
    contact_person: initialData?.contact_person || '',
    contact: initialData?.contact || '',
    address: initialData?.address || '',
    state: initialData?.state || '',
    dist: initialData?.dist || '',
    city: initialData?.city || '',
    pincode: initialData?.pincode || '',
    opening_balance: initialData?.opening_balance || '0',
    is_active: initialData?.is_active ?? true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Party name is required';
    }

    if (formData.gst && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gst)) {
      // Basic Indian GST validation if provided
      newErrors.gst = 'Invalid GST format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // current_balance is usually set to opening_balance initially
      const submissionData = {
        ...formData,
        opening_balance: parseFloat(formData.opening_balance),
        current_balance: mode === 'add' ? parseFloat(formData.opening_balance) : initialData?.current_balance
      };

      console.log('Submitting to DB:', submissionData);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === 'add' ? 'Add New Party' : 'Edit Party'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">

          {/* Party Name - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Party Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={cn(
                "w-full h-10 px-3 rounded-md border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all",
                errors.name && "border-red-500 ring-red-100"
              )}
              placeholder="Business or Person Name"
            />
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contact Person</label>
            <input
              type="text"
              value={formData.contact_person}
              onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              placeholder="Name of person to contact"
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Contact Number</label>
            <input
              type="tel"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
              placeholder="Mobile or Phone"
            />
          </div>

          {/* GST Number */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">GST Number</label>
            <input
              type="text"
              value={formData.gst}
              onChange={(e) => setFormData({ ...formData, gst: e.target.value.toUpperCase() })}
              maxLength={15}
              className={cn(
                "w-full h-10 px-3 rounded-md border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all uppercase",
                errors.gst && "border-red-500"
              )}
              placeholder="15-digit GSTIN"
            />
          </div>

          {/* Opening Balance */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Opening Balance</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
              <input
                type="number"
                step="0.01"
                value={formData.opening_balance}
                onChange={(e) => setFormData({ ...formData, opening_balance: e.target.value })}
                className="w-full h-10 pl-7 pr-3 rounded-md border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Address - Full Width */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Address</label>
            <textarea
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              rows={2}
              className="w-full p-3 rounded-md border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none"
              placeholder="Street, Area, etc."
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">District (Dist)</label>
            <input
              type="text"
              value={formData.dist}
              onChange={(e) => setFormData({ ...formData, dist: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">State</label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full h-10 px-3 rounded-md border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>

          {/* Pincode */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Pincode</label>
            <input
              type="text"
              value={formData.pincode}
              onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              maxLength={6}
              className="w-full h-10 px-3 rounded-md border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all"
            />
          </div>

          {/* Status Toggle */}
          <div className="md:col-span-2 flex items-center gap-2 py-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary"
            />
            <label htmlFor="is_active" className="text-sm font-medium text-slate-700 cursor-pointer">
              Account is Active
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md text-sm font-bold hover:bg-primary/90 shadow-md shadow-primary/20 transition-all active:scale-95"
          >
            {mode === 'add' ? 'Create Party' : 'Update Party'}
          </button>
        </div>
      </form>
    </Modal>
  );
}