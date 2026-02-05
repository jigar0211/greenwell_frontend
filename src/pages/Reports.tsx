import { BarChart3, TrendingUp, TrendingDown, FileText, Download, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { month: 'Jan', sales: 420000, orders: 145 },
  { month: 'Feb', sales: 380000, orders: 132 },
  { month: 'Mar', sales: 520000, orders: 178 },
  { month: 'Apr', sales: 480000, orders: 165 },
  { month: 'May', sales: 560000, orders: 192 },
  { month: 'Jun', sales: 620000, orders: 215 },
];

const categoryData = [
  { name: 'Widgets', value: 35, color: 'hsl(var(--primary))' },
  { name: 'Gadgets', value: 25, color: 'hsl(var(--success))' },
  { name: 'Components', value: 20, color: 'hsl(var(--warning))' },
  { name: 'Parts', value: 15, color: 'hsl(var(--chart-4))' },
  { name: 'Items', value: 5, color: 'hsl(var(--destructive))' },
];

const reportTypes = [
  { name: 'Sales Report', description: 'Detailed sales analysis', icon: TrendingUp },
  { name: 'Stock Report', description: 'Inventory status overview', icon: BarChart3 },
  { name: 'Party Statement', description: 'Customer/Supplier ledger', icon: FileText },
  { name: 'GST Report', description: 'Tax filing summary', icon: FileText },
];

export default function Reports() {
  return (
    <div className="space-y-2 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1">Analytics and business insights</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 px-3 py-2 bg-secondary rounded-lg text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Calendar className="w-4 h-4" />
            Last 6 Months
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        <div className="bg-card rounded-xl p-5 border border-border card-shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Revenue</p>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <p className="text-2xl font-semibold text-foreground mt-1">₹29.8L</p>
          <p className="text-xs text-success mt-1">+12% vs last period</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border card-shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <p className="text-2xl font-semibold text-foreground mt-1">1,027</p>
          <p className="text-xs text-success mt-1">+8% vs last period</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border card-shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Avg Order Value</p>
            <TrendingDown className="w-4 h-4 text-destructive" />
          </div>
          <p className="text-2xl font-semibold text-foreground mt-1">₹29,015</p>
          <p className="text-xs text-destructive mt-1">-3% vs last period</p>
        </div>
        <div className="bg-card rounded-xl p-5 border border-border card-shadow">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Profit Margin</p>
            <TrendingUp className="w-4 h-4 text-success" />
          </div>
          <p className="text-2xl font-semibold text-foreground mt-1">24.5%</p>
          <p className="text-xs text-success mt-1">+2% vs last period</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl border border-border card-shadow p-5">
          <h3 className="font-semibold text-foreground mb-4">Sales Overview</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(value) => `₹${value / 1000}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Sales']}
                />
                <Bar dataKey="sales" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-card rounded-xl border border-border card-shadow p-5">
          <h3 className="font-semibold text-foreground mb-4">Sales by Category</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Types */}
      <div className="bg-card rounded-xl border border-border card-shadow p-5">
        <h3 className="font-semibold text-foreground mb-4">Generate Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {reportTypes.map((report) => (
            <button
              key={report.name}
              className="flex items-start gap-3 p-2 rounded-xl border border-border hover:border-primary/50 hover:bg-secondary/50 transition-all text-left group"
            >
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <report.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">{report.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{report.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
