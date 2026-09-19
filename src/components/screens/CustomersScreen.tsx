import React, { useState } from 'react';
import { Customer } from '../../types';
import { Search, UserPlus, Phone, CreditCard, ShieldCheck, Check, X, Star } from 'lucide-react';
import { MOCK_CUSTOMERS } from '../../data/mockData';

interface CustomersScreenProps {
  onSelectCustomer: (customer: Customer) => void;
  onShowToast: (msg: string) => void;
  onNavigateToPos: () => void;
}

export const CustomersScreen: React.FC<CustomersScreenProps> = ({
  onSelectCustomer,
  onShowToast,
  onNavigateToPos,
}) => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNewCustModalOpen, setIsNewCustModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newCredit, setNewCredit] = useState('100.00');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery)
  );

  const handleCreateCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const newCust: Customer = {
      id: `cust-${Date.now()}`,
      name: newName.trim(),
      phone: newPhone.trim(),
      tier: 'Tier 1',
      isVip: true,
      creditBalance: parseFloat(newCredit) || 50.0,
    };

    setCustomers([newCust, ...customers]);
    setIsNewCustModalOpen(false);
    setNewName('');
    setNewPhone('');
    onShowToast(`Enrolled new loyalty member: ${newCust.name}`);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Loyalty Header */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#85f8c4] flex items-center justify-center text-[#002114]">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h2 className="font-bold text-xs text-[#0b1c30]">Customer Loyalty & Credit</h2>
            <p className="text-[11px] text-[#565e74]">
              Manage VIP discount tiers & store credit khatas
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsNewCustModalOpen(true)}
          className="h-9 px-3 bg-[#006948] hover:bg-[#00855d] text-white rounded-lg flex items-center gap-1.5 text-xs font-semibold shadow-sm active:scale-95"
        >
          <UserPlus className="w-3.5 h-3.5" />
          <span>New VIP</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6d7a72]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by customer name or phone..."
          className="w-full h-11 pl-9 pr-9 rounded-xl bg-white text-xs text-[#0b1c30] placeholder-[#6d7a72] focus:outline-none shadow-sm border border-[#bccac0]/20"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6d7a72]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Customers List */}
      <div className="flex flex-col gap-2">
        {filtered.map((cust) => (
          <div
            key={cust.id}
            className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex items-center justify-between"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#006948] font-bold text-sm shrink-0">
                {cust.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-[#0b1c30] truncate">
                    {cust.name}
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
                    {cust.tier}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#565e74] mt-0.5">
                  <span className="font-mono">{cust.phone}</span>
                  <span>•</span>
                  <span className="text-[#006948] font-mono font-semibold">
                    Credit: ${cust.creditBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onSelectCustomer(cust);
                onShowToast(`Linked ${cust.name} to active register ticket.`);
                onNavigateToPos();
              }}
              className="h-8 px-3 rounded-lg bg-[#eff4ff] hover:bg-[#e5eeff] active:scale-95 text-[#006948] text-[11px] font-bold uppercase transition-colors shrink-0"
            >
              Select for POS
            </button>
          </div>
        ))}
      </div>

      {/* New Customer Modal */}
      {isNewCustModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-[#213145]/60 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-white rounded-2xl p-4 shadow-2xl flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-[#006948]" />
                <h3 className="font-bold text-sm text-[#0b1c30]">Enroll Rewards VIP</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsNewCustModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCustomer} className="flex flex-col gap-2.5">
              <div>
                <label className="font-mono text-[10px] text-[#565e74] uppercase font-bold">
                  Full Customer Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Liam Vance"
                  className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-xs text-[#0b1c30] outline-none mt-1"
                  required
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#565e74] uppercase font-bold">
                  Phone / Mobile Number
                </label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-xs text-[#0b1c30] outline-none mt-1 font-mono"
                  required
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-[#565e74] uppercase font-bold">
                  Approved Store Credit Limit ($)
                </label>
                <input
                  type="number"
                  value={newCredit}
                  onChange={(e) => setNewCredit(e.target.value)}
                  placeholder="100.00"
                  className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-xs text-[#0b1c30] outline-none mt-1 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform mt-2"
              >
                <Check className="w-4 h-4" />
                <span>Save VIP Account</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
