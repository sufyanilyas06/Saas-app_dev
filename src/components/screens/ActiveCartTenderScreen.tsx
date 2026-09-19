import React, { useState } from 'react';
import { Search, Barcode, Star, UserX, ArrowLeftRight, MoreVertical, Plus, Minus, Scale, PauseCircle, Trash2, Tag, Split, ArrowRight, Bookmark, X, Percent, DollarSign, FileText, ShieldAlert } from 'lucide-react';
import { Product, CartItem, Customer } from '../../types';

interface ActiveCartTenderScreenProps {
  cart: CartItem[];
  customer: Customer | null;
  onUpdateCart: (productId: string, delta: number) => void;
  onNavigateToTender: () => void;
  onOpenScanner: () => void;
  onShowToast: (msg: string) => void;
}

export const ActiveCartTenderScreen: React.FC<ActiveCartTenderScreenProps> = ({
  cart,
  customer,
  onUpdateCart,
  onNavigateToTender,
  onOpenScanner,
  onShowToast,
}) => {
  const [activeItemForDrawer, setActiveItemForDrawer] = useState<{ name: string; price: string } | null>(null);
  const [isHoldModalOpen, setIsHoldModalOpen] = useState(false);
  const [isVoidModalOpen, setIsVoidModalOpen] = useState(false);
  const [voidPin, setVoidPin] = useState('');
  const [isPromoActive, setIsPromoActive] = useState(true);
  const [isMultiTender, setIsMultiTender] = useState(false);

  // Line items state representation
  const lineItems = [
    {
      id: 'item-1',
      name: 'Organic Hass Avocados',
      tag: 'PRODUCE',
      purchased: '3 pcs @ $1.50 ea',
      oldPrice: '$5.00',
      price: '$4.50',
      promo: '-$0.50 PROMO',
      note: 'Note: Ripe preferred',
      qty: 3,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzT3lFs7LgbvMRmuOl5YRMbtjZDWzXhaPA93FhYobhN9nyZUs5b5gaxKbOWONBf9-g4fUgZpd3uuc_XJK2dOZL8mZ3BHF2ZYbXuQZ54tkVWU6RmT2ZxjB43QuOUDkyJq00JPOeLOykgvMyUL_FSYs7YpdmBPB7sQ3fRpAxQ6jlOMVE1oQxZ2vscPBqTKooI90sbxaymwFJZxGpMMkvPNHPWGN3A26ZApLKmeszh7oFJ4KESWIyHUKorQ',
    },
    {
      id: 'item-2',
      name: 'Farm Fresh 2% Milk 1 Gal',
      tag: 'DAIRY',
      purchased: '1 unit @ $3.89',
      oldPrice: '$4.29',
      price: '$3.89',
      promo: 'OVERRIDDEN',
      sku: 'SKU: 8849-0192',
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1S4O5P6oilxS5Yc2wWPjh-R17IxmwIC9iM4NmLySqkXs0Vekvyqlob_9DRZKEzWbNrDr_fVMOFZo7h1uXMzkX8gvQnh-aHX5fYX-0Uz6sjBn9h7Z79ddVlQda9NUQlUm23Ex8BmxpkRTtrqSn1zCEkcHpjMSR87x6-MF0_HiCyGLAXK2AISHo-gC0HYc45oJvOYPumvM62lTUH1c60cf0kJxm2-tqsn_e6Tv404xtoLXKGJnA74IAtA',
    },
    {
      id: 'item-3',
      name: 'Sourdough Artisan Loaf',
      tag: 'BAKERY',
      purchased: '1 unit @ $5.25',
      price: '$5.25',
      note: 'Daily Morning Bake',
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsV38pYskpmhe5XgkyFPh7NI7Aaoal9COIDPc2rtZ3JbSsfsCwhaGJ7Kzcd2dDMrWbqL2TtPXN53jSiBwYtkHTxA3mlMx-MJ7IGEwkWyvmRWLxjTQKxCcuLli16LauZdfO2wiZcHxhQ46pZHViyfRmtCayneucBUuqwrvCXLooVmBuKuvv0itfHYEuh8Jh6zBPWbw981fZtbd-M8ZyNhBNe4YbQdgvGUJylnHlBzX4IVTH7cHy2q_TgQ',
    },
    {
      id: 'item-4',
      name: 'Honeycrisp Apples',
      tag: 'PLU #4173',
      purchased: 'Bulk 1.85 kg @ $4.20/kg',
      price: '$7.77',
      isScale: true,
      scaleWeight: '1.85 kg',
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv3Weyjqqdqs4TBKhFERQaBDKyNqH9dgtNsC5a4vDrdLz-O8X_rXLFzHf1eIbBS1b8uFkdSCKSXiOz7ZZ8PnGdrPr9eM8WoJQd7n0_lUNrXzVRFOZXmmU9H17K0w6w26H4SqPSQqZie7eZjkOsgWprgcFG3mYkjt69bt9YnnmuByeLdqwxGGHoOif1RcRE5oHatFeK_ay8FqMEaNMedz_m7j9Wh0D8ImRUfSMIcbKWHZoit7BisItORA',
    },
    {
      id: 'item-5',
      name: 'Greek Whole Yogurt 32oz',
      tag: 'DAIRY',
      purchased: '1 unit @ $7.09',
      price: '$7.09',
      note: 'Aisle 4 • Chilled',
      qty: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAFtLd93RFCJJH7BGLTuryWw3qPu5DmcNnBarBN1I-MSieGGbkVz7gvCI5N907Tn4JTXGfX2yzddIpXT3rDag5mHF2WrkXQD_3h98xuwQ3T2rOAuT48KLCn4v3cf_IuVlZw5SkVsmpKpwq6uB48hcscpeGUQxfS6RJPHfpKYfgmu3s-4cgxTTdxvr1i7g3yOjHTD5KqaLp6OtoDAO3ZAYv6btD8ae85KPRrLLS0w5XAhEY1F9HKizVYg',
    },
  ];

  const handleHoldConfirm = () => {
    setIsHoldModalOpen(false);
    onShowToast('Order #HOLD-08 saved to Parked Ledger');
  };

  const handleVoidConfirm = () => {
    setIsVoidModalOpen(false);
    onShowToast('Active cart voided by Store Supervisor');
  };

  const toggleMultiTender = () => {
    setIsMultiTender(!isMultiTender);
    onShowToast(
      !isMultiTender
        ? 'Multi-tender mode active: Cash ($15.00) / Card ($11.09)'
        : 'Reverted to single payment tender'
    );
  };

  const togglePromo = () => {
    setIsPromoActive(!isPromoActive);
    onShowToast(!isPromoActive ? 'FRESH10 applied: 10% storewide VIP voucher' : 'FRESH10 voucher removed');
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Fast Search & Scanner Assist Header Bar */}
      <section className="bg-white p-2 rounded-xl shadow-sm border border-[#bccac0]/20 flex items-center gap-2">
        <div className="flex items-center flex-1 h-10 px-3 bg-[#eff4ff] rounded-lg gap-2">
          <Search className="text-[#565e74] w-4 h-4" />
          <input
            type="text"
            placeholder="Scan SKU / Search item by name..."
            className="bg-transparent text-[#0b1c30] placeholder:text-[#565e74] text-xs font-medium w-full outline-none"
          />
          <span className="px-1.5 py-0.5 rounded bg-white font-mono text-[9px] text-[#565e74] font-bold shadow-2xs">
            F2
          </span>
        </div>
        <button
          type="button"
          onClick={onOpenScanner}
          className="h-10 px-3 flex items-center justify-center gap-1.5 bg-[#006948] text-white rounded-lg text-xs font-bold shadow-sm active:scale-95 transition-transform"
        >
          <Barcode className="w-4 h-4" />
          <span className="hidden sm:inline">Scan</span>
        </button>
      </section>

      {/* Customer Loyalty & Account Tray */}
      <section className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-YqeI8SzSgPlEl7qEu3UsaaV_W4Ype-2D4aeXu-cF1g4GTvvWRa-TGtKQxG1xvc8vEnHTbz6JF1nAoggv0iUNXpHrhYtvaBb_E4pjH7bzjqFj8IVl71uJnCHUHzJrTS4zFWorFXnzgbB0qXLTXmMSa8O6cQD-6xapTitGZYdj-MPwUeCk9-leXi8ift01d4KXKJz6nb_o5ULHXrFUzuE02LdjFM_lgVohWB1WIsMDzn3irIuLc9XKVw"
              alt="Maria Santos"
              className="w-11 h-11 rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h2 className="font-bold text-xs text-[#0b1c30] truncate">Maria Santos</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#ffdcc3] text-[#6e3900] font-mono text-[9px] font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#8d4b00] text-[#8d4b00]" />
                  GOLD VIP
                </span>
              </div>
              <p className="text-[10px] text-[#565e74]">ID: #CUST-4921 • Member since 2022</p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => onShowToast('Customer selection modal opened')}
              className="px-2 py-1 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] text-[10px] font-bold flex items-center gap-1"
            >
              <ArrowLeftRight className="w-3 h-3" />
              <span>Change</span>
            </button>
            <button
              type="button"
              onClick={() => onShowToast('Detached to Walk-in Guest')}
              className="w-7 h-7 rounded-lg bg-[#eff4ff] hover:text-[#ba1a1a] flex items-center justify-center text-[#565e74]"
              title="Detach to Guest"
            >
              <UserX className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Member Ledger & Balance Quick Strip */}
        <div className="grid grid-cols-3 gap-2 bg-[#eff4ff] rounded-lg p-2 text-xs">
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Store Credit</span>
            <span className="font-mono font-bold text-[#006948]">$120.00</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Due Balance</span>
            <span className="font-mono font-bold text-[#0b1c30]">$0.00</span>
          </div>
          <div className="flex flex-col text-right">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Points Earned</span>
            <span className="font-mono font-bold text-[#8d4b00]">450 pts</span>
          </div>
        </div>
      </section>

      {/* Cart Items List */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-xs text-[#0b1c30]">Cart Items</span>
            <span className="w-5 h-5 rounded-full bg-[#00855d] text-white font-mono text-[10px] font-bold flex items-center justify-center">
              5
            </span>
          </div>
          <button
            type="button"
            onClick={() => setActiveItemForDrawer({ name: 'Bulk Modification', price: 'All 5 items' })}
            className="text-xs text-[#006948] font-bold hover:underline flex items-center gap-0.5"
          >
            Quick Actions
          </button>
        </div>

        {lineItems.map((item) => (
          <div key={item.id} className="bg-white p-3 rounded-xl shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative w-12 h-12 rounded-lg bg-[#eff4ff] flex items-center justify-center overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  {item.isScale && (
                    <span className="absolute bottom-0 right-0 bg-[#006948] text-white p-0.5 rounded-tl">
                      <Scale className="w-2.5 h-2.5" />
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h3 className="font-bold text-xs text-[#0b1c30] truncate">{item.name}</h3>
                    <span className="px-1.5 py-0.2 rounded bg-[#e5eeff] text-[8px] font-mono font-bold text-[#0b1c30]">
                      {item.tag}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-[#565e74]">{item.purchased}</p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="flex items-baseline justify-end gap-1">
                  {item.oldPrice && (
                    <span className="line-through text-[#565e74]/60 font-mono text-[10px]">{item.oldPrice}</span>
                  )}
                  <span className="font-mono text-xs font-bold text-[#0b1c30]">{item.price}</span>
                </div>
                {item.promo && (
                  <span className="inline-block text-[8px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#85f8c4] text-[#002114]">
                    {item.promo}
                  </span>
                )}
                {item.isScale && (
                  <span className="block text-[8px] font-mono text-[#006948] font-bold">CERTIFIED SCALE</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-[#eff4ff]">
              {item.isScale ? (
                <button
                  type="button"
                  onClick={() => onShowToast(`Re-weighing ${item.name}: 1.850 kg confirmed on Mettler Toledo`)}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#eff4ff] text-[#006948] text-[10px] font-bold"
                >
                  <Scale className="w-3 h-3" />
                  <span>Re-weigh on Scale</span>
                </button>
              ) : (
                <span className="text-[10px] text-[#565e74] truncate max-w-[160px]">
                  {item.note || item.sku || 'Regular item'}
                </span>
              )}

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveItemForDrawer({ name: item.name, price: item.price })}
                  className="w-7 h-7 rounded-lg bg-[#eff4ff] text-[#565e74] hover:bg-[#e5eeff] flex items-center justify-center"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center bg-[#eff4ff] rounded-lg p-0.5">
                  <button
                    type="button"
                    onClick={() => onShowToast(`Updated quantity for ${item.name}`)}
                    className="w-6 h-6 rounded bg-white text-[#0b1c30] font-bold flex items-center justify-center shadow-2xs"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-mono text-xs font-bold text-[#0b1c30]">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => onShowToast(`Updated quantity for ${item.name}`)}
                    className="w-6 h-6 rounded bg-white text-[#0b1c30] font-bold flex items-center justify-center shadow-2xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Actions Toolbar */}
      <section className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setIsHoldModalOpen(true)}
          className="h-9 bg-white text-[#0b1c30] rounded-xl shadow-sm border border-[#bccac0]/20 flex items-center justify-center gap-1.5 font-bold text-xs active:scale-95"
        >
          <PauseCircle className="w-4 h-4 text-[#8d4b00]" />
          <span>Hold Cart</span>
        </button>
        <button
          type="button"
          onClick={() => setIsVoidModalOpen(true)}
          className="h-9 bg-white text-[#ba1a1a] rounded-xl shadow-sm border border-[#bccac0]/20 flex items-center justify-center gap-1.5 font-bold text-xs active:scale-95"
        >
          <Trash2 className="w-4 h-4 text-[#ba1a1a]" />
          <span>Void All</span>
        </button>
        <button
          type="button"
          onClick={togglePromo}
          className={`h-9 rounded-xl shadow-sm flex items-center justify-center gap-1 font-bold text-xs active:scale-95 transition-all ${
            isPromoActive
              ? 'bg-[#85f8c4] text-[#002114]'
              : 'bg-white text-[#565e74] border border-[#bccac0]/20'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>FRESH10</span>
        </button>
      </section>

      {/* Bill Ledger Breakdown */}
      <section className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs text-[#565e74]">
          <span>Items Subtotal (5 units)</span>
          <span className="font-mono font-bold text-[#0b1c30]">$28.50</span>
        </div>

        {isPromoActive && (
          <div className="flex items-center justify-between text-xs text-[#006948]">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[15px]">verified</span>
              <span>Applied Discount (FRESH10 - 10%)</span>
            </div>
            <span className="font-mono font-bold">-$3.65</span>
          </div>
        )}

        <div className="flex items-center justify-between text-xs text-[#565e74]">
          <span>Sales Tax / GST (5.0%)</span>
          <span className="font-mono font-bold text-[#0b1c30]">$1.24</span>
        </div>

        <div className="w-full border-t border-[#eff4ff] my-0.5" />

        <div className="flex items-baseline justify-between pt-0.5">
          <div>
            <span className="font-bold text-xs text-[#0b1c30]">Total Payable</span>
            <span className="text-[10px] text-[#565e74] block">Includes all municipal levies</span>
          </div>
          <span className="font-mono text-2xl font-black text-[#006948]">$26.09</span>
        </div>

        {/* Multi-Tender Selector Trigger */}
        <button
          type="button"
          onClick={toggleMultiTender}
          className="w-full py-2 px-3 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] flex items-center justify-between transition-colors mt-1"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Split className="w-4 h-4 text-[#006948]" />
            <span className="text-xs font-semibold truncate">
              {isMultiTender
                ? 'Multi-Tender Active (Cash $15.00 + Card $11.09)'
                : 'Split Tender (Split across Cash & Card)'}
            </span>
          </div>
          <span className="material-symbols-outlined text-[18px] text-[#565e74]">tune</span>
        </button>
      </section>

      {/* Sticky Bottom Quick Checkout Deck */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md p-2.5 border-t border-[#bccac0]/20 shadow-lg">
        <div className="max-w-md mx-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsHoldModalOpen(true)}
            className="w-12 h-12 rounded-xl bg-[#eff4ff] text-[#0b1c30] flex items-center justify-center active:scale-95 transition-transform shrink-0"
            title="Park Current Order"
          >
            <Bookmark className="w-5 h-5 text-[#8d4b00]" />
          </button>
          <button
            type="button"
            onClick={onNavigateToTender}
            className="flex-1 h-12 px-4 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white flex items-center justify-between shadow-md active:scale-95 transition-all"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px]">point_of_sale</span>
              <span className="font-bold text-xs">Proceed to Tender</span>
            </div>
            <div className="flex items-center gap-1 font-mono font-bold text-sm">
              <span>$26.09</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>

      {/* Drawer: Item Modifications */}
      {activeItemForDrawer && (
        <div className="fixed inset-0 z-50 bg-[#0b1c30]/40 backdrop-blur-xs flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-4 max-w-lg w-full mx-auto shadow-2xl flex flex-col gap-3">
            <div className="w-10 h-1 bg-[#bccac0] rounded-full mx-auto" />
            <div className="flex items-center justify-between pb-1 border-b border-[#eff4ff]">
              <div>
                <h3 className="font-bold text-xs text-[#0b1c30]">{activeItemForDrawer.name}</h3>
                <p className="font-mono text-xs font-bold text-[#006948]">{activeItemForDrawer.price}</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveItemForDrawer(null)}
                className="w-7 h-7 rounded-full bg-[#eff4ff] text-[#565e74] flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setActiveItemForDrawer(null);
                  onShowToast('Applied 15% promotional discount to line item');
                }}
                className="p-3 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] flex flex-col items-start gap-1"
              >
                <Percent className="w-4 h-4 text-[#006948]" />
                <span className="font-bold text-[#0b1c30]">Apply Discount (%)</span>
                <span className="text-[10px] text-[#565e74]">Manager / promo cut</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveItemForDrawer(null);
                  onShowToast('Price override authorization prompt opened');
                }}
                className="p-3 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] flex flex-col items-start gap-1"
              >
                <DollarSign className="w-4 h-4 text-[#8d4b00]" />
                <span className="font-bold text-[#0b1c30]">Price Override</span>
                <span className="text-[10px] text-[#565e74]">Custom manual rate</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveItemForDrawer(null);
                  onShowToast('Note editor opened for line item');
                }}
                className="p-3 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] flex flex-col items-start gap-1"
              >
                <FileText className="w-4 h-4 text-[#565e74]" />
                <span className="font-bold text-[#0b1c30]">Add Item Note</span>
                <span className="text-[10px] text-[#565e74]">Prep / special spec</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveItemForDrawer(null);
                  onShowToast('Line item voided from active cart');
                }}
                className="p-3 rounded-xl bg-[#ffdad6] hover:bg-[#ffdad6]/80 flex flex-col items-start gap-1 text-[#93000a]"
              >
                <Trash2 className="w-4 h-4 text-[#ba1a1a]" />
                <span className="font-bold">Void Line Item</span>
                <span className="text-[10px] text-[#ba1a1a]/80">Remove from basket</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Hold Order */}
      {isHoldModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b1c30]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 max-w-xs w-full shadow-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#8d4b00]">
              <PauseCircle className="w-5 h-5" />
              <h3 className="font-bold text-xs text-[#0b1c30]">Hold Current Cart</h3>
            </div>
            <p className="text-[11px] text-[#565e74]">
              Store this transaction temporarily to serve the next customer in queue.
            </p>
            <div className="bg-[#eff4ff] p-2.5 rounded-lg flex flex-col gap-0.5">
              <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Assigned Reference Code</span>
              <span className="font-mono text-sm font-bold text-[#0b1c30]">#HOLD-08 • Maria Santos</span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsHoldModalOpen(false)}
                className="flex-1 h-9 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleHoldConfirm}
                className="flex-1 h-9 rounded-lg bg-[#8d4b00] text-white text-xs font-bold shadow-sm"
              >
                Confirm Park
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Void Entire Order */}
      {isVoidModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0b1c30]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-4 max-w-xs w-full shadow-2xl flex flex-col gap-3">
            <div className="flex items-center gap-2 text-[#ba1a1a]">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="font-bold text-xs text-[#0b1c30]">Supervisor Override</h3>
            </div>
            <p className="text-[11px] text-[#565e74]">
              Voiding the active transaction requires manager PIN authorization.
            </p>
            <div className="flex justify-center py-1">
              <input
                type="password"
                maxLength={4}
                value={voidPin}
                onChange={(e) => setVoidPin(e.target.value)}
                placeholder="••••"
                className="w-32 h-10 text-center font-mono text-lg font-bold bg-[#eff4ff] rounded-lg tracking-widest outline-none"
              />
            </div>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsVoidModalOpen(false)}
                className="flex-1 h-9 rounded-lg bg-[#eff4ff] text-[#0b1c30] text-xs font-semibold"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={handleVoidConfirm}
                className="flex-1 h-9 rounded-lg bg-[#ba1a1a] text-white text-xs font-bold shadow-sm"
              >
                Authorize Void
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
