import React, { useState } from 'react';
import { Product, CartItem, Customer } from '../../types';
import { Search, Barcode, Plus, Minus, ShoppingBag, ArrowRight, UserPlus, Check, X, Tag } from 'lucide-react';

interface PosBillingScreenProps {
  products: Product[];
  cart: CartItem[];
  onUpdateCart: (productId: string, delta: number) => void;
  onOpenScanner: () => void;
  onNavigateToTender: () => void;
  customer: Customer | null;
  onAttachCustomer: (customer: Customer | null) => void;
  onShowToast: (msg: string) => void;
}

export const PosBillingScreen: React.FC<PosBillingScreenProps> = ({
  products,
  cart,
  onUpdateCart,
  onOpenScanner,
  onNavigateToTender,
  customer,
  onAttachCustomer,
  onShowToast,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [customerPhoneInput, setCustomerPhoneInput] = useState('');

  const categories = [
    { id: 'all', label: 'All (142)', icon: 'apps' },
    { id: 'produce', label: 'Fresh Produce', icon: 'eco' },
    { id: 'dairy', label: 'Dairy & Eggs', icon: 'egg' },
    { id: 'bakery', label: 'Bakery', icon: 'bakery_dining' },
    { id: 'beverages', label: 'Beverages', icon: 'local_cafe' },
    { id: 'snacks', label: 'Snacks', icon: 'cookie' },
    { id: 'household', label: 'Household', icon: 'soap' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.barcode.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const getCartQuantity = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleLinkVip = (e: React.FormEvent) => {
    e.preventDefault();
    const vipCustomer: Customer = {
      id: 'cust-882',
      name: 'Maria Santos',
      phone: customerPhoneInput || '+1 (555) 019-2831',
      tier: 'Tier 2',
      isVip: true,
      creditBalance: 120.0,
    };
    onAttachCustomer(vipCustomer);
    setIsCustomerModalOpen(false);
    onShowToast('VIP Rewards Member linked: Maria Santos (Tier 2)');
  };

  return (
    <div className="flex flex-col w-full pb-36 max-w-xl mx-auto">
      {/* Register Status Banner */}
      <div className="px-3 pt-2 pb-1.5">
        <div className="flex items-center justify-between bg-[#eff4ff] px-3 py-1.5 rounded-full shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006948] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006948]" />
            </span>
            <span className="font-mono text-[11px] text-[#0b1c30] truncate">
              Lane #01 • Reg Active • Sarah J.
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="flex items-center gap-1 bg-[#e5eeff] px-2 py-0.5 rounded-full text-[#0b1c30] font-mono text-[10px]">
              <span className="material-symbols-outlined text-[13px] text-[#006948]">
                point_of_sale
              </span>
              <span>Shift #4</span>
            </span>
          </div>
        </div>
      </div>

      {/* Customer Loyalty / Walk-in Bar */}
      <div className="px-3 pb-1.5">
        <div className="flex items-center justify-between bg-white px-3 py-2 rounded-xl shadow-sm border border-[#bccac0]/20">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#5c647a] shrink-0">
              <span className="material-symbols-outlined text-[18px]">
                {customer ? 'verified' : 'person'}
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-xs text-[#0b1c30] truncate leading-tight">
                  {customer ? customer.name : 'Walk-in Guest'}
                </span>
                <span className="bg-[#eff4ff] text-[#006948] font-mono text-[10px] px-1.5 py-0.5 rounded font-bold">
                  {customer ? customer.tier : 'Standard'}
                </span>
              </div>
              <span className="text-[11px] text-[#565e74] truncate">
                {customer ? customer.phone : 'No rewards card attached'}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCustomerModalOpen(true)}
            className="flex items-center gap-1 h-8 px-2.5 bg-[#eff4ff] hover:bg-[#e5eeff] active:scale-95 text-[#006948] rounded-lg transition-transform shrink-0"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span className="font-mono text-[10px] uppercase font-bold">
              {customer ? 'Change VIP' : 'Link VIP'}
            </span>
          </button>
        </div>
      </div>

      {/* Search & Barcode Scanner Button */}
      <div className="px-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="relative flex-1 flex items-center bg-white rounded-xl shadow-sm border border-[#bccac0]/20">
            <Search className="w-4 h-4 absolute left-3 text-[#6d7a72] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Scan SKU, EAN or product name..."
              className="w-full h-11 pl-9 pr-9 bg-transparent text-[#0b1c30] text-xs outline-none placeholder:text-[#6d7a72]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-[#6d7a72] hover:text-[#0b1c30]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={onOpenScanner}
            aria-label="Open Realtime Barcode Scanner"
            className="w-11 h-11 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white flex items-center justify-center shrink-0 shadow-md active:scale-95 transition-transform"
          >
            <Barcode className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="pb-2 overflow-x-auto px-3 no-scrollbar flex items-center gap-2">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 h-8 rounded-full font-mono text-[11px] whitespace-nowrap shadow-sm transition-all shrink-0 ${
                isActive
                  ? 'bg-[#006948] text-white font-bold'
                  : 'bg-white hover:bg-[#eff4ff] text-[#0b1c30] border border-[#bccac0]/20'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Product Catalog Grid (2 Column Compact Layout) */}
      <div className="px-3">
        <div className="flex items-center justify-between pb-2">
          <span className="font-mono text-[11px] text-[#565e74] uppercase tracking-wider font-bold">
            Fast-Pick Catalog
          </span>
          <span className="font-mono text-[11px] text-[#565e74]">
            Tap card to +1 qty
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {filteredProducts.map((product) => {
            const qty = getCartQuantity(product.id);
            const isLow = product.stock <= 3;
            return (
              <div
                key={product.id}
                onClick={() => {
                  onUpdateCart(product.id, 1);
                  onShowToast(`Added +1 ${product.name}`);
                }}
                className="flex flex-col bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-all active:scale-[0.98] border border-[#bccac0]/20 cursor-pointer select-none"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-[#eff4ff] mb-1.5">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Stock pill */}
                  <span
                    className={`absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded font-mono text-[9px] shadow-sm flex items-center gap-0.5 font-bold ${
                      isLow
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : 'bg-white/90 backdrop-blur-sm text-[#006948]'
                    }`}
                  >
                    {isLow && '⚠️ '}
                    {product.stock} in stock
                  </span>
                  {/* Price overlay */}
                  <span className="absolute bottom-1 right-1 font-mono text-xs font-bold text-white bg-[#006948] px-1.5 py-0.5 rounded shadow-sm">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                {/* Title & Info */}
                <div className="flex flex-col flex-1 justify-between min-w-0">
                  <div>
                    <h3 className="font-semibold text-xs text-[#0b1c30] truncate leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-[11px] text-[#565e74] truncate mt-0.5">
                      {product.unit} • #{product.barcode.slice(-6)}
                    </p>
                  </div>

                  {/* Inline Stepper and Cart Quick Action */}
                  <div
                    className="flex items-center justify-between mt-2 pt-1 border-t border-[#eff4ff]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center gap-1 bg-[#eff4ff] rounded-lg p-0.5">
                      <button
                        type="button"
                        onClick={() => onUpdateCart(product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-white text-[#0b1c30] hover:bg-[#e5eeff] active:scale-95 shadow-2xs"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-mono text-xs font-bold text-[#0b1c30] w-5 text-center">
                        {qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateCart(product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded bg-[#006948] text-white hover:bg-[#00855d] active:scale-95 shadow-2xs"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onUpdateCart(product.id, 1);
                        onShowToast(`Added +1 ${product.name}`);
                      }}
                      className="w-7 h-7 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] flex items-center justify-center text-[#006948] transition-colors"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer Modal */}
      {isCustomerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-[#213145]/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#006948]" />
                <h3 className="font-bold text-sm text-[#0b1c30]">Attach Customer Rewards</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCustomerModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#565e74]">
              Scan digital customer pass or enter phone number to apply member tier discount (e.g. 10% OFF with FRESH10).
            </p>

            <form onSubmit={handleLinkVip} className="flex flex-col gap-3">
              <input
                type="tel"
                value={customerPhoneInput}
                onChange={(e) => setCustomerPhoneInput(e.target.value)}
                placeholder="(555) 019-2831"
                className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-sm text-[#0b1c30] outline-none font-mono"
              />
              <button
                type="submit"
                className="w-full h-11 bg-[#006948] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
              >
                <Check className="w-4 h-4" />
                <span>Link Maria Santos (Tier 2 VIP)</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Persistent Sticky Tactile Bottom Dock: Cart Summary & Checkout Action */}
      <div className="fixed bottom-16 left-0 right-0 z-30 px-3 pb-2 pointer-events-none">
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-xl border border-[#bccac0]/30 flex flex-col gap-1.5 pointer-events-auto">
          {/* Fast Cart Breakdown Ribbon */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-[#006948]/10 flex items-center justify-center text-[#006948] shrink-0">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="font-mono text-xs font-bold text-[#0b1c30] truncate">
                {totalItemsCount} Items ({cart.length} unique)
              </span>
            </div>
            <div className="flex items-baseline gap-1 shrink-0">
              <span className="font-mono text-[10px] text-[#565e74] uppercase">Subtotal</span>
              <span className="font-mono text-base font-black text-[#0b1c30]">
                ${subtotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Primary Tactical Pay Bar */}
          <button
            type="button"
            onClick={onNavigateToTender}
            disabled={totalItemsCount === 0}
            className={`w-full h-12 rounded-xl flex items-center justify-between px-4 shadow-md transition-all ${
              totalItemsCount > 0
                ? 'bg-[#006948] hover:bg-[#00855d] text-white active:scale-[0.99] cursor-pointer'
                : 'bg-[#bccac0]/40 text-[#565e74] cursor-not-allowed'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px]">point_of_sale</span>
              <span className="font-semibold text-sm tracking-tight">
                View Cart & Tender
              </span>
            </div>
            <div className="flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-lg">
              <span className="font-mono text-[11px] uppercase font-bold text-white">
                Pay Fast
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
