import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, Lock, Check, Key, Hourglass, ArrowLeft, Save, RefreshCw } from 'lucide-react';

interface PasswordRecoveryScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: any) => void;
}

export const PasswordRecoveryScreen: React.FC<PasswordRecoveryScreenProps> = ({ onShowToast, onNavigate }) => {
  const [otp, setOtp] = useState(['4', '8', '2', '', '', '']);
  const [password, setPassword] = useState('FreshCart#2025');
  const [confirmPassword, setConfirmPassword] = useState('FreshCart#2025');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [signoutAll, setSignoutAll] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleResendOtp = () => {
    onShowToast('New 6-digit authentication OTP pushed to manager terminal');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      setIsSuccess(true);
      onShowToast('Password updated! Signed out of all secondary POS nodes.');
      setTimeout(() => {
        onNavigate('pin_auth');
      }, 1200);
    }, 1100);
  };

  return (
    <div className="flex flex-col w-full max-w-xl mx-auto px-3 py-2 pb-28 gap-3">
      {/* Security Strip */}
      <div className="bg-[#eff4ff] px-3 py-1.5 rounded-lg flex items-center justify-between text-[11px] border border-[#bccac0]/20">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse shrink-0" />
          <span className="font-mono text-[#006948] uppercase font-bold truncate">
            FreshPOS Vault • Register Node #04
          </span>
        </div>
        <span className="font-mono text-[#565e74] shrink-0">SEC-ID: 9814-F</span>
      </div>

      {/* Top Hero Section */}
      <section className="bg-white rounded-xl p-4 shadow-sm border border-[#bccac0]/20 flex flex-col items-center text-center">
        <div className="relative mb-2">
          <div className="w-12 h-12 rounded-full bg-[#00855d] text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        <span className="font-mono text-[9px] text-[#006948] uppercase font-bold tracking-wider">
          Authentication Recovery
        </span>
        <h1 className="font-black text-base text-[#0b1c30] mt-0.5">Reset Your FreshPOS Password</h1>
        <p className="text-[11px] text-[#565e74] mt-1">
          Verification code sent to <span className="font-mono font-bold text-[#0b1c30]">m*****a@freshmart.pos</span>
        </p>

        <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#eff4ff]">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm8GY9rVpeuVJCgaLnAAnA7k-NSDgwYdsTCGNl1Eu8K4drbOD8-FMWzTqbXVAZkekEhAyH5mJO3_di1zdV6x2YwAb8EBM6QSnpvWNLukNQPXDMwKTI3gqXpcj_SnenJlNfVY2A9gswqxx4kYI4jEiX7T0OMYcfeuxZkpt5RG2FKGG4VzIC31gOcvPZPllLvoXL66rl6aixyzRHUnsVWhvG29KRPwOwLucmZ-BACXF_xxilFZ-qDgrk5g"
            alt="Marina Alves"
            className="w-5 h-5 rounded-full object-cover"
          />
          <span className="text-[11px] font-semibold text-[#0b1c30]">Store Supervisor: Marina Alves</span>
        </div>
      </section>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Step 1: 6-Digit POS PIN */}
        <section className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#eff4ff]">
            <div className="flex items-center gap-1.5">
              <Key className="w-4 h-4 text-[#006948]" />
              <h2 className="font-bold text-xs text-[#0b1c30]">Step 1: 6-Digit POS PIN</h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#006948] font-mono text-[9px] font-bold uppercase">
              Encrypted
            </span>
          </div>

          <p className="text-[11px] text-[#565e74]">
            Input the temporary authentication code pushed to your manager handheld terminal.
          </p>

          {/* OTP Grid */}
          <div className="grid grid-cols-6 gap-2 my-1">
            {otp.map((digit, idx) => (
              <div
                key={idx}
                className={`h-11 flex items-center justify-center rounded-lg font-mono text-base font-bold shadow-2xs ${
                  digit
                    ? 'bg-[#eff4ff] text-[#0b1c30]'
                    : idx === 3
                    ? 'bg-white border-2 border-[#006948]'
                    : 'bg-[#eff4ff]/60 text-[#565e74]/40'
                }`}
              >
                {digit || (idx === 3 ? <span className="w-0.5 h-5 bg-[#006948] animate-pulse" /> : '-')}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-0.5 text-xs text-[#565e74]">
            <div className="flex items-center gap-1">
              <Hourglass className="w-3.5 h-3.5 text-[#8d4b00]" />
              <span>Code expires in <strong className="font-mono text-[#8d4b00]">04:32</strong></span>
            </div>
            <button
              type="button"
              onClick={handleResendOtp}
              className="font-mono text-[10px] text-[#006948] font-bold uppercase hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </section>

        {/* Step 2: New Password Creation */}
        <section className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/20 flex flex-col gap-2.5">
          <div className="flex items-center justify-between pb-1 border-b border-[#eff4ff]">
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-[#006948]" />
              <h2 className="font-bold text-xs text-[#0b1c30]">Step 2: Create New Password</h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#85f8c4]/40 text-[#005137] font-mono text-[9px] font-bold uppercase">
              Strong Policy
            </span>
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#565e74]">New Terminal Password</span>
              <span className="font-mono text-[10px] text-[#006948] font-bold uppercase">Strength: Excellent</span>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-[#565e74] absolute left-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 bg-[#eff4ff] pl-9 pr-9 font-mono text-xs text-[#0b1c30] rounded-lg outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-[#565e74] hover:text-[#0b1c30]"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Policy Checklist */}
          <div className="rounded-lg bg-[#eff4ff] p-2.5 flex flex-col gap-1 text-[11px]">
            <span className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Enterprise Requirements</span>
            <div className="flex items-center gap-1.5 text-[#0b1c30]">
              <div className="w-3.5 h-3.5 rounded-full bg-[#006948] text-white flex items-center justify-center text-[9px]">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>At least 8 characters</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0b1c30]">
              <div className="w-3.5 h-3.5 rounded-full bg-[#006948] text-white flex items-center justify-center text-[9px]">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>At least 1 number and 1 special symbol</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#0b1c30]">
              <div className="w-3.5 h-3.5 rounded-full bg-[#006948] text-white flex items-center justify-center text-[9px]">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
              <span>Cannot match previous 3 passwords</span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <span className="text-[11px] text-[#565e74]">Confirm New Password</span>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-[#565e74] absolute left-3" />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 bg-[#eff4ff] pl-9 pr-9 font-mono text-xs text-[#0b1c30] rounded-lg outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 text-[#565e74] hover:text-[#0b1c30]"
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </section>

        {/* Section 3: Sign-out all registers */}
        <section className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/20">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <button
              type="button"
              onClick={() => setSignoutAll(!signoutAll)}
              className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center transition-colors ${
                signoutAll ? 'bg-[#006948] text-white' : 'bg-[#d3e4fe] text-transparent'
              }`}
            >
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-xs text-[#0b1c30]">
                Sign out of all other active registers and mobile POS terminals
              </span>
              <span className="text-[10px] text-[#565e74] mt-0.5">
                Recommended for loss prevention compliance. Closes 3 open active cashier sessions.
              </span>
            </div>
          </label>
        </section>

        {/* Station Target Card */}
        <div className="rounded-xl bg-[#eff4ff] p-2.5 flex items-center gap-2.5 border border-[#bccac0]/20">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_9WBEVng4wttJG3WoKTj39Du2LFBccy4HpaA4UVnZdPexUBDeJp1LkvZEP2iIIIX0ByYZUmHylh9V0xmV5zpcSBqC4m07EQPYSVCsceXS-MwF-_DJH4FGbSptkTVuQhAuepjb0GIe3qL8-FS1Sb9qdeJ9DNvFCeoz2D37z6tkMrWGpYg7T9dEGyl3NclqGu-3pnZTpUHWOrOxJ-ev-rN3QWhbjjiD_Ww0BTOOLckzu7gAPTIP8plC3A"
            alt="Lane #04"
            className="w-12 h-12 rounded-lg object-cover shrink-0"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[9px] text-[#006948] uppercase font-bold">Target Station</span>
            <span className="font-bold text-xs text-[#0b1c30] truncate">Lane #04 - Produce & Deli</span>
            <span className="text-[10px] text-[#565e74]">Session sync queued upon login</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="submit"
            disabled={isUpdating || isSuccess}
            className={`w-full h-12 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all ${
              isSuccess ? 'bg-[#00855d]' : 'bg-[#006948] hover:bg-[#00855d]'
            }`}
          >
            {isUpdating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Re-authorizing Cashier...</span>
              </>
            ) : isSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Password Synchronized!</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Update Password & Return to Login</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onNavigate('workspace_login')}
            className="w-full h-10 rounded-xl bg-[#eff4ff] hover:bg-[#e5eeff] text-[#0b1c30] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </button>
        </div>
      </form>
    </div>
  );
};
