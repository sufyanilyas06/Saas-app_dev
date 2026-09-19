import React, { useState } from 'react';
import { Product } from '../types';
import { X, Check, Search, Barcode } from 'lucide-react';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanMatch: (product: Product) => void;
  products: Product[];
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  onScanMatch,
  products,
}) => {
  const [manualInput, setManualInput] = useState('');

  if (!isOpen) return null;

  // Synthesize a POS barcode scanner beep
  const playBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, audioCtx.currentTime); // High pitch retail scanner beep
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {
      // Audio context might be restricted before gesture
    }
  };

  const handleSelectProduct = (product: Product) => {
    playBeep();
    onScanMatch(product);
    onClose();
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = manualInput.trim().toLowerCase();
    if (!query) return;

    const matched = products.find(
      (p) =>
        p.barcode.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query)
    );

    if (matched) {
      handleSelectProduct(matched);
    } else {
      // If no direct match, match first product as fallback simulation
      handleSelectProduct(products[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-[#213145]/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full bg-white rounded-t-2xl p-4 shadow-2xl max-w-md mx-auto flex flex-col gap-3 pb-8 max-h-[85vh] overflow-y-auto">
        {/* Handle */}
        <div className="w-10 h-1 bg-[#bccac0]/60 rounded-full mx-auto" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#006948] text-[24px]">
              barcode_scanner
            </span>
            <span className="font-semibold text-sm text-[#0b1c30]">
              Laser Barcode Reticle Active
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#0b1c30] hover:bg-[#e5eeff]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder Camera Simulation */}
        <div className="relative w-full h-48 bg-[#0b1c30] rounded-xl overflow-hidden flex items-center justify-center border border-black/10 shadow-inner">
          {/* Corner brackets */}
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-28 border border-[#85f8c4]/40 rounded-lg flex flex-col justify-between p-2 pointer-events-none">
            <div className="flex justify-between">
              <span className="w-3.5 h-3.5 border-t-2 border-l-2 border-[#006948]" />
              <span className="w-3.5 h-3.5 border-t-2 border-r-2 border-[#006948]" />
            </div>
            {/* Animated Scanning Laser Line */}
            <div className="w-full h-0.5 bg-[#ba1a1a] shadow-[0_0_10px_#ba1a1a] animate-pulse" />
            <div className="flex justify-between">
              <span className="w-3.5 h-3.5 border-b-2 border-l-2 border-[#006948]" />
              <span className="w-3.5 h-3.5 border-b-2 border-r-2 border-[#006948]" />
            </div>
          </div>

          <span className="absolute bottom-2 font-mono text-[10px] text-white/80 uppercase tracking-widest bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
            Point at EAN-13 / QR / UPC Barcode
          </span>
        </div>

        {/* Quick Simulated Product Barcodes */}
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-[11px] text-[#565e74] uppercase font-bold">
            Tap to Test Instant Fast-Scan:
          </span>
          <div className="grid grid-cols-2 gap-2">
            {products.slice(0, 4).map((prod) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => handleSelectProduct(prod)}
                className="flex items-center justify-between p-2.5 bg-[#eff4ff] hover:bg-[#e5eeff] rounded-xl text-left transition-colors border border-transparent hover:border-[#006948]/30 group"
              >
                <div className="min-w-0 pr-1">
                  <p className="text-xs font-semibold truncate text-[#0b1c30]">
                    {prod.name}
                  </p>
                  <p className="font-mono text-[10px] text-[#565e74]">
                    #{prod.barcode.slice(-6)}
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-[#006948] shrink-0">
                  +${prod.price.toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Manual SKU input bar */}
        <form onSubmit={handleManualSubmit} className="flex gap-2 pt-1">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a72]" />
            <input
              type="text"
              value={manualInput}
              onChange={(e) => setManualInput(e.target.value)}
              placeholder="Or enter barcode / SKU..."
              className="w-full pl-9 pr-3 h-10 rounded-xl bg-[#eff4ff] text-sm text-[#0b1c30] placeholder-[#6d7a72] focus:outline-none focus:ring-1 focus:ring-[#006948]"
            />
          </div>
          <button
            type="submit"
            className="h-10 px-4 bg-[#006948] text-white rounded-xl text-xs font-semibold flex items-center gap-1 shrink-0 active:scale-95 transition-transform"
          >
            <span>Scan</span>
            <Check className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
