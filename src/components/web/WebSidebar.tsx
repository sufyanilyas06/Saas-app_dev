import React from 'react';
import {
  LayoutGrid,
  Store,
  CreditCard,
  Cpu,
  Activity,
  Shield,
  Cloud,
  ArrowRight,
  ShieldAlert,
  Smartphone
} from 'lucide-react';
import { ScreenType } from '../../types';

interface WebSidebarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
}

export const WebSidebar: React.FC<WebSidebarProps> = ({ currentScreen, onNavigate }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-72 bg-white z-50 flex flex-col border-r border-slate-200 shadow-[0_1px_8px_rgba(0,0,0,0.04)] select-none">
      {/* Brand & Environment Header */}
      <div className="px-6 pt-6 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <img
            alt="Brand logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida/AEtjO1XQ8iltEQu87iVQUDg3QrxZNS0oHRkQab-9Jft-ferFwcLubFBSL56RMBepHpp59IlpgwrLSxUupwv6zPa2dvMA12PI0LoLjNEVRj6uXCovXjCILScryQZJRTQXe3GlNugZOcpGi1zGSm_7lM7z2jg3Rh-za2jgirFUpz97nyN3b8UkjPANRDXOP1KkYycSoFwvvDxDwYTbocgeUNTYpH-DX0tMCLMnNpxwBZO09WyZM9kc7KksiS2LW-_X"
          />
          <div className="flex flex-col">
            <span className="text-base text-[#0b1c30] leading-tight font-extrabold tracking-tight">FreshPOS</span>
            <span className="font-mono text-[11px] text-[#006948] font-bold uppercase tracking-wider">Cloud Central HQ</span>
          </div>
        </div>

        <div className="mt-3.5 px-2.5 py-1.5 rounded-lg bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
            <span className="font-mono text-[11px] text-[#3d4a42] font-semibold uppercase">US-East (Prod)</span>
          </div>
          <span className="font-mono text-xs text-[#006948] font-bold">v4.8.2</span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="px-4 pt-3 pb-1">
        <span className="px-3 font-mono text-[10px] text-[#6d7a72] uppercase font-bold tracking-wider">
          Platform Governance
        </span>
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        <button
          type="button"
          onClick={() => onNavigate('web_dashboard')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
            currentScreen === 'web_dashboard'
              ? 'bg-[#00855d] text-white font-bold shadow-xs'
              : 'text-[#3d4a42] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
          }`}
        >
          <LayoutGrid className="w-5 h-5 shrink-0" />
          <span>Overview / HQ</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('web_tenants')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
            currentScreen === 'web_tenants'
              ? 'bg-[#00855d] text-white font-bold shadow-xs'
              : 'text-[#3d4a42] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
          }`}
        >
          <Store className="w-5 h-5 shrink-0" />
          <span>Tenants & Stores</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('billing_plans')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
            currentScreen === 'billing_plans' || currentScreen === 'subscription_overview'
              ? 'bg-[#00855d] text-white font-bold shadow-xs'
              : 'text-[#3d4a42] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
          }`}
        >
          <CreditCard className="w-5 h-5 shrink-0" />
          <span>Subscriptions & MRR</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('fleet_hub')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
            currentScreen === 'fleet_hub'
              ? 'bg-[#00855d] text-white font-bold shadow-xs'
              : 'text-[#3d4a42] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
          }`}
        >
          <Cpu className="w-5 h-5 shrink-0" />
          <span>Global Hardware & Lanes</span>
        </button>

        <div className="pt-4 pb-1">
          <span className="px-3 font-mono text-[10px] text-[#6d7a72] uppercase font-bold tracking-wider">
            Observability & Ops
          </span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('hardware_diagnostics')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
            currentScreen === 'hardware_diagnostics'
              ? 'bg-[#00855d] text-white font-bold shadow-xs'
              : 'text-[#3d4a42] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
          }`}
        >
          <Activity className="w-5 h-5 shrink-0" />
          <span>Platform Health & Logs</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('web_root_console')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
            currentScreen === 'web_root_console'
              ? 'bg-red-700 text-white font-bold shadow-xs'
              : 'text-[#3d4a42] hover:bg-red-50 hover:text-red-800'
          }`}
        >
          <ShieldAlert className="w-5 h-5 shrink-0 text-red-600" />
          <span>Root Enclave (LVL-0)</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigate('web_auth')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
            currentScreen === 'web_auth'
              ? 'bg-[#00855d] text-white font-bold shadow-xs'
              : 'text-[#3d4a42] hover:bg-[#eff4ff] hover:text-[#0b1c30]'
          }`}
        >
          <Shield className="w-5 h-5 shrink-0" />
          <span>SaaS System Settings</span>
        </button>

        {/* Seamless switch to Mobile POS */}
        <div className="pt-3">
          <button
            type="button"
            onClick={() => onNavigate('pos')}
            className="w-full flex items-center justify-between px-3 py-2 bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] text-[#006948] rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              <span>Switch to POS App</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </nav>

      {/* Active Nodes Summary Tray */}
      <div className="p-4 mt-auto border-t border-slate-100 bg-white">
        <div className="p-3 rounded-xl bg-[#eff4ff] border border-[#dce9ff] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">Active Nodes</span>
            <span className="font-mono text-xs font-bold text-[#0b1c30]">14,280 Lanes</span>
          </div>
          <Cloud className="w-5 h-5 text-[#006948]" />
        </div>
      </div>
    </aside>
  );
};
