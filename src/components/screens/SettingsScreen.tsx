import React, { useState } from 'react';
import { Printer, Bluetooth, Volume2, ShieldCheck, RefreshCw, Smartphone, Laptop, Check } from 'lucide-react';

interface SettingsScreenProps {
  onShowToast: (msg: string) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onShowToast }) => {
  const [printerModel, setPrinterModel] = useState('Star TSP-100 (Bluetooth)');
  const [autoKickDrawer, setAutoKickDrawer] = useState(true);
  const [soundBeep, setSoundBeep] = useState(true);
  const [taxRate, setTaxRate] = useState('5.0');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleTestPrint = () => {
    onShowToast(`Dispatched test ESC/POS 80mm feed to ${printerModel}`);
  };

  const handleTestDrawerKick = () => {
    onShowToast('Fired 24V pulse to RJ-11 Cash Drawer (Drawer kicked open)');
  };

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onShowToast('Cloud catalog & ledger synchronized with AWS us-east-pos4.');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Title Card */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-xs text-[#0b1c30]">Hardware & Terminal Setup</h2>
          <p className="text-[11px] text-[#565e74]">
            Peripherals, thermal printers, cash drawers & offline cloud sync
          </p>
        </div>
        <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006948]">
          <Smartphone className="w-5 h-5" />
        </div>
      </div>

      {/* Printer Section */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <Printer className="w-4 h-4 text-[#006948]" />
          <span className="font-bold text-xs text-[#0b1c30]">Receipt Printer (ESC/POS)</span>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
            Paired Thermal Printer
          </label>
          <select
            value={printerModel}
            onChange={(e) => setPrinterModel(e.target.value)}
            className="w-full h-10 px-3 rounded-lg bg-[#eff4ff] text-xs text-[#0b1c30] outline-none font-mono"
          >
            <option value="Star TSP-100 (Bluetooth)">Star TSP-100 (Bluetooth) - Online</option>
            <option value="Epson TM-T88VI (LAN)">Epson TM-T88VI (LAN IP: 192.168.1.55)</option>
            <option value="Sunmi Built-in 58mm">Sunmi V2 Built-in 58mm</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-1">
          <button
            type="button"
            onClick={handleTestPrint}
            className="h-9 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#006948] font-bold text-[11px] flex items-center justify-center gap-1 active:scale-95"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Test Print</span>
          </button>
          <button
            type="button"
            onClick={handleTestDrawerKick}
            className="h-9 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#006948] font-bold text-[11px] flex items-center justify-center gap-1 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">point_of_sale</span>
            <span>Test Kick Drawer</span>
          </button>
        </div>
      </div>

      {/* POS Behavior Switches */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-3">
        <span className="font-bold text-xs text-[#0b1c30]">Checkout Behaviors</span>

        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#0b1c30]">
              Auto-Kick Drawer on Cash
            </span>
            <span className="text-[10px] text-[#565e74]">
              Send RJ-11 signal upon completing cash payment
            </span>
          </div>
          <input
            type="checkbox"
            checked={autoKickDrawer}
            onChange={(e) => setAutoKickDrawer(e.target.checked)}
            className="w-4 h-4 text-[#006948] rounded"
          />
        </label>

        <div className="border-t border-[#eff4ff]" />

        <label className="flex items-center justify-between cursor-pointer">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#0b1c30]">
              Laser Scanner Audio Chirp
            </span>
            <span className="text-[10px] text-[#565e74]">
              High frequency feedback beep on barcode scan
            </span>
          </div>
          <input
            type="checkbox"
            checked={soundBeep}
            onChange={(e) => setSoundBeep(e.target.checked)}
            className="w-4 h-4 text-[#006948] rounded"
          />
        </label>

        <div className="border-t border-[#eff4ff]" />

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#0b1c30]">Default Tax Rate (%)</span>
            <span className="text-[10px] text-[#565e74]">Applicable retail sales GST</span>
          </div>
          <input
            type="number"
            step="0.1"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-20 h-8 px-2 rounded-lg bg-[#eff4ff] text-right text-xs font-mono font-bold text-[#0b1c30] outline-none"
          />
        </div>
      </div>

      {/* Cloud & Local Sync */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xs text-[#0b1c30]">Offline Database & Cache</h3>
            <p className="text-[10px] text-[#565e74]">
              480 products & offline transaction queue cached in indexedDB
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
            Synced
          </span>
        </div>

        <button
          type="button"
          onClick={handleManualSync}
          disabled={isSyncing}
          className="h-10 rounded-xl bg-[#006948] hover:bg-[#00855d] active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Synchronizing with Cloud...' : 'Force Sync Cloud Now'}</span>
        </button>
      </div>

      {/* Version Tag */}
      <div className="text-center py-2 text-[#565e74] text-xs">
        <p className="font-mono text-[10px]">FreshMart Retail POS v4.12.0</p>
        <p className="text-[10px]">Build: 2026.09.13-prod-r4 • PWA Offline Ready</p>
      </div>
    </div>
  );
};
