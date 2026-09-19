import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Warehouse, 
  Store, 
  Truck, 
  ShieldCheck, 
  Thermometer, 
  QrCode, 
  AlertTriangle, 
  Info, 
  CheckCircle2, 
  Printer, 
  Inbox, 
  ChevronRight, 
  MoreVertical 
} from 'lucide-react';
import { ScreenType } from '../../types';

interface StockTransfersScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const StockTransfersScreen: React.FC<StockTransfersScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [damagedUnits, setDamagedUnits] = useState(0);

  const handleConfirmReceived = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      onShowToast('Transfer #TR-9941 Confirmed: +30 Avocados, +20 Milk, +15 Loaves added to Downtown Branch');
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      <div className="p-3 flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#0b1c30]">Transfer #TR-9941</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] font-mono text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8d4b00] animate-pulse"></span>
                IN TRANSIT
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#565e74] uppercase tracking-wider mt-0.5 font-bold">
              Automated Replenishment Run
            </span>
          </div>
          <button
            onClick={() => onShowToast('Transfer Options: Re-route, Hold, or Contact Driver')}
            className="w-9 h-9 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#565e74] active:scale-95 transition-transform"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Route Tracking Card */}
        <div className="bg-white rounded-xl shadow-sm p-3.5 border border-[#bccac0]/30 flex flex-col gap-2 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center pt-1">
              <div className="w-7 h-7 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#131b2e]">
                <Warehouse className="w-4 h-4" />
              </div>
              <div className="w-0.5 h-12 bg-[#dce9ff] my-1"></div>
              <div className="w-7 h-7 rounded-full bg-[#85f8c4] flex items-center justify-center text-[#002114]">
                <Store className="w-4 h-4" />
              </div>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-between h-full gap-2">
              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-[#565e74] uppercase tracking-wider font-bold">Origin Facility</span>
                <span className="text-xs font-bold text-[#0b1c30] truncate">FreshMart Superstore</span>
                <span className="text-[11px] text-[#565e74]">Central Hub • Clerk: Sarah Jenkins</span>
                <span className="font-mono text-[10px] text-[#6d7a72] mt-0.5">Dispatched: Oct 24, 09:15 AM</span>
              </div>

              <div className="bg-[#eff4ff] rounded-lg p-2 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <Truck className="w-4 h-4 text-[#006948]" />
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-bold text-[#0b1c30] truncate">Van #02 (Mike P.)</span>
                    <span className="text-[10px] text-[#565e74]">4.2 mi remaining</span>
                  </div>
                </div>
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#006948] text-white font-bold">
                  ETA: 45m
                </span>
              </div>

              <div className="flex flex-col">
                <span className="font-mono text-[9px] text-[#565e74] uppercase tracking-wider font-bold">Destination</span>
                <span className="text-xs font-bold text-[#0b1c30] truncate">Downtown Express Branch #02</span>
                <span className="text-[11px] text-[#565e74]">Lead: Carlos Rodriguez • Till Dock #01</span>
              </div>
            </div>
          </div>
        </div>

        {/* Audit & Verification Card */}
        <div className="bg-white rounded-xl shadow-sm p-3.5 border border-[#bccac0]/30 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0b1c30]">Audit & Verification</span>
            <span className="font-mono text-[9px] bg-[#85f8c4]/40 text-[#005137] px-2 py-0.5 rounded-full font-bold">
              LOG #SEC-8810
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-[#eff4ff] rounded-lg p-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#85f8c4]/40 flex items-center justify-center text-[#006948]">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Bolt Seal</span>
                <span className="text-xs font-bold text-[#0b1c30] truncate">Intact (#8810)</span>
              </div>
            </div>

            <div className="bg-[#eff4ff] rounded-lg p-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-[#dae2fd] flex items-center justify-center text-[#131b2e]">
                <Thermometer className="w-4 h-4 text-[#006948]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Cold Chain</span>
                <span className="text-xs font-bold text-[#0b1c30] truncate">4.0°C Logged</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-[#eff4ff] rounded-lg p-2 mt-0.5">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-[#006948]" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0b1c30]">Scan Verification Mode</span>
                <span className="text-[11px] text-[#565e74]">3 of 3 items matched crate barcodes</span>
              </div>
            </div>
            <span className="font-mono text-[10px] text-[#006948] font-bold px-2 py-1 rounded bg-[#85f8c4]/50">
              MATCHED
            </span>
          </div>
        </div>

        {/* Transfer Manifest */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-[#0b1c30]">Transfer Manifest</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-[#dce9ff] text-[#0b1c30] font-bold">
                3 SKUs
              </span>
            </div>
            <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">Downtown Impact</span>
          </div>

          {/* Item 1 */}
          <div className="bg-white rounded-xl shadow-sm p-3 border border-[#bccac0]/30 flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <img
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-[#e5eeff]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLcz4S6uOsLyBAPOpfTpwdwwd62rlyEydqeOvq9BZ4za978QWGW-sMBCRH7n8rSI39uP6bf4KcEJB_SQ-ZtMfUDB0jPEieP5nBVfgxtMd-m_U3vklu2ST-5nVi6gu7ml2Gzf_fEYlEH5UKn2wP72m4HTKC4-ihK1i3qaRIFN0-jDjNMeok4bob10MxJ6oxvlN58uEGvtWpLVUe44g-mGol_uqqOZmz0XFBB4RewZxRRXybhm1mwwPamA"
                alt="Organic Hass Avocados"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1c30] truncate">Organic Hass Avocados</span>
                  <span className="font-mono text-xs text-[#006948] font-bold">+30 pcs</span>
                </div>
                <span className="font-mono text-[11px] text-[#6d7a72]">SKU: 8849-0192</span>
                <div className="flex items-center justify-between mt-1 bg-[#eff4ff] rounded px-2 py-1">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#ba1a1a]" />
                    <span className="text-[11px] text-[#565e74]">Current Store Stock:</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#ba1a1a]">4 pcs (Critically Low)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="bg-white rounded-xl shadow-sm p-3 border border-[#bccac0]/30 flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <img
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-[#e5eeff]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWzwyPnHbHORJ8oktFKXH2CAIgAiuSBb20g4rjH_FovP9GfpXmn-nz7Og88R-ol4KBExRo4_Xcz1W2AcubWmF9uGjAcZH0QiK8PXsF4SJ783hVABMwCAYtGquw8Ug9syvKd2IwAtqOpd3QwB6EgzbbibpZwWFR2spCJvY1cyDUa0RXFq86OA8X9bvUgX3bAX4MNNCKA2M6rIkQbUlC_t6niQ_w4o5ZUN_00fXj61FzFHeikTpVB4Yfog"
                alt="Farm Fresh 2% Milk"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1c30] truncate">Farm Fresh 2% Milk 1 Gal</span>
                  <span className="font-mono text-xs text-[#006948] font-bold">+20 units</span>
                </div>
                <span className="font-mono text-[11px] text-[#6d7a72]">SKU: 5512-8821</span>
                <div className="flex items-center justify-between mt-1 bg-[#eff4ff] rounded px-2 py-1">
                  <div className="flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#8d4b00]" />
                    <span className="text-[11px] text-[#565e74]">Current Store Stock:</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#8d4b00]">2 units (Low Stock)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="bg-white rounded-xl shadow-sm p-3 border border-[#bccac0]/30 flex flex-col gap-2">
            <div className="flex items-start gap-3">
              <img
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0 bg-[#e5eeff]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBC9v2CCENm__7oHt5lg8yNbFsW-SYO-IqwJ0e_XbdWBuAUmvesWt_6JsAZDvJOL1Z_hGcvOFB099HBv_y0JvB3cXQoL3vffu_m25slO1d6KIfKvlyEW39D-ig7ZP5TOfaw52mw6ng5K5Qs1VLNJy48NT6cmFVpUtyQhxQrHylC_XX59zYkru6Yu5E5v6sl9Ki63cl1B1VUizKJB4IesE81ceniiapGwLnK6_SL_P0ftIbPyEYcNXjlKA"
                alt="Sourdough Artisan Loaf"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0b1c30] truncate">Sourdough Artisan Loaf</span>
                  <span className="font-mono text-xs text-[#006948] font-bold">+15 loaves</span>
                </div>
                <span className="font-mono text-[11px] text-[#6d7a72]">SKU: 1044-3392</span>
                <div className="flex items-center justify-between mt-1 bg-[#ffdad6]/40 rounded px-2 py-1">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-[#ba1a1a]" />
                    <span className="text-[11px] text-[#565e74]">Current Store Stock:</span>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#ba1a1a]">0 units (Stockout)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spoilage / Damage Report Strip */}
        <div className="bg-white rounded-xl shadow-sm p-3 border border-[#bccac0]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#565e74]">
              <AlertTriangle className="w-4 h-4 text-[#8d4b00]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-[#0b1c30]">Transit Spoilage / Damage</span>
              <span className="text-[11px] text-[#565e74]">{damagedUnits} damaged units reported</span>
            </div>
          </div>
          <button
            onClick={() => {
              setDamagedUnits(damagedUnits + 1);
              onShowToast('Reported 1 damaged package in transit memo');
            }}
            className="h-8 px-3 rounded bg-[#eff4ff] text-[#0b1c30] font-mono text-[10px] uppercase font-bold active:bg-[#dce9ff] transition-colors"
          >
            Report
          </button>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={handleConfirmReceived}
            disabled={isConfirming}
            className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 active:scale-[0.99] transition-transform shadow-md"
          >
            <CheckCircle2 className="w-5 h-5 fill-white/20" />
            <span>{isConfirming ? 'Updating Downtown Till Inventory...' : 'Confirm Goods Received & Update Stock'}</span>
          </button>
          <button
            onClick={() => onShowToast('Printing TR-9941 Transfer Waybill on 80mm ESC/POS')}
            className="w-full h-11 bg-white hover:bg-[#eff4ff] text-[#0b1c30] rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border border-[#bccac0]/40 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-[#565e74]" />
            <span>Print Transfer Waybill / Manifest</span>
          </button>
        </div>

        {/* Pending Inbound Requests Card */}
        <div className="bg-[#eff4ff] rounded-xl p-3.5 flex flex-col gap-2 mt-1 border border-[#bccac0]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Inbox className="w-4 h-4 text-[#565e74]" />
              <span className="text-xs font-bold text-[#0b1c30]">Pending Inbound Requests</span>
            </div>
            <span className="font-mono text-[10px] bg-[#d3e4fe] text-[#0b1c30] px-2 py-0.5 rounded-full font-bold">
              2 Active
            </span>
          </div>
          <div className="bg-white rounded-lg p-2.5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#0b1c30] truncate">Northside Outlet • #TR-9944</span>
              <span className="text-[11px] text-[#565e74]">14 Dairy items • Awaiting Dispatch</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#6d7a72]" />
          </div>
          <div className="bg-white rounded-lg p-2.5 flex items-center justify-between shadow-sm">
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-[#0b1c30] truncate">Westside Micro-Hub • #TR-9948</span>
              <span className="text-[11px] text-[#565e74]">8 Produce crates • In Prep</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#6d7a72]" />
          </div>
        </div>
      </div>
    </div>
  );
};
