import React, { useState } from 'react';
import { Store, BadgeCheck, Fingerprint, Lock, Eye, EyeOff, ArrowRight, KeyRound, Shield, Check, X, Plus } from 'lucide-react';
import { WORKSPACES } from '../../data/mockData';

interface WorkspaceLoginScreenProps {
  onSignInSuccess: () => void;
  onNavigateToPin: () => void;
  onShowToast: (msg: string) => void;
}

export const WorkspaceLoginScreen: React.FC<WorkspaceLoginScreenProps> = ({
  onSignInSuccess,
  onNavigateToPin,
  onShowToast,
}) => {
  const [storeSlug, setStoreSlug] = useState('downtown-freshmart');
  const [activeWorkspaceId, setActiveWorkspaceId] = useState('freshmart-104');
  const [emailOrStaffId, setEmailOrStaffId] = useState('manager.elena@freshmart.pos');
  const [password, setPassword] = useState('merchantAdmin2024');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberPos, setRememberPos] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isBiometricScanning, setIsBiometricScanning] = useState(false);

  const handleBiometricUnlock = () => {
    setIsBiometricScanning(true);
    setTimeout(() => {
      setIsBiometricScanning(false);
      onShowToast('Biometric FaceID authenticated! Access granted.');
      onSignInSuccess();
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onShowToast(`Signed in to ${storeSlug}.freshpos.cloud console!`);
      onSignInSuccess();
    }, 800);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Header Branding & Welcome */}
      <div className="flex flex-col items-center text-center gap-1.5 pt-2">
        <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-[#006948] shadow-md p-2">
          <span className="material-symbols-outlined text-[36px] text-white">
            shopping_cart
          </span>
          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#85f8c4] rounded-full ring-2 ring-white flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-[#006948] rounded-full animate-pulse" />
          </span>
        </div>

        <div className="space-y-0.5 mt-1">
          <h1 className="font-bold text-lg text-[#0b1c30]">Sign In to Workspace</h1>
          <p className="text-xs text-[#565e74] max-w-xs mx-auto">
            Access your cloud store, registers and live analytics
          </p>
        </div>
      </div>

      {/* Step 1: Tenant Workspace Card */}
      <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-[#85f8c4] text-[#002114] flex items-center justify-center font-mono text-[11px] font-bold">
              1
            </span>
            <span className="font-semibold text-xs text-[#0b1c30]">Store Workspace</span>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#00855d] text-white font-mono text-[9px] font-bold uppercase">
            <BadgeCheck className="w-3 h-3" />
            Active Store ID
          </span>
        </div>

        {/* Domain Slug Selector */}
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
            STORE SLUG URL
          </label>
          <div className="flex items-center rounded-lg bg-[#eff4ff] px-3 py-2 border border-[#bccac0]/20">
            <Store className="w-4 h-4 text-[#6d7a72] mr-2 shrink-0" />
            <input
              type="text"
              value={storeSlug}
              onChange={(e) => setStoreSlug(e.target.value)}
              placeholder="tenant-domain"
              className="bg-transparent font-mono text-xs text-[#0b1c30] focus:outline-none w-full min-w-0 font-bold"
            />
            <span className="font-mono text-xs text-[#6d7a72] whitespace-nowrap pl-1">
              .freshpos.cloud
            </span>
          </div>
        </div>

        {/* Quick Switch Workspace Carousel */}
        <div className="flex flex-col gap-1.5 pt-0.5">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
              RECENT WORKSPACES
            </span>
            <span className="text-[11px] text-[#006948] font-semibold cursor-pointer">
              Switch Branch
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-1 px-1">
            {WORKSPACES.map((ws) => {
              const isCurrent = activeWorkspaceId === ws.id;
              return (
                <button
                  key={ws.id}
                  type="button"
                  onClick={() => {
                    setActiveWorkspaceId(ws.id);
                    setStoreSlug(ws.slug);
                    onShowToast(`Selected workspace: ${ws.name}`);
                  }}
                  className={`shrink-0 w-56 text-left p-2.5 rounded-xl border transition-all flex flex-col justify-between gap-2 ${
                    isCurrent
                      ? 'bg-[#e5eeff] border-[#006948] text-[#0b1c30]'
                      : 'bg-[#eff4ff] border-transparent text-[#0b1c30] hover:bg-[#e5eeff]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 pr-1">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-xs truncate">{ws.name}</span>
                        {isCurrent && <BadgeCheck className="w-3.5 h-3.5 text-[#006948] shrink-0" />}
                      </div>
                      <p className="text-[10px] text-[#565e74] truncate">{ws.subname}</p>
                    </div>
                    {isCurrent && (
                      <span className="px-1.5 py-0.5 rounded bg-[#006948] text-white font-mono text-[8px] font-bold uppercase">
                        CURRENT
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-black/5 font-mono text-[9px] text-[#565e74]">
                    <span>{ws.plan}</span>
                    <span className="text-[#006948] font-bold">{ws.registersActive} Registers</span>
                  </div>
                </button>
              );
            })}

            {/* Add Workspace Action */}
            <button
              type="button"
              onClick={() => onShowToast('Add new branch workspace dialog ready')}
              className="shrink-0 w-36 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] flex flex-col items-center justify-center p-2.5 text-center text-[#565e74] transition-colors border border-dashed border-[#bccac0]"
            >
              <Plus className="w-4 h-4 text-[#006948]" />
              <span className="text-[11px] font-medium mt-1">Add Workspace</span>
            </button>
          </div>
        </div>
      </div>

      {/* Step 2: Staff Credentials Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-[#85f8c4] text-[#002114] flex items-center justify-center font-mono text-[11px] font-bold">
            2
          </span>
          <span className="font-semibold text-xs text-[#0b1c30]">Staff Credentials</span>
        </div>

        {/* Email or Staff ID Field */}
        <div className="flex flex-col gap-1">
          <label className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
            STORE EMAIL OR STAFF ID
          </label>
          <div className="flex items-center rounded-lg bg-[#eff4ff] px-3 h-11 border border-[#bccac0]/20">
            <span className="material-symbols-outlined text-[#6d7a72] mr-2 text-[18px]">badge</span>
            <input
              type="text"
              value={emailOrStaffId}
              onChange={(e) => setEmailOrStaffId(e.target.value)}
              placeholder="staff.id@store.com or #EMP489"
              className="bg-transparent text-xs text-[#0b1c30] focus:outline-none w-full min-w-0"
              required
            />
            {emailOrStaffId && (
              <button
                type="button"
                onClick={() => setEmailOrStaffId('')}
                className="text-[#6d7a72] hover:text-[#0b1c30]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Password / Passkey Field */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <label className="font-mono text-[9px] text-[#565e74] uppercase font-bold">
              PASSWORD / SSO PASSKEY
            </label>
            <button
              type="button"
              onClick={() => onShowToast('Password reset link sent to store admin')}
              className="text-[11px] text-[#006948] hover:underline"
            >
              Forgot?
            </button>
          </div>
          <div className="flex items-center rounded-lg bg-[#eff4ff] px-3 h-11 border border-[#bccac0]/20">
            <Lock className="w-4 h-4 text-[#6d7a72] mr-2 shrink-0" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter access code or passkey"
              className="bg-transparent text-xs text-[#0b1c30] focus:outline-none w-full min-w-0"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#6d7a72] hover:text-[#0b1c30]"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Biometric Quick Login Banner */}
        <div className="p-2.5 rounded-xl bg-[#dae2fd] text-[#131b2e] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#006948] shadow-sm shrink-0">
              <Fingerprint className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs leading-tight">Biometric Instant POS Unlock</p>
              <p className="text-[10px] text-[#5c647a]">FaceID or Register Fingerprint scanner</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleBiometricUnlock}
            disabled={isBiometricScanning}
            className="px-3 py-1.5 rounded-lg bg-[#006948] hover:bg-[#00855d] text-white text-xs font-semibold whitespace-nowrap active:scale-95 transition-transform shrink-0"
          >
            {isBiometricScanning ? 'Scanning...' : 'Tap to Scan'}
          </button>
        </div>

        {/* Remember Terminal & MFA Toggle Row */}
        <div className="flex items-center justify-between pt-0.5">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberPos}
              onChange={(e) => setRememberPos(e.target.checked)}
              className="w-4 h-4 text-[#006948] rounded bg-[#eff4ff]"
            />
            <span className="text-xs text-[#0b1c30]">Remember this POS register</span>
          </label>
          <div className="flex items-center gap-1 font-mono text-[10px] text-[#565e74]">
            <Shield className="w-3 h-3 text-[#006948]" />
            <span>MFA Active</span>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="submit"
          disabled={isAuthenticating}
          className="w-full h-11 rounded-xl bg-[#006948] hover:bg-[#00855d] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-[0.99] transition-transform mt-1 cursor-pointer"
        >
          {isAuthenticating ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In to Merchant Console</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Secondary Quick Staff PIN Button */}
        <button
          type="button"
          onClick={onNavigateToPin}
          className="w-full h-10 rounded-xl bg-[#e5eeff] hover:bg-[#dce9ff] text-[#0b1c30] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
        >
          <KeyRound className="w-4 h-4 text-[#6d7a72]" />
          <span>Sign in with 4-Digit Staff PIN instead</span>
        </button>
      </form>

      {/* Subscription & Account Status Alert Badge */}
      <div className="rounded-xl bg-[#eff4ff] p-3 text-[#0b1c30] shadow-sm border border-[#bccac0]/20 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#006948] animate-ping" />
            <span className="font-mono text-[10px] text-[#006948] font-bold uppercase">
              TENANT HEALTH: OPTIMAL
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#565e74]">Cloud Node: us-east-pos4</span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center pt-0.5">
          <div className="rounded-lg bg-white p-2 border border-[#bccac0]/15">
            <span className="font-mono text-[9px] text-[#565e74] block uppercase font-bold">
              STATUS
            </span>
            <span className="font-bold text-xs text-[#006948]">Active</span>
          </div>
          <div className="rounded-lg bg-white p-2 border border-[#bccac0]/15">
            <span className="font-mono text-[9px] text-[#565e74] block uppercase font-bold">
              BILLING DATE
            </span>
            <span className="font-mono text-xs font-bold">Nov 15</span>
          </div>
          <div className="rounded-lg bg-white p-2 border border-[#bccac0]/15">
            <span className="font-mono text-[9px] text-[#565e74] block uppercase font-bold">
              REGISTERS
            </span>
            <span className="font-mono text-xs font-bold">3 Online</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center space-y-1 text-xs text-[#565e74]">
        <div className="flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => onShowToast('Search guide sent to registered email')}
            className="hover:text-[#006948]"
          >
            Need help finding your store URL?
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => onShowToast('Contacting 24/7 POS Retail Support')}
            className="hover:text-[#006948]"
          >
            Contact Support
          </button>
        </div>
        <div>
          <button
            type="button"
            onClick={() => onShowToast('Redirecting to Enterprise SAML 2.0 / Okta portal')}
            className="font-mono text-[10px] text-[#6d7a72] hover:text-[#0b1c30] uppercase"
          >
            Enterprise Single Sign-On (SAML / Okta)
          </button>
        </div>
      </div>
    </div>
  );
};
