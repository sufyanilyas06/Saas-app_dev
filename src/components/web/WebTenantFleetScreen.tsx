import React, { useState } from 'react';
import {
  Store,
  FileDown,
  Sparkles,
  PlusCircle,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  RotateCcw,
  Key,
  Terminal,
  MoreVertical,
  ExternalLink,
  Database,
  ShieldCheck,
  Headphones,
  LogIn,
  Sliders,
  Check,
  ChevronLeft,
  ChevronRight,
  Cpu
} from 'lucide-react';
import { ScreenType } from '../../types';
import { WebSidebar } from './WebSidebar';
import { WebHeader } from './WebHeader';

interface TenantRecord {
  id: string;
  uuid: string;
  name: string;
  shortCode: string;
  slug: string;
  ownerName: string;
  ownerEmail: string;
  plan: string;
  planPrice: string;
  billingCadence: string;
  storesCount: number;
  lanesCount: number;
  activeLanesCount: number;
  gmvToday: string;
  txnsCount: number;
  cluster: string;
  latency: string;
  status: 'active' | 'trial' | 'warning' | 'suspended';
  statusLabel: string;
  dbNode: string;
  ramUsage: string;
  iops: string;
}

const INITIAL_TENANTS: TenantRecord[] = [
  {
    id: 'tnt_1',
    uuid: 'tnt_8932_us_east',
    name: 'FreshMart Superstore (Flagship)',
    shortCode: 'FM',
    slug: 'freshmart.freshpos.cloud',
    ownerName: 'Eleanor Vance',
    ownerEmail: 'el.vance@freshmart.com',
    plan: 'Enterprise',
    planPrice: '$399/mo',
    billingCadence: 'Annual • Auto-renews',
    storesCount: 12,
    lanesCount: 48,
    activeLanesCount: 48,
    gmvToday: '$42,850.00',
    txnsCount: 1420,
    cluster: 'US-East-4',
    latency: '14ms',
    status: 'active',
    statusLabel: 'HEALTHY',
    dbNode: 'pg-cluster-east4-b',
    ramUsage: '34% (5.4GB / 16GB)',
    iops: '420 / 3,000',
  },
  {
    id: 'tnt_2',
    uuid: 'tnt_9920_us_east',
    name: 'GreenGrocers Organic Mart',
    shortCode: 'GG',
    slug: 'greengrocers.freshpos.cloud',
    ownerName: 'Carlos Mendez',
    ownerEmail: 'carlos@greengrocers.co',
    plan: 'Pro Multi-Store',
    planPrice: '$199/mo',
    billingCadence: 'Monthly • Auto-renews',
    storesCount: 3,
    lanesCount: 12,
    activeLanesCount: 12,
    gmvToday: '$12,410.00',
    txnsCount: 380,
    cluster: 'US-East-2',
    latency: '18ms',
    status: 'active',
    statusLabel: 'HEALTHY',
    dbNode: 'pg-cluster-east2-a',
    ramUsage: '22% (3.5GB / 16GB)',
    iops: '180 / 3,000',
  },
  {
    id: 'tnt_3',
    uuid: 'tnt_7712_us_west',
    name: 'Bakers Delight & Deli',
    shortCode: 'BD',
    slug: 'bakersdeli.freshpos.cloud',
    ownerName: 'Sarah Jenkins',
    ownerEmail: 's.jenkins@bakersdeli.com',
    plan: 'Starter Solo',
    planPrice: '$69/mo',
    billingCadence: 'Annual • Auto-renews',
    storesCount: 1,
    lanesCount: 2,
    activeLanesCount: 2,
    gmvToday: '$4,390.50',
    txnsCount: 210,
    cluster: 'US-West-1',
    latency: '29ms',
    status: 'active',
    statusLabel: 'HEALTHY',
    dbNode: 'pg-cluster-west1-c',
    ramUsage: '14% (2.2GB / 16GB)',
    iops: '95 / 3,000',
  },
  {
    id: 'tnt_4',
    uuid: 'tnt_6541_eu_central',
    name: 'MegaMart Food Hall',
    shortCode: 'MM',
    slug: 'megamart.freshpos.cloud',
    ownerName: 'Devon Ray',
    ownerEmail: 'd.ray@megamarthall.net',
    plan: 'Enterprise Custom',
    planPrice: '$599/mo',
    billingCadence: 'Custom Srv SLA',
    storesCount: 6,
    lanesCount: 36,
    activeLanesCount: 35,
    gmvToday: '$31,120.80',
    txnsCount: 940,
    cluster: 'EU-Central-1',
    latency: '32ms',
    status: 'warning',
    statusLabel: '1 OFFLINE',
    dbNode: 'pg-cluster-fra1-a',
    ramUsage: '48% (7.6GB / 16GB)',
    iops: '890 / 3,000',
  },
  {
    id: 'tnt_5',
    uuid: 'tnt_4421_us_east',
    name: 'Urban Pantry Downtown',
    shortCode: 'UP',
    slug: 'urbanpantry.freshpos.cloud',
    ownerName: 'Maya Sterling',
    ownerEmail: 'maya@urbanpantry.store',
    plan: '14-Day Free Trial',
    planPrice: 'Trial',
    billingCadence: 'Expires in 3 Days',
    storesCount: 1,
    lanesCount: 3,
    activeLanesCount: 3,
    gmvToday: '$1,980.40',
    txnsCount: 92,
    cluster: 'US-East-4',
    latency: '16ms',
    status: 'trial',
    statusLabel: 'TRIAL',
    dbNode: 'pg-cluster-east4-b',
    ramUsage: '18% (2.8GB / 16GB)',
    iops: '110 / 3,000',
  },
];

interface WebTenantFleetScreenProps {
  onShowToast: (message: string, type?: 'success' | 'warning' | 'info') => void;
  onNavigate: (screen: ScreenType) => void;
}

export const WebTenantFleetScreen: React.FC<WebTenantFleetScreenProps> = ({
  onShowToast,
  onNavigate,
}) => {
  const [tenants] = useState<TenantRecord[]>(INITIAL_TENANTS);
  const [selectedTenant, setSelectedTenant] = useState<TenantRecord>(INITIAL_TENANTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCluster, setSelectedCluster] = useState('all');

  const filteredTenants = tenants.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex font-sans antialiased">
      {/* Shared Web Sidebar */}
      <WebSidebar currentScreen="web_tenants" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="pl-72 flex-1 flex flex-col min-w-0">
        <WebHeader
          onNavigate={onNavigate}
          onShowToast={onShowToast}
          searchTerm={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <main className="w-full pt-20 px-8 pb-14">
          <div className="flex flex-col w-full max-w-7xl mx-auto">
            {/* Top Headline & Action Ribbon */}
            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[11px] uppercase text-[#006948] font-bold tracking-wider">
                    Tenant Fleet Governance
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full font-mono text-[11px] bg-[#dae2fd] text-[#131b2e] font-semibold">
                    Cluster US-EAST-01
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
                  Businesses & Tenant Management
                </h1>
                <p className="text-sm text-[#565e74] mt-0.5">
                  Manage 1,428 subscribed grocery brands, multi-store franchises, billing states, and cloud provisioned instances.
                </p>
              </div>

              {/* Action Ribbon Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => onShowToast('Exported 1,428 tenant fleet rows to CSV', 'success')}
                  className="inline-flex items-center gap-2 px-3.5 h-10 rounded-xl bg-white text-[#0b1c30] border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs text-xs font-bold cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-[#6d7a72]" />
                  <span>Export CSV</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Initiating Batch Upgrade to POS Kernel v4.8.2...', 'info')}
                  className="inline-flex items-center gap-2 px-3.5 h-10 rounded-xl bg-white text-[#0b1c30] border border-slate-200 hover:bg-slate-50 transition-colors shadow-xs text-xs font-bold cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#6d7a72]" />
                  <span>Batch Upgrade</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast('Opening Tenant Provisioning Wizard...', 'info')}
                  className="inline-flex items-center gap-2 px-4 h-10 rounded-xl bg-[#006948] text-white hover:bg-[#00855d] transition-colors shadow-xs text-xs font-bold cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Provision Tenant</span>
                </button>
              </div>
            </div>

            {/* Fleet Operational KPIs (3 cards) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Active Paying Tenants */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#006948]/10 text-[#006948] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase font-bold text-[#565e74]">
                      Active Paying Tenants
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-mono text-2xl lg:text-3xl font-extrabold text-[#0b1c30]">1,372</span>
                      <span className="font-mono text-xs text-[#565e74] font-medium">/ 1,428</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#006948] bg-[#006948]/10 px-2 py-0.5 rounded-full">
                    ↑ 96.1%
                  </span>
                  <span className="block text-[11px] text-[#6d7a72] mt-1">Retention SLA</span>
                </div>
              </div>

              {/* Trialing Accounts */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#dae2fd] text-[#131b2e] flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-[#565e74]" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase font-bold text-[#565e74]">
                      Trialing Accounts
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-mono text-2xl lg:text-3xl font-extrabold text-[#0b1c30]">48</span>
                      <span className="text-xs text-[#6d7a72]">14-Day Free</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#8d4b00] bg-[#ffdcc3] px-2 py-0.5 rounded-full">
                    18 in 48h
                  </span>
                  <span className="block text-[11px] text-[#6d7a72] mt-1">Expiring Soon</span>
                </div>
              </div>

              {/* Suspended / Overdue */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase font-bold text-[#565e74]">
                      Suspended / Overdue
                    </span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-mono text-2xl lg:text-3xl font-extrabold text-red-600">8</span>
                      <span className="text-xs text-[#565e74]">Tenants</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs font-bold text-red-600 block">$1,420.00</span>
                  <span className="block text-[11px] text-[#6d7a72] mt-1">Dunning Pipeline</span>
                </div>
              </div>
            </div>

            {/* Search & Filter Ribbon */}
            <div className="p-3.5 bg-white border border-slate-200 rounded-2xl shadow-xs mb-6 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6d7a72]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Business Name, Store Slug, Owner Email, Tax ID..."
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-[#eff4ff] text-[#0b1c30] placeholder:text-[#6d7a72] text-xs focus:outline-none focus:ring-2 focus:ring-[#006948] transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-1 bg-[#eff4ff] px-2.5 py-1.5 rounded-xl">
                  <span className="text-xs text-[#6d7a72]">Tier:</span>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="bg-transparent text-xs text-[#0b1c30] font-bold focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="all">All Tiers</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="pro">Pro Multi-Store</option>
                    <option value="starter">Starter Solo</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 bg-[#eff4ff] px-2.5 py-1.5 rounded-xl">
                  <span className="text-xs text-[#6d7a72]">Status:</span>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="bg-transparent text-xs text-[#0b1c30] font-bold focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="trial">Trialing</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>

                <div className="flex items-center gap-1 bg-[#eff4ff] px-2.5 py-1.5 rounded-xl">
                  <span className="text-xs text-[#6d7a72]">Cluster:</span>
                  <select
                    value={selectedCluster}
                    onChange={(e) => setSelectedCluster(e.target.value)}
                    className="bg-transparent text-xs text-[#0b1c30] font-bold focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="all">All Regions</option>
                    <option value="va">US-East (Virginia)</option>
                    <option value="or">US-West (Oregon)</option>
                    <option value="fra">EU-Central (Frankfurt)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTier('all');
                    setSelectedStatus('all');
                    setSelectedCluster('all');
                  }}
                  className="p-2 rounded-xl bg-[#eff4ff] text-[#565e74] hover:text-[#0b1c30] hover:bg-[#e5eeff] transition-colors cursor-pointer"
                  title="Reset Filters"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Grid: Data Table + Live Tenant Inspector Drawer Panel */}
            <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6 items-start">
              {/* Multi-Tenant Interactive Data Table (8 cols) */}
              <div className="2xl:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#eff4ff] text-[#3d4a42] font-mono text-[11px] uppercase font-bold tracking-wider">
                        <th className="py-3 px-4 w-10 text-center">
                          <input type="checkbox" className="rounded accent-[#006948] w-4 h-4 cursor-pointer" />
                        </th>
                        <th className="py-3 px-3">Business & Slug</th>
                        <th className="py-3 px-3">Account Owner</th>
                        <th className="py-3 px-3">Plan & MRR</th>
                        <th className="py-3 px-3">Fleet / Lanes</th>
                        <th className="py-3 px-3">Today GMV</th>
                        <th className="py-3 px-3">Cluster Health</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-[#0b1c30] divide-y divide-slate-100">
                      {filteredTenants.map((t) => {
                        const isSelected = selectedTenant.id === t.id;
                        return (
                          <tr
                            key={t.id}
                            onClick={() => setSelectedTenant(t)}
                            className={`transition-colors cursor-pointer ${
                              isSelected ? 'bg-[#dce9ff]/40 hover:bg-[#dce9ff]/60' : 'hover:bg-[#eff4ff]/60'
                            }`}
                          >
                            <td className="py-3.5 px-4 text-center">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={() => setSelectedTenant(t)}
                                className="rounded accent-[#006948] w-4 h-4 cursor-pointer"
                              />
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-xl bg-[#00855d] text-white flex items-center justify-center font-bold text-xs shrink-0">
                                  {t.shortCode}
                                </div>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-xs font-bold text-[#0b1c30] truncate">{t.name}</span>
                                  <span className="font-mono text-[11px] text-[#006948]">{t.slug}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="flex flex-col">
                                <span className="text-xs font-medium text-[#0b1c30]">{t.ownerName}</span>
                                <span className="text-[11px] text-[#565e74] flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3 text-[#006948]" />
                                  {t.ownerEmail}
                                </span>
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="flex flex-col">
                                <span className="inline-flex items-center px-2 py-0.5 rounded font-mono text-[10px] bg-[#006948]/10 text-[#006948] font-bold w-fit">
                                  {t.plan} {t.planPrice}
                                </span>
                                <span className="text-[10px] text-[#6d7a72] mt-0.5">{t.billingCadence}</span>
                              </div>
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#006948] shrink-0 animate-pulse"></span>
                                <span className="font-mono text-xs font-bold text-[#0b1c30]">{t.storesCount} Stores</span>
                              </div>
                              <span className="text-[11px] text-[#565e74]">{t.lanesCount} Active Lanes</span>
                            </td>
                            <td className="py-3.5 px-3">
                              <span className="font-mono text-xs font-bold text-[#0b1c30]">{t.gmvToday}</span>
                              <span className="block text-[11px] text-[#565e74]">{t.txnsCount} txns</span>
                            </td>
                            <td className="py-3.5 px-3">
                              <div className="flex items-center gap-1 text-[#006948]">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span className="font-mono text-[11px] font-semibold">{t.cluster}</span>
                              </div>
                              <span className="font-mono text-[10px] text-[#6d7a72]">{t.latency} latency</span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onShowToast(`Impersonating ${t.name} admin session...`, 'info');
                                    onNavigate('pos');
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-[#eff4ff] text-[#565e74] hover:text-[#006948] transition-colors cursor-pointer"
                                  title="Impersonate Tenant Session"
                                >
                                  <Key className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onShowToast(`Streaming logs for ${t.name}...`, 'info');
                                    onNavigate('hardware_diagnostics');
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-[#eff4ff] text-[#565e74] hover:text-[#0b1c30] transition-colors cursor-pointer"
                                  title="Inspect Terminal Logs"
                                >
                                  <Terminal className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onShowToast(`Opening settings for ${t.name}`, 'info');
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-[#eff4ff] text-[#565e74] hover:text-[#0b1c30] transition-colors cursor-pointer"
                                  title="More Options"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer / Pagination */}
                <div className="p-4 bg-[#eff4ff] border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#565e74]">
                      Showing <span className="font-bold text-[#0b1c30]">1-5</span> of{' '}
                      <span className="font-bold text-[#0b1c30]">1,428</span> Tenants
                    </span>
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] text-[#6d7a72]">Rows:</span>
                      <select className="bg-white border border-slate-200 text-[#0b1c30] rounded font-mono text-[11px] px-2 py-0.5 focus:outline-none">
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-[#6d7a72] disabled:opacity-50"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-lg bg-[#006948] text-white font-mono text-xs font-bold"
                    >
                      1
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-[#0b1c30] hover:bg-slate-50 font-mono text-xs"
                    >
                      2
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-[#0b1c30] hover:bg-slate-50 font-mono text-xs"
                    >
                      3
                    </button>
                    <span className="px-1 text-[#6d7a72] font-mono text-xs">...</span>
                    <button
                      type="button"
                      className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-[#0b1c30] hover:bg-slate-50 font-mono text-xs"
                    >
                      143
                    </button>
                    <button
                      type="button"
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-[#0b1c30] hover:bg-slate-50"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Tenant Live Inspection Side Card (Right 4 cols) */}
              <div className="2xl:col-span-4 flex flex-col gap-4">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
                  <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#006948]/10 text-[#006948] flex items-center justify-center font-bold text-lg">
                        {selectedTenant.shortCode}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="text-base font-bold text-[#0b1c30]">{selectedTenant.name}</h2>
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-[#006948] text-white font-bold uppercase">
                            Active
                          </span>
                        </div>
                        <p className="font-mono text-xs text-[#6d7a72] mt-0.5">
                          UUID: <span className="text-[#0b1c30] font-semibold">{selectedTenant.uuid}</span>
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onShowToast(`Opened external link for ${selectedTenant.name}`, 'info')}
                      className="p-1.5 rounded-lg hover:bg-[#eff4ff] text-[#565e74] cursor-pointer"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Metric Bars */}
                  <div className="space-y-3 pt-3">
                    <div>
                      <div className="flex items-center justify-between text-xs font-medium mb-1">
                        <span className="text-[#565e74] flex items-center gap-1.5">
                          <Database className="w-4 h-4 text-[#006948]" /> Provisioned DB Node
                        </span>
                        <span className="font-mono text-xs font-bold text-[#0b1c30]">{selectedTenant.dbNode}</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                        <div className="h-full bg-[#006948] rounded-full" style={{ width: '34%' }}></div>
                      </div>
                      <div className="flex justify-between font-mono text-[10px] text-[#6d7a72] mt-1">
                        <span>RAM Pool: {selectedTenant.ramUsage}</span>
                        <span>IOPS: {selectedTenant.iops}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                        <span className="font-mono text-[10px] text-[#6d7a72] uppercase font-bold block">
                          Active Registers
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-xl font-extrabold text-[#0b1c30]">{selectedTenant.activeLanesCount}</span>
                          <span className="text-[11px] text-[#006948] font-bold">100% Online</span>
                        </div>
                        <span className="text-[10px] text-[#565e74] mt-0.5 block">8 Shifts currently open</span>
                      </div>

                      <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
                        <span className="font-mono text-[10px] text-[#6d7a72] uppercase font-bold block">
                          Latest Invoice
                        </span>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="font-mono text-xs font-bold text-[#0b1c30]">#INV-2023-894</span>
                        </div>
                        <span className="inline-flex items-center gap-1 text-[11px] text-[#006948] font-bold mt-0.5">
                          <CheckCircle2 className="w-3 h-3" /> Paid {selectedTenant.planPrice}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* POS Configuration & Feature Toggles */}
                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <span className="font-mono text-[10px] uppercase text-[#6d7a72] font-bold tracking-wider block mb-2.5">
                      Provisioned Capabilities
                    </span>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff]">
                        <span className="text-xs font-medium text-[#0b1c30]">Multi-Currency Checkout</span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#006948]/10 text-[#006948] font-bold uppercase">
                          Enabled
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff]">
                        <span className="text-xs font-medium text-[#0b1c30]">Real-Time Points & Loyalty</span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#006948]/10 text-[#006948] font-bold uppercase">
                          Enabled
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff]">
                        <span className="text-xs font-medium text-[#0b1c30]">Scale Barcode Dynamic Weighting</span>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#006948]/10 text-[#006948] font-bold uppercase">
                          Enabled
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Live Support Status */}
                  <div className="mt-5 p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Headphones className="w-5 h-5 text-[#006948]" />
                      <div>
                        <span className="text-xs font-bold text-[#0b1c30] block leading-tight">
                          0 Open Urgent Tickets
                        </span>
                        <span className="text-[11px] text-[#6d7a72]">Tier-1 Priority SLA Active</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onShowToast('Opening Enterprise CRM ticket queue...', 'info')}
                      className="font-mono text-xs text-[#006948] uppercase font-bold hover:underline cursor-pointer"
                    >
                      View CRM
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button
                      type="button"
                      onClick={() => {
                        onShowToast(`Impersonating ${selectedTenant.name}...`, 'success');
                        onNavigate('pos');
                      }}
                      className="h-10 rounded-xl bg-[#006948] text-white hover:bg-[#00855d] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                    >
                      <LogIn className="w-4 h-4" />
                      <span>Impersonate</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onShowToast(`Opening tenant configuration editor for ${selectedTenant.name}`, 'info')}
                      className="h-10 rounded-xl bg-[#e5eeff] text-[#0b1c30] hover:bg-[#dce9ff] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Sliders className="w-4 h-4 text-[#565e74]" />
                      <span>Edit Tenant</span>
                    </button>
                  </div>
                </div>

                {/* Quick Operational Snapshot Banner */}
                <div className="p-4 rounded-2xl bg-[#dce9ff]/60 border border-[#dce9ff] shadow-xs flex items-center gap-3">
                  <Cpu className="w-6 h-6 text-[#006948] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#0b1c30] block truncate">
                      POS Kernel Deployment
                    </span>
                    <span className="text-[11px] text-[#565e74]">
                      Global firmware v4.8.2 pushed to 99.4% of fleet registers.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onShowToast('Firmware rollout status: 14,194 of 14,280 updated', 'info')}
                    className="px-2.5 py-1 rounded-lg bg-white text-[#0b1c30] border border-slate-200 font-mono text-[10px] font-bold uppercase hover:bg-slate-50 transition-colors shadow-xs shrink-0 cursor-pointer"
                  >
                    Rollout Log
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
