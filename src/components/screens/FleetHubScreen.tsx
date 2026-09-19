import React, { useState } from 'react';
import { 
  Monitor, 
  Receipt, 
  Barcode, 
  Scale, 
  CreditCard, 
  Lock, 
  Activity, 
  CheckCircle2, 
  Sliders, 
  Volume2, 
  Sparkles, 
  ChevronDown, 
  PlusCircle, 
  Download, 
  X, 
  Usb, 
  Bluetooth, 
  Network, 
  Cable, 
  Signal, 
  Printer, 
  DollarSign, 
  Zap 
} from 'lucide-react';
import { ScreenType } from '../../types';

interface FleetHubScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const FleetHubScreen: React.FC<FleetHubScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [selectedLane, setSelectedLane] = useState('Lane 01');
  const [scaleWeight, setScaleWeight] = useState('0.000');
  const [paperRoll, setPaperRoll] = useState(85);
  const [isPairModalOpen, setIsPairModalOpen] = useState(false);
  const [isDiagnosticsRunning, setIsDiagnosticsRunning] = useState(false);
  const [pingLatency, setPingLatency] = useState(18);
  const [isPinging, setIsPinging] = useState(false);
  const [scanLaserActive, setScanLaserActive] = useState(false);
  const [feedWidth, setFeedWidth] = useState<'80mm' | '58mm'>('80mm');

  const runFleetDiagnostics = () => {
    setIsDiagnosticsRunning(true);
    setTimeout(() => {
      setIsDiagnosticsRunning(false);
      onShowToast('All 4 devices passed port telemetry test (0 errors)');
    }, 1200);
  };

  const pingGateway = () => {
    setIsPinging(true);
    setTimeout(() => {
      setIsPinging(false);
      const ms = Math.floor(Math.random() * 8) + 14;
      setPingLatency(ms);
      onShowToast(`Gateway responsive: roundtrip latency ${ms}ms`);
    }, 600);
  };

  const testPrintSlip = () => {
    onShowToast('Test receipt printed: 80mm ESC/POS Feed OK');
    setPaperRoll((prev) => Math.max(10, prev - 1));
  };

  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      <div className="px-3 py-3 flex flex-col gap-3">
        {/* Lane Header Status Strip */}
        <section className="flex flex-col w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30">
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#00855d] text-white font-mono text-[9px] font-bold">
                  LANE 01
                </span>
                <span className="text-sm font-bold text-[#0b1c30] truncate">Express Till (Main Counter)</span>
              </div>
              <p className="text-[11px] text-[#565e74] mt-0.5">Multi-till fleet diagnostics & port telemetry</p>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#85f8c4] text-[#002114] flex-shrink-0 font-mono text-[10px] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#006948] animate-ping"></span>
              4/4 ONLINE
            </div>
          </div>

          {/* Quick Diagnostics Bar */}
          <div className="mt-3 pt-1 flex items-center justify-between gap-2 bg-[#eff4ff] rounded-lg p-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-full bg-[#85f8c4] flex items-center justify-center text-[#006948] flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-xs text-[#0b1c30] font-bold truncate">All Ports Operational</span>
                <span className="text-[10px] text-[#565e74] truncate">Last full sync: 2m ago</span>
              </div>
            </div>
            <button
              type="button"
              onClick={runFleetDiagnostics}
              disabled={isDiagnosticsRunning}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#e5eeff] text-[#006948] font-bold text-xs flex items-center gap-1.5 transition-colors flex-shrink-0 shadow-sm border border-[#bccac0]/30"
            >
              <Activity className={`w-3.5 h-3.5 ${isDiagnosticsRunning ? 'animate-spin' : ''}`} />
              <span>{isDiagnosticsRunning ? 'Testing Ports...' : 'Run Diagnostics'}</span>
            </button>
          </div>
        </section>

        {/* Hardware Telemetry Cards List */}
        <section className="flex flex-col w-full gap-2.5">
          <div className="flex items-center justify-between px-1">
            <span className="text-sm font-bold text-[#0b1c30]">Active Hardware</span>
            <span className="font-mono text-[9px] text-[#565e74] uppercase tracking-wider font-bold">4 Peripherals Attached</span>
          </div>

          {/* Peripheral 1: Thermal Receipt Printer */}
          <div className="flex flex-col w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006948] flex-shrink-0">
                  <Receipt className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#0b1c30] truncate">ESC/POS Thermal Printer</span>
                  <span className="text-[11px] text-[#565e74] truncate">Epson TM-T88VI • Serial #88V-9011</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
                LAN ONLINE
              </span>
            </div>

            <div className="bg-[#eff4ff] rounded-lg p-2.5 flex flex-col gap-1.5">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-[#565e74]">IP: 192.168.1.142 : 9100</span>
                <span className="text-[#006948] font-bold">Paper Roll: {paperRoll}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#dce9ff] overflow-hidden">
                <div className="h-full bg-[#006948] rounded-full transition-all duration-500" style={{ width: `${paperRoll}%` }}></div>
              </div>
              <div className="flex items-center justify-between text-[#565e74] text-[11px] mt-0.5">
                <span>{feedWidth} Thermal Wide</span>
                <span>~{Math.round(paperRoll * 5.3)} receipts remaining</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                type="button"
                onClick={testPrintSlip}
                className="h-9 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center gap-1.5 px-2 text-xs font-bold transition-all shadow-sm"
              >
                <Printer className="w-4 h-4 text-[#006948]" />
                <span>Test Ticket</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  const next = feedWidth === '80mm' ? '58mm' : '80mm';
                  setFeedWidth(next);
                  onShowToast(`Thermal guide formatted for ${next} standard`);
                }}
                className="h-9 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center gap-1.5 px-2 text-xs font-bold transition-all shadow-sm"
              >
                <Sliders className="w-4 h-4 text-[#565e74]" />
                <span>Feed: {feedWidth}</span>
              </button>
            </div>
          </div>

          {/* Peripheral 2: Omnidirectional Scanner */}
          <div className="flex flex-col w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006948] flex-shrink-0">
                  <Barcode className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#0b1c30] truncate">Omni Barcode Scanner</span>
                  <span className="text-[11px] text-[#565e74] truncate">Honeywell Xenon XP 1950g</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
                READY
              </span>
            </div>

            <div className="bg-[#eff4ff] rounded-lg p-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#006948]"></div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs text-[#0b1c30] font-bold">96% Wireless BLE</span>
                  <span className="text-[10px] text-[#565e74]">Base cradle wired (USB-HID)</span>
                </div>
              </div>
              <span className="font-mono text-[11px] text-[#006948] font-bold px-2 py-0.5 bg-[#e5eeff] rounded">
                RSSI -42dBm
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setScanLaserActive(true);
                  onShowToast('Xenon laser pattern engaged: Scanning active');
                  setTimeout(() => setScanLaserActive(false), 3000);
                }}
                className="h-9 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center gap-1.5 px-2 text-xs font-bold transition-all shadow-sm"
              >
                <Barcode className="w-4 h-4 text-[#006948]" />
                <span>Aim & Test</span>
              </button>
              <button
                type="button"
                onClick={() => onShowToast('Beep pitch tone: 3.2kHz (Optimal grocery chime)')}
                className="h-9 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center gap-1.5 px-2 text-xs font-bold transition-all shadow-sm"
              >
                <Volume2 className="w-4 h-4 text-[#8d4b00]" />
                <span>Beep Volume</span>
              </button>
            </div>

            {scanLaserActive && (
              <div className="flex items-center justify-between px-3 py-2 rounded bg-[#00855d] text-white font-mono text-xs animate-pulse">
                <span>Awaiting EAN-13 / GS1 barcode scan...</span>
                <button onClick={() => setScanLaserActive(false)} className="text-white hover:opacity-80">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Peripheral 3: Digital NTEP Scale */}
          <div className="flex flex-col w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006948] flex-shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#0b1c30] truncate">Digital NTEP Scale</span>
                  <span className="text-[11px] text-[#565e74] truncate">Mettler Toledo Ariva-S • COM3</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
                LEGAL FOR TRADE
              </span>
            </div>

            <div className="bg-[#d3e4fe] rounded-lg p-3 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-[#3d4a42] uppercase font-bold">Live Platter Tare</span>
                <span className="text-2xl font-black text-[#0b1c30] font-mono tracking-tight">
                  {scaleWeight} <span className="text-xs text-[#565e74] font-sans">kg</span>
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-mono text-[9px] text-[#006948] px-2 py-0.5 bg-white rounded font-bold shadow-sm">
                  STABLE
                </span>
                <span className="font-mono text-[10px] text-[#565e74] mt-1">Class III: e=0.002kg</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setScaleWeight('0.000');
                  onShowToast('Scale zero balanced. Tare reference set to 0.000kg');
                }}
                className="h-9 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center gap-1.5 px-2 text-xs font-bold transition-all shadow-sm"
              >
                <span>Zero Scale</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setScaleWeight('0.250');
                  onShowToast('Tare weight loaded: Organic produce container (0.250kg)');
                }}
                className="h-9 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center gap-1.5 px-2 text-xs font-bold transition-all shadow-sm"
              >
                <span>Tare (0.250kg)</span>
              </button>
            </div>
          </div>

          {/* Peripheral 4: Payment EMV Pinpad */}
          <div className="flex flex-col w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 gap-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006948] flex-shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#0b1c30] truncate">EMV & NFC Terminal</span>
                  <span className="text-[11px] text-[#565e74] truncate">Verifone P400 • TLS 1.3 Certified</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
                TLS SECURE
              </span>
            </div>

            <div className="bg-[#eff4ff] rounded-lg p-2.5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#0b1c30] font-semibold">Keys: Visa / MC / Interac</span>
                <span className="font-mono text-[9px] text-[#006948] font-bold">READY FOR TAP</span>
              </div>
              <span className="text-[11px] text-[#565e74]">Merchant Gateway: FreshPay Global (Node US-East)</span>
            </div>

            <button
              type="button"
              onClick={pingGateway}
              disabled={isPinging}
              className="w-full h-9 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center gap-2 px-3 text-xs font-bold transition-all shadow-sm"
            >
              <Signal className={`w-4 h-4 text-[#006948] ${isPinging ? 'animate-pulse' : ''}`} />
              <span>{isPinging ? 'Pinging Gateway...' : `Ping Gateway Telemetry (${pingLatency}ms)`}</span>
            </button>
          </div>
        </section>

        {/* Till Drawer Solenoid & Lane Selector */}
        <section className="flex flex-col w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#006948]" />
              <span className="text-xs font-bold text-[#0b1c30]">Till & Lane Routing</span>
            </div>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-[#eff4ff] text-[#565e74] font-bold">
              RJ11 KICK
            </span>
          </div>

          <div className="flex flex-col gap-1.5 bg-[#eff4ff] rounded-lg p-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#0b1c30] font-medium">Cash Drawer Model</span>
              <span className="font-mono text-[#565e74] font-semibold">APG Series 100 MultiPRO</span>
            </div>
            <span className="text-[11px] text-[#565e74]">Pulse Trigger: 24V Solenoid via Epson TM-T88VI Pin 2</span>
            <div className="mt-1 flex items-center gap-2">
              <button
                type="button"
                onClick={() => onShowToast('Supervisor Solenoid Signal Sent: Cash Drawer Opened')}
                className="flex-1 h-9 rounded-lg bg-white hover:bg-[#dce9ff] text-[#0b1c30] flex items-center justify-center gap-2 px-3 text-xs font-bold transition-colors shadow-sm border border-[#bccac0]/30"
              >
                <DollarSign className="w-4 h-4 text-[#006948]" />
                <span>Kick Drawer</span>
              </button>
              <span className="text-[10px] text-[#565e74] font-mono px-2 text-center max-w-[120px]">
                Supervisor PIN required
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-1">
            <label className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Assigned Register Lane</label>
            <div className="relative w-full">
              <select
                value={selectedLane}
                onChange={(e) => {
                  setSelectedLane(e.target.value);
                  onShowToast(`Register lane updated to ${e.target.value}`);
                }}
                className="w-full h-10 bg-[#eff4ff] text-[#0b1c30] rounded-lg px-3 text-xs font-bold appearance-none outline-none focus:bg-[#dce9ff] border border-[#bccac0]/30"
              >
                <option value="Lane 01">Lane #01 - Express Till (Main Counter)</option>
                <option value="Lane 02">Lane #02 - Bulk Produce & Bakery</option>
                <option value="Lane 03">Lane #03 - Self-Checkout Kiosk Alpha</option>
                <option value="Lane 04">Lane #04 - Floor Mobile Inventory Terminal</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3 pointer-events-none text-[#565e74]" />
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-2 pt-1 pb-4">
          <button
            type="button"
            onClick={() => setIsPairModalOpen(true)}
            className="w-full h-11 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:opacity-90 transition-opacity"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Pair New Peripheral</span>
          </button>
          <button
            type="button"
            onClick={() => onShowToast('Hardware telemetry exported: freshpos-lane1.json')}
            className="w-full h-11 rounded-xl bg-white text-[#0b1c30] font-bold text-xs flex items-center justify-center gap-2 shadow-sm hover:bg-[#eff4ff] transition-colors border border-[#bccac0]/30"
          >
            <Download className="w-4 h-4 text-[#565e74]" />
            <span>Export Hardware Health Log</span>
          </button>
        </div>
      </div>

      {/* Micro-Modal for Pairing */}
      {isPairModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3">
          <div className="w-full max-w-sm bg-white rounded-xl p-4 shadow-xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#0b1c30]">Pair Peripheral</span>
              <button
                onClick={() => setIsPairModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#565e74] hover:bg-[#eff4ff]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#565e74]">Select interface standard to broadcast discovery beacon:</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'USB Auto', sub: 'Plug & Play', icon: Usb },
                { label: 'Bluetooth', sub: 'BLE Handhelds', icon: Bluetooth },
                { label: 'LAN / IP', sub: 'Static & DHCP', icon: Network },
                { label: 'Serial COM', sub: 'Scales & Scanners', icon: Cable },
              ].map((method) => {
                const IconComponent = method.icon;
                return (
                  <button
                    key={method.label}
                    onClick={() => {
                      setIsPairModalOpen(false);
                      onShowToast(`Linked peripheral via ${method.label}`);
                    }}
                    className="p-3 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] text-left flex flex-col gap-1 transition-colors"
                  >
                    <IconComponent className="w-5 h-5 text-[#006948]" />
                    <span className="text-xs font-bold text-[#0b1c30]">{method.label}</span>
                    <span className="text-[10px] text-[#565e74]">{method.sub}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
