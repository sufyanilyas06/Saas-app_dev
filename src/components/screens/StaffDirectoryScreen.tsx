import React, { useState } from 'react';
import { Search, UserPlus, X, Store, Mail, Phone, Fingerprint, Shield, Clock, ArrowRight, Share2, Plus, Lock } from 'lucide-react';

interface StaffDirectoryScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: any) => void;
}

export const StaffDirectoryScreen: React.FC<StaffDirectoryScreenProps> = ({ onShowToast, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'managers' | 'cashiers' | 'inventory'>('all');

  const handleExportRoster = () => {
    onShowToast('Staff roster (.csv) downloaded to terminal memory');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Top Context Panel */}
      <section className="bg-white p-3.5 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 min-w-0">
            <Store className="w-4 h-4 text-[#006948] shrink-0" />
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold truncate">
              FreshMart Superstore · Main Branch
            </span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-pulse" />
            12 Active Members
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="min-w-0">
            <h1 className="font-black text-sm text-[#0b1c30]">Staff & Team Directory</h1>
            <p className="text-[11px] text-[#565e74]">Manage floor permissions, register PIN overrides, and shifts.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('invite_staff')}
            className="shrink-0 h-9 px-3 rounded-lg bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95 transition-all"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Invite Staff</span>
          </button>
        </div>
      </section>

      {/* Search & Filter Pills */}
      <section className="flex flex-col gap-2">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#565e74] w-4 h-4" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or PIN..."
            className="w-full h-10 pl-9 pr-9 rounded-xl bg-[#eff4ff] text-[#0b1c30] text-xs font-medium outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#565e74] hover:text-[#0b1c30]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          <button
            type="button"
            onClick={() => setFilterRole('all')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
              filterRole === 'all' ? 'bg-[#006948] text-white shadow-sm' : 'bg-[#e5eeff] text-[#565e74]'
            }`}
          >
            All (12)
          </button>
          <button
            type="button"
            onClick={() => setFilterRole('managers')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
              filterRole === 'managers' ? 'bg-[#006948] text-white shadow-sm' : 'bg-[#e5eeff] text-[#565e74]'
            }`}
          >
            Managers (3)
          </button>
          <button
            type="button"
            onClick={() => setFilterRole('cashiers')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
              filterRole === 'cashiers' ? 'bg-[#006948] text-white shadow-sm' : 'bg-[#e5eeff] text-[#565e74]'
            }`}
          >
            Cashiers (6)
          </button>
          <button
            type="button"
            onClick={() => setFilterRole('inventory')}
            className={`px-3 py-1 rounded-full text-xs font-mono font-bold transition-all ${
              filterRole === 'inventory' ? 'bg-[#006948] text-white shadow-sm' : 'bg-[#e5eeff] text-[#565e74]'
            }`}
          >
            Inventory (3)
          </button>
        </div>
      </section>

      {/* Live Pulse Stats Strip */}
      <div className="p-2.5 rounded-xl bg-[#eff4ff] grid grid-cols-3 gap-2 text-center border border-[#bccac0]/20">
        <div className="flex flex-col">
          <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Clocked In</span>
          <span className="font-mono text-sm font-bold text-[#006948]">8 / 12</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Open Registers</span>
          <span className="font-mono text-sm font-bold text-[#0b1c30]">5 Tills</span>
        </div>
        <div className="flex flex-col">
          <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Break Relay</span>
          <span className="font-mono text-sm font-bold text-[#8d4b00]">1 On Break</span>
        </div>
      </div>

      {/* Staff Directory Cards */}
      <section className="flex flex-col gap-2.5">
        {/* Card 1: Elena Vance */}
        <article className="p-3.5 rounded-xl bg-white shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhypPnKQ4qLV5VxDXQJIV60a7L56WE2nUO4zE8bjr8aYtVk2W57sTCV6VeZrEUqY7X-mr8K1_v0hr4USrJ4JW8WB-3E2LoSI8e5qDE7IyC5VFeTYb-cevpps5ql3euqQyWXOEEuGqj9UuL2h99WnVtNGCi46KALRPUBBz7Pcy4krygPuZRzcUtU5r4cIEyb7gEj1dyL5W4tIdAaystSxdFrO1Mv6kzE8d6u3Q7w-KYYp4ng96QvO-J0w"
                  alt="Elena Vance"
                  className="w-11 h-11 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#006948] ring-2 ring-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-xs text-[#0b1c30] truncate">Elena Vance</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#006948] text-white font-mono text-[8px] font-bold uppercase">
                    Store Manager
                  </span>
                </div>
                <span className="text-[10px] text-[#565e74]">Store Supervisor / Lead Manager</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#85f8c4]/40 text-[#005137] font-mono text-[9px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-ping" />
              Active On Shift
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[#eff4ff] flex flex-col gap-1 text-[11px] text-[#565e74]">
            <div className="flex items-center justify-between">
              <span>Main Branch (Lane 01-04 Access)</span>
              <span className="font-mono font-bold text-[#0b1c30]">Lane #01 Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>elena.vance@freshmart.pos</span>
              <span>+1 (555) 234-5678</span>
            </div>
            <div className="flex items-center justify-between pt-0.5 text-[#006948] font-semibold">
              <span className="flex items-center gap-1">
                <Fingerprint className="w-3.5 h-3.5" />
                4-digit PIN Set & Biometrics Enabled
              </span>
              <span className="font-mono text-[9px] text-[#565e74]">4m ago</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => onShowToast('Quick override dispatched by Elena Vance')}
              className="flex-1 h-8 rounded-lg bg-[#85f8c4] text-[#002114] font-mono text-[10px] font-bold flex items-center justify-center gap-1"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Quick Override</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('roles_matrix')}
              className="px-3 h-8 rounded-lg bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] font-mono text-[10px] font-bold flex items-center justify-center gap-1"
            >
              <span>Permissions</span>
            </button>
          </div>
        </article>

        {/* Card 2: Carlos Rodriguez */}
        <article className="p-3.5 rounded-xl bg-white shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAzLzdVvNDsorUzR-9gbm8vaxU27eS2nMsJEaZCcxz-O9XqEQX2vMkujbFRRxopCmdjMxSKrcKTqc5oBOByvJmJDtt8C7fLFhbss1vc0ZdIjtzjCCsTswDuo8RfO9yDdoyQfQRfmJyZvaAIvPfchuN3BVMZ5EduF0iVehOg_DFKnnpHwZetDSfc_Ses_VoTKHDyM553boDaB3A0eRhKcaKzDIbZDTeVHvYIFo4VaqZinBeu9dH4YQNKrQ"
                  alt="Carlos Rodriguez"
                  className="w-11 h-11 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#8d4b00] ring-2 ring-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-xs text-[#0b1c30] truncate">Carlos Rodriguez</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#dae2fd] text-[#131b2e] font-mono text-[8px] font-bold uppercase">
                    Cashier
                  </span>
                </div>
                <span className="text-[10px] text-[#565e74]">Senior Cashier</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdcc3] text-[#6e3900] font-mono text-[9px] font-bold">
              <Clock className="w-3 h-3" />
              On Break
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[#eff4ff] flex flex-col gap-1 text-[11px] text-[#565e74]">
            <div className="flex items-center justify-between">
              <span>Store: Main Branch</span>
              <span className="font-mono font-bold text-[#0b1c30]">Till REG-02</span>
            </div>
            <div className="flex items-center justify-between">
              <span>c.rodriguez@freshmart.pos</span>
              <span className="font-mono text-[#006948] font-bold">$250 Float Verified</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-0.5 text-xs text-[#565e74]">
            <span>Break ends in 12m</span>
            <button
              type="button"
              onClick={() => onShowToast('Till reassignment modal opened for Carlos')}
              className="h-8 px-3 rounded-lg bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] font-mono text-[10px] font-bold flex items-center gap-1"
            >
              Reassign Till
            </button>
          </div>
        </article>

        {/* Card 3: Maya Sterling */}
        <article className="p-3.5 rounded-xl bg-white shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative shrink-0">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAC9-nE-ObOHS48PJP7IQk4wFVWZC-85qCkApX814qaGsFW9BexiWJ4eiumaBQl7QN2UHguCpzsd3dKymvMa17ehS9gF-Gp0HjXhMZqQyILDe-i7aKMZjsNrue7UdoZ9bQ15Az_jofhZpbgzShJ1EkpTU0Zehx7hGx_IbfsrMKRcIlzJK56LVJn2U2nDgPTP8DY_5o0ShxiwfpyzhPZ0F-RtEy_lZpdu--VRq36ldBzbJoRLvzHLZ4jWw"
                  alt="Maya Sterling"
                  className="w-11 h-11 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#006948] ring-2 ring-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-xs text-[#0b1c30] truncate">Maya Sterling</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#565e74] text-white font-mono text-[8px] font-bold uppercase">
                    Inventory
                  </span>
                </div>
                <span className="text-[10px] text-[#565e74]">Inventory & Stock Auditor</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#85f8c4]/40 text-[#005137] font-mono text-[9px] font-bold">
              Active
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[#eff4ff] flex flex-col gap-1 text-[11px] text-[#565e74]">
            <div className="flex items-center justify-between">
              <span>Main Warehouse + Branch #01</span>
              <span className="font-mono font-bold text-[#0b1c30]">Terminal W-04</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Cycle Count: 142 items logged today</span>
              <span>Last: 18m ago</span>
            </div>
          </div>
        </article>

        {/* Card 4: Jordan Blake (Pending) */}
        <article className="p-3.5 rounded-xl bg-white shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-11 h-11 rounded-full bg-[#dae2fd] text-[#131b2e] flex items-center justify-center font-bold text-xs shrink-0">
                JB
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-bold text-xs text-[#0b1c30] truncate">Jordan Blake</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#dae2fd] text-[#131b2e] font-mono text-[8px] font-bold uppercase">
                    Cashier
                  </span>
                </div>
                <span className="text-[10px] text-[#565e74]">Cashier (Trainee)</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdcc3] text-[#6e3900] font-mono text-[9px] font-bold">
              Invitation Pending
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[#eff4ff] flex flex-col gap-1 text-[11px] text-[#565e74]">
            <span>Invite sent 2 days ago to j.blake@email.com</span>
            <span className="text-[10px]">Awaiting PIN creation & cashier handbook sign-off</span>
          </div>

          <div className="flex items-center gap-2 pt-0.5">
            <button
              type="button"
              onClick={() => onShowToast('Invitation re-dispatched to Jordan Blake')}
              className="flex-1 h-8 rounded-lg bg-[#8d4b00] hover:bg-[#b15f00] text-white font-mono text-[10px] font-bold flex items-center justify-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Resend Invite</span>
            </button>
            <button
              type="button"
              onClick={() => onShowToast('Invitation revoked for Jordan Blake')}
              className="px-3 h-8 rounded-lg bg-[#e5eeff] text-[#ba1a1a] font-mono text-[10px] font-bold"
            >
              Revoke
            </button>
          </div>
        </article>

        {/* Card 5: Marcus Trent (Disabled) */}
        <article className="p-3.5 rounded-xl bg-[#eff4ff] shadow-sm border border-[#bccac0]/20 flex flex-col gap-2 opacity-80">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-11 h-11 rounded-full bg-[#cbdbf5] text-[#565e74] flex items-center justify-center font-bold text-xs shrink-0">
                MT
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-xs text-[#0b1c30] line-through">Marcus Trent</span>
                <span className="text-[10px] text-[#565e74]">Shift Supervisor (Former)</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#cbdbf5] text-[#565e74] font-mono text-[9px] font-bold">
              <Lock className="w-3 h-3" />
              Disabled
            </span>
          </div>

          <div className="p-2 rounded-lg bg-[#ffdad6] text-[#93000a] text-[11px] flex items-center gap-1.5">
            <span>Access revoked by Admin on Oct 20. POS login blocked.</span>
          </div>

          <div className="flex items-center justify-between pt-0.5 text-xs">
            <span className="font-mono text-[9px] text-[#565e74]">TILL KEYS CLEARED</span>
            <button
              type="button"
              onClick={() => onShowToast('Marcus Trent reactivated on probationary access')}
              className="h-8 px-3 rounded-lg bg-white text-[#0b1c30] font-mono text-[10px] font-bold hover:bg-[#dce9ff]"
            >
              Re-enable Staff
            </button>
          </div>
        </article>
      </section>

      {/* Sticky Bottom Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#bccac0]/20 p-2.5 shadow-md">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportRoster}
            className="flex-1 h-11 px-3 rounded-xl bg-[#eff4ff] text-[#0b1c30] font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4 text-[#565e74]" />
            <span>Export Roster</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigate('invite_staff')}
            className="flex-[1.2] h-11 px-3 rounded-xl bg-[#006948] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md hover:bg-[#00855d] active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add New Staff</span>
          </button>
        </div>
      </div>
    </div>
  );
};
