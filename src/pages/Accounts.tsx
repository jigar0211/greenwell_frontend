import { useState } from 'react';
import { Plus, Wallet, Building, CreditCard, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Account {
  id: string;
  name: string;
  type: 'cash' | 'bank';
  balance: number;
  lastTransaction: string;
}

interface Transaction {
  id: string;
  date: string;
  type: 'income' | 'expense';
  description: string;
  account: string;
  amount: number;
}

const mockAccounts: Account[] = [
  { id: '1', name: 'Cash in Hand', type: 'cash', balance: 125000, lastTransaction: '2 hours ago' },
  { id: '2', name: 'HDFC Business Account', type: 'bank', balance: 458000, lastTransaction: '1 day ago' },
  { id: '3', name: 'ICICI Savings', type: 'bank', balance: 234500, lastTransaction: '3 days ago' },
  { id: '4', name: 'Petty Cash', type: 'cash', balance: 15000, lastTransaction: '5 hours ago' },
];

const mockTransactions: Transaction[] = [
  { id: '1', date: '2024-01-15', type: 'income', description: 'Payment from Rajesh Enterprises', account: 'HDFC Business Account', amount: 45000 },
  { id: '2', date: '2024-01-15', type: 'expense', description: 'Supplier Payment - Patel Supplies', account: 'HDFC Business Account', amount: 28000 },
  { id: '3', date: '2024-01-14', type: 'income', description: 'Cash Sale - Walk-in Customer', account: 'Cash in Hand', amount: 8500 },
  { id: '4', date: '2024-01-14', type: 'expense', description: 'Office Supplies', account: 'Petty Cash', amount: 2500 },
  { id: '5', date: '2024-01-13', type: 'income', description: 'Payment from Sharma Industries', account: 'ICICI Savings', amount: 67000 },
];

export default function Accounts() {
  const totalCash = mockAccounts.filter(a => a.type === 'cash').reduce((sum, a) => sum + a.balance, 0);
  const totalBank = mockAccounts.filter(a => a.type === 'bank').reduce((sum, a) => sum + a.balance, 0);
  const totalBalance = totalCash + totalBank;

  return (
    <div className="space-y-2 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Accounts</h1>
          <p className="text-muted-foreground mt-1">Manage cash and bank accounts</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
          <Plus className="w-4 h-4" />
          Add Account
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="bg-card rounded-xl p-5 border border-border card-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <span className="text-sm text-muted-foreground">Total Balance</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">₹{totalBalance.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border card-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-success/10">
              <CreditCard className="w-5 h-5 text-success" />
            </div>
            <span className="text-sm text-muted-foreground">Cash Balance</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">₹{totalCash.toLocaleString()}</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border card-shadow">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-chart-4/10">
              <Building className="w-5 h-5 text-chart-4" />
            </div>
            <span className="text-sm text-muted-foreground">Bank Balance</span>
          </div>
          <p className="text-2xl font-semibold text-foreground">₹{totalBank.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        {/* Accounts List */}
        <div className="bg-card rounded-xl border border-border card-shadow">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="font-semibold text-foreground">Accounts</h3>
          </div>
          <div className="divide-y divide-border">
            {mockAccounts.map((account) => (
              <div key={account.id} className="p-5 hover:bg-secondary/30 transition-colors cursor-pointer">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      account.type === 'cash' ? "bg-success/10" : "bg-chart-4/10"
                    )}>
                      {account.type === 'cash' ? (
                        <Wallet className="w-5 h-5 text-success" />
                      ) : (
                        <Building className="w-5 h-5 text-chart-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{account.name}</p>
                      <p className="text-xs text-muted-foreground capitalize">{account.type} • {account.lastTransaction}</p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-foreground">₹{account.balance.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-card rounded-xl border border-border card-shadow">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Recent Transactions</h3>
            <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
              View all
            </button>
          </div>
          <div className="divide-y divide-border">
            {mockTransactions.map((transaction) => (
              <div key={transaction.id} className="p-2 hover:bg-secondary/30 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    transaction.type === 'income' ? "bg-success/10" : "bg-destructive/10"
                  )}>
                    {transaction.type === 'income' ? (
                      <ArrowDownLeft className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowUpRight className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{transaction.description}</p>
                    <p className="text-xs text-muted-foreground">{transaction.account} • {transaction.date}</p>
                  </div>
                  <p className={cn(
                    "text-sm font-semibold",
                    transaction.type === 'income' ? "text-success" : "text-destructive"
                  )}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
