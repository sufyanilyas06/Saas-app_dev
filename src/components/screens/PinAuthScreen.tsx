import React, { useState } from 'react';
import { UserRole } from '../../types';
import { ShieldCheck, Lock, Delete, ArrowRight, HelpCircle, Store, Wifi, RotateCcw } from 'lucide-react';

interface PinAuthScreenProps {
  onSuccess: (role: UserRole) => void;
  onShowToast: (msg: string) => void;
}

export const PinAuthScreen: React.FC<PinAuthScreenProps> = ({ onSuccess, onShowToast }) => {
  const [pin, setPin] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('cashier');
  const [shiftIndex, setShiftIndex] = useState(0);
  const [isPasswordMode, setIsPasswordMode] = useState(false);
  const [alphaPassword, setAlphaPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const shifts = [
    'Morning Shift 08:00 - 16:00',
    'Evening Shift 16:00 - 00:00',
    'Night Restock 00:00 - 08:00',
  ];

  const handleKeyPress = (digit: string) => {
    if (pin.length < 4) {
      const nextPin = pin + digit;
      setPin(nextPin);
      if (nextPin.length === 4) {
        onShowToast('PIN entered. Tap Open Register or enter another key.');
      }
    }
  };

  const handleClear = () => {
    setPin('');
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleCycleShift = () => {
    setShiftIndex((prev) => (prev + 1) % shifts.length);
  };

  const handleAuthenticate = () => {
    if (!isPasswordMode && pin.length < 4) {
      onShowToast('Please enter complete 4-digit staff code (or press any 4 keys)');
      return;
    }

    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onShowToast(`Till unlocked! Welcome to ${selectedRole.toUpperCase()} mode.`);
      onSuccess(selectedRole);
    }, 900);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Branch / Store Header Card */}
      <div className="w-full bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 relative overflow-hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#006948] text-white">
              <span className="material-symbols-outlined text-[18px]">eco</span>
            </span>
            <div>
              <span className="font-mono text-[10px] uppercase font-bold text-[#006948] tracking-wider block">
                FreshPOS System
              </span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse" />
                <span className="font-mono text-[11px] text-[#565e74]">Lane #04 Active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-[#eff4ff] px-2.5 py-1 rounded-full text-[#565e74] font-mono text-[10px]">
            <Wifi className="w-3 h-3 text-[#006948]" />
            <span>Online</span>
          </div>
        </div>

        {/* Assigned Location */}
        <div className="mt-2">
          <label className="block font-mono text-[9px] text-[#565e74] uppercase font-bold mb-1">
            Assigned Store Location
          </label>
          <div className="w-full bg-[#eff4ff] rounded-lg p-2 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2 min-w-0">
              <Store className="w-4 h-4 text-[#006948] shrink-0" />
              <div className="truncate">
                <p className="font-bold text-xs text-[#0b1c30] truncate leading-tight">
                  FreshMart - Downtown Branch #01
                </p>
                <p className="text-[10px] text-[#565e74]">452 Market St, Metro Hub</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-[18px] text-[#565e74]">expand_more</span>
          </div>
        </div>
      </div>

      {/* Role Segmented Selector */}
      <div className="w-full bg-[#eff4ff] rounded-xl p-2 shadow-sm border border-[#bccac0]/20">
        <label className="block font-mono text-[9px] text-[#565e74] uppercase font-bold px-1 mb-1.5">
          Select Duty Role
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedRole('owner')}
            className={`py-2 px-1 rounded-lg text-center transition-all flex flex-col items-center justify-center gap-1 ${
              selectedRole === 'owner'
                ? 'bg-white text-[#0b1c30] shadow-sm font-bold'
                : 'text-[#565e74] hover:text-[#0b1c30]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                selectedRole === 'owner' ? 'text-[#006948]' : ''
              }`}
            >
              shield_person
            </span>
            <span className="text-[11px] truncate w-full">Owner / Admin</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('cashier')}
            className={`py-2 px-1 rounded-lg text-center transition-all flex flex-col items-center justify-center gap-1 ${
              selectedRole === 'cashier'
                ? 'bg-white text-[#0b1c30] shadow-sm font-bold'
                : 'text-[#565e74] hover:text-[#0b1c30]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                selectedRole === 'cashier' ? 'text-[#006948]' : ''
              }`}
            >
              point_of_sale
            </span>
            <span className="text-[11px] truncate w-full">Cashier (POS)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('inventory')}
            className={`py-2 px-1 rounded-lg text-center transition-all flex flex-col items-center justify-center gap-1 ${
              selectedRole === 'inventory'
                ? 'bg-white text-[#0b1c30] shadow-sm font-bold'
                : 'text-[#565e74] hover:text-[#0b1c30]'
            }`}
          >
            <span
              className={`material-symbols-outlined text-[18px] ${
                selectedRole === 'inventory' ? 'text-[#006948]' : ''
              }`}
            >
              inventory_2
            </span>
            <span className="text-[11px] truncate w-full">Inventory Staff</span>
          </button>
        </div>
      </div>

      {/* Shift & Terminal Context */}
      <div className="w-full bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-[#dae2fd] text-[#131b2e]">
              <span className="material-symbols-outlined text-[18px]">schedule</span>
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase font-bold text-[#565e74] block">
                Roster Schedule
              </span>
              <p className="font-bold text-xs text-[#0b1c30]">{shifts[shiftIndex]}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCycleShift}
            title="Switch Shift"
            className="p-2 rounded-lg bg-[#eff4ff] text-[#006948] hover:bg-[#e5eeff] active:scale-95 transition-transform"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="pt-1.5 border-t border-[#eff4ff] flex items-center justify-between text-[#565e74] font-mono text-[11px]">
          <span>
            Till Float: <strong className="text-[#0b1c30] font-bold">$250.00 USD</strong>
          </span>
          <span className="inline-flex items-center text-[#006948] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#006948] mr-1" /> Drawer Ready
          </span>
        </div>
      </div>

      {/* Primary Authentication Box */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm border border-[#bccac0]/20 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">
            Fast Clerk PIN Code
          </span>
          <button
            type="button"
            onClick={() => setIsPasswordMode(!isPasswordMode)}
            className="text-[#006948] font-mono text-[10px] uppercase font-bold hover:underline"
          >
            {isPasswordMode ? 'Use Quick PIN Pad' : 'Use Alpha Password'}
          </button>
        </div>

        {/* PIN Bubble View */}
        {!isPasswordMode ? (
          <div className="flex flex-col items-center gap-2 py-1">
            <div className="flex items-center justify-center gap-4 py-2">
              {[1, 2, 3, 4].map((idx) => {
                const isFilled = idx <= pin.length;
                return (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full transition-all duration-150 ${
                      isFilled
                        ? 'bg-[#006948] scale-110 shadow-sm'
                        : 'bg-[#d3e4fe]'
                    }`}
                  />
                );
              })}
            </div>
            <p className="text-[11px] text-[#565e74]">
              {pin.length === 4
                ? 'Ready to sign in!'
                : 'Enter 4-digit staff terminal code (e.g. 1234)'}
            </p>
          </div>
        ) : (
          <div className="py-2">
            <input
              type="password"
              value={alphaPassword}
              onChange={(e) => setAlphaPassword(e.target.value)}
              placeholder="Enter administrative password..."
              className="w-full h-11 px-3 rounded-xl bg-[#eff4ff] text-sm text-[#0b1c30] outline-none"
            />
          </div>
        )}

        {/* Tactical 10-Key Numpad */}
        {!isPasswordMode && (
          <div className="grid grid-cols-3 gap-2 pt-1">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleKeyPress(num)}
                className="h-12 rounded-xl bg-[#eff4ff] font-mono font-bold text-lg text-[#0b1c30] hover:bg-[#e5eeff] active:bg-[#dae2fd] transition-colors flex items-center justify-center shadow-2xs"
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={handleClear}
              className="h-12 rounded-xl bg-[#ffdad6] text-[#ba1a1a] font-mono text-xs font-bold hover:bg-[#fec8c4] active:scale-95 transition-all flex items-center justify-center"
            >
              CLEAR
            </button>
            <button
              type="button"
              onClick={() => handleKeyPress('0')}
              className="h-12 rounded-xl bg-[#eff4ff] font-mono font-bold text-lg text-[#0b1c30] hover:bg-[#e5eeff] active:bg-[#dae2fd] transition-colors flex items-center justify-center shadow-2xs"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="h-12 rounded-xl bg-[#e5eeff] text-[#0b1c30] hover:bg-[#dce9ff] active:scale-95 transition-all flex items-center justify-center"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleAuthenticate}
          disabled={isAuthenticating}
          className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white font-semibold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer mt-1"
        >
          {isAuthenticating ? (
            <>
              <span className="material-symbols-outlined text-[18px] animate-spin">
                progress_activity
              </span>
              <span>Authenticating Till...</span>
            </>
          ) : (
            <>
              <Lock className="w-4 h-4" />
              <span>Open Register / Sign In</span>
            </>
          )}
        </button>
      </div>

      {/* Emergency Assistance */}
      <div className="w-full flex flex-col items-center gap-1 pt-1">
        <div className="flex items-center gap-1.5 text-[#565e74] text-xs">
          <HelpCircle className="w-3.5 h-3.5 text-[#8d4b00]" />
          <span>Locked out or lost badge?</span>
          <button
            type="button"
            onClick={() => onShowToast('Supervisor dispatch notified for Downtown Branch #01.')}
            className="text-[#006948] font-bold hover:underline"
          >
            Emergency Unlock
          </button>
        </div>
        <p className="font-mono text-[9px] text-[#565e74]">
          FreshMart Retail POS v4.12.0 - Encrypted Terminal
        </p>
      </div>
    </div>
  );
};
