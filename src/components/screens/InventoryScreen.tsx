import React, { useState } from 'react';
import { Product } from '../../types';
import { Search, Barcode, Plus, Minus, Check, X, AlertOctagon, ShoppingCart, Calendar, MapPin, CheckCircle } from 'lucide-react';

interface InventoryScreenProps {
  products: Product[];
  onUpdateStock: (productId: string, newStock: number) => void;
  onOpenScanner: () => void;
  onShowToast: (msg: string) => void;
}

export const InventoryScreen: React.FC<InventoryScreenProps> = ({
  products,
  onUpdateStock,
  onOpenScanner,
  onShowToast,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'low' | 'out' | 'expiring'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCountModalOpen, setIsCountModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalCountVal, setModalCountVal] = useState<number>(0);
  const [isPoGenerating, setIsPoGenerating] = useState(false);
  const [poGenerated, setPoGenerated] = useState(false);

  const filteredProducts = products.filter((p) => {
    let matchesFilter = true;
    if (filterType === 'low') {
      matchesFilter = p.stock > 0 && p.stock <= p.minStock;
    } else if (filterType === 'out') {
      matchesFilter = p.stock === 0;
    } else if (filterType === 'expiring') {
      matchesFilter = p.expiryDays <= 3;
    }

    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery);

    return matchesFilter && matchesSearch;
  });

  const handleAdjustStock = (product: Product, delta: number) => {
    const nextVal = Math.max(0, product.stock + delta);
    onUpdateStock(product.id, nextVal);
    onShowToast(`Stock updated: ${product.name} → ${nextVal} units remaining`);
  };

  const handleOpenCountModal = (product: Product) => {
    setSelectedProduct(product);
    setModalCountVal(product.stock);
    setIsCountModalOpen(true);
  };

  const handleSaveModalCount = () => {
    if (selectedProduct) {
      onUpdateStock(selectedProduct.id, modalCountVal);
      onShowToast(`Shelf inventory count committed to ERP for ${selectedProduct.name}`);
    }
    setIsCountModalOpen(false);
  };

  const handleGeneratePO = () => {
    setIsPoGenerating(true);
    setTimeout(() => {
      setIsPoGenerating(false);
      setPoGenerated(true);
      onShowToast('Purchase Order #PO-9401 routed to 3 regional suppliers');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Role Bar & Live Metric Strip */}
      <div className="flex items-center justify-between bg-[#eff4ff] px-3 py-2 rounded-xl shadow-sm border border-[#bccac0]/20">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#00855d] text-white">
            <span className="material-symbols-outlined text-[14px]">badge</span>
          </span>
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-[#006948] uppercase font-bold tracking-wider">
              Inventory Staff View
            </span>
            <span className="text-[11px] text-[#565e74]">
              Floor Terminal #04 • Aisle Auditor
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 bg-[#d3e4fe] px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse" />
          <span className="font-mono text-[10px] text-[#0b1c30] font-bold">SYNCED</span>
        </div>
      </div>

      {/* Quick Search & Barcode Scan Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a72]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Scan barcode or enter SKU/title..."
            className="w-full h-11 pl-9 pr-9 rounded-xl bg-white text-xs text-[#0b1c30] placeholder-[#6d7a72] focus:outline-none shadow-sm border border-[#bccac0]/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6d7a72] hover:text-[#0b1c30]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <button
          type="button"
          onClick={onOpenScanner}
          aria-label="Open Camera Barcode Scanner"
          className="h-11 px-3 bg-[#006948] hover:bg-[#00855d] text-white rounded-xl flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform shrink-0"
        >
          <Barcode className="w-4 h-4" />
          <span className="font-semibold text-xs hidden sm:inline">Scan</span>
        </button>
      </div>

      {/* Reorder Urgent Threshold Alert Banner */}
      <div className="bg-gradient-to-br from-[#ffdcc3] via-[#eff4ff] to-[#e5eeff] rounded-xl p-3.5 shadow-sm border border-[#bccac0]/25 relative overflow-hidden">
        <div className="flex items-start justify-between gap-2">
          <div className="flex gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#b15f00] text-white flex items-center justify-center shrink-0 shadow-sm">
              <AlertOctagon className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs text-[#0b1c30]">
                  14 Items Below Threshold
                </span>
                <span className="w-2 h-2 rounded-full bg-[#8d4b00]" />
              </div>
              <p className="text-[11px] text-[#565e74] mt-0.5">
                Fresh produce & dairy run risk of stockout before evening rush.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between pt-1 border-t border-black/5">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
              Est. Cost
            </span>
            <span className="font-mono text-base font-black text-[#8d4b00]">
              $1,248.50
            </span>
          </div>

          <button
            type="button"
            onClick={handleGeneratePO}
            disabled={isPoGenerating}
            className={`h-9 px-3.5 rounded-lg font-bold text-xs flex items-center gap-1.5 shadow active:scale-95 transition-all ${
              poGenerated
                ? 'bg-[#00855d] text-white'
                : 'bg-[#006948] hover:bg-[#00855d] text-white'
            }`}
          >
            {isPoGenerating ? (
              <>
                <span className="material-symbols-outlined text-[16px] animate-spin">
                  progress_activity
                </span>
                <span>Generating...</span>
              </>
            ) : poGenerated ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>PO #9401 Sent</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Generate PO</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`inline-flex items-center gap-1.5 px-3 h-8 rounded-full font-mono text-[10px] uppercase font-bold whitespace-nowrap shadow-sm transition-all ${
            filterType === 'all'
              ? 'bg-[#006948] text-white'
              : 'bg-white text-[#0b1c30] border border-[#bccac0]/25 hover:bg-[#eff4ff]'
          }`}
        >
          <span className="material-symbols-outlined text-[14px]">inventory</span>
          <span>All Products (480)</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterType('low')}
          className={`inline-flex items-center gap-1.5 px-3 h-8 rounded-full font-mono text-[10px] uppercase font-bold whitespace-nowrap shadow-sm transition-all ${
            filterType === 'low'
              ? 'bg-[#006948] text-white'
              : 'bg-white text-[#0b1c30] border border-[#bccac0]/25 hover:bg-[#eff4ff]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#8d4b00]" />
          <span>Low Stock (14)</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterType('out')}
          className={`inline-flex items-center gap-1.5 px-3 h-8 rounded-full font-mono text-[10px] uppercase font-bold whitespace-nowrap shadow-sm transition-all ${
            filterType === 'out'
              ? 'bg-[#006948] text-white'
              : 'bg-white text-[#0b1c30] border border-[#bccac0]/25 hover:bg-[#eff4ff]'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
          <span>Out of Stock (3)</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterType('expiring')}
          className={`inline-flex items-center gap-1.5 px-3 h-8 rounded-full font-mono text-[10px] uppercase font-bold whitespace-nowrap shadow-sm transition-all ${
            filterType === 'expiring'
              ? 'bg-[#006948] text-white'
              : 'bg-white text-[#0b1c30] border border-[#bccac0]/25 hover:bg-[#eff4ff]'
          }`}
        >
          <span className="material-symbols-outlined text-[14px] text-[#ba1a1a]">event_busy</span>
          <span>Expiring Soon (6)</span>
        </button>
      </div>

      {/* Active Count Counter Bar */}
      <div className="flex items-center justify-between text-[#565e74] px-1">
        <span className="font-mono text-[10px] uppercase font-bold">
          Fast Stock Count • Live Ledger
        </span>
        <span className="font-mono text-[11px]">
          Showing <strong className="text-[#0b1c30]">{filteredProducts.length} items</strong> priority
        </span>
      </div>

      {/* Product List */}
      <div className="flex flex-col gap-2.5">
        {filteredProducts.map((product) => {
          const isLow = product.stock <= product.minStock && product.stock > 0;
          const isOut = product.stock === 0;
          const isExp = product.expiryDays <= 2;

          return (
            <article
              key={product.id}
              className={`bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2 transition-all ${
                isOut ? 'opacity-90' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                {/* Product Image */}
                <div className="relative w-16 h-16 rounded-lg bg-[#eff4ff] overflow-hidden shrink-0 border border-black/5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover ${isOut ? 'grayscale-[40%]' : ''}`}
                    loading="lazy"
                  />
                  <span className="absolute top-1 left-1 bg-white/90 backdrop-blur rounded px-1 font-mono text-[8px] text-[#0b1c30] font-bold uppercase">
                    {product.category}
                  </span>
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h3 className="font-semibold text-xs text-[#0b1c30] truncate leading-tight">
                      {product.name}
                    </h3>

                    {/* Badge */}
                    {isOut ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ba1a1a] text-white font-mono text-[9px] font-bold shrink-0">
                        Out of Stock
                      </span>
                    ) : isLow ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-mono text-[9px] font-bold shrink-0">
                        Low Stock
                      </span>
                    ) : isExp ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ffdcc3] text-[#2f1500] font-mono text-[9px] font-bold shrink-0">
                        Expiring
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold shrink-0">
                        In Stock
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-[#565e74] font-mono text-[10px]">
                    <span>{product.sku}</span>
                    <span className="w-1 h-1 rounded-full bg-[#bccac0]" />
                    <span>BAR: {product.barcode}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] font-mono text-[9px]">
                      <MapPin className="w-2.5 h-2.5 text-[#006948]" />
                      <span>{product.aisleShelf}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#eff4ff] text-[#0b1c30] font-mono text-[9px]">
                      <span>Batch: {product.batch}</span>
                    </span>
                    {product.expiryLabel && (
                      <span
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded font-mono text-[9px] font-bold ${
                          isExp
                            ? 'bg-[#ffdad6] text-[#93000a]'
                            : 'bg-[#eff4ff] text-[#565e74]'
                        }`}
                      >
                        <Calendar className="w-2.5 h-2.5" />
                        <span>{product.expiryLabel}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Inline Stock Controls */}
              <div className="flex items-center justify-between pt-1.5 bg-[#eff4ff] px-2.5 py-1.5 rounded-lg">
                <div className="flex flex-col">
                  <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
                    Current Units
                  </span>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`font-mono text-base font-black ${
                        isOut || isLow ? 'text-[#ba1a1a]' : 'text-[#0b1c30]'
                      }`}
                    >
                      {product.stock}
                    </span>
                    <span className="text-[10px] text-[#565e74]">/ Min: {product.minStock}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleAdjustStock(product, -1)}
                    disabled={product.stock === 0}
                    className="w-7 h-7 rounded-lg bg-white text-[#0b1c30] shadow-2xs active:scale-95 flex items-center justify-center hover:bg-[#e5eeff] transition-colors disabled:opacity-40"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenCountModal(product)}
                    className="h-7 px-2.5 rounded-lg bg-[#d3e4fe] text-[#0b1c30] font-mono text-[10px] uppercase font-bold hover:bg-[#c3d8fc] transition-colors"
                  >
                    {isOut ? 'Restock' : 'Count'}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleAdjustStock(product, 1)}
                    className="w-7 h-7 rounded-lg bg-[#006948] text-white shadow-2xs active:scale-95 flex items-center justify-center hover:bg-[#00855d] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Shelf Stock Reconciliation Modal */}
      {isCountModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#213145]/60 backdrop-blur-sm p-3">
          <div className="w-full sm:max-w-md bg-white rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">
                  Reconcile Floor Stock
                </span>
                <h4 className="font-bold text-sm text-[#0b1c30] truncate">
                  {selectedProduct.name}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setIsCountModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#eff4ff] p-2.5 rounded-xl flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-[#565e74] uppercase">SKU Code</span>
                <span className="font-mono text-xs font-bold text-[#0b1c30]">
                  {selectedProduct.sku}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[#006948]">
                <CheckCircle className="w-4 h-4" />
                <span className="font-mono text-[10px] uppercase font-bold">RFID Active</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] text-[#565e74] uppercase font-bold">
                Physical Count on Shelf
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  value={modalCountVal}
                  onChange={(e) => setModalCountVal(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full h-12 px-3 rounded-xl bg-[#eff4ff] text-base font-mono font-bold text-[#0b1c30] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setModalCountVal((v) => v + 1)}
                  className="w-12 h-12 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCountModalOpen(false)}
                className="flex-1 h-11 rounded-xl bg-[#eff4ff] text-[#0b1c30] font-semibold text-xs hover:bg-[#e5eeff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveModalCount}
                className="flex-1 h-11 rounded-xl bg-[#006948] text-white font-semibold text-xs shadow-md active:scale-95 hover:bg-[#00855d]"
              >
                Confirm Count
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button: Add New Product / Barcode Scan */}
      <div className="fixed right-4 bottom-20 z-30">
        <button
          type="button"
          onClick={onOpenScanner}
          className="h-12 pl-3 pr-4 bg-[#00855d] hover:bg-[#006948] text-white rounded-full shadow-xl active:scale-95 flex items-center gap-2 transition-all group"
        >
          <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
            <Plus className="w-4 h-4 text-white group-hover:rotate-90 transition-transform" />
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-xs leading-tight">New Item</span>
            <span className="font-mono text-[8px] uppercase tracking-wider text-[#85f8c4]">
              Auto-Scan SKU
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
