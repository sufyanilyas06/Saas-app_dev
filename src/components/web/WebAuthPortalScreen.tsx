import React, { useState } from 'react';
import {
  Store,
  ShieldCheck,
  Cloud,
  Zap,
  Boxes,
  Key,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  CheckCircle2,
  ArrowRight,
  Shield,
  Fingerprint,
  RefreshCw,
  Server,
  Activity,
  User,
  ExternalLink,
  Laptop
} from 'lucide-react';

import { ScreenType } from '../../types';

interface WebAuthPortalScreenProps {
  onShowToast: (message: string, type?: 'success' | 'warning' | 'info') => void;
  onNavigateToMobileApp: () => void;
  onNavigate?: (screen: ScreenType) => void;
  onLoginSuccess?: (portalMode: 'tenant' | 'hq' | 'sso') => void;
}

export const WebAuthPortalScreen: React.FC<WebAuthPortalScreenProps> = ({
  onShowToast,
  onNavigateToMobileApp,
  onNavigate,
  onLoginSuccess,
}) => {
  const [activeTab, setActiveTab] = useState<'tenant' | 'hq' | 'sso'>('tenant');
  const [activeNav, setActiveNav] = useState<'sign-in' | 'sso-saml' | 'store-provisioning' | 'system-status'>('sign-in');
  
  const [subdomain, setSubdomain] = useState('metro-organic-foods');
  const [email, setEmail] = useState('alex.rivera@metrofoods.com');
  const [password, setPassword] = useState('SuperSecretPassword123');
  const [hqKey, setHqKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberNode, setRememberNode] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleTabChange = (tab: 'tenant' | 'hq' | 'sso') => {
    setActiveTab(tab);
    setAuthSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      setAuthSuccess(true);
      onShowToast(
        activeTab === 'hq'
          ? 'Master HQ Cluster token mounted! Security tier 0 authorized.'
          : activeTab === 'sso'
          ? 'Redirecting to enterprise Okta / SAML identity provider...'
          : `Tenant session verified for ${subdomain}.freshpos.io`,
        'success'
      );

      if (onLoginSuccess) {
        onLoginSuccess(activeTab);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#85f8c4] selection:text-[#002114]">
      {/* Top Banner to switch between Web HQ and Mobile POS App */}
      <div className="bg-[#002114] text-[#85f8c4] text-xs px-4 py-1.5 flex items-center justify-between border-b border-[#005137]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#85f8c4] animate-pulse"></span>
          <span className="font-mono font-semibold tracking-wide">WEB PORTAL ENVIRONMENT</span>
          <span className="text-[#a0c5b3] hidden sm:inline">| Common Backend & Shared DB Active</span>
        </div>
        <div className="flex items-center gap-2">
          {onNavigate && (
            <>
              <button
                type="button"
                onClick={() => onNavigate('web_dashboard')}
                className="flex items-center gap-1 bg-[#00855d] hover:bg-[#009b6d] text-white px-2.5 py-0.5 rounded text-xs font-semibold transition-all cursor-pointer"
              >
                <span>HQ Dashboard</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('web_tenants')}
                className="flex items-center gap-1 bg-[#00855d] hover:bg-[#009b6d] text-white px-2.5 py-0.5 rounded text-xs font-semibold transition-all cursor-pointer"
              >
                <span>Tenants Fleet</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('web_root_console')}
                className="flex items-center gap-1 bg-red-950/80 hover:bg-red-900 border border-red-500/40 text-red-200 px-2.5 py-0.5 rounded text-xs font-mono font-bold transition-all cursor-pointer"
              >
                <span>Root Console (LVL-0)</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </>
          )}
          <button
            type="button"
            onClick={onNavigateToMobileApp}
            className="flex items-center gap-1.5 bg-[#006948] hover:bg-[#00855d] text-white px-2.5 py-0.5 rounded text-xs font-semibold transition-all cursor-pointer shadow-sm"
          >
            <span>Switch to Mobile POS App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Web Header */}
      <header className="sticky top-0 w-full z-40 bg-[#f8f9ff]/85 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#006948] flex items-center justify-center text-white shadow-sm">
              <Store className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight uppercase text-[#0b1c30]">FreshPOS HQ</span>
              <span className="font-mono text-[10px] font-bold text-[#6d7a72] uppercase tracking-wider">Operations Auth Engine</span>
            </div>
          </div>

          {/* Web Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-[#eff4ff] p-1 rounded-lg border border-[#e5eeff]">
            <button
              type="button"
              onClick={() => { setActiveNav('sign-in'); setActiveTab('tenant'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeNav === 'sign-in'
                  ? 'bg-white text-[#0b1c30] shadow-sm font-bold'
                  : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              Terminal Login
            </button>
            <button
              type="button"
              onClick={() => { setActiveNav('sso-saml'); setActiveTab('sso'); }}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeNav === 'sso-saml'
                  ? 'bg-white text-[#0b1c30] shadow-sm font-bold'
                  : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              Enterprise SSO
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveNav('store-provisioning');
                onShowToast('Navigating to Hardware & Store Provisioning console', 'info');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeNav === 'store-provisioning'
                  ? 'bg-white text-[#0b1c30] shadow-sm font-bold'
                  : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              Hardware Provisioning
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveNav('system-status');
                onShowToast('All 14 Regional Edge Nodes: Normal Latency (11ms)', 'success');
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeNav === 'system-status'
                  ? 'bg-white text-[#0b1c30] shadow-sm font-bold'
                  : 'text-[#565e74] hover:text-[#0b1c30]'
              }`}
            >
              System Status
            </button>
          </nav>

          {/* Right Status Cluster & Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-[#eff4ff] border border-[#dce9ff] px-3 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-[#006948] animate-pulse"></span>
              <span className="font-mono text-[11px] font-bold text-[#006948] uppercase">HQ Cluster Active</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#006948] flex items-center justify-center text-white shadow-sm">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Auth Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* LEFT PANEL: Enterprise Identity & Platform Status (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#eff4ff] border border-[#dce9ff] shadow-sm relative overflow-hidden">
            {/* Emerald Atmospheric Blurs */}
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-[#006948]/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full bg-[#00855d]/10 blur-2xl pointer-events-none"></div>

            {/* Top Section */}
            <div className="relative z-10 flex flex-col">
              {/* Enterprise Verification Pill */}
              <div className="flex items-center gap-1.5 self-start bg-[#e5eeff] border border-[#bccac0]/40 px-3 py-1.5 rounded mb-6">
                <ShieldCheck className="w-4 h-4 text-[#006948]" />
                <span className="font-mono text-[11px] font-bold text-[#0b1c30] uppercase tracking-wider">
                  v3.8 Suite • PCI-DSS Level 1
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0b1c30] mb-3 leading-snug">
                Unified POS, Inventory & Fleet Management for Modern Grocery Chains
              </h1>

              <p className="text-sm text-[#565e74] mb-8 leading-relaxed">
                The resilient backbone for multi-location grocers, distribution centers, and high-velocity checkout lanes with sub-15ms sync.
              </p>

              {/* Operational Capabilities List */}
              <div className="flex flex-col gap-3.5 mb-8">
                <div className="flex items-start gap-3 p-3 bg-white/80 border border-[#e5eeff] rounded-xl hover:bg-white transition-colors shadow-xs">
                  <div className="w-7 h-7 rounded bg-[#85f8c4] text-[#002114] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Cloud className="w-4 h-4 text-[#006948]" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#0b1c30] block mb-0.5">Row-Level Multi-Tenant Mesh</span>
                    <span className="text-xs text-[#565e74]">Real-time ledger sync across 5,000+ distributed registers simultaneously.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/80 border border-[#e5eeff] rounded-xl hover:bg-white transition-colors shadow-xs">
                  <div className="w-7 h-7 rounded bg-[#85f8c4] text-[#002114] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Zap className="w-4 h-4 text-[#006948]" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#0b1c30] block mb-0.5">Sub-15ms Barcode & Offline SQLite</span>
                    <span className="text-xs text-[#565e74]">Zero downtime during network disconnects; automatic background reconciliation.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/80 border border-[#e5eeff] rounded-xl hover:bg-white transition-colors shadow-xs">
                  <div className="w-7 h-7 rounded bg-[#85f8c4] text-[#002114] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Boxes className="w-4 h-4 text-[#006948]" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-[#0b1c30] block mb-0.5">Automated CPA Ledger & Cold-Chain</span>
                    <span className="text-xs text-[#565e74]">Instant tax lot reporting, perishable life-cycle tracking, and reorder dispatch.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status & Enterprise Trust Metric */}
            <div className="relative z-10 pt-3 bg-[#e5eeff]/80 border border-[#dce9ff] p-4 rounded-xl flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006948] animate-ping"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006948] -ml-4"></span>
                  <span className="font-mono text-xs font-bold text-[#0b1c30] uppercase">Cluster Status</span>
                </div>
                <span className="font-mono text-xs font-bold text-[#006948]">99.994% Uptime</span>
              </div>
              <p className="text-xs text-[#565e74] leading-relaxed">
                All 14 North American and EU regional edge clusters synced with zero packet degradation over the last 72 hours.
              </p>
            </div>
          </div>

          {/* RIGHT PANEL: Master Authentication Portal (Col 7) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="bg-white p-6 sm:p-10 rounded-2xl border border-[#e5eeff] shadow-md flex flex-col">
              {/* Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-2xl font-extrabold text-[#0b1c30]">Enterprise Access Portal</h2>
                  <span className="font-mono text-[11px] font-bold text-[#006948] bg-[#85f8c4] px-2 py-0.5 rounded uppercase tracking-wider">
                    FIPS 140-2
                  </span>
                </div>
                <p className="text-sm text-[#565e74]">
                  Access your Super Admin HQ, Franchise Management, or Regional Corporate Ledger.
                </p>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="grid grid-cols-3 gap-1 bg-[#eff4ff] p-1.5 rounded-xl mb-6 border border-[#dce9ff]">
                <button
                  type="button"
                  onClick={() => handleTabChange('tenant')}
                  className={`py-2 px-3 rounded-lg text-sm font-bold transition-all text-center cursor-pointer ${
                    activeTab === 'tenant'
                      ? 'bg-white text-[#0b1c30] shadow-sm'
                      : 'text-[#565e74] hover:text-[#0b1c30]'
                  }`}
                >
                  Tenant Login
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('hq')}
                  className={`py-2 px-3 rounded-lg text-sm font-bold transition-all text-center cursor-pointer ${
                    activeTab === 'hq'
                      ? 'bg-white text-[#0b1c30] shadow-sm'
                      : 'text-[#565e74] hover:text-[#0b1c30]'
                  }`}
                >
                  HQ Master Key
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('sso')}
                  className={`py-2 px-3 rounded-lg text-sm font-bold transition-all text-center cursor-pointer ${
                    activeTab === 'sso'
                      ? 'bg-white text-[#0b1c30] shadow-sm'
                      : 'text-[#565e74] hover:text-[#0b1c30]'
                  }`}
                >
                  Enterprise SSO
                </button>
              </div>

              {/* Form Wrapper */}
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {/* Workspace Subdomain (Dynamic per Tab) */}
                {(activeTab === 'tenant' || activeTab === 'sso') && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-[#0b1c30] flex items-center justify-between" htmlFor="subdomain">
                      <span>Organization Subdomain</span>
                      <span className="font-mono text-[11px] text-[#006948] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified Node
                      </span>
                    </label>
                    <div className="flex items-center bg-[#eff4ff] border border-[#dce9ff] rounded-lg px-3 h-12 focus-within:bg-white focus-within:border-[#006948] focus-within:ring-2 focus-within:ring-[#006948]/20 transition-all">
                      <Store className="w-5 h-5 text-[#6d7a72] mr-2 shrink-0" />
                      <input
                        id="subdomain"
                        type="text"
                        value={subdomain}
                        onChange={(e) => setSubdomain(e.target.value)}
                        placeholder="store-name"
                        required
                        className="bg-transparent border-none outline-none font-mono text-sm text-[#0b1c30] w-full placeholder:text-[#6d7a72]"
                      />
                      <span className="font-mono text-sm text-[#565e74] select-none font-medium">.freshpos.io</span>
                    </div>
                  </div>
                )}

                {/* HQ Master Node Key Field (in 'hq' mode) */}
                {activeTab === 'hq' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-[#0b1c30] flex items-center justify-between" htmlFor="hq-key">
                      <span>Super Admin Hardware Token / Security Key</span>
                      <span className="font-mono text-[11px] font-bold text-[#8d4b00] bg-[#ffdcc3] px-2 py-0.5 rounded">
                        Tier-0 Isolation
                      </span>
                    </label>
                    <div className="flex items-center bg-[#eff4ff] border border-[#dce9ff] rounded-lg px-3 h-12 focus-within:bg-white focus-within:border-[#006948] focus-within:ring-2 focus-within:ring-[#006948]/20 transition-all">
                      <Key className="w-5 h-5 text-[#6d7a72] mr-2 shrink-0" />
                      <input
                        id="hq-key"
                        type="password"
                        value={hqKey}
                        onChange={(e) => setHqKey(e.target.value)}
                        placeholder="Enter root YubiKey OTP or Security Pin"
                        required
                        className="bg-transparent border-none outline-none font-mono text-sm text-[#0b1c30] w-full placeholder:text-[#6d7a72]"
                      />
                    </div>
                  </div>
                )}

                {/* Work Email Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-[#0b1c30]" htmlFor="work-email">
                    Corporate Email
                  </label>
                  <div className="flex items-center bg-[#eff4ff] border border-[#dce9ff] rounded-lg px-3 h-12 focus-within:bg-white focus-within:border-[#006948] focus-within:ring-2 focus-within:ring-[#006948]/20 transition-all">
                    <Mail className="w-5 h-5 text-[#6d7a72] mr-2 shrink-0" />
                    <input
                      id="work-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      required
                      className="bg-transparent border-none outline-none text-sm text-[#0b1c30] w-full placeholder:text-[#6d7a72]"
                    />
                  </div>
                </div>

                {/* Password Input (Hidden in SSO mode) */}
                {activeTab !== 'sso' && (
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-bold text-[#0b1c30]" htmlFor="password">
                        Security Credential
                      </label>
                      <button
                        type="button"
                        onClick={() => onShowToast('Password reset link dispatched to corporate email.', 'info')}
                        className="text-xs font-semibold text-[#006948] hover:underline cursor-pointer"
                      >
                        Forgot credentials?
                      </button>
                    </div>
                    <div className="flex items-center bg-[#eff4ff] border border-[#dce9ff] rounded-lg px-3 h-12 focus-within:bg-white focus-within:border-[#006948] focus-within:ring-2 focus-within:ring-[#006948]/20 transition-all relative">
                      <Lock className="w-5 h-5 text-[#6d7a72] mr-2 shrink-0" />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="bg-transparent border-none outline-none text-sm text-[#0b1c30] w-full placeholder:text-[#6d7a72] pr-8"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-[#6d7a72] hover:text-[#0b1c30] p-1 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                {/* Workstation & Trusted Node Checkbox */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberNode}
                      onChange={(e) => setRememberNode(e.target.checked)}
                      className="w-4 h-4 rounded accent-[#006948] cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-[#0b1c30]">Remember this trusted management node (30 days)</span>
                  </label>
                </div>

                {/* Primary Submit Button */}
                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className={`mt-2 h-12 w-full text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99] cursor-pointer ${
                    authSuccess
                      ? 'bg-[#00855d]'
                      : 'bg-[#006948] hover:bg-[#005137]'
                  }`}
                >
                  {isAuthenticating ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Verifying Hardware Tokens...</span>
                    </>
                  ) : authSuccess ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-[#85f8c4]" />
                      <span>Authenticated! Launching HQ...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>
                        {activeTab === 'tenant'
                          ? 'Authenticate Session'
                          : activeTab === 'hq'
                          ? 'Mount Master HQ Cluster'
                          : 'Redirect to Identity Provider'}
                      </span>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="flex items-center my-2">
                  <div className="flex-1 h-px bg-[#dce9ff]"></div>
                  <span className="px-3 font-mono text-[10px] text-[#6d7a72] uppercase tracking-wider font-bold">
                    or verify via federated identity
                  </span>
                  <div className="flex-1 h-px bg-[#dce9ff]"></div>
                </div>

                {/* SSO Auxiliary Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      onShowToast('Connecting to Okta SAML IdP...', 'info');
                    }}
                    className="h-11 px-3 bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] text-[#0b1c30] rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-[#565e74]" />
                    <span>Okta SSO Portal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onShowToast('Authenticating via Google Workspace OAuth...', 'info');
                    }}
                    className="h-11 px-3 bg-[#eff4ff] hover:bg-[#e5eeff] border border-[#dce9ff] text-[#0b1c30] rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Fingerprint className="w-4 h-4 text-[#565e74]" />
                    <span>Google Workspace SAML</span>
                  </button>
                </div>

                {/* Cashier Terminal Switcher Option */}
                <div className="bg-[#eff4ff]/80 border border-[#dce9ff] p-3 rounded-xl mt-2 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Laptop className="w-5 h-5 text-[#006948]" />
                    <span className="text-xs text-[#0b1c30] font-medium">
                      Floor Clerk or Till Terminal Operator?
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onNavigateToMobileApp}
                    className="text-xs font-bold text-[#006948] hover:underline flex items-center gap-1 cursor-pointer self-end sm:self-auto"
                  >
                    <span>Quick PIN Entry</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              {/* Compliance & Security Assurance Footer Inside Panel */}
              <div className="mt-6 pt-4 border-t border-[#e5eeff] flex flex-col sm:flex-row items-center justify-between gap-2 text-[#565e74] text-xs">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#006948]" />
                  <span className="font-mono text-[10px] font-bold tracking-wider">
                    TLS 1.3 Strict • SOC2 Type II Certified
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-[10px] font-semibold">
                  <button
                    type="button"
                    onClick={() => onShowToast('Security Ops contact: sec-ops@freshpos.io', 'info')}
                    className="hover:text-[#0b1c30] transition-colors cursor-pointer"
                  >
                    Security Ops
                  </button>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => onShowToast('Emergency Cold-Switch activated: all sessions locked.', 'warning')}
                    className="hover:text-[#ba1a1a] text-[#ba1a1a] transition-colors cursor-pointer font-bold"
                  >
                    Emergency Cold-Switch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Web Footer */}
      <footer className="w-full bg-white border-t border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="font-mono text-[10px] font-bold text-[#565e74] uppercase tracking-wider">
              PCI-DSS Level 1 Verified
            </span>
            <span className="text-[#565e74]">•</span>
            <span className="font-mono text-[10px] font-bold text-[#565e74] uppercase tracking-wider">
              TLS 1.3 Hardware Secured
            </span>
            <span className="text-[#565e74]">•</span>
            <span className="font-mono text-[10px] font-bold text-[#565e74] uppercase tracking-wider">
              FIPS 140-2 Encrypted Node
            </span>
          </div>
          <div className="text-xs text-[#565e74] text-center">
            © 2024 FreshPOS Systems Global Inc. Merchant & Corporate Security Division.
          </div>
        </div>
      </footer>
    </div>
  );
};
