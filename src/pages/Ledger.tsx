import { useState } from 'react';
import { Search, Filter, Download, Printer, Calendar, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LedgerEntry {
  id: string;
  date: string;
  type: 'debit' | 'credit';
  description: string;
  reference: string;
  amount: number;
  balance: number;
}

const mockLedgerEntries: LedgerEntry[] = [
  { id: '1', date: '2024-01-15', type: 'debit', description: 'Order #ORD-1234 - Rajesh Enterprises', reference: 'INV-2024-0089', amount: 12450, balance: 39450 },
  { id: '2', date: '2024-01-14', type: 'credit', description: 'Payment Received - Bank Transfer', reference: 'PAY-2024-0045', amount: 25000, balance: 27000 },
  { id: '3', date: '2024-01-13', type: 'debit', description: 'Order #ORD-1230 - Rajesh Enterprises', reference: 'INV-2024-0088', amount: 8750, balance: 52000 },
  { id: '4', date: '2024-01-12', type: 'credit', description: 'Payment Received - Cash', reference: 'PAY-2024-0044', amount: 15000, balance: 43250 },
  { id: '5', date: '2024-01-11', type: 'debit', description: 'Order #ORD-1225 - Rajesh Enterprises', reference: 'INV-2024-0085', amount: 18250, balance: 58250 },
  { id: '6', date: '2024-01-10', type: 'credit', description: 'Credit Note - Returns', reference: 'CN-2024-0012', amount: 3500, balance: 40000 },
  { id: '7', date: '2024-01-09', type: 'debit', description: 'Order #ORD-1220 - Rajesh Enterprises', reference: 'INV-2024-0082', amount: 22500, balance: 43500 },
];

export default function Ledger() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParty] = useState('Rajesh Enterprises');

  const totalDebit = mockLedgerEntries.filter(e => e.type === 'debit').reduce((sum, e) => sum + e.amount, 0);
  const totalCredit = mockLedgerEntries.filter(e => e.type === 'credit').reduce((sum, e) => sum + e.amount, 0);
  const closingBalance = totalDebit - totalCredit;

  return (
    <div className="space-y-2 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Party Ledger</h1>
          <p className="text-muted-foreground mt-1">View transaction history and account statements</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm hover:bg-secondary/80 transition-colors">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            Export PDF
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
              placeholder="Search party..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-secondary border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Calendar className="w-4 h-4" />
              Date Range
            </button>
            <button className="p-2 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors">
              <Filter className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>

      {/* Party Info Card */}
      <div className="bg-card rounded-xl border border-border card-shadow p-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-foreground">{selectedParty}</h2>
            <p className="text-sm text-muted-foreground">GST: 27AABCU9603R1ZM • Mumbai</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Debit</p>
              <p className="text-lg font-semibold text-foreground">₹{totalDebit.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Total Credit</p>
              <p className="text-lg font-semibold text-foreground">₹{totalCredit.toLocaleString()}</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Closing Balance</p>
              <p className={cn(
                "text-lg font-semibold",
                closingBalance > 0 ? "text-success" : "text-destructive"
              )}>
                ₹{Math.abs(closingBalance).toLocaleString()}
                <span className="text-xs ml-1">({closingBalance > 0 ? 'Dr' : 'Cr'})</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-card rounded-xl border border-border card-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Description</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Reference</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Debit</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Credit</th>
                <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockLedgerEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-5 py-4">
                    <span className="text-sm text-foreground">{entry.date}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      {entry.type === 'debit' ? (
                        <ArrowUpRight className="w-4 h-4 text-success" />
                      ) : (
                        <ArrowDownLeft className="w-4 h-4 text-primary" />
                      )}
                      <span className="text-sm text-foreground">{entry.description}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-muted-foreground">{entry.reference}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    {entry.type === 'debit' && (
                      <span className="text-sm font-medium text-success">₹{entry.amount.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {entry.type === 'credit' && (
                      <span className="text-sm font-medium text-primary">₹{entry.amount.toLocaleString()}</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-medium text-foreground">₹{entry.balance.toLocaleString()}</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-secondary/50 font-medium">
                <td colSpan={3} className="px-5 py-4 text-sm text-foreground">Closing Balance</td>
                <td className="px-5 py-4 text-right text-sm text-success">₹{totalDebit.toLocaleString()}</td>
                <td className="px-5 py-4 text-right text-sm text-primary">₹{totalCredit.toLocaleString()}</td>
                <td className="px-5 py-4 text-right text-sm text-foreground">₹{Math.abs(closingBalance).toLocaleString()} {closingBalance > 0 ? 'Dr' : 'Cr'}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
