import { useState } from 'react';
import { Building2, Image, Percent, Scale, MessageCircle, Database, Save, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'tax', label: 'Tax & Units', icon: Percent },
  { id: 'integrations', label: 'Integrations', icon: MessageCircle },
  { id: 'backup', label: 'Backup', icon: Database },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('company');

  return (
    <div className="space-y-2 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your company settings and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-2">
        {/* Sidebar Tabs */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-card rounded-xl border border-border card-shadow p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'company' && (
            <div className="bg-card rounded-xl border border-border card-shadow p-6 space-y-2">
              <h2 className="text-lg font-semibold text-foreground">Company Details</h2>

              {/* Logo Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Company Logo</label>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center border-2 border-dashed border-border">
                    <Image className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium hover:bg-secondary/80 transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Logo
                    </button>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Company Name</label>
                  <input
                    type="text"
                    defaultValue="StockFlow Enterprises"
                    className="w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">GST Number</label>
                  <input
                    type="text"
                    defaultValue="27AABCU9603R1ZM"
                    className="w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <input
                    type="text"
                    defaultValue="+91 98765 43210"
                    className="w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="contact@stockflow.com"
                    className="w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-foreground mb-2">Address</label>
                  <textarea
                    rows={3}
                    defaultValue="123 Business Park, Andheri East, Mumbai - 400093"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow resize-none"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'tax' && (
            <div className="bg-card rounded-xl border border-border card-shadow p-6 space-y-2">
              <h2 className="text-lg font-semibold text-foreground">Tax & Units Configuration</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Default GST Rate (%)</label>
                  <input
                    type="number"
                    defaultValue="18"
                    className="w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Currency</label>
                  <select className="w-full h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow">
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                    <option>EUR (€)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">Units</label>
                <div className="flex flex-wrap gap-2">
                  {['Pieces', 'Kg', 'Liters', 'Meters', 'Box', 'Dozen'].map((unit) => (
                    <span key={unit} className="px-3 py-1.5 bg-secondary rounded-lg text-sm text-foreground">
                      {unit}
                    </span>
                  ))}
                  <button className="px-3 py-1.5 border-2 border-dashed border-border rounded-lg text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    + Add Unit
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="bg-card rounded-xl border border-border card-shadow p-6 space-y-2">
              <h2 className="text-lg font-semibold text-foreground">Integrations</h2>

              <div className="border border-border rounded-xl p-5">
                <div className="flex items-start gap-2">
                  <div className="p-3 rounded-xl bg-success/10">
                    <MessageCircle className="w-6 h-6 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">WhatsApp Business</h3>
                    <p className="text-sm text-muted-foreground mt-1">Send order updates and invoices via WhatsApp</p>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-foreground mb-2">WhatsApp Business Number</label>
                      <input
                        type="text"
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full max-w-xs h-10 px-4 rounded-lg bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
                      />
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-success text-success-foreground rounded-lg text-sm font-medium hover:bg-success/90 transition-colors">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'backup' && (
            <div className="bg-card rounded-xl border border-border card-shadow p-6 space-y-2">
              <h2 className="text-lg font-semibold text-foreground">Backup & Restore</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div className="border border-border rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Database className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-medium text-foreground">Backup Data</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Download a complete backup of your data</p>
                  <button className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium text-sm hover:bg-primary/90 transition-colors">
                    Download Backup
                  </button>
                </div>

                <div className="border border-border rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-warning/10">
                      <Upload className="w-5 h-5 text-warning" />
                    </div>
                    <h3 className="font-medium text-foreground">Restore Data</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Restore from a previous backup file</p>
                  <button className="w-full px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium text-sm hover:bg-secondary/80 transition-colors">
                    Upload Backup
                  </button>
                </div>
              </div>

              <div className="p-2 bg-warning/5 border border-warning/20 rounded-xl">
                <p className="text-sm text-warning">
                  <strong>Warning:</strong> Restoring data will replace all current data. Make sure to create a backup before restoring.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
