import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  Lock,
  Router,
  Clock,
  Fingerprint,
  AlertTriangle,
  Database,
  CheckCircle,
  Zap,
  RefreshCw,
  Key,
  Receipt,
  FileCheck,
  Sliders,
  Usb,
  Split,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Monitor,
  Building2,
  Terminal,
  Activity,
  Award,
  Shield,
  CreditCard
} from 'lucide-react';
import { ScreenType } from '../../types';

interface WebMasterRootConsoleScreenProps {
  onShowToast: (message: string, type?: 'success' | 'warning' | 'info') => void;
  onNavigate: (screen: ScreenType) => void;
}

export const WebMasterRootConsoleScreen: React.FC<WebMasterRootConsoleScreenProps> = ({
  onShowToast,
  onNavigate,
}) => {
  const [authTab, setAuthTab] = useState<'master' | 'fido' | 'split'>('master');
  const [showPass, setShowPass] = useState(false);
  const [operatorUpn, setOperatorUpn] = useState('superadmin@freshpos.hq');
  const [passphrase, setPassphrase] = useState('freshpos-core-omega-9283#alpha-vault');
  const [totpDigits, setTotpDigits] = useState(['4', '8', '2', '9', '1', '0']);
  const [breakGlassOpen, setBreakGlassOpen] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [executedSuccess, setExecutedSuccess] = useState(false);

  // Custodian split token state
  const [custodian1, setCustodian1] = useState('••••••••••••••••');
  const [custodian2, setCustodian2] = useState('');

  // Live countdown timers
  const [totpSeconds, setTotpSeconds] = useState(24);
  const [ttlSeconds, setTtlSeconds] = useState(299); // 04:59

  const totpInputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const totpTimer = setInterval(() => {
      setTotpSeconds((prev) => (prev > 1 ? prev - 1 : 30));
    }, 1000);

    const ttlTimer = setInterval(() => {
      setTtlSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(totpTimer);
      clearInterval(ttlTimer);
    };
  }, []);

  const formatTtl = (totalSeconds: number) => {
    const mins = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newDigits = [...totpDigits];
    newDigits[index] = value;
    setTotpDigits(newDigits);

    if (value && index < 5) {
      totpInputsRef.current[index + 1]?.focus();
      totpInputsRef.current[index + 1]?.select();
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !totpDigits[index] && index > 0) {
      totpInputsRef.current[index - 1]?.focus();
      totpInputsRef.current[index - 1]?.select();
    }
  };

  const handleExecuteRootLogin = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setExecutedSuccess(true);
      onShowToast('Root Session Decrypted. Master Enclave Kernel Loaded!', 'success');
      setTimeout(() => {
        setExecutedSuccess(false);
      }, 3500);
    }, 1400);
  };

  return (
    <div className="bg-[#f4f7fc] text-[#0b1c30] font-sans min-h-screen flex flex-col antialiased selection:bg-[#006948] selection:text-white">
      {/* TOP-LEVEL CRITICAL CLASSIFICATION STRIP */}
      <div className="w-full bg-[#990000] text-white px-4 sm:px-6 py-1.5 flex flex-wrap items-center justify-between text-[11px] font-mono tracking-wider border-b border-red-800 gap-2">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 animate-pulse text-red-200" />
          <span className="font-bold">RESTRICTED SUPERVISION ENCLAVE:</span>
          <span className="opacity-90 hidden md:inline">
            AUTHORIZED PLATFORM DIRECTORS & SECURITY OFFICERS ONLY. FULL SESSION PACKET CAPTURE UNDER SEC RULE 17A-4 & FEDRAMP HIGH.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 font-bold">
          <span className="bg-red-950/70 border border-red-400/40 text-red-200 px-2 py-0.5 rounded tracking-widest text-[10px]">
            TOP-SECRET // LVL-0 ROOT
          </span>
          <span className="text-red-200 font-mono text-[11px]">HSM-SEC-NODE #HQ-01</span>
          {/* Quick links to Web HQ Suite */}
          <button
            type="button"
            onClick={() => onNavigate('web_dashboard')}
            className="bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer border border-white/20 ml-2"
          >
            HQ Dashboard
          </button>
          <button
            type="button"
            onClick={() => onNavigate('web_tenants')}
            className="bg-white/10 hover:bg-white/20 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer border border-white/20"
          >
            Tenants Fleet
          </button>
          <button
            type="button"
            onClick={() => onNavigate('pos')}
            className="bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider transition-colors cursor-pointer border border-white/30"
          >
            ← POS Till
          </button>
        </div>
      </div>

      {/* EXPANSIVE FULL-WIDTH ENTERPRISE HEADER */}
      <header className="w-full bg-white border-b border-slate-200 shadow-xs sticky top-0 z-30">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Brand & Platform Console Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#006948] text-white flex items-center justify-center shadow-md shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-lg text-[#0b1c30] tracking-tight font-extrabold">FreshPOS</span>
                <span className="text-slate-400">/</span>
                <span className="text-sm text-slate-700 font-bold tracking-normal">HQ Platform Operator Console</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-[#85f8c4] text-[#002114] font-bold">
                  Root Gateway
                </span>
              </div>
              <p className="text-xs text-[#565e74] flex items-center gap-1.5 mt-0.5">
                <span>Global Fleet Orchestration</span>
                <span className="inline-block w-1 h-1 rounded-full bg-slate-400"></span>
                <span className="font-mono text-[11px] text-slate-500">Core Engine Build 24.12-rc4</span>
              </p>
            </div>
          </div>

          {/* Navigation link to Auth Portal and live status badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Switch to Web Auth Hub */}
            <button
              type="button"
              onClick={() => onNavigate('web_auth')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Monitor className="w-3.5 h-3.5 text-[#006948]" />
              <span>Auth Portal</span>
            </button>

            {/* Cluster Health */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="font-mono text-[11px] font-semibold text-emerald-900 tracking-wide">
                All 14 Global Regions Operational
              </span>
            </div>

            {/* Route & Encryption Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs">
              <Lock className="w-3.5 h-3.5 text-[#006948]" />
              <span>TLS 1.3 Strict</span>
              <span className="text-slate-300">|</span>
              <span className="text-slate-500 text-[11px]">Direct Bastion Interconnect</span>
            </div>

            {/* Operator Whitelisted IP */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#e5eeff] border border-[#dce9ff]">
              <Router className="w-4 h-4 text-[#006948]" />
              <span className="font-mono text-xs font-semibold text-[#0b1c30]">198.51.100.24</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-[#006948] text-white uppercase tracking-wider font-bold">
                NY-BASTION
              </span>
            </div>

            {/* Session Ephemeral TTL */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
              <Clock className="w-4 h-4 text-amber-700 animate-spin" />
              <span className="text-xs font-mono font-bold">Auth TTL: {formatTtl(ttlSeconds)}</span>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT CONTAINER */}
      <main className="flex-1 w-full max-w-[1680px] mx-auto px-4 sm:px-6 py-8">
        {/* TOP NOTIFICATION BANNER */}
        <div className="w-full mb-6 bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white rounded-2xl p-4 sm:p-5 shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
              <ShieldAlert className="w-5 h-5 text-[#85f8c4]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-sm text-white font-bold tracking-wide uppercase font-mono">
                  Zero-Trust Kernel Root Verification Required
                </h2>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-mono font-bold">
                  MFA Strict Enforced
                </span>
              </div>
              <p className="text-xs text-slate-300 font-sans mt-0.5">
                Elevated administrative functions modify active retail POS pipelines, cryptographic keys, and master financial ledgers worldwide.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-xs flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 font-mono">
              <Fingerprint className="w-4 h-4 text-emerald-400" />
              <span>Hardware Enclave ID: #ENCL-8821-FIPS</span>
            </div>
            <button
              type="button"
              onClick={() => setBreakGlassOpen(!breakGlassOpen)}
              className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-red-300" />
              <span>Break-Glass Quorum</span>
            </button>
          </div>
        </div>

        {/* 2-COLUMN WIDE DESKTOP COMMAND LAYOUT (40% Telemetry, 60% Decryption Console) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ================= LEFT COLUMN: COMMAND & SYSTEM TELEMETRY (col-span-5) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Live Global Infrastructure Shard Status Grid */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <Database className="w-5 h-5 text-[#006948]" />
                  <h3 className="text-sm text-[#0b1c30] font-bold">Global Core Telemetry Mesh</h3>
                </div>
                <span className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Synchronous Sync
                </span>
              </div>

              {/* 4-Grid Component Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Shard Mesh */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-slate-500 uppercase font-semibold">Database Shard Mesh</span>
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-base text-slate-900 font-bold">64 / 64 Active</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">PostgreSQL Aurora Raft</div>
                </div>

                {/* Redis Barcode Latency */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-slate-500 uppercase font-semibold">Global Redis Mesh</span>
                    <span className="font-mono text-[10px] text-emerald-600 font-bold bg-emerald-100/70 px-1 rounded">p99</span>
                  </div>
                  <div className="text-base text-emerald-700 font-bold flex items-baseline gap-1">
                    0.8ms <span className="text-xs text-slate-500 font-normal">avg latency</span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">Price & SKU Cache Hit 99.9%</div>
                </div>

                {/* Kafka Stream */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-slate-500 uppercase font-semibold">Kafka Event Pipeline</span>
                    <RefreshCw className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-base text-slate-900 font-bold">0 msg Lag</div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">182,400 events/sec</div>
                </div>

                {/* HSM Module */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] text-slate-500 uppercase font-semibold">HSM Security Root</span>
                    <Key className="w-4 h-4 text-[#006948]" />
                  </div>
                  <div className="text-base text-slate-900 font-bold">FIPS 140-3</div>
                  <div className="text-[11px] text-emerald-600 font-mono mt-0.5">Hardware Partition Online</div>
                </div>
              </div>

              {/* Network Route Details */}
              <div className="bg-[#eff4ff] rounded-xl p-3 border border-slate-200/60 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Router className="w-4 h-4 text-slate-500" />
                  <span className="text-slate-700">Master Bastion Route:</span>
                  <span className="font-mono text-slate-900 font-semibold">aws-us-east-1a-transit-gateway</span>
                </div>
                <span className="font-mono text-[10px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                  BGP DUAL PATH
                </span>
              </div>
            </div>

            {/* Live Security Audit Log & Real-Time Event Stream */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-slate-700" />
                  <h3 className="text-sm text-[#0b1c30] font-bold">Security Audit Stream</h3>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>LIVE TAIL</span>
                </div>
              </div>

              {/* Stream List */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-slate-800 font-semibold">TOKEN_CHALLENGE_ISSUED</div>
                      <div className="text-[11px] text-slate-500 font-mono">Principal: superadmin@freshpos.hq [Enclave 01]</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">12:04:18.421</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#006948] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-slate-800 font-semibold">GEO_FENCE_VALIDATED</div>
                      <div className="text-[11px] text-slate-500 font-mono">Matched NY-FINANCIAL-DISTRICT BASTION subnet</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">12:04:15.110</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <RefreshCw className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-slate-800 font-semibold">MUTUAL_TLS_HANDSHAKE</div>
                      <div className="text-[11px] text-slate-500 font-mono">Cert Serial: 489A-FE12-009B-1798 (DigiCert Root)</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">12:04:14.982</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-slate-800 font-semibold">HEARTBEAT_REBALANCE</div>
                      <div className="text-[11px] text-slate-500 font-mono">Fleet sync: 1,842 store controllers responding</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">12:04:02.004</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1">
                  <FileCheck className="w-3.5 h-3.5 text-slate-400" />
                  Immutable WORM Storage
                </span>
                <span className="font-mono">Log Retention: 7 Years (FINRA / SEC)</span>
              </div>
            </div>

            {/* Break Glass Dual-Custody Info Panel */}
            {breakGlassOpen && (
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-5 text-red-950 shadow-md">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-red-900">Break-Glass Disaster Recovery Multi-Sig Protocol</h4>
                    <p className="text-xs text-red-800 mt-1 leading-relaxed">
                      Emergency bypass requires physical quorum from two independent C-Suite / VP Infosec YubiKey keys and immediately trips an SEC Notification bridge & activates War Room voice channels.
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          onShowToast('Break-Glass Quorum handshake initialized across SecOps.', 'warning');
                        }}
                        className="px-3.5 py-1.5 bg-red-700 hover:bg-red-800 text-white rounded-lg text-xs font-mono uppercase font-bold tracking-wider shadow cursor-pointer"
                      >
                        Initialize Quorum Handshake
                      </button>
                      <button
                        type="button"
                        onClick={() => setBreakGlassOpen(false)}
                        className="text-xs text-red-700 hover:underline cursor-pointer"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ================= RIGHT COLUMN: ROOT OPERATOR DECRYPTION CONSOLE (col-span-7) ================= */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 sm:p-8 relative overflow-hidden">
              {/* Subtle decorative ambient highlight */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

              {/* Console Header & Mode Selector */}
              <div className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-slate-200">
                  <div>
                    <span className="font-mono text-xs text-[#006948] font-bold tracking-widest uppercase">
                      Master Cryptographic Decryption
                    </span>
                    <h2 className="text-2xl text-[#0b1c30] font-extrabold mt-1">Super Admin Root Access</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Present cryptographically verified root credentials to decrypt session tokens.
                    </p>
                  </div>
                  {/* Enclave Indicator */}
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#eff4ff] border border-slate-200 shrink-0 self-start sm:self-auto">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <span className="font-mono text-[11px] font-semibold text-slate-700">Enclave: AWS-HSM-PRIMARY</span>
                  </div>
                </div>

                {/* AUTH METHOD TABS */}
                <div className="mt-6 flex bg-slate-100 p-1.5 rounded-xl gap-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setAuthTab('master')}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      authTab === 'master'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Key className="w-4 h-4 text-[#006948]" />
                    <span>Master Key & TOTP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthTab('fido')}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      authTab === 'fido'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Usb className="w-4 h-4" />
                    <span>FIDO2 / Hardware YubiKey</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAuthTab('split')}
                    className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      authTab === 'split'
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Split className="w-4 h-4" />
                    <span>Dual-Custody Split Token</span>
                  </button>
                </div>

                {/* VIEW 1: MASTER KEY & TOTP (DEFAULT) */}
                {authTab === 'master' && (
                  <div className="mt-6 space-y-6">
                    {/* Field 1: Master Operator UPN / Identity */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-mono text-xs text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5" htmlFor="operator-upn">
                          <User className="w-4 h-4 text-[#006948]" />
                          Master Operator UPN / Identity
                        </label>
                        <span className="font-mono text-xs text-slate-500">
                          Authorized Badge: <strong className="text-slate-800">#HQ-SEC-001</strong>
                        </span>
                      </div>
                      <div className="relative flex items-center">
                        <User className="w-5 h-5 absolute left-3.5 text-slate-400" />
                        <input
                          id="operator-upn"
                          type="text"
                          value={operatorUpn}
                          onChange={(e) => setOperatorUpn(e.target.value)}
                          className="w-full h-12 pl-11 pr-10 bg-slate-50 border border-slate-300 focus:border-[#006948] focus:bg-white focus:ring-2 focus:ring-[#006948]/20 rounded-xl font-mono text-sm text-slate-900 transition-all font-medium outline-none"
                        />
                        <CheckCircle className="w-5 h-5 absolute right-3.5 text-emerald-600" />
                      </div>
                    </div>

                    {/* Field 2: Cryptographic Root Passphrase */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-mono text-xs text-slate-700 font-bold uppercase tracking-wider flex items-center gap-1.5" htmlFor="master-passphrase">
                          <Key className="w-4 h-4 text-[#006948]" />
                          Cryptographic Root Passphrase
                        </label>
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="text-xs text-[#006948] hover:text-[#00855d] font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          {showPass ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-slate-600" />}
                          <span>{showPass ? 'Hide Key' : 'Reveal Key'}</span>
                        </button>
                      </div>
                      <div className="relative flex items-center">
                        <Lock className="w-5 h-5 absolute left-3.5 text-slate-400" />
                        <input
                          id="master-passphrase"
                          type={showPass ? 'text' : 'password'}
                          value={passphrase}
                          onChange={(e) => setPassphrase(e.target.value)}
                          className="w-full h-12 pl-11 pr-12 bg-slate-50 border border-slate-300 focus:border-[#006948] focus:bg-white focus:ring-2 focus:ring-[#006948]/20 rounded-xl font-mono text-sm text-slate-900 transition-all tracking-wider font-medium outline-none"
                        />
                        <ShieldCheck className="w-4 h-4 absolute right-3.5 text-emerald-600" />
                      </div>
                      {/* 256-bit Entropy Meter */}
                      <div className="mt-2.5 flex items-center gap-2">
                        <div className="h-1.5 flex-1 rounded bg-emerald-600"></div>
                        <div className="h-1.5 flex-1 rounded bg-emerald-600"></div>
                        <div className="h-1.5 flex-1 rounded bg-emerald-600"></div>
                        <div className="h-1.5 flex-1 rounded bg-emerald-600"></div>
                        <span className="font-mono text-[10px] text-emerald-700 font-bold tracking-wider ml-1">
                          256-BIT ENTROPY OK (HIGH COMPLEXITY)
                        </span>
                      </div>
                    </div>

                    {/* Field 3: 6-Digit Rolling TOTP Section */}
                    <div className="bg-[#eff4ff] border border-slate-200/80 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#006948]" />
                          <h4 className="text-sm font-bold text-slate-900">Time-based One-Time Token (TOTP Authenticator)</h4>
                        </div>
                        {/* Rolling Countdown Timer Circle */}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-slate-200 font-mono text-xs text-amber-800 font-bold shadow-xs">
                          <Clock className="w-3.5 h-3.5 text-amber-500" />
                          <span>{totpSeconds}s remaining</span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        Enter the live 6-digit cryptographic TOTP sequence provided by your enrolled FreshPOS Hardware Token or Enterprise Authenticator App.
                      </p>

                      {/* 6-digit Inputs Desktop Layout */}
                      <div className="flex items-center justify-center gap-2 sm:gap-4 my-2">
                        {totpDigits.slice(0, 3).map((digit, idx) => (
                          <input
                            key={idx}
                            ref={(el) => { totpInputsRef.current[idx] = el; }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleDigitChange(idx, e.target.value)}
                            onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                            className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-white border-2 border-slate-300 rounded-xl text-slate-900 focus:border-[#006948] focus:ring-2 focus:ring-[#006948]/20 shadow-xs outline-none transition-all font-mono"
                          />
                        ))}
                        <span className="text-slate-400 text-2xl font-light select-none px-1">—</span>
                        {totpDigits.slice(3, 6).map((digit, idx) => {
                          const actualIdx = idx + 3;
                          return (
                            <input
                              key={actualIdx}
                              ref={(el) => { totpInputsRef.current[actualIdx] = el; }}
                              type="text"
                              maxLength={1}
                              value={digit}
                              onChange={(e) => handleDigitChange(actualIdx, e.target.value)}
                              onKeyDown={(e) => handleDigitKeyDown(actualIdx, e)}
                              className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold bg-white border-2 border-slate-300 rounded-xl text-slate-900 focus:border-[#006948] focus:ring-2 focus:ring-[#006948]/20 shadow-xs outline-none transition-all font-mono"
                            />
                          );
                        })}
                      </div>

                      {/* Hardware Fingerprint Auto-Verification */}
                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-800 font-mono">
                          <Fingerprint className="w-4 h-4 text-emerald-600" />
                          <span>Client Fingerprint: <strong className="text-slate-900">FP-MAC-M3-SECENCLAVE-91A</strong></span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold uppercase">
                          Auto-Verified Hardware
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* VIEW 2: HARDWARE FIDO2 / YUBIKEY VIEW */}
                {authTab === 'fido' && (
                  <div className="mt-8 py-10 px-6 text-center space-y-5 bg-[#eff4ff] rounded-2xl border border-slate-200">
                    <div className="relative w-24 h-24 mx-auto rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#006948] shadow-inner">
                      <Usb className="w-12 h-12" />
                      <div className="absolute inset-0 rounded-full border-2 border-[#006948] animate-ping opacity-25"></div>
                    </div>
                    <div className="max-w-md mx-auto">
                      <h3 className="text-lg text-slate-900 font-bold">Touch Physical YubiKey 5 / FIDO2 Security Token</h3>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Insert your company-provisioned YubiKey NFC/Nano into any available port and touch the metallic contact point to approve CTAP2 authentication.
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 font-mono text-xs text-[#006948] font-bold shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
                      WebAuthn Beacon Active • Awaiting Key Gesture
                    </div>
                  </div>
                )}

                {/* VIEW 3: DUAL-CUSTODY SPLIT TOKEN VIEW */}
                {authTab === 'split' && (
                  <div className="mt-6 space-y-4 bg-[#eff4ff] rounded-2xl p-5 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <Split className="w-6 h-6 text-amber-600" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">Dual-Custody Split Token Authorization</h4>
                        <p className="text-xs text-slate-600">
                          Requires simultaneous validation from Primary Operator and Secondary Operations Director.
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      <div>
                        <label className="font-mono text-[11px] font-bold text-slate-700 block mb-1">
                          CUSTODIAN 1 SHARD (ROOT)
                        </label>
                        <input
                          type="password"
                          value={custodian1}
                          onChange={(e) => setCustodian1(e.target.value)}
                          className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs font-mono outline-none"
                        />
                      </div>
                      <div>
                        <label className="font-mono text-[11px] font-bold text-slate-700 block mb-1">
                          CUSTODIAN 2 SHARD (CO-SIGNER)
                        </label>
                        <input
                          type="password"
                          value={custodian2}
                          onChange={(e) => setCustodian2(e.target.value)}
                          placeholder="Enter secondary custodian token"
                          className="w-full h-10 px-3 bg-white border border-slate-300 rounded-lg text-xs font-mono outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* HIGH-VISIBILITY PRIMARY ACTION BUTTON */}
                <div className="mt-8 space-y-4">
                  <button
                    type="button"
                    disabled={isExecuting}
                    onClick={handleExecuteRootLogin}
                    className={`w-full h-14 text-white rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg transition-all cursor-pointer ${
                      executedSuccess
                        ? 'bg-emerald-700 shadow-emerald-700/20'
                        : isExecuting
                        ? 'bg-[#00573c] opacity-80'
                        : 'bg-[#006948] hover:bg-[#00573c] active:scale-[0.99] shadow-[#006948]/20'
                    }`}
                  >
                    {isExecuting ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Verifying Quorum & Decrypting HSM Shards...</span>
                      </>
                    ) : executedSuccess ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-[#85f8c4]" />
                        <span>Root Session Decrypted. Loading Global Fleet...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-6 h-6" />
                        <span>
                          {authTab === 'master'
                            ? 'Authorize Root Session & Decrypt Console'
                            : authTab === 'fido'
                            ? 'Poll Hardware Key & Authorize'
                            : 'Combine Shards & Execute Root Handshake'}
                        </span>
                      </>
                    )}
                  </button>

                  {/* Secondary Actions & Recovery Protocols */}
                  <div className="flex flex-wrap items-center justify-between pt-2 px-1 text-xs gap-3 text-slate-600">
                    <button
                      type="button"
                      onClick={() => onShowToast('Dual-Operator Authorization Request sent to Ops Slack & PagerDuty.', 'info')}
                      className="hover:text-[#006948] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>Request Dual-Operator Authorization</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onShowToast('Lost token workflow initiated. Notifying Corporate Security.', 'warning')}
                      className="hover:text-[#006948] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Lock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Hardware Token Lost / Revocation</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setBreakGlassOpen(!breakGlassOpen)}
                      className="text-red-700 hover:text-red-800 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                      <span>Emergency Break-Glass Key</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* FULL-WIDTH DESKTOP FOOTER */}
      <footer className="w-full bg-white border-t border-slate-200 mt-auto py-6">
        <div className="w-full max-w-[1680px] mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          {/* Standards Badging */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-slate-700">Enterprise Security Standards:</span>
            <div className="flex items-center gap-1.5 font-mono text-[11px] bg-slate-100 px-2.5 py-1 rounded text-slate-700">
              <CheckCircle className="w-3.5 h-3.5 text-[#006948]" />
              SOC-2 Type II Certified
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] bg-slate-100 px-2.5 py-1 rounded text-slate-700">
              <Shield className="w-3.5 h-3.5 text-[#006948]" />
              ISO / IEC 27001
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] bg-slate-100 px-2.5 py-1 rounded text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006948]" />
              FedRAMP High Authorized
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] bg-slate-100 px-2.5 py-1 rounded text-slate-700">
              <CreditCard className="w-3.5 h-3.5 text-[#006948]" />
              PCI-DSS Level 1 v4.0
            </div>
          </div>

          {/* Legal Statutory Notice */}
          <div className="text-left md:text-right max-w-xl text-[11px] text-slate-400 leading-normal">
            Strict compliance with 18 U.S.C. § 1030 (Computer Fraud and Abuse Act). Unauthorized access attempts are monitored, geographically tagged, and forwarded immediately to federal law enforcement authorities.
          </div>
        </div>
      </footer>
    </div>
  );
};
