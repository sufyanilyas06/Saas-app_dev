import React, { useState } from 'react';
import {
  Gauge,
  ArrowUpRight,
  TrendingUp,
  Download,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Printer,
  Scale,
  CreditCard,
  Building,
  ShieldCheck,
  Zap,
  Layers,
  BarChart3,
  DollarSign
} from 'lucide-react';
import { ScreenType } from '../../types';
import { WebSidebar } from './WebSidebar';
import { WebHeader } from './WebHeader';

interface WebSuperAdminHqScreenProps {
  onShowToast: (message: string, type?: 'success' | 'warning' | 'info') => void;
  onNavigate: (screen: ScreenType) => void;
}

export const WebSuperAdminHqScreen: React.FC<WebSuperAdminHqScreenProps> = ({
  onShowToast,
  onNavigate,
}) => {
  const [chartMode, setChartMode] = useState<'gmv' | 'tenants'>('gmv');
  const [timeRange, setTimeRange] = useState<'today' | '30d' | 'ytd'>('30d');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex font-sans antialiased">
      {/* Shared Web Sidebar */}
      <WebSidebar currentScreen="web_dashboard" onNavigate={onNavigate} />

      {/* Main Content Area */}
      <div className="pl-72 flex-1 flex flex-col min-w-0">
        <WebHeader
          onNavigate={onNavigate}
          onShowToast={onShowToast}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <main className="w-full pt-20 px-8 pb-14">
          <div className="flex flex-col w-full max-w-7xl mx-auto">
            {/* Top Headline & Cloud Tier 0 Ribbon */}
            <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded font-mono text-[11px] bg-[#006948] text-white font-bold uppercase tracking-wider">
                    Cloud Tier 0
                  </span>
                  <span className="text-xs text-[#565e74] font-medium">
                    Platform Infrastructure & Multi-Tenant Fleet
                  </span>
                </div>
                <h1 className="text-2xl lg:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
                  Super Admin Command Center — Multi-Tenant Fleet Overview
                </h1>
                <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
                    <span className="font-mono text-xs text-[#0b1c30] font-bold">99.992% System Uptime</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
                    <Zap className="w-3.5 h-3.5 text-[#006948]" />
                    <span className="font-mono text-xs text-[#565e74]">
                      Global Sync Latency: <strong className="text-[#0b1c30]">18ms</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 shadow-xs">
                    <Layers className="w-3.5 h-3.5 text-[#565e74]" />
                    <span className="font-mono text-xs text-[#565e74]">
                      Active Shards: <strong className="text-[#0b1c30]">8 Georegions</strong>
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[10px] font-bold">
                    LIVE TELEMETRY POLLING
                  </div>
                </div>
              </div>

              {/* Time Range & Export Controls */}
              <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
                <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
                  <button
                    type="button"
                    onClick={() => setTimeRange('today')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      timeRange === 'today'
                        ? 'bg-[#006948] text-white shadow-xs'
                        : 'text-[#565e74] hover:text-[#0b1c30]'
                    }`}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeRange('30d')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      timeRange === '30d'
                        ? 'bg-[#006948] text-white shadow-xs'
                        : 'text-[#565e74] hover:text-[#0b1c30]'
                    }`}
                  >
                    Last 30 Days
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeRange('ytd')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      timeRange === 'ytd'
                        ? 'bg-[#006948] text-white shadow-xs'
                        : 'text-[#565e74] hover:text-[#0b1c30]'
                    }`}
                  >
                    YTD
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onShowToast('Exporting Global BI Financial & Operational CSV Report...', 'info')}
                  className="flex items-center gap-2 h-10 px-4 rounded-xl bg-[#213145] text-[#eaf1ff] hover:bg-[#0b1c30] text-xs font-bold shadow-xs transition-colors cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Global BI</span>
                </button>
              </div>
            </section>

            {/* 4 High-level Metric Cards */}
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 py-4">
              {/* Card 1 */}
              <div className="relative overflow-hidden bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-[#6d7a72] uppercase font-bold tracking-wider">
                      Monthly Recurring Rev
                    </span>
                    <span className="font-mono text-3xl font-extrabold text-[#0b1c30] tracking-tight mt-1">
                      $184,920.00
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#006948]/10 text-[#006948]">
                    <DollarSign className="w-6 h-6" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center text-[#006948] font-mono text-xs font-bold">
                      <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +14.8%
                    </span>
                    <span className="text-xs text-[#6d7a72]">MoM</span>
                  </div>
                  <span className="font-mono text-xs text-[#565e74]">
                    ARR Delta: <strong className="text-[#0b1c30] font-bold">+$24.3k</strong>
                  </span>
                </div>
                <div className="w-full mt-3 h-1.5 rounded-full bg-[#eff4ff] overflow-hidden">
                  <div className="h-full bg-[#006948] rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative overflow-hidden bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-[#6d7a72] uppercase font-bold tracking-wider">
                      Tenant Businesses
                    </span>
                    <span className="font-mono text-3xl font-extrabold text-[#0b1c30] tracking-tight mt-1">
                      1,428 Stores
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#dce9ff] text-[#0b1c30]">
                    <Building className="w-6 h-6 text-[#006948]" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center text-[#006948] font-mono text-xs font-bold">
                      <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> +86
                    </span>
                    <span className="text-xs text-[#6d7a72]">new accounts</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-[#e5eeff] text-[#3d4a42] font-semibold">
                      48 Trial
                    </span>
                    <span className="px-2 py-0.5 rounded-md font-mono text-[11px] bg-[#ffdcc3] text-[#2f1500] font-semibold">
                      8 Review
                    </span>
                  </div>
                </div>
                <div className="w-full mt-3 h-1.5 rounded-full bg-[#eff4ff] overflow-hidden">
                  <div className="h-full bg-[#00855d] rounded-full" style={{ width: '86%' }}></div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative overflow-hidden bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-[#6d7a72] uppercase font-bold tracking-wider">
                      Connected Lanes (Hardware)
                    </span>
                    <span className="font-mono text-3xl font-extrabold text-[#0b1c30] tracking-tight mt-1">
                      6,214 Live
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#eff4ff] text-[#0b1c30]">
                    <CreditCard className="w-6 h-6 text-[#565e74]" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#565e74]">
                    Spread: <strong className="text-[#0b1c30]">42 US States</strong>
                  </span>
                  <span className="font-mono text-xs text-[#006948] font-bold">18.4k tx/hr peak</span>
                </div>
                <div className="w-full mt-3 h-1.5 rounded-full bg-[#eff4ff] overflow-hidden">
                  <div className="h-full bg-[#006948] rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>

              {/* Card 4 */}
              <div className="relative overflow-hidden bg-white border border-slate-200 p-5 rounded-2xl shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-[11px] text-[#6d7a72] uppercase font-bold tracking-wider">
                      Global GMV Today
                    </span>
                    <span className="font-mono text-3xl font-extrabold text-[#0b1c30] tracking-tight mt-1">
                      $4,812,650
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#dce9ff] text-[#0b1c30]">
                    <BarChart3 className="w-6 h-6 text-[#8d4b00]" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="flex items-center text-[#006948] font-mono text-xs font-bold">
                      <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> +8.2%
                    </span>
                    <span className="text-xs text-[#6d7a72]">vs yesterday</span>
                  </div>
                  <span className="font-mono text-xs text-[#565e74] font-medium">312,490 checkouts</span>
                </div>
                <div className="w-full mt-3 h-1.5 rounded-full bg-[#eff4ff] overflow-hidden">
                  <div className="h-full bg-[#8d4b00] rounded-full" style={{ width: '64%' }}></div>
                </div>
              </div>
            </section>

            {/* 12-Column Interactive Dashboard Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start mt-2">
              {/* Left Column (8 cols): Chart + Recent Tenants Onboarding Table */}
              <div className="xl:col-span-8 flex flex-col gap-6">
                {/* Interactive GMV vs Tenant Chart */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-[#0b1c30] tracking-tight">
                          Tenant Growth vs Platform GMV Volume
                        </h2>
                        <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-[#e5eeff] text-[#3d4a42] font-bold">
                          L12M AGGREGATE
                        </span>
                      </div>
                      <p className="text-xs text-[#6d7a72] mt-0.5">
                        High-cadence retail transaction throughput across all deployed POS nodes
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-[#eff4ff] p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => setChartMode('gmv')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          chartMode === 'gmv'
                            ? 'bg-white text-[#0b1c30] shadow-xs'
                            : 'text-[#565e74] hover:text-[#0b1c30]'
                        }`}
                      >
                        GMV Volume ($)
                      </button>
                      <button
                        type="button"
                        onClick={() => setChartMode('tenants')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          chartMode === 'tenants'
                            ? 'bg-white text-[#0b1c30] shadow-xs'
                            : 'text-[#565e74] hover:text-[#0b1c30]'
                        }`}
                      >
                        Paid Tenants
                      </button>
                    </div>
                  </div>

                  {/* SVG Line Chart */}
                  <div className="relative w-full h-72 pt-3">
                    <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 740 220">
                      <defs>
                        <linearGradient id="gmvGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#006948" stopOpacity="0.32" />
                          <stop offset="100%" stopColor="#006948" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="tenantsGradient" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#565e74" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#565e74" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>

                      {/* Grid Lines */}
                      <line stroke="#e5eeff" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="740" y1="20" y2="20" />
                      <line stroke="#e5eeff" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="740" y1="70" y2="70" />
                      <line stroke="#e5eeff" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="740" y1="120" y2="120" />
                      <line stroke="#e5eeff" strokeDasharray="4 4" strokeWidth="1" x1="0" x2="740" y1="170" y2="170" />

                      {/* GMV Area & Line */}
                      <path
                        d="M0,175 C60,165 120,152 180,140 C240,128 300,135 360,110 C420,85 480,95 540,68 C600,45 660,35 740,18 L740,200 L0,200 Z"
                        fill="url(#gmvGradient)"
                      />
                      <path
                        d="M0,175 C60,165 120,152 180,140 C240,128 300,135 360,110 C420,85 480,95 540,68 C600,45 660,35 740,18"
                        fill="none"
                        stroke="#006948"
                        strokeLinecap="round"
                        strokeWidth="3"
                      />

                      {/* Secondary Line (Tenants) */}
                      <path
                        d="M0,190 C60,182 120,170 180,162 C240,154 300,148 360,136 C420,120 480,115 540,96 C600,82 660,70 740,54"
                        fill="none"
                        stroke="#565e74"
                        strokeDasharray="3 3"
                        strokeWidth="2"
                      />

                      {/* Data markers */}
                      <circle cx="180" cy="140" fill="#006948" r="4" />
                      <circle cx="360" cy="110" fill="#006948" r="4" />
                      <circle cx="540" cy="68" fill="#006948" r="4" />
                      <circle cx="740" cy="18" fill="#006948" r="6" stroke="#ffffff" strokeWidth="2" />
                    </svg>

                    <div className="flex items-center justify-between text-[#6d7a72] font-mono text-[11px] pt-3">
                      <span>JAN</span>
                      <span>FEB</span>
                      <span>MAR</span>
                      <span>APR</span>
                      <span>MAY</span>
                      <span>JUN</span>
                      <span>JUL</span>
                      <span>AUG</span>
                      <span>SEP</span>
                      <span>OCT</span>
                      <span>NOV</span>
                      <span className="text-[#006948] font-bold">DEC (CURRENT)</span>
                    </div>
                  </div>

                  {/* Chart Legend & Summary Bar */}
                  <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-4 bg-[#eff4ff] border border-[#dce9ff] p-3.5 rounded-xl">
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm bg-[#006948]"></span>
                        <span className="text-xs text-[#0b1c30]">
                          GMV Throughput: <strong className="font-mono text-[#0b1c30] font-bold">$124.8M Trailing</strong>
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-1 bg-[#565e74]"></span>
                        <span className="text-xs text-[#565e74]">
                          Active Supermarket Orgs: <strong className="font-mono text-[#0b1c30] font-semibold">1,428</strong>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-xs text-[#006948] font-bold">
                      <span>Avg Basket: $38.40</span>
                      <span className="text-[#6d7a72]">/</span>
                      <span>12.4 Items</span>
                    </div>
                  </div>
                </div>

                {/* Recent Business Onboarding & High-Volume Outliers */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-[#0b1c30] tracking-tight">
                          Recent Business Onboarding & High-Volume Outliers
                        </h2>
                        <span className="w-2 h-2 rounded-full bg-[#006948]"></span>
                      </div>
                      <p className="text-xs text-[#6d7a72]">
                        Tenants provisioned across high-density retail clusters within past 48 hours
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#565e74]">Cluster View:</span>
                      <span className="font-mono text-[11px] bg-[#e5eeff] px-2.5 py-1 rounded-lg text-[#0b1c30] font-bold uppercase">
                        US-EAST-1
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-[#eff4ff] text-[#3d4a42] font-mono text-[11px] uppercase font-bold tracking-wider">
                          <th className="py-3 px-4 rounded-l-lg">Store Name & Tenant ID</th>
                          <th className="py-3 px-3">Subscription Tier</th>
                          <th className="py-3 px-3 text-center">Connected Lanes</th>
                          <th className="py-3 px-4 text-right">24h Gross Vol</th>
                          <th className="py-3 px-4 text-right rounded-r-lg">Node State</th>
                        </tr>
                      </thead>
                      <tbody className="text-[#0b1c30] text-sm divide-y divide-slate-100">
                        {/* Row 1 */}
                        <tr
                          className="hover:bg-[#eff4ff]/60 transition-colors cursor-pointer group"
                          onClick={() => onNavigate('web_tenants')}
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-[#dce9ff] flex items-center justify-center font-bold text-[#006948]">
                                GG
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-[#0b1c30] group-hover:text-[#006948] transition-colors">
                                  GreenGrocers Organic Mart
                                </span>
                                <span className="font-mono text-xs text-[#6d7a72]">ORG-99201 • 14 Branches</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] bg-[#006948] text-white font-bold tracking-wide">
                              ENTERPRISE PRO
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className="font-mono text-sm font-bold text-[#0b1c30]">56 Lanes</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex flex-col items-end">
                              <span className="font-mono text-sm font-bold text-[#0b1c30]">$82,410.50</span>
                              <span className="font-mono text-[11px] text-[#006948] font-semibold">+12.4%</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e5eeff] font-mono text-[10px] text-[#006948] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#006948]"></span> HEALTHY
                            </span>
                          </td>
                        </tr>

                        {/* Row 2 */}
                        <tr
                          className="hover:bg-[#eff4ff]/60 transition-colors cursor-pointer group"
                          onClick={() => onNavigate('web_tenants')}
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-[#ffdcc3] flex items-center justify-center font-bold text-[#8d4b00]">
                                SH
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-[#0b1c30] group-hover:text-[#006948] transition-colors">
                                  Sunrise HyperMarket #4
                                </span>
                                <span className="font-mono text-xs text-[#6d7a72]">ORG-88419 • Regional Anchor</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] bg-[#dae2fd] text-[#131b2e] font-bold">
                              GROWTH FLEET
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className="font-mono text-sm font-bold text-[#0b1c30]">32 Lanes</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex flex-col items-end">
                              <span className="font-mono text-sm font-bold text-[#0b1c30]">$64,192.00</span>
                              <span className="font-mono text-[11px] text-[#6d7a72]">Baseline</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#dce9ff] font-mono text-[10px] text-[#565e74] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#565e74] animate-pulse"></span> SYNCING
                            </span>
                          </td>
                        </tr>

                        {/* Row 3 */}
                        <tr
                          className="hover:bg-[#eff4ff]/60 transition-colors cursor-pointer group"
                          onClick={() => onNavigate('web_tenants')}
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-[#dce9ff] flex items-center justify-center font-bold text-[#0b1c30]">
                                MF
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-[#0b1c30] group-hover:text-[#006948] transition-colors">
                                  Metro Fresh Express
                                </span>
                                <span className="font-mono text-xs text-[#6d7a72]">ORG-77103 • Bodega Chain</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] bg-[#e5eeff] text-[#3d4a42] font-bold">
                              STARTER
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className="font-mono text-sm font-bold text-[#0b1c30]">8 Lanes</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex flex-col items-end">
                              <span className="font-mono text-sm font-bold text-[#0b1c30]">$14,890.10</span>
                              <span className="font-mono text-[11px] text-[#006948] font-semibold">+21.0%</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e5eeff] font-mono text-[10px] text-[#006948] font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#006948]"></span> HEALTHY
                            </span>
                          </td>
                        </tr>

                        {/* Row 4 */}
                        <tr
                          className="hover:bg-[#eff4ff]/60 transition-colors cursor-pointer group"
                          onClick={() => onNavigate('web_tenants')}
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center font-bold text-red-700">
                                VF
                              </div>
                              <div className="flex flex-col">
                                <span className="font-bold text-[#0b1c30] group-hover:text-[#006948] transition-colors">
                                  Valley Fresh Provisions
                                </span>
                                <span className="font-mono text-xs text-[#6d7a72]">ORG-65421 • Flagship Mega-Store</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-3">
                            <span className="px-2.5 py-1 rounded-full font-mono text-[10px] bg-[#006948] text-white font-bold">
                              ENTERPRISE PRO
                            </span>
                          </td>
                          <td className="py-3.5 px-3 text-center">
                            <span className="font-mono text-sm font-bold text-[#0b1c30]">24 Lanes</span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex flex-col items-end">
                              <span className="font-mono text-sm font-bold text-[#0b1c30]">$41,200.75</span>
                              <span className="font-mono text-[11px] text-[#ba1a1a] font-semibold">-3.4%</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 font-mono text-[10px] text-red-700 font-bold">
                              <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> ATTENTION
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Right Column (4 cols): Alerts + Subscriptions Tier + Hardware Fleet Status */}
              <div className="xl:col-span-4 flex flex-col gap-6">
                {/* Tenant Health & Incident Monitor */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-[#ba1a1a]" />
                      <h2 className="text-base font-bold text-[#0b1c30]">Tenant Health & Incident Monitor</h2>
                    </div>
                    <span className="px-2 py-0.5 rounded-full font-mono text-xs bg-[#ba1a1a] text-white font-bold">
                      3 Alerts
                    </span>
                  </div>
                  <p className="text-xs text-[#6d7a72] my-3">
                    Critical multi-tenant events requiring HQ platform operator intervention
                  </p>

                  <div className="flex flex-col gap-3">
                    {/* Alert 1 */}
                    <div className="p-3.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[10px] text-[#ba1a1a] uppercase font-bold tracking-wider">
                          HARDWARE CONGESTION
                        </span>
                        <span className="font-mono text-xs text-[#6d7a72]">2m ago</span>
                      </div>
                      <div className="text-sm text-[#0b1c30] font-bold">
                        Tenant #104 (FreshMart) high lane queue load
                      </div>
                      <div className="text-xs text-[#3d4a42]">
                        Lane 04, 07 reporting over 14 pending scans in buffer memory. Real-time edge relay saturated.
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            onShowToast('Inspecting Lane 04 Telemetry buffer...', 'info');
                            onNavigate('fleet_hub');
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#213145] text-[#eaf1ff] text-xs font-bold hover:bg-[#0b1c30] transition-colors cursor-pointer"
                        >
                          Inspect Lane Telemetry
                        </button>
                        <button
                          type="button"
                          onClick={() => onShowToast('Incident #104 Acknowledged', 'success')}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[#0b1c30] text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          Acknowledge
                        </button>
                      </div>
                    </div>

                    {/* Alert 2 */}
                    <div className="p-3.5 rounded-xl bg-[#ffdcc3]/30 border border-[#ffdcc3] flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[10px] text-[#8d4b00] uppercase font-bold tracking-wider">
                          INTEGRATION FAULT
                        </span>
                        <span className="font-mono text-xs text-[#6d7a72]">18m ago</span>
                      </div>
                      <div className="text-sm text-[#0b1c30] font-bold">
                        Automated PO Webhook Failure in Region EU-West
                      </div>
                      <div className="text-xs text-[#3d4a42]">
                        SAP / FreshDirect EDI connector timed out during midnight replenishment batch sync.
                      </div>
                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => onShowToast('Re-syncing SAP EDI event batch...', 'info')}
                          className="px-2.5 py-1 rounded-lg bg-[#8d4b00] text-white text-xs font-bold hover:bg-[#6e3900] transition-colors cursor-pointer"
                        >
                          Trigger Re-sync Queue
                        </button>
                      </div>
                    </div>

                    {/* Alert 3 */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col gap-2">
                      <div className="flex items-start justify-between">
                        <span className="font-mono text-[10px] text-[#6d7a72] uppercase font-bold tracking-wider">
                          BILLING RETRY
                        </span>
                        <span className="font-mono text-xs text-[#6d7a72]">44m ago</span>
                      </div>
                      <div className="text-sm text-[#0b1c30] font-bold">
                        Stripe Billing Retry for 3 accounts
                      </div>
                      <div className="text-xs text-[#3d4a42]">
                        Card expiry on file for Sunrise Bodega & 2 other Starter tiers. Automated dunning step 1 initialized.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Subscription Breakdown Donut */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5 text-[#006948]" />
                      <h2 className="text-base font-bold text-[#0b1c30]">Subscription Breakdown by Tier</h2>
                    </div>
                    <span className="font-mono text-xs text-[#006948] font-bold">$129/mo Avg MRR</span>
                  </div>

                  <div className="flex items-center gap-5 py-4">
                    <div className="relative w-28 h-28 shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" fill="none" r="14" stroke="#eff4ff" strokeWidth="4.5" />
                        <circle
                          cx="18"
                          cy="18"
                          fill="none"
                          r="14"
                          stroke="#006948"
                          strokeDasharray="42 100"
                          strokeDashoffset="0"
                          strokeWidth="4.5"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          fill="none"
                          r="14"
                          stroke="#565e74"
                          strokeDasharray="38 100"
                          strokeDashoffset="-42"
                          strokeWidth="4.5"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          fill="none"
                          r="14"
                          stroke="#dae2fd"
                          strokeDasharray="15 100"
                          strokeDashoffset="-80"
                          strokeWidth="4.5"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          fill="none"
                          r="14"
                          stroke="#8d4b00"
                          strokeDasharray="5 100"
                          strokeDashoffset="-95"
                          strokeWidth="4.5"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="font-mono text-base text-[#0b1c30] font-extrabold leading-none">1.4k</span>
                        <span className="font-mono text-[9px] text-[#6d7a72] uppercase font-bold mt-0.5">SaaS Stores</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#006948]"></span>
                          <span className="text-[#0b1c30] font-medium">Enterprise Tier</span>
                        </div>
                        <span className="font-mono font-bold text-[#0b1c30]">42% (600)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#565e74]"></span>
                          <span className="text-[#0b1c30] font-medium">Pro Multi-Store</span>
                        </div>
                        <span className="font-mono font-bold text-[#0b1c30]">38% (542)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#dae2fd]"></span>
                          <span className="text-[#0b1c30] font-medium">Starter Grocery</span>
                        </div>
                        <span className="font-mono font-bold text-[#0b1c30]">15% (214)</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#8d4b00]"></span>
                          <span className="text-[#0b1c30] font-medium">Free Trials</span>
                        </div>
                        <span className="font-mono font-bold text-[#0b1c30]">5% (72)</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global POS Fleet Hardware Status */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#006948]" />
                      <h2 className="text-base font-bold text-[#0b1c30]">Global POS Fleet Hardware Status</h2>
                    </div>
                    <span className="font-mono text-[10px] bg-[#006948] text-white px-2 py-0.5 rounded font-bold uppercase">
                      LIVE STATUS
                    </span>
                  </div>

                  <div className="space-y-4 pt-1">
                    {/* Thermal printers */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#0b1c30] font-medium flex items-center gap-2">
                          <Printer className="w-4 h-4 text-[#6d7a72]" />
                          Thermal Receipt Printers
                        </span>
                        <span className="font-mono text-xs text-[#0b1c30] font-bold">98.4% Online</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                        <div className="h-full bg-[#006948] rounded-full" style={{ width: '98.4%' }}></div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#6d7a72]">
                        <span>6,114 online</span>
                        <span>100 paper-out warnings</span>
                      </div>
                    </div>

                    {/* Barcode Scales */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#0b1c30] font-medium flex items-center gap-2">
                          <Scale className="w-4 h-4 text-[#6d7a72]" />
                          Barcode Scales & Scanners
                        </span>
                        <span className="font-mono text-xs text-[#0b1c30] font-bold">99.1% Calibrated</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                        <div className="h-full bg-[#006948] rounded-full" style={{ width: '99.1%' }}></div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#6d7a72]">
                        <span>Zero drift tolerance certified</span>
                        <span>56 pending daily zero</span>
                      </div>
                    </div>

                    {/* Card Payment Terminals */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[#0b1c30] font-medium flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#6d7a72]" />
                          Card Payment Terminals
                        </span>
                        <span className="font-mono text-xs text-[#006948] font-bold">99.7% Operational</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                        <div className="h-full bg-[#006948] rounded-full" style={{ width: '99.7%' }}></div>
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#6d7a72]">
                        <span>EMV L3 Keys Active</span>
                        <span>EMV Kernel v2.4</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-2 pt-3 flex items-center justify-between bg-[#eff4ff] border border-[#dce9ff] p-3 rounded-xl">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#006948]" />
                      <span className="text-xs text-[#0b1c30] font-bold">PCI-DSS 4.0 Compliance</span>
                    </div>
                    <span className="font-mono text-xs text-[#006948] font-bold">Certified PASS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
