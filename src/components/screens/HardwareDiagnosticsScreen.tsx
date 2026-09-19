import React, { useState } from 'react';
import { 
  Printer, 
  Barcode, 
  Scale, 
  CreditCard, 
  Lock, 
  Wrench, 
  Activity, 
  Thermometer, 
  Scissors, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Zap, 
  RotateCcw, 
  Save, 
  History, 
  Clock 
} from 'lucide-react';
import { ScreenType } from '../../types';

interface HardwareDiagnosticsScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const HardwareDiagnosticsScreen: React.FC<HardwareDiagnosticsScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [activeDevice, setActiveDevice] = useState<'printer' | 'scanner' | 'scale' | 'drawer' | 'pinpad'>('printer');
  const [slipStatus, setSlipStatus] = useState<'READY' | 'SPOOLING' | 'DONE'>('READY');
  const [payloadValue, setPayloadValue] = useState('04122029381');
  const [isRestarting, setIsRestarting] = useState(false);

  const handlePrintTest = () => {
    setSlipStatus('SPOOLING');
    setTimeout(() => {
      setSlipStatus('DONE');
      onShowToast('Printed ESC/POS Alignment Slip: 203 DPI raster verified');
      setTimeout(() => setSlipStatus('READY'), 2500);
    }, 1100);
  };

  const handleCutterTest = () => {
    onShowToast('Guillotine partial cut cycle triggered: GS V 66 0 (Pass)');
  };

  const handleDrawerKick = () => {
    onShowToast('Pulse pin 2 triggered: APG Solenoid Kicked');
  };

  const handleRestartDaemon = () => {
    setIsRestarting(true);
    setTimeout(() => {
      setIsRestarting(false);
      onShowToast('FreshPOS Hardware Core daemon restarted successfully');
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      <div className="px-3 py-3 flex flex-col gap-3">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#00855d] text-white">
                <Wrench className="w-4 h-4" />
              </span>
              <span className="text-base font-bold text-[#0b1c30]">Hardware Diagnostics</span>
            </div>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006948] animate-ping"></span>
              DAEMON ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-[#565e74]">
            Live hardware telemetry, self-test verification, and I/O calibration.
          </p>
        </div>

        {/* 1. Device Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'printer', label: 'Printer', icon: Printer },
            { id: 'scanner', label: 'Scanner', icon: Barcode },
            { id: 'scale', label: 'Scale', icon: Scale },
            { id: 'drawer', label: 'Drawer', icon: Lock },
            { id: 'pinpad', label: 'Pinpad', icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDevice === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDevice(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-[#006948] text-white shadow-sm'
                    : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#85f8c4]' : 'bg-[#006948]'}`}></span>
              </button>
            );
          })}
        </div>

        {/* 2. Device Profile Overview */}
        <div className="flex flex-col bg-white rounded-xl shadow-sm p-3 border border-[#bccac0]/30 gap-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#006948] flex-shrink-0">
                <Printer className="w-5 h-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#0b1c30] truncate">Epson TM-T88VI</span>
                <span className="text-[11px] text-[#565e74]">High-Speed Thermal Slip</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
              READY • LAN
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] rounded-xl p-2.5 text-xs">
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Protocol</span>
              <span className="font-mono text-[11px] text-[#0b1c30] font-semibold">Raw ESC/POS :9100</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">IP Address</span>
              <span className="font-mono text-[11px] text-[#0b1c30] font-semibold">192.168.1.142</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Firmware</span>
              <span className="font-mono text-[11px] text-[#0b1c30] font-semibold">v3.04B (Build 89)</span>
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Socket State</span>
              <span className="font-mono text-[11px] text-[#006948] font-bold">ESTABLISHED</span>
            </div>
          </div>
        </div>

        {/* 3. Sensor Telemetry Grid */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[9px] uppercase font-bold text-[#565e74]">Sensor Telemetry</span>
            <span className="font-mono text-[9px] text-[#565e74]">Refreshed 2s ago</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col bg-white rounded-xl p-2.5 shadow-sm border border-[#bccac0]/30 gap-1">
              <span className="font-mono text-[9px] text-[#565e74]">Paper Roll</span>
              <span className="text-xs font-bold text-[#0b1c30]">NORMAL</span>
              <span className="text-[10px] text-[#006948]">No near-end</span>
            </div>

            <div className="flex flex-col bg-white rounded-xl p-2.5 shadow-sm border border-[#bccac0]/30 gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#565e74]">Head Temp</span>
                <span className="font-mono text-[10px] text-[#8d4b00] font-bold">32°C</span>
              </div>
              <span className="text-xs font-bold text-[#0b1c30]">OPTIMAL</span>
              <div className="w-full bg-[#dce9ff] rounded-full h-1.5 mt-0.5 overflow-hidden">
                <div className="bg-[#8d4b00] h-full rounded-full" style={{ width: '38%' }}></div>
              </div>
            </div>

            <div className="flex flex-col bg-white rounded-xl p-2.5 shadow-sm border border-[#bccac0]/30 gap-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#565e74]">Cutter</span>
                <span className="font-mono text-[10px] text-[#0b1c30] font-bold">41%</span>
              </div>
              <span className="text-xs font-bold text-[#0b1c30]">148.2k cuts</span>
              <div className="w-full bg-[#dce9ff] rounded-full h-1.5 mt-0.5 overflow-hidden">
                <div className="bg-[#565e74] h-full rounded-full" style={{ width: '41%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Test Triggers */}
        <div className="flex flex-col bg-white rounded-xl shadow-sm p-3.5 border border-[#bccac0]/30 gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0b1c30]">Mechanical Calibration</span>
            <span className="font-mono text-[9px] text-[#006948] uppercase font-bold">Haptic Ready</span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={handlePrintTest}
              className="flex items-center justify-between w-full p-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] transition-all active:scale-[0.99] text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#00855d] text-white flex items-center justify-center flex-shrink-0">
                  <Printer className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate">Print Alignment Slip</span>
                  <span className="text-[10px] text-[#565e74]">Renders EAN-13, raster logo & DPI check</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#565e74]" />
            </button>

            <button
              onClick={handleCutterTest}
              className="flex items-center justify-between w-full p-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] transition-all active:scale-[0.99] text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#dae2fd] text-[#131b2e] flex items-center justify-center flex-shrink-0">
                  <Scissors className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate">Test Guillotine Knife</span>
                  <span className="text-[10px] text-[#565e74]">Full partial cut cycle (GS V 66 0)</span>
                </div>
              </div>
              <Play className="w-3.5 h-3.5 text-[#565e74]" />
            </button>

            <button
              onClick={handleDrawerKick}
              className="flex items-center justify-between w-full p-2.5 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b1c30] transition-all active:scale-[0.99] text-left"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#ffdcc3] text-[#2f1500] flex items-center justify-center flex-shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold truncate">Trigger Drawer Solenoid</span>
                  <span className="text-[10px] text-[#565e74]">Pulse pin 2 (ESC p 0 25 250)</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#565e74]" />
            </button>
          </div>

          {/* Test Slip Visual Proof */}
          <div className="flex flex-col bg-[#e5eeff] p-2.5 rounded-lg gap-1 border border-[#bccac0]/30">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase font-bold text-[#565e74]">Receipt Mock Buffer</span>
              <span className="font-mono text-[9px] text-[#006948] font-bold">
                {slipStatus === 'SPOOLING' ? 'SPOOLING PRINT...' : slipStatus === 'DONE' ? 'PRINT OK' : 'READY TO SPOOL'}
              </span>
            </div>
            <div className="bg-white p-2.5 rounded font-mono text-[10px] leading-4 text-[#0b1c30] border border-[#bccac0]/40">
              <div className="text-center font-bold">*** FRESHPOS DIAGNOSTIC SLIP ***</div>
              <div className="text-center text-[#565e74]">TX ID: #DG-99214-X8</div>
              <div className="my-1 border-dashed border-t border-[#bccac0]"></div>
              <div className="flex justify-between">
                <span>DPI CALIBRATION:</span>
                <span>203 DPI / PASS</span>
              </div>
              <div className="flex justify-between">
                <span>PRINT SPEED:</span>
                <span>350 mm/sec</span>
              </div>
              <div className="flex justify-between font-bold text-[#006948]">
                <span>ESC/POS STATUS:</span>
                <span>OK (0x12 0x00)</span>
              </div>
              <div className="my-1 border-dashed border-t border-[#bccac0]"></div>
              <div className="text-center tracking-widest text-[#565e74] font-bold">||| | |||| || |||||| | ||</div>
              <div className="text-center text-[9px] text-[#565e74]">04122029381</div>
            </div>
          </div>
        </div>

        {/* 4. Interactive Test Scan / Input Simulation Box */}
        <div className="flex flex-col bg-white rounded-xl shadow-sm p-3.5 border border-[#bccac0]/30 gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0b1c30]">Live Payload Reticle</span>
            <span className="font-mono text-[10px] text-[#006948] font-bold">COM3 • 115200bps</span>
          </div>
          <div className="relative flex items-center">
            <Barcode className="w-4 h-4 absolute left-3 text-[#565e74]" />
            <input
              type="text"
              value={payloadValue}
              onChange={(e) => setPayloadValue(e.target.value)}
              className="w-full h-10 pl-9 pr-20 rounded-xl bg-[#eff4ff] text-[#0b1c30] font-mono text-xs focus:outline-none focus:bg-[#dce9ff]"
              placeholder="Scan barcode..."
            />
            <button
              onClick={() => onShowToast(`Barcode payload transmitted: ${payloadValue}`)}
              className="absolute right-1 px-2.5 py-1 rounded-lg bg-[#006948] text-white font-mono text-[10px] uppercase font-bold hover:bg-[#00855d]"
            >
              Transmit
            </button>
          </div>

          <div className="flex items-center justify-between p-2 bg-[#eff4ff] rounded-lg">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 bg-[#e5eeff]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUmmBkwhMzcHyRMkQeq49Ztz8QG7ZzQbIlKgRNf7YgFfKKxNyWDIKaZPPIr0opHng-FVtZy0Iat_SDN1SozRBp4U5sdRL-xiistokqHorN9zhuIwZEi6QuyTj60PWbjZTRO5_Hl4HX3DMynvVU1FSwDec7EjacmQnN-pg3kTL0Y1w8pq86R54suEe6tbixYvRhNRyIGtuw6yRSg6H5TH9guvkU-VZhpF4wMXCRy_dN4jkJwfzZv1v2-Q"
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold text-[#0b1c30] truncate">04122029381</span>
                  <span className="px-1.5 py-0.2 rounded bg-[#d3e4fe] text-[#0b1c30] font-mono text-[9px]">EAN-13</span>
                </div>
                <span className="text-[11px] text-[#565e74] truncate">Organic Hass Avocado (#4046)</span>
              </div>
            </div>
            <div className="flex flex-col items-end flex-shrink-0">
              <span className="font-mono text-xs text-[#006948] font-bold">12ms</span>
              <span className="font-mono text-[9px] text-[#565e74]">LATENCY</span>
            </div>
          </div>
        </div>

        {/* 5. Diagnostic History & Self-Test Log */}
        <div className="flex flex-col bg-white rounded-xl shadow-sm p-3.5 border border-[#bccac0]/30 gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#565e74]" />
              <span className="text-xs font-bold text-[#0b1c30]">Self-Test Audit Log</span>
            </div>
            <button
              onClick={() => onShowToast('Diagnostic log cleared')}
              className="font-mono text-[10px] uppercase font-bold text-[#565e74] hover:text-[#0b1c30]"
            >
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            {[
              { title: 'Scale Zero-Tare Auto Cal', sub: '0.000 kg ±0.001g baseline certified', time: '15:30:12', pass: true },
              { title: 'Payment Pinpad EMV Ping', sub: 'Contactless kernel handoff 18ms', time: '14:15:00', pass: true },
              { title: 'Paper Spool & Cutter Cycle', sub: 'New 80mm roll, tension normal', time: '12:00:44', pass: true },
            ].map((log, i) => (
              <div key={i} className="flex items-start justify-between p-2 rounded-lg bg-[#eff4ff]">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#006948] mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-[#0b1c30]">{log.title}</span>
                    <span className="text-[10px] text-[#565e74]">{log.sub}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[10px] text-[#0b1c30]">{log.time}</span>
                  <span className="font-mono text-[9px] text-[#006948] uppercase font-bold">PASS</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-1 pb-4">
          <button
            onClick={handleRestartDaemon}
            disabled={isRestarting}
            className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-[#dce9ff] hover:bg-[#cbdbf5] text-[#0b1c30] font-bold text-xs transition-all active:scale-[0.98]"
          >
            <RotateCcw className={`w-4 h-4 ${isRestarting ? 'animate-spin' : ''}`} />
            <span>{isRestarting ? 'Restarting...' : 'Restart Daemon'}</span>
          </button>
          <button
            onClick={() => onShowToast('Hardware health report generated and saved to storage')}
            className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs shadow-sm transition-all active:scale-[0.98]"
          >
            <Save className="w-4 h-4" />
            <span>Save Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};
