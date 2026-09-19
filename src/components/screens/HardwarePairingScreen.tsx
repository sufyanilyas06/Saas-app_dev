import React, { useState } from 'react';
import { QrCode, Camera, Store, Monitor, Check, Printer, Barcode, Scale, CreditCard, RefreshCw, ArrowRight, ShieldCheck } from 'lucide-react';

interface HardwarePairingScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: any) => void;
}

export const HardwarePairingScreen: React.FC<HardwarePairingScreenProps> = ({ onShowToast, onNavigate }) => {
  const [registerName, setRegisterName] = useState('Lane #01 - Express Lane');
  const [floatRequired, setFloatRequired] = useState(true);
  const [isTestPrinting, setIsTestPrinting] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);
  const [isPairingQR, setIsPairingQR] = useState(false);
  const [liveWeight, setLiveWeight] = useState('0.000');

  const handleTestSlip = () => {
    setIsTestPrinting(true);
    setTimeout(() => {
      setIsTestPrinting(false);
      setPrintSuccess(true);
      onShowToast('Test receipt printed on Epson TM-T88VI thermal cutter');
      setTimeout(() => setPrintSuccess(false), 3500);
    }, 1200);
  };

  const handleScanQR = () => {
    setIsPairingQR(true);
    setTimeout(() => {
      setIsPairingQR(false);
      onShowToast('Discovered 4 Counter Peripherals via SmartHub LAN');
    }, 1000);
  };

  const handleReZero = () => {
    setLiveWeight('0.000');
    onShowToast('Mettler Toledo Ariva re-zeroed (0.000 kg lock confirmed)');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Progress Header Bar */}
      <div className="bg-[#eff4ff] p-3 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-[#00855d] text-white font-mono text-[9px] font-bold uppercase tracking-wider">
              Onboarding
            </span>
            <span className="font-bold text-xs text-[#0b1c30]">Step 3 of 5: Register & Hardware</span>
          </div>
          <span className="font-mono text-xs font-bold text-[#006948]">60% Done</span>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[#d3e4fe] h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#006948] h-full rounded-full transition-all duration-500" style={{ width: '60%' }} />
        </div>

        <div className="flex justify-between items-center text-[10px] text-[#565e74]">
          <span>1. Store Info</span>
          <span>2. Tax & Currencies</span>
          <span className="text-[#006948] font-bold">3. Hardware</span>
          <span className="opacity-40">4. Inventory</span>
          <span className="opacity-40">5. Staff</span>
        </div>
      </div>

      {/* Instant Device Link Hero Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#d3e4fe] via-[#e5eeff] to-[#dae2fd] p-3.5 shadow-sm border border-[#bccac0]/20">
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div className="flex items-start gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#006948] text-white flex items-center justify-center shrink-0 shadow-md">
              <QrCode className="w-5 h-5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs text-[#0b1c30]">Instant Device Link</span>
              <p className="text-[11px] text-[#565e74] mt-0.5 leading-tight">
                Point terminal scanner at counter base station QR to auto-discover all peripheral hubs.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleScanQR}
            disabled={isPairingQR}
            className="shrink-0 h-9 px-3 rounded-lg bg-white text-[#006948] font-bold text-xs shadow-sm active:scale-95 transition-all flex items-center gap-1.5"
          >
            {isPairingQR ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Camera className="w-3.5 h-3.5" />
            )}
            <span>{isPairingQR ? 'Pairing...' : 'Scan QR'}</span>
          </button>
        </div>
      </div>

      {/* Card 1: Primary Register Configuration */}
      <div className="rounded-xl bg-white p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#dce9ff] text-[#006948] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">point_of_sale</span>
            </div>
            <h2 className="font-bold text-xs text-[#0b1c30]">Primary Register Configuration</h2>
          </div>
          <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#e5eeff] text-[#565e74] font-bold">
            TILL ID: REG-01
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Register Name */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Register Name</label>
            <div className="flex items-center bg-[#eff4ff] rounded-lg px-3 h-10 gap-2">
              <Store className="w-4 h-4 text-[#565e74]" />
              <input
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="bg-transparent font-bold text-xs text-[#0b1c30] w-full outline-none"
              />
              <span className="material-symbols-outlined text-[#006948] text-[18px]">check_circle</span>
            </div>
          </div>

          {/* Operational Profile */}
          <div className="flex flex-col gap-1">
            <label className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Operational Profile</label>
            <div className="flex items-center justify-between bg-[#eff4ff] rounded-lg px-3 h-10">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-[#565e74]" />
                <span className="text-xs font-semibold text-[#0b1c30]">Front Counter Checkout</span>
              </div>
              <button
                type="button"
                onClick={() => onShowToast('Profile selector opened')}
                className="text-[#006948] text-xs font-bold hover:underline"
              >
                Change
              </button>
            </div>
          </div>

          {/* Starting Float Requirement */}
          <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-start gap-2.5">
            <button
              type="button"
              onClick={() => setFloatRequired(!floatRequired)}
              className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-colors ${
                floatRequired ? 'bg-[#006948] text-white' : 'bg-[#d3e4fe] text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="font-bold text-xs text-[#0b1c30]">
                $200.00 cash drawer float required at shift start
              </span>
              <span className="text-[10px] text-[#565e74] mt-0.5">
                Enforces opening blind balance count before clerk scans the first order. Prevents midday till discrepancies.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hardware Peripherals Pairing Status */}
      <div className="rounded-xl bg-white p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#dce9ff] text-[#006948] flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">cable</span>
            </div>
            <div>
              <h2 className="font-bold text-xs text-[#0b1c30]">Hardware Peripherals</h2>
              <p className="text-[10px] text-[#565e74]">4 connected via SmartHub LAN & BLE Mesh</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('SmartHub bus scan: All 4 devices active')}
            className="p-1.5 rounded-lg bg-[#eff4ff] text-[#565e74] hover:text-[#006948] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Peripheral 1: Thermal Printer */}
        <div className="p-2.5 rounded-lg bg-[#eff4ff] flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#85f8c4] text-[#002114] flex items-center justify-center shrink-0">
                <Printer className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#0b1c30] truncate">Epson TM-T88VI (80mm)</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.2 rounded-full bg-[#85f8c4] text-[#005137] font-mono text-[9px] font-bold uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-pulse" />
                    Connected
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#565e74]">
                  Bluetooth & LAN (192.168.1.142) • 250mm/s
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleTestSlip}
              disabled={isTestPrinting}
              className="h-8 px-2.5 rounded bg-white text-[#006948] text-[11px] font-bold shadow-2xs hover:bg-[#dce9ff] transition-colors shrink-0 flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{isTestPrinting ? 'Printing...' : 'Print Test Slip'}</span>
            </button>
          </div>
          {printSuccess && (
            <div className="text-[#006948] text-[10px] font-semibold flex items-center gap-1 pl-10">
              <Check className="w-3 h-3" /> Test receipt dispatched to thermal cutter.
            </div>
          )}
        </div>

        {/* Peripheral 2: Barcode Scanner */}
        <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#85f8c4] text-[#002114] flex items-center justify-center shrink-0">
              <Barcode className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-[#0b1c30] truncate">Honeywell Voyager 1400g</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#85f8c4] text-[#005137] font-mono text-[9px] font-bold uppercase">
                  Paired
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#565e74]">
                USB-C Base Cradle / BLE 5.2 • Ready for 1D/2D
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#006948] text-[20px]">check_circle</span>
        </div>

        {/* Peripheral 3: Integrated Scale */}
        <div className="p-2.5 rounded-lg bg-[#eff4ff] flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-[#85f8c4] text-[#002114] flex items-center justify-center shrink-0">
                <Scale className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs text-[#0b1c30] truncate">Mettler Toledo Ariva</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#85f8c4] text-[#005137] font-mono text-[9px] font-bold uppercase">
                    Ready
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#565e74]">
                  Dual-Interval Cert • RS-232 via USB
                </span>
              </div>
            </div>
            <div className="px-2 py-1 rounded bg-white flex flex-col items-end shadow-2xs shrink-0">
              <span className="font-mono text-[8px] text-[#6d7a72] uppercase font-bold">Live Tare</span>
              <span className="font-mono text-xs font-bold text-[#006948]">{liveWeight} kg</span>
            </div>
          </div>
          <div className="flex items-center justify-between pl-10 text-[10px] text-[#565e74]">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006948]" />
              Zero-weight lock confirmed
            </span>
            <button
              type="button"
              onClick={handleReZero}
              className="text-[#006948] font-bold hover:underline"
            >
              Re-Zero Scale
            </button>
          </div>
        </div>

        {/* Peripheral 4: Card Payment Terminal */}
        <div className="p-2.5 rounded-lg bg-[#eff4ff] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-[#85f8c4] text-[#002114] flex items-center justify-center shrink-0">
              <CreditCard className="w-4 h-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-[#0b1c30] truncate">Verifone P400 (Cloud EMV)</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#85f8c4] text-[#005137] font-mono text-[9px] font-bold uppercase">
                  Online
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#565e74]">
                PCI PTS 5.x • Apple Pay / Google Pay
              </span>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#006948] text-[20px]">check_circle</span>
        </div>
      </div>

      {/* Diagnostics Ready Tile */}
      <div className="rounded-xl bg-[#e5eeff] p-3 flex items-center justify-between shadow-sm border border-[#bccac0]/15">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-white text-[#006948] flex items-center justify-center shadow-2xs">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xs text-[#0b1c30]">Diagnostics: Ready for Trade</span>
            <span className="text-[10px] text-[#565e74]">Zero conflicting ports. Latency: 12ms to gateway.</span>
          </div>
        </div>
        <span className="font-mono text-xs text-[#006948] font-bold">4 / 4 Synced</span>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          type="button"
          onClick={() => {
            onShowToast('Hardware configuration saved! Routing to Inventory...');
            onNavigate('inventory');
          }}
          className="w-full h-12 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
        >
          <span>Save & Continue to Inventory</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => onNavigate('pos')}
          className="text-xs text-[#565e74] hover:text-[#0b1c30] font-semibold py-1.5 text-center transition-colors"
        >
          Skip Hardware Setup for Now
        </button>
      </div>
    </div>
  );
};
