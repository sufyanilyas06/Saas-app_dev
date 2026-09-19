import React, { useState, useEffect } from 'react';
import { TrendingUp, ArrowUpRight, ShoppingBag, DollarSign, AlertTriangle, ChevronRight, Truck, BookOpen, Wallet, FileText, RefreshCw, BarChart2, Sparkles, Bot, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';

interface DashboardScreenProps {
  onNavigateToPOS: () => void;
  onNavigateToStock: () => void;
  onShowToast: (msg: string) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  onNavigateToPOS,
  onNavigateToStock,
  onShowToast,
}) => {
  const [secondsAgo, setSecondsAgo] = useState(8);
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [copilotInsight, setCopilotInsight] = useState<string | null>(null);

  const handleRunCopilot = async () => {
    setCopilotLoading(true);
    onShowToast('Requesting AI Retail Forecast & Pricing Insights...');
    try {
      const res = await api.askCopilot('Analyze current inventory turnover, stockout risks, and margin opportunities.');
      setCopilotInsight(res.response);
      onShowToast('Retail Intelligence forecast ready!', 'success');
    } catch {
      onShowToast('Copilot analysis completed');
    } finally {
      setCopilotLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo((prev) => (prev > 60 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Owner Pulse Status & Greeting */}
      <div className="flex items-center justify-between mt-1">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[10px] font-bold tracking-wider uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#006948] animate-ping" />
            Store Owner View
          </span>
          <span className="font-mono text-[10px] text-[#565e74]">Store #104 · Live</span>
        </div>
        <div className="flex items-center gap-1 bg-[#eff4ff] px-2.5 py-1 rounded-full text-xs">
          <RefreshCw className="w-3 h-3 text-[#006948] animate-spin" style={{ animationDuration: '8s' }} />
          <span className="font-mono text-[10px] text-[#565e74]">{secondsAgo}s ago</span>
        </div>
      </div>

      {/* Primary Gross Sales Card */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold tracking-wider">
              Today's Gross Sales
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-mono text-3xl font-black text-[#0b1c30] tracking-tight">
                $3,428.50
              </span>
              <span className="inline-flex items-center text-[#006948] font-mono text-xs font-bold bg-[#85f8c4]/40 px-1.5 py-0.5 rounded-full">
                <ArrowUpRight className="w-3.5 h-3.5" />
                14.2%
              </span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#85f8c4]/40 flex items-center justify-center text-[#006948]">
            <span className="material-symbols-outlined text-[22px]">payments</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 mt-1 text-xs text-[#565e74] bg-[#eff4ff]/60 px-2.5 py-1.5 rounded-lg">
          <span>
            Target Pace: <strong className="font-mono text-[#0b1c30]">$4,200.00</strong>
          </span>
          <span className="text-[#006948] font-mono font-bold">81.6% Achieved</span>
        </div>
      </div>

      {/* KPI Metrics Secondary Grid */}
      <div className="grid grid-cols-3 gap-2">
        {/* Net Profit */}
        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
              Net Profit
            </span>
            <TrendingUp className="w-3.5 h-3.5 text-[#006948]" />
          </div>
          <div>
            <div className="font-mono text-sm font-bold text-[#0b1c30]">$982.00</div>
            <span className="font-mono text-[10px] text-[#565e74]">Margin 28.6%</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
              Orders
            </span>
            <ShoppingBag className="w-3.5 h-3.5 text-[#565e74]" />
          </div>
          <div>
            <div className="font-mono text-sm font-bold text-[#0b1c30]">184</div>
            <span className="font-mono text-[10px] text-[#006948] font-bold">+12 vs y'day</span>
          </div>
        </div>

        {/* Avg Basket */}
        <div className="bg-white p-2.5 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
              Avg Basket
            </span>
            <DollarSign className="w-3.5 h-3.5 text-[#8d4b00]" />
          </div>
          <div>
            <div className="font-mono text-sm font-bold text-[#0b1c30]">$18.63</div>
            <span className="font-mono text-[10px] text-[#565e74]">3.4 items</span>
          </div>
        </div>
      </div>

      {/* Real-Time Hourly Sales Curve */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-xs text-[#0b1c30]">Hourly Velocity</h2>
            <p className="text-[11px] text-[#565e74]">Rush peak at 1:30 PM</p>
          </div>
          <div className="flex items-center gap-3 font-mono text-[10px]">
            <span className="inline-flex items-center gap-1 text-[#006948] font-bold">
              <span className="w-2.5 h-1 bg-[#006948] rounded-full" /> Today
            </span>
            <span className="inline-flex items-center gap-1 text-[#6d7a72]">
              <span className="w-2.5 h-1 bg-[#bccac0] rounded-full" /> Yesterday
            </span>
          </div>
        </div>

        {/* Sparkline Line Visual */}
        <div className="w-full h-28 relative pt-2">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 340 90">
            {/* Grid lines */}
            <line x1="0" x2="340" y1="20" y2="20" stroke="#bccac0" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.35" />
            <line x1="0" x2="340" y1="55" y2="55" stroke="#bccac0" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.35" />

            {/* Yesterday's Line (Dashed) */}
            <path
              d="M 0,72 Q 40,65 80,68 T 160,45 T 240,50 T 300,38 T 340,48"
              fill="none"
              stroke="#bccac0"
              strokeWidth="1.75"
              strokeDasharray="4 3"
            />

            {/* Today's Gradient Fill Area */}
            <defs>
              <linearGradient id="salesGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#006948" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#006948" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 0,78 Q 45,74 85,55 T 165,30 T 225,12 T 285,25 T 310,22 L 310,90 L 0,90 Z"
              fill="url(#salesGrad)"
            />

            {/* Today's Line (Primary Brand Solid) */}
            <path
              d="M 0,78 Q 45,74 85,55 T 165,30 T 225,12 T 285,25 T 310,22"
              fill="none"
              stroke="#006948"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Peak Point */}
            <circle cx="225" cy="12" r="4.5" fill="#006948" />
            <circle cx="225" cy="12" r="8" fill="#006948" fillOpacity="0.2" className="animate-pulse" />

            {/* Current Point */}
            <circle cx="310" cy="22" r="4" fill="#00855d" />
          </svg>

          {/* Timestamps */}
          <div className="flex justify-between font-mono text-[9px] text-[#565e74] mt-1 px-1">
            <span>8 AM</span>
            <span>11 AM</span>
            <span className="text-[#006948] font-bold">1:30 PM Peak</span>
            <span>4 PM</span>
            <span>Now</span>
          </div>
        </div>
      </div>

      {/* Critical Low-Stock & Expiry Alert Banner */}
      <div className="bg-[#ffdad6] text-[#93000a] rounded-xl p-3.5 shadow-sm border border-[#ffdad6] flex flex-col gap-2.5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-xs leading-tight">Inventory Urgent Action</h3>
              <p className="text-[11px] opacity-80">Disruption risk on floor racks</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white font-mono text-[10px] font-bold">
            7 Alerts
          </span>
        </div>

        {/* Alert Items Quick Strip */}
        <div className="grid grid-cols-2 gap-2 bg-white/70 p-2 rounded-lg backdrop-blur-sm text-xs">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#ba1a1a] font-bold uppercase">
              5 SKUs Critical Low
            </span>
            <span className="text-[#0b1c30] text-[11px] truncate">Whole Milk 1L, Avocados...</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#b15f00] font-bold uppercase">
              2 Expiring Today
            </span>
            <span className="text-[#0b1c30] text-[11px] truncate">Artisan Sourdough, Yogurt...</span>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-0.5">
          <button
            type="button"
            onClick={onNavigateToStock}
            className="flex-1 h-9 bg-[#ba1a1a] hover:bg-[#93000a] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-transform"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Reorder All Critical</span>
          </button>
          <button
            type="button"
            onClick={onNavigateToStock}
            aria-label="Review Alert Breakdown"
            className="w-9 h-9 bg-white text-[#0b1c30] rounded-lg flex items-center justify-center shadow-sm hover:bg-[#eff4ff]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Floor Lane Performance (2 active registers) */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="font-semibold text-xs text-[#0b1c30]">Floor Lane Performance</h2>
            <span className="w-2 h-2 rounded-full bg-[#006948] animate-ping" />
          </div>
          <span className="font-mono text-[10px] text-[#565e74]">2 active registers</span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Register 1: Sarah J */}
          <div className="bg-[#eff4ff] rounded-lg p-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9EKAyQ2cV5PNDA4EWdiGqfmYg1aYJwOsx4XYibIOIltllREriqechpEsXsiN-XElcjXjYKmDbc6CZPC0D4cnaazlko1s-FqkTrkotlRB0W7gwB0Ioev0nfU2FwoHdSUXvwHxaPTyT6XY8gX5MaihCh0nQj2dkbXF04QVxgRZRHsETswhaA-x7B9fTfqB1YEhSMaIhd22MYe9N8p3kCJW9nVVs3AhFg-lbWfCEXrlPBIm80bkdF69Q8Q"
                  alt="Sarah J - Lane 01"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#006948] ring-2 ring-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#0b1c30] truncate">Sarah J.</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#d3e4fe] text-[#0b1c30] font-mono text-[9px]">
                    Lane 01
                  </span>
                </div>
                <span className="text-[10px] text-[#565e74]">Shift 08:00 - 16:00 · 98 txns</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="font-mono text-xs font-bold text-[#006948]">$1,840.00</div>
              <span className="font-mono text-[9px] text-[#565e74]">Speed: 42s/order</span>
            </div>
          </div>

          {/* Register 2: Alex M */}
          <div className="bg-[#eff4ff] rounded-lg p-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXOme9mFq5BK26erQJ39RupNul6yc4e3fc61jSuqhqiRt1XRYS-8Tau6Cuc-oAB5FiwoMOTLX4RYzsn-OBL5yxj-UvD-Tl8bxsMjlxPn23XleGV3P3yUTFI6TsquAgJF5-yLwalJCgOWCTiPZlFqY0dKTja9Dc5XBxx7NP-nuIYg65SJ__Zp4-bcKxN5o0QhsyNQNREFQ0odum0xFDS3LmKyoMksMPHWLh8IwPXtIm4i8hIvf7IYepRw"
                  alt="Alex M - Lane 02"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#006948] ring-2 ring-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#0b1c30] truncate">Alex M.</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#d3e4fe] text-[#0b1c30] font-mono text-[9px]">
                    Lane 02
                  </span>
                </div>
                <span className="text-[10px] text-[#565e74]">Shift 10:00 - 18:00 · 86 txns</span>
              </div>
            </div>

            <div className="text-right shrink-0">
              <div className="font-mono text-xs font-bold text-[#0b1c30]">$1,588.50</div>
              <span className="font-mono text-[9px] text-[#565e74]">Speed: 49s/order</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tender Settlement Mix */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-xs text-[#0b1c30]">Tender Settlement Mix</h2>
            <span className="text-[10px] text-[#565e74]">Split by processed volume</span>
          </div>
          <span className="font-mono text-xs text-[#0b1c30] font-bold">$3,428.50 Total</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2.5 rounded-full bg-[#eff4ff] flex overflow-hidden">
          <div className="bg-[#006948] h-full" style={{ width: '45%' }} title="Cash 45%" />
          <div className="bg-[#565e74] h-full" style={{ width: '38%' }} title="Cards 38%" />
          <div className="bg-[#b15f00] h-full" style={{ width: '17%' }} title="QR/UPI 17%" />
        </div>

        {/* Legend */}
        <div className="grid grid-cols-3 gap-1.5 pt-0.5">
          <div className="flex flex-col bg-[#eff4ff] p-1.5 rounded-lg">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006948]" />
              <span className="font-mono text-[9px] text-[#565e74]">Cash</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#0b1c30] mt-0.5">$1,542.82</span>
            <span className="font-mono text-[9px] text-[#006948] font-bold">45%</span>
          </div>

          <div className="flex flex-col bg-[#eff4ff] p-1.5 rounded-lg">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#565e74]" />
              <span className="font-mono text-[9px] text-[#565e74]">Cards</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#0b1c30] mt-0.5">$1,302.83</span>
            <span className="font-mono text-[9px] text-[#565e74] font-bold">38%</span>
          </div>

          <div className="flex flex-col bg-[#eff4ff] p-1.5 rounded-lg">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b15f00]" />
              <span className="font-mono text-[9px] text-[#565e74]">QR / UPI</span>
            </div>
            <span className="font-mono text-xs font-bold text-[#0b1c30] mt-0.5">$582.85</span>
            <span className="font-mono text-[9px] text-[#b15f00] font-bold">17%</span>
          </div>
        </div>
      </div>

      {/* FreshPOS Retail AI Copilot & Forecasting */}
      <div className="bg-linear-to-br from-[#0b1c30] to-[#132a45] text-white rounded-xl p-3.5 shadow-sm border border-[#1e3a5f] flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#85f8c4]/20 border border-[#85f8c4]/30 flex items-center justify-center text-[#85f8c4] shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-xs text-white">FreshPOS Retail AI Intelligence</h3>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#85f8c4] text-[#002114]">
                  SERVER-SIDE
                </span>
              </div>
              <p className="text-[10px] text-[#8ea4c8]">
                Real-time stockout risk & margin copilot
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleRunCopilot}
            disabled={copilotLoading}
            className="h-8 px-3 rounded-lg bg-[#00855d] hover:bg-[#009e6f] active:scale-95 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-50"
          >
            {copilotLoading ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Forecasting...</span>
              </>
            ) : (
              <>
                <Bot className="w-3.5 h-3.5 text-[#85f8c4]" />
                <span>Run Forecast</span>
              </>
            )}
          </button>
        </div>

        {copilotInsight && (
          <div className="bg-black/30 border border-white/10 rounded-lg p-3 text-xs text-slate-200 whitespace-pre-line font-sans leading-relaxed">
            {copilotInsight}
          </div>
        )}
      </div>

      {/* Store Manager Quick Action Grid */}
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold tracking-wider px-1">
          Owner Controls
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onShowToast('Generating Daily Z-Report & GST Fiscal Summary...')}
            className="bg-white p-3 rounded-xl shadow-sm border border-[#bccac0]/20 flex items-center gap-2.5 text-left active:scale-[0.98] transition-transform hover:bg-[#eff4ff]"
          >
            <div className="w-9 h-9 rounded-lg bg-[#dae2fd] text-[#131b2e] flex items-center justify-center shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs text-[#0b1c30] truncate">Sales Report</span>
              <span className="text-[10px] text-[#565e74] truncate">Z-Report & GST</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onShowToast('Loading 14 customer credit khata balances...')}
            className="bg-white p-3 rounded-xl shadow-sm border border-[#bccac0]/20 flex items-center gap-2.5 text-left active:scale-[0.98] transition-transform hover:bg-[#eff4ff]"
          >
            <div className="w-9 h-9 rounded-lg bg-[#ffdcc3] text-[#2f1500] flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs text-[#0b1c30] truncate">Due Ledger</span>
              <span className="text-[10px] text-[#565e74] truncate">14 Khatas Pending</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onShowToast('Opening Petty Cash / Expense Entry modal')}
            className="bg-white p-3 rounded-xl shadow-sm border border-[#bccac0]/20 flex items-center gap-2.5 text-left active:scale-[0.98] transition-transform hover:bg-[#eff4ff]"
          >
            <div className="w-9 h-9 rounded-lg bg-[#e5eeff] text-[#0b1c30] flex items-center justify-center shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs text-[#0b1c30] truncate">Expense Entry</span>
              <span className="text-[10px] text-[#565e74] truncate">Cash Out & Petty</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => onShowToast('Supplier logistics: 3 supplier trucks dispatched')}
            className="bg-white p-3 rounded-xl shadow-sm border border-[#bccac0]/20 flex items-center gap-2.5 text-left active:scale-[0.98] transition-transform hover:bg-[#eff4ff]"
          >
            <div className="w-9 h-9 rounded-lg bg-[#85f8c4] text-[#002114] flex items-center justify-center shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs text-[#0b1c30] truncate">Suppliers</span>
              <span className="text-[10px] text-[#565e74] truncate">3 Dispatches today</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
