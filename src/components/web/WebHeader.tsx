import React from 'react';
import {
  Search,
  Filter,
  Bell,
  Smartphone,
  ArrowRight
} from 'lucide-react';
import { ScreenType } from '../../types';

interface WebHeaderProps {
  onNavigate: (screen: ScreenType) => void;
  onShowToast: (message: string, type?: 'success' | 'warning' | 'info') => void;
  searchPlaceholder?: string;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
}

export const WebHeader: React.FC<WebHeaderProps> = ({
  onNavigate,
  onShowToast,
  searchPlaceholder = 'Search tenants, store IDs, checkout domains, IP clusters, or merchant EIN...',
  searchTerm = '',
  onSearchChange,
}) => {
  return (
    <header className="fixed top-0 left-72 right-0 h-16 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-slate-200 shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-8">
      {/* Search & Region Filter */}
      <div className="flex items-center gap-6 flex-1 max-w-2xl">
        <div className="relative w-full">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6d7a72]" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full h-10 pl-10 pr-12 rounded-xl bg-white border border-slate-200 text-[#0b1c30] placeholder:text-[#6d7a72] text-sm focus:outline-none focus:ring-2 focus:ring-[#006948] focus:border-transparent shadow-xs transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[11px] bg-[#eff4ff] border border-[#dce9ff] px-1.5 py-0.5 rounded text-[#3d4a42]">
            ⌘K
          </kbd>
        </div>

        <div className="hidden xl:flex items-center gap-2 bg-[#eff4ff] border border-[#dce9ff] px-3 py-1.5 rounded-xl shrink-0">
          <Filter className="w-4 h-4 text-[#6d7a72]" />
          <span className="text-xs text-[#565e74]">Tenant:</span>
          <span className="text-xs text-[#0b1c30] font-bold">All Regions (1,842)</span>
        </div>
      </div>

      {/* Right Telemetry & Profile Controls */}
      <div className="flex items-center gap-4 shrink-0">
        {/* Switch to Mobile POS App */}
        <button
          type="button"
          onClick={() => onNavigate('pos')}
          className="hidden sm:flex items-center gap-1.5 bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] text-[#006948] px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile POS Till</span>
          <ArrowRight className="w-3 h-3" />
        </button>

        {/* SLA Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
          <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
          <span className="font-mono text-[11px] text-[#565e74] uppercase font-bold">SLA uptime</span>
          <span className="font-mono text-xs text-[#006948] font-bold">99.99%</span>
        </div>

        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        {/* Alerts Notification Button */}
        <button
          type="button"
          onClick={() => onShowToast('3 Active System Alerts: Hardware congestion in Lane 04', 'warning')}
          aria-label="Alerts"
          className="relative p-2 rounded-xl text-[#565e74] hover:bg-[#eff4ff] hover:text-[#0b1c30] transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#ba1a1a] ring-2 ring-white"></span>
        </button>

        {/* Super Admin User Profile */}
        <div className="flex items-center gap-3 pl-2">
          <img
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-[#85f8c4]"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VCIdHlMsvlBslVsFpITLHSez0vwE8ZkPDXIPs4TaHbYXtI3zezDR3ZzxS_oayX05oWiuZ4kI33zpVZxe2hZ3l0hDLRVg-ZGftuxfZfzUeZAxVFswFb8C-6pFbaopHCbNJ-Kxz9MNceuV4v3xwYkh1LQbLYgH57BgB3w-TPyUMPio_Tr7OMvHCyYOFzkjc8lDKrxt0s7GRm-vcEWsqHYfEUIsR1fYtcLBWnckaUuwK7he86E0yARzx5RfQ"
          />
          <div className="hidden lg:flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-[#0b1c30] font-bold leading-tight">Marcus Vance</span>
              <span className="px-1.5 py-0.2 rounded font-mono text-[9px] bg-[#006948] text-white font-bold tracking-wider">
                SUPER ADMIN
              </span>
            </div>
            <span className="text-xs text-[#565e74] leading-none mt-0.5">root@freshpos.network</span>
          </div>
        </div>
      </div>
    </header>
  );
};
