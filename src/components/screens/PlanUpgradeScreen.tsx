import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  PartyPopper, 
  Star, 
  CheckCircle2, 
  Check, 
  Zap, 
  Puzzle, 
  Store, 
  BrainCircuit, 
  TrendingUp, 
  Lock 
} from 'lucide-react';
import { ScreenType } from '../../types';

interface PlanUpgradeScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const PlanUpgradeScreen: React.FC<PlanUpgradeScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [activePlan, setActivePlan] = useState<'growth' | 'enterprise'>('growth');

  const prices = isAnnual
    ? { starter: 23, growth: 63, enterprise: 159 }
    : { starter: 29, growth: 79, enterprise: 199 };

  const handleUpgrade = () => {
    setIsUpgrading(true);
    setTimeout(() => {
      setIsUpgrading(false);
      setActivePlan('enterprise');
      onShowToast('Subscription Upgraded: Welcome to Enterprise Hypermarket tier!');
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      {/* Top Context Navigation */}
      <div className="px-3 pt-3 pb-2 flex items-center justify-between">
        <button
          onClick={() => onNavigate('subscription_overview')}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-[#0b1c30] shadow-sm hover:bg-[#eff4ff] transition-colors border border-[#bccac0]/30"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#eff4ff] text-[#565e74] font-mono text-[10px] font-bold uppercase">
          <ShieldCheck className="w-3.5 h-3.5 text-[#006948]" />
          <span>Billing & Tiers</span>
        </div>
      </div>

      {/* Page Title & Header */}
      <div className="px-3 pt-1 pb-3">
        <h1 className="text-xl font-bold text-[#0b1c30] tracking-tight">Upgrade Your Plan</h1>
        <p className="text-xs text-[#565e74] mt-0.5">Select a tier tailored to your retail store expansion</p>
      </div>

      {/* Billing Cycle Pill Selector */}
      <div className="px-3 mb-4">
        <div className="p-1 rounded-xl bg-[#dce9ff] flex items-center gap-1 shadow-sm">
          <button
            type="button"
            onClick={() => setIsAnnual(false)}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all text-center ${
              !isAnnual
                ? 'bg-white text-[#006948] shadow-sm'
                : 'text-[#565e74] hover:text-[#0b1c30]'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setIsAnnual(true)}
            className={`flex-1 py-2 px-1 rounded-lg text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 ${
              isAnnual
                ? 'bg-white text-[#006948]'
                : 'text-[#565e74] hover:text-[#0b1c30]'
            }`}
          >
            <span>Annual</span>
            <span className="inline-flex items-center px-1.5 py-0.2 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
              Save 20%
            </span>
          </button>
        </div>
        <div className="flex items-center justify-center gap-1 mt-2 text-[#006948] text-xs font-medium">
          <PartyPopper className="w-4 h-4" />
          <span>Annual plans include 2 months complimentary hosting</span>
        </div>
      </div>

      {/* Plan Tiers Vertical Stack */}
      <div className="px-3 flex flex-col gap-3 mb-6">
        {/* Enterprise Hypermarket (RECOMMENDED) */}
        <div className="relative overflow-hidden rounded-xl bg-white shadow-md p-4 border-2 border-[#006948] bg-gradient-to-b from-[#85f8c4]/20 via-white to-white">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#006948] text-white font-mono text-[9px] font-bold tracking-wider uppercase shadow-sm">
                <Star className="w-3 h-3 fill-white" />
                Best for Expanding Chains
              </span>
              <h2 className="text-base font-bold text-[#0b1c30] mt-2">Enterprise Hypermarket</h2>
              <p className="text-xs text-[#565e74]">Multi-lane hypermarkets & regional warehouse stores</p>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-baseline justify-end gap-0.5">
                <span className="font-mono text-sm text-[#0b1c30] font-bold">$</span>
                <span className="text-3xl font-black text-[#0b1c30] font-mono">{prices.enterprise}</span>
              </div>
              <span className="font-mono text-[9px] text-[#565e74] uppercase block">
                / mo billed {isAnnual ? 'yearly' : 'monthly'}
              </span>
            </div>
          </div>

          <div className="my-3 p-2 rounded-lg bg-[#eff4ff] flex items-center justify-between text-xs">
            <span className="text-[#565e74]">Instant prorated total</span>
            <span className="font-mono font-bold text-[#006948]">$46.80 due today</span>
          </div>

          <div className="space-y-2 mb-4">
            {[
              <><strong>Unlimited Registers</strong> & cashier lanes</>,
              <><strong>Unlimited Staff</strong> accounts with biometric PINs</>,
              <>Up to <strong>10 Store Outlets</strong> centralized</>,
              <>Automated cold-chain & spoilage audits</>,
              <>Dedicated manager & <strong>99.99% uptime SLA</strong></>,
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#0b1c30]">
                <CheckCircle2 className="w-4 h-4 text-[#006948] shrink-0 fill-[#85f8c4]" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleUpgrade}
            disabled={isUpgrading || activePlan === 'enterprise'}
            className="w-full h-12 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-transform"
          >
            {activePlan === 'enterprise' ? (
              <>
                <Check className="w-4 h-4" />
                <span>Current Active Tier</span>
              </>
            ) : isUpgrading ? (
              <span>Activating Enterprise...</span>
            ) : (
              <>
                <span>Upgrade to Enterprise</span>
                <Zap className="w-4 h-4 fill-white" />
              </>
            )}
          </button>
          <p className="text-center text-[11px] text-[#565e74] mt-2">Cycle switches instantly. No till downtime.</p>
        </div>

        {/* Growth Store (CURRENT PLAN) */}
        <div className={`rounded-xl bg-white shadow-sm p-4 border ${activePlan === 'growth' ? 'border-[#006948]/50' : 'border-[#bccac0]/30'}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#0b1c30] font-mono text-[9px] font-bold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006948]"></span>
                Current Plan
              </span>
              <h2 className="text-base font-bold text-[#0b1c30] mt-1.5">Growth Store</h2>
              <p className="text-xs text-[#565e74]">Active subscription since Oct 2024</p>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-baseline justify-end gap-0.5">
                <span className="font-mono text-sm text-[#0b1c30] font-bold">$</span>
                <span className="text-3xl font-black text-[#0b1c30] font-mono">{prices.growth}</span>
              </div>
              <span className="font-mono text-[9px] text-[#565e74] uppercase block">
                / mo billed {isAnnual ? 'yearly' : 'monthly'}
              </span>
            </div>
          </div>

          <div className="space-y-2 my-3">
            {[
              'Up to 5 registers & mobile handhelds',
              '15 staff logins with permission tiers',
              '3 store locations & inter-store stock transfers',
              'Automated PO generation & live chat support',
            ].map((feat, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-[#0b1c30]">
                <Check className="w-4 h-4 text-[#006948] shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>

          <button
            type="button"
            disabled
            className="w-full h-11 rounded-xl bg-[#e5eeff] text-[#565e74] font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed"
          >
            <Check className="w-4 h-4" />
            <span>Current Active Tier</span>
          </button>
        </div>

        {/* Starter Store */}
        <div className="rounded-xl bg-white shadow-sm p-4 border border-[#bccac0]/30 opacity-90">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#565e74] font-mono text-[9px] font-bold uppercase">
                Single Till Stores
              </span>
              <h2 className="text-base font-bold text-[#0b1c30] mt-1.5">Starter Store</h2>
              <p className="text-xs text-[#565e74]">Boutique grocers & fresh kiosks</p>
            </div>
            <div className="text-right shrink-0">
              <div className="flex items-baseline justify-end gap-0.5">
                <span className="font-mono text-sm text-[#0b1c30] font-bold">$</span>
                <span className="text-3xl font-black text-[#0b1c30] font-mono">{prices.starter}</span>
              </div>
              <span className="font-mono text-[9px] text-[#565e74] uppercase block">
                / mo billed {isAnnual ? 'yearly' : 'monthly'}
              </span>
            </div>
          </div>

          <div className="space-y-2 my-3 text-xs text-[#565e74]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#6d7a72] shrink-0" />
              <span>Up to 2 registers</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#6d7a72] shrink-0" />
              <span>5 staff logins & 1 store location</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#6d7a72] shrink-0" />
              <span>Standard daily CSV exports</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#6d7a72] shrink-0" />
              <span>Email customer support (24h response)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onShowToast('Starter downgrade request queued for end of cycle')}
            className="w-full h-11 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] font-bold text-xs flex items-center justify-center transition-colors"
          >
            Downgrade to Starter
          </button>
        </div>
      </div>

      {/* Plan Add-ons Section */}
      <div className="px-3 mb-5">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-sm font-bold text-[#0b1c30]">Modular Add-ons</h3>
            <p className="text-[11px] text-[#565e74]">Customize your operations with flex add-ons</p>
          </div>
          <Puzzle className="w-5 h-5 text-[#006948]" />
        </div>

        <div className="flex flex-col gap-2">
          {/* Add-on 1 */}
          <div className="p-3 rounded-xl bg-white shadow-sm border border-[#bccac0]/30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006948] shrink-0">
                <Store className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0b1c30] truncate">Extra Register Slot</p>
                <p className="text-[11px] text-[#565e74]">+$15/mo per active POS lane</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onShowToast('Added +1 Register Lane slot ($15/mo)')}
              className="px-3 py-1.5 rounded-lg bg-[#eff4ff] font-bold text-xs text-[#0b1c30] hover:bg-[#e5eeff] transition-colors shrink-0"
            >
              + Add
            </button>
          </div>

          {/* Add-on 2 */}
          <div className="p-3 rounded-xl bg-white shadow-sm border border-[#bccac0]/30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-[#85f8c4] flex items-center justify-center text-[#002114] shrink-0">
                <BrainCircuit className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0b1c30] truncate">Advanced AI Demand Forecasting</p>
                <p className="text-[11px] text-[#565e74]">+$30/mo predictive stock ordering</p>
              </div>
            </div>
            <button
              type="button"
              className="px-3 py-1.5 rounded-lg bg-[#85f8c4] text-[#002114] font-bold text-xs hover:bg-[#68dba9] transition-colors shrink-0"
            >
              Included in Ent.
            </button>
          </div>
        </div>
      </div>

      {/* Volume Projection */}
      <div className="px-3 mb-5">
        <div className="p-3.5 rounded-xl bg-white shadow-sm border border-[#bccac0]/30 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#dce9ff] flex items-center justify-center text-[#006948] shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0b1c30]">Store Volume Projection</p>
            <p className="text-[11px] text-[#565e74]">Your current traffic is at 84% capacity on Growth Store tier.</p>
          </div>
        </div>
      </div>

      {/* Security & Trust Footer Banner */}
      <div className="px-3 pb-6">
        <div className="p-3.5 rounded-xl bg-[#eff4ff] text-center flex flex-col items-center gap-1 border border-[#bccac0]/30">
          <div className="flex items-center justify-center gap-2 text-[#006948] font-bold text-xs">
            <Lock className="w-4 h-4" />
            <span>Bank-Grade Encryption</span>
          </div>
          <p className="text-[11px] text-[#565e74]">
            PCI-DSS Level 1 Compliant • Cancel or switch plans anytime without penalty.
          </p>
        </div>
      </div>
    </div>
  );
};
