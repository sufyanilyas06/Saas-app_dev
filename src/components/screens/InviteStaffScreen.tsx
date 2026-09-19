import React, { useState } from 'react';
import { UserPlus, Store, Mail, Phone, Lock, RefreshCw, ArrowRight, Check, X, Shield, Plus } from 'lucide-react';

interface InviteStaffScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: any) => void;
}

export const InviteStaffScreen: React.FC<InviteStaffScreenProps> = ({ onShowToast, onNavigate }) => {
  const [name, setName] = useState('Jordan Blake');
  const [email, setEmail] = useState('jordan.b@freshmart.pos');
  const [phone, setPhone] = useState('+1 (555) 389-0122');
  const [branch, setBranch] = useState<'main' | 'express'>('main');
  const [lanes, setLanes] = useState(['Lane #01 - Express Lane', 'Lane #04 - Deli Counter']);
  const [role, setRole] = useState<'cashier' | 'manager' | 'inventory' | 'custom'>('cashier');
  const [pinRequired, setPinRequired] = useState(true);
  const [pinDigits, setPinDigits] = useState(['8', '9', '1', '4']);
  const [allow5GFallback, setAllow5GFallback] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const removeLane = (laneToRemove: string) => {
    setLanes(lanes.filter((l) => l !== laneToRemove));
  };

  const addLane = () => {
    const nextLane = `Lane #0${lanes.length + 1} - Register`;
    setLanes([...lanes, nextLane]);
    onShowToast(`Added terminal authorization: ${nextLane}`);
  };

  const regeneratePin = () => {
    const next = [
      Math.floor(Math.random() * 10).toString(),
      Math.floor(Math.random() * 10).toString(),
      Math.floor(Math.random() * 10).toString(),
      Math.floor(Math.random() * 10).toString(),
    ];
    setPinDigits(next);
    onShowToast(`Regenerated dispatch PIN: ${next.join('')}`);
  };

  const handleSendInvite = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onShowToast(`Invitation email & SMS queued for ${name}!`);
      onNavigate('staff_directory');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Stepper Header */}
      <div className="bg-[#eff4ff] p-3 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] text-[#006948] uppercase font-bold flex items-center gap-1">
            <UserPlus className="w-3.5 h-3.5" />
            Staff Enrollment
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#565e74] font-mono text-[9px] font-bold">
            STEP 1 OF 2
          </span>
        </div>

        <div className="w-full bg-[#d3e4fe] h-1.5 rounded-full overflow-hidden flex">
          <div className="bg-[#006948] h-full w-1/2 rounded-full" />
        </div>

        <div className="flex items-center justify-between text-xs">
          <p className="font-bold text-[#0b1c30]">Profile & Store Access</p>
          <span className="font-mono text-[10px] text-[#565e74]">Next: Permissions Matrix</span>
        </div>
      </div>

      {/* Section 1: Personal & Contact Information */}
      <section className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-center justify-between pb-1 border-b border-[#eff4ff]">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#006948] text-[20px]">badge</span>
            <h2 className="font-bold text-xs text-[#0b1c30]">Personal Information</h2>
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#dae2fd] text-[#131b2e] font-bold">
            EMP-4092
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Full Legal Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full h-10 bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold px-3 rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Work Email Address</label>
          <div className="relative flex items-center">
            <Mail className="w-4 h-4 text-[#565e74] absolute left-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold pl-9 pr-3 rounded-lg outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Direct Mobile Number</label>
          <div className="relative flex items-center">
            <Phone className="w-4 h-4 text-[#565e74] absolute left-3" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full h-10 bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold pl-9 pr-3 rounded-lg outline-none"
            />
          </div>
        </div>
      </section>

      {/* Section 2: Store Location & Terminals */}
      <section className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-center gap-1.5 pb-1 border-b border-[#eff4ff]">
          <Store className="w-4 h-4 text-[#006948]" />
          <h2 className="font-bold text-xs text-[#0b1c30]">Store Location & Terminals</h2>
        </div>

        <div className="grid grid-cols-1 gap-2 text-xs">
          <label
            className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-colors ${
              branch === 'main' ? 'bg-[#eff4ff] border-[#006948]' : 'bg-white border-[#bccac0]/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="branch"
                checked={branch === 'main'}
                onChange={() => setBranch('main')}
                className="accent-[#006948]"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-[#0b1c30]">FreshMart Superstore</span>
                <span className="text-[10px] text-[#565e74]">Main Branch • 12 Active Registers</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#85f8c4]/40 text-[#005137] font-mono text-[9px] font-bold">
              Default
            </span>
          </label>

          <label
            className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer border transition-colors ${
              branch === 'express' ? 'bg-[#eff4ff] border-[#006948]' : 'bg-white border-[#bccac0]/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="branch"
                checked={branch === 'express'}
                onChange={() => setBranch('express')}
                className="accent-[#006948]"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-xs text-[#0b1c30]">Downtown Express #02</span>
                <span className="text-[10px] text-[#565e74]">Satellite Outlet • 4 Active Registers</span>
              </div>
            </div>
          </label>
        </div>

        {/* Terminals Tags */}
        <div className="flex flex-col gap-1 pt-1">
          <label className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Authorized Checkout Terminals</label>
          <div className="flex flex-wrap gap-1.5 items-center">
            {lanes.map((lane) => (
              <div key={lane} className="flex items-center gap-1 px-2.5 py-1 bg-[#eff4ff] rounded-full text-xs font-semibold text-[#0b1c30]">
                <span>{lane}</span>
                <button
                  type="button"
                  onClick={() => removeLane(lane)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[#565e74] hover:text-[#ba1a1a]"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addLane}
              className="flex items-center gap-1 px-2.5 py-1 bg-[#e5eeff] hover:bg-[#dce9ff] rounded-full text-[#006948] text-xs font-bold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Lane</span>
            </button>
          </div>
        </div>
      </section>

      {/* Section 3: Role Selection Cards */}
      <section className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-center justify-between pb-1 border-b border-[#eff4ff]">
          <div className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-[#006948]" />
            <h2 className="font-bold text-xs text-[#0b1c30]">System Role & Permissions</h2>
          </div>
          <span className="font-mono text-[9px] text-[#8d4b00] font-bold uppercase">High Security</span>
        </div>

        <div className="flex flex-col gap-2 text-xs">
          {/* Cashier */}
          <label
            className={`flex flex-col p-3 rounded-xl cursor-pointer border transition-all ${
              role === 'cashier' ? 'bg-[#85f8c4]/20 border-[#006948]' : 'bg-[#eff4ff] border-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  checked={role === 'cashier'}
                  onChange={() => setRole('cashier')}
                  className="accent-[#006948]"
                />
                <span className="font-bold text-xs text-[#0b1c30]">Cashier</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#006948] text-white font-mono text-[9px] font-bold uppercase">
                Active Plan
              </span>
            </div>
            <p className="mt-1 ml-5 text-[10px] text-[#565e74] leading-relaxed">
              Can tender sales, scan barcodes, print receipts, and open cash drawer with verified shift float.
            </p>
          </label>

          {/* Store Manager */}
          <label
            className={`flex flex-col p-3 rounded-xl cursor-pointer border transition-all ${
              role === 'manager' ? 'bg-[#85f8c4]/20 border-[#006948]' : 'bg-[#eff4ff] border-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="role"
                  checked={role === 'manager'}
                  onChange={() => setRole('manager')}
                  className="accent-[#006948]"
                />
                <span className="font-bold text-xs text-[#0b1c30]">Store Manager</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#d3e4fe] text-[#0b1c30] font-mono text-[9px] font-bold uppercase">
                Full Ops
              </span>
            </div>
            <p className="mt-1 ml-5 text-[10px] text-[#565e74] leading-relaxed">
              Full register override, price adjustments, approve refunds &gt; $5.00, print Z-reports, and audit tills.
            </p>
          </label>
        </div>
      </section>

      {/* Section 4: Security PIN & Dispatch */}
      <section className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-center gap-1.5 pb-1 border-b border-[#eff4ff]">
          <Lock className="w-4 h-4 text-[#006948]" />
          <h2 className="font-bold text-xs text-[#0b1c30]">Security & Terminal PIN</h2>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between py-0.5">
          <div className="flex flex-col">
            <span className="font-semibold text-xs text-[#0b1c30]">Require 4-Digit Security PIN</span>
            <span className="text-[10px] text-[#565e74]">Enforces fast clerk unlock on POS hardware</span>
          </div>
          <button
            type="button"
            onClick={() => setPinRequired(!pinRequired)}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ${
              pinRequired ? 'bg-[#006948]' : 'bg-[#bccac0]'
            }`}
          >
            <span className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
              pinRequired ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Temporary PIN Display */}
        {pinRequired && (
          <div className="p-3 rounded-xl bg-[#eff4ff] flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
                Temporary Dispatch PIN
              </span>
              <button
                type="button"
                onClick={regeneratePin}
                className="flex items-center gap-1 font-mono text-[#006948] font-bold text-[10px] hover:underline"
              >
                <RefreshCw className="w-3 h-3" /> Regenerate
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {pinDigits.map((d, i) => (
                  <span
                    key={i}
                    className="w-8 h-9 rounded bg-white text-[#0b1c30] font-mono text-base font-bold flex items-center justify-center shadow-2xs"
                  >
                    {d}
                  </span>
                ))}
              </div>
              <span className="text-[10px] text-[#565e74]">Staff will reset on first counter login</span>
            </div>
          </div>
        )}
      </section>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={handleSendInvite}
          disabled={isSending}
          className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
        >
          {isSending ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Dispatching Staff Invitation...</span>
            </>
          ) : (
            <>
              <span>Send Onboarding Invite</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            onShowToast('Staff profile saved to Drafts');
            onNavigate('staff_directory');
          }}
          className="w-full h-10 bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] font-bold text-xs rounded-xl transition-colors"
        >
          Save as Draft
        </button>
      </div>
    </div>
  );
};
