import { useState } from 'react';
import { Search, Plus, Filter, Download, Phone, Mail, MapPin, IndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PartyModal } from '@/components/modals/PartyModal';

export interface Party {
  id: string;
  name: string;
  gst: string;
  contact_person: string;
  contact: string;
  address: string;
  state: string;
  dist: string;
  city: string;
  pincode: string;
  opening_balance: number;
  current_balance: number;
  is_active: boolean;
  type: 'customer' | 'supplier';
  email: string;
  balanceType: 'receivable' | 'payable';
}

const mockParties: Party[] = [
  {
    id: '1',
    name: 'Rajesh Enterprises',
    gst: '27AABCU9603R1ZM',
    contact_person: 'Rajesh Kumar',
    contact: '+91 98765 43210',
    address: '123 Main St',
    state: 'Maharashtra',
    dist: 'Mumbai City',
    city: 'Mumbai',
    pincode: '400001',
    opening_balance: 10000,
    current_balance: 27000,
    is_active: true,
    type: 'customer',
    email: 'rajesh@enterprise.com',
    balanceType: 'receivable'
  },
  {
    id: '2',
    name: 'Priya Traders',
    gst: '07AABCT1234R1ZN',
    contact_person: 'Priya Singh',
    contact: '+91 87654 32109',
    address: '456 Market Rd',
    state: 'Delhi',
    dist: 'New Delhi',
    city: 'Delhi',
    pincode: '110001',
    opening_balance: 5000,
    current_balance: 0,
    is_active: true,
    type: 'customer',
    email: 'priya@traders.com',
    balanceType: 'receivable'
  },
  {
    id: '3',
    name: 'Patel Supplies',
    gst: '24AABCP5678R1ZO',
    contact_person: 'Amit Patel',
    contact: '+91 76543 21098',
    address: '789 Industrial Area',
    state: 'Gujarat',
    dist: 'Ahmedabad',
    city: 'Ahmedabad',
    pincode: '380001',
    opening_balance: 2000,
    current_balance: 22000,
    is_active: true,
    type: 'supplier',
    email: 'patel@supplies.com',
    balanceType: 'payable'
  },
];

export default function Parties() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'customer' | 'supplier'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredParties = mockParties.filter(party => {
    const matchesSearch = party.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      party.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      party.contact.includes(searchQuery);
    const matchesType = selectedType === 'all' || party.type === selectedType;
    return matchesSearch && matchesType;
  });

  const totalReceivable = filteredParties.filter(p => p.balanceType === 'receivable').reduce((sum, p) => sum + p.current_balance, 0);
  const totalPayable = filteredParties.filter(p => p.balanceType === 'payable').reduce((sum, p) => sum + p.current_balance, 0);

  return (
    <div className="space-y-2 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Parties</h1>
          <p className="text-muted-foreground mt-1">Manage customers and suppliers</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Party
        </button>
      </div>

      {/* Filters */}
      <div className="bg-card rounded-xl border border-border card-shadow p-2">
        <div className="flex flex-col lg:flex-row gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
          </div>
          <div className="flex items-center gap-2">
            {(['all', 'customer', 'supplier'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors",
                  selectedType === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {type === 'all' ? 'All Parties' : `${type}s`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Parties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {filteredParties.map((party) => (
          <div key={party.id} className="bg-card rounded-xl border border-border card-shadow hover:card-shadow-lg transition-all p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-foreground">{party.name}</h3>
                <span className={cn(
                  "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium capitalize mt-1",
                  party.type === 'customer' ? "bg-primary/10 text-primary" : "bg-chart-4/10 text-chart-4"
                )}>
                  {party.type}
                </span>
              </div>
              <div className={cn(
                "text-right",
                party.balanceType === 'receivable' ? "text-success" : "text-destructive"
              )}>
                <p className="text-xs font-medium">{party.balanceType === 'receivable' ? 'Receivable' : 'Payable'}</p>
                <p className="text-lg font-semibold">₹{party.current_balance.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                {party.contact}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                {party.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {party.city}, {party.state}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">GST: {party.gst}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Contact Person: <span className="text-foreground font-medium">{party.contact_person}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Party Modal */}
      <PartyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode="add"
      />
    </div>
  );
}
