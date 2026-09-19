import React, { useState } from 'react';
import { ScreenType, UserRole } from '../types';
import { Bell, ChevronDown, ArrowLeft, Lock, Smartphone, Monitor } from 'lucide-react';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onNotificationClick: () => void;
  unreadCount?: number;
  isDeviceFrame: boolean;
  onToggleDeviceFrame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  userRole,
  onRoleChange,
  onNotificationClick,
  unreadCount = 2,
  isDeviceFrame,
  onToggleDeviceFrame,
}) => {
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const getRoleLabel = () => {
    switch (userRole) {
      case 'owner':
        return 'Shop Owner';
      case 'cashier':
        return 'Cashier Lane';
      case 'inventory':
        return 'Floor Auditor';
    }
  };

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'dashboard':
        return 'Dashboard';
      case 'pos':
        return 'Pos Billing';
      case 'tender':
        return 'Tender Payment';
      case 'inventory':
        return 'Inventory';
      case 'orders':
        return 'Orders Ledger';
      case 'pin-lock':
        return 'Terminal Auth';
      case 'workspace-login':
        return 'Workspace Login';
      case 'create-store':
        return 'New SaaS Store';
      default:
        return 'FreshPOS';
    }
  };

  const isSubScreen = currentScreen === 'tender';

  return (
    <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#bccac0]/20 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-xl mx-auto px-3 py-2 flex flex-col gap-1.5">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            {isSubScreen ? (
              <button
                type="button"
                onClick={() => onNavigate('pos')}
                className="w-9 h-9 flex items-center justify-center text-[#0b1c30] hover:bg-[#eff4ff] active:bg-[#e5eeff] rounded-full transition-colors shrink-0"
                aria-label="Go Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            ) : null}

            {/* Logo */}
            <div
              onClick={() => onNavigate('dashboard')}
              className="flex items-center gap-2 cursor-pointer select-none min-w-0"
            >
              <div className="w-8 h-8 rounded-lg bg-[#006948] flex items-center justify-center text-white shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px] text-white">
                  shopping_cart
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm text-[#0b1c30] truncate leading-tight tracking-tight">
                  FreshMart Superstore
                </span>
                <span className="font-mono text-[10px] text-[#565e74] uppercase tracking-wider truncate">
                  Main Branch #104
                </span>
              </div>
            </div>
          </div>

          {/* Quick controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Switch to Web HQ Portal */}
            <button
              type="button"
              onClick={() => onNavigate('web_auth')}
              title="Switch to Web HQ Portal (Enterprise Auth & Back-Office)"
              className="h-8 px-2.5 rounded-lg bg-[#006948] hover:bg-[#005137] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
            >
              <Monitor className="w-3.5 h-3.5 text-[#85f8c4]" />
              <span className="font-mono text-[11px] uppercase tracking-wide">Web HQ</span>
            </button>

            {/* Toggle mobile shell vs fluid */}
            <button
              type="button"
              onClick={onToggleDeviceFrame}
              title={isDeviceFrame ? 'Switch to Full-Width Layout' : 'Switch to Mobile POS Shell'}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#565e74] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors"
            >
              {isDeviceFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
            </button>

            {/* Quick terminal lock */}
            <button
              type="button"
              onClick={() => onNavigate('pin-lock')}
              title="Lock Terminal (PIN Screen)"
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#565e74] hover:text-[#006948] hover:bg-[#eff4ff] transition-colors"
            >
              <Lock className="w-4 h-4" />
            </button>

            {/* Notifications */}
            <button
              type="button"
              onClick={onNotificationClick}
              className="w-8 h-8 rounded-full flex items-center justify-center text-[#565e74] hover:text-[#0b1c30] hover:bg-[#eff4ff] transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#f8f9ff]" />
              )}
            </button>

            {/* Profile Avatar */}
            <button
              type="button"
              onClick={() => onNavigate('workspace-login')}
              title="Staff Profile / Workspace Switch"
              className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-[#bccac0] hover:ring-[#006948] transition-all"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3166gZgNWblUZX7qBU0mMoqHUboPyvt5pUu5GqL2mH7RhedMmfsbMehjnhS9j63wa1V4Ig5_jNZtNwIt50FA73b1xIL6DzZgG100_LJIjUQVV2xago-RRFqE8JmzDHPQ5huaHKpkUCWt3JYnAylMElxlRb800TBekext5YxlPc2kmceMq1TCnBmy5OF5XEzamGVoOWyCUajNMYqRdBT1C52jpGqA-QELCKgwbVbhsn6Yq-nJXK7kV_Q"
                alt="Sarah J - Store Staff"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        {/* Second row: Role indicator & Screen title */}
        <div className="flex items-center justify-between relative">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="inline-flex items-center gap-1.5 bg-[#eff4ff] hover:bg-[#e5eeff] px-2.5 py-1 rounded-full text-xs transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse" />
              <span className="font-mono uppercase font-bold text-[#006948] text-[11px] tracking-wider">
                {getRoleLabel()}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#006948]" />
            </button>

            {/* Role dropdown popup */}
            {isRoleDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-xl border border-[#bccac0]/30 py-1 z-50 text-xs">
                <div className="px-3 py-1 font-mono text-[10px] text-[#6d7a72] uppercase">
                  Switch Active View
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onRoleChange('owner');
                    onNavigate('dashboard');
                    setIsRoleDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#eff4ff] flex items-center justify-between text-[#0b1c30]"
                >
                  <span>Shop Owner (Dashboard)</span>
                  {userRole === 'owner' && <span className="text-[#006948] font-bold">✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onRoleChange('cashier');
                    onNavigate('pos');
                    setIsRoleDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#eff4ff] flex items-center justify-between text-[#0b1c30]"
                >
                  <span>Cashier (POS Billing)</span>
                  {userRole === 'cashier' && <span className="text-[#006948] font-bold">✓</span>}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onRoleChange('inventory');
                    onNavigate('inventory');
                    setIsRoleDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-[#eff4ff] flex items-center justify-between text-[#0b1c30]"
                >
                  <span>Floor Staff (Inventory)</span>
                  {userRole === 'inventory' && <span className="text-[#006948] font-bold">✓</span>}
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-[#85f8c4]/40 text-[#006948] px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006948]" />
              API v4.8
            </span>
            <span className="text-sm font-semibold text-[#0b1c30] tracking-tight">
              {getScreenTitle()}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
