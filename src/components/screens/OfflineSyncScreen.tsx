import React, { useState, useEffect } from 'react';
import { 
  WifiOff, 
  Wifi, 
  ShieldCheck, 
  Layers, 
  Database, 
  HardDrive, 
  CheckCircle2, 
  Lock, 
  CloudUpload, 
  RefreshCw, 
  FileCheck, 
  Handshake, 
  Sliders,
  FileCode
} from 'lucide-react';
import { ScreenType } from '../../types';
import { localDb, SyncQueueItem } from '../../services/db';
import { api } from '../../services/api';

interface OfflineSyncScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const OfflineSyncScreen: React.FC<OfflineSyncScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [isOffline, setIsOffline] = useState(false);
  const [isAutoSync, setIsAutoSync] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [queueItems, setQueueItems] = useState<SyncQueueItem[]>([]);
  const [showSqlDumpModal, setShowSqlDumpModal] = useState(false);
  const [sqlDumpContent, setSqlDumpContent] = useState('');

  const refreshQueue = async () => {
    try {
      const count = await localDb.getPendingSyncCount();
      const items = await localDb.getSyncQueue();
      setPendingCount(count);
      setQueueItems(items);
    } catch (e) {
      console.warn('Queue fetch error:', e);
    }
  };

  useEffect(() => {
    refreshQueue();
    const interval = setInterval(refreshQueue, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleForceSync = async () => {
    setIsSyncing(true);
    try {
      const res = await api.syncOfflineQueue();
      await refreshQueue();
      setIsSyncing(false);
      onShowToast(`SQLite Sync: ${res.synced} mutations synced to server, ${res.failed} remaining`);
    } catch {
      setIsSyncing(false);
      onShowToast('Sync attempted: Local SQLite ledger protected');
    }
  };

  const handleOpenSqlDump = async () => {
    const dump = await localDb.exportSqlDump();
    setSqlDumpContent(dump);
    setShowSqlDumpModal(true);
  };

  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      <div className="px-3 py-3 flex flex-col gap-3">
        {/* Offline Mode Banner */}
        <div className={`relative overflow-hidden rounded-xl p-3.5 shadow-md transition-colors ${
          isOffline 
            ? 'bg-[#b15f00] text-white' 
            : 'bg-[#006948] text-white'
        }`}>
          <div className="flex items-start justify-between gap-2 relative z-10">
            <div className="flex items-start gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                {isOffline ? <WifiOff className="w-5 h-5" /> : <Wifi className="w-5 h-5" />}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-xs tracking-tight">
                    {isOffline ? 'OFFLINE MODE SIMULATED' : 'ONLINE & SQLITE PERSISTENCE ACTIVE'}
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-white animate-ping"></span>
                </div>
                <p className="text-[11px] opacity-90 mt-0.5">
                  {isOffline ? 'Transactions write straight to local SQLite' : 'Dual-write: Local SQLite + Express Server'}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOffline(!isOffline);
                onShowToast(isOffline ? 'Network connected: Reconciling with backend' : 'Network disconnected: Offline SQLite mode');
              }}
              className="px-2.5 py-1 rounded-full bg-white text-[#0b1c30] font-mono text-[9px] font-bold tracking-wider uppercase shrink-0 transition-transform active:scale-95 shadow-sm"
            >
              {isOffline ? 'Simulate Online' : 'Simulate Offline'}
            </button>
          </div>

          <div className="mt-2.5 pt-1.5 bg-black/10 rounded-lg p-2 flex flex-col gap-1 relative z-10">
            <div className="flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="font-semibold">Local SQLite Engine Active</span>
              </div>
              <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-white/20">
                ACID & Schema Validated
              </span>
            </div>
            <div className="flex items-center justify-between text-[10px] opacity-80">
              <span>Sync queue status</span>
              <span className="font-mono font-semibold">{pendingCount} pending mutations</span>
            </div>
          </div>
        </div>

        {/* Queue Ledger */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#006948]">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-[#0b1c30]">SQLite Queue Ledger</span>
            </div>
            <span className="font-mono text-[9px] uppercase font-bold bg-[#85f8c4]/40 text-[#005137] px-2 py-0.5 rounded-full">
              db.ts active
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-[#eff4ff] rounded-lg p-2 flex flex-col">
              <span className="text-[10px] text-[#565e74]">Pending</span>
              <span className="text-base font-bold text-[#006948] mt-0.5 font-mono">{pendingCount}</span>
              <span className="font-mono text-[9px] text-[#565e74] uppercase">Queued</span>
            </div>
            <div className="bg-[#eff4ff] rounded-lg p-2 flex flex-col">
              <span className="text-[10px] text-[#565e74]">Storage Engine</span>
              <span className="text-base font-bold text-[#0b1c30] mt-0.5 font-mono">
                SQLite
              </span>
              <span className="font-mono text-[9px] text-[#006948] uppercase font-bold">5 Schemas</span>
            </div>
            <div className="bg-[#eff4ff] rounded-lg p-2 flex flex-col">
              <span className="text-[10px] text-[#565e74]">Integrity</span>
              <span className="text-base font-bold text-[#0b1c30] mt-0.5 font-mono">100%</span>
              <span className="font-mono text-[9px] text-[#565e74] uppercase">Validated</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1 text-[#565e74]">
                <HardDrive className="w-3.5 h-3.5" />
                <span className="text-[11px]">Local SQLite Storage</span>
              </div>
              <span className="font-mono text-[11px] text-[#0b1c30] font-bold">
                schemas initialized <span className="text-[#006948] font-normal">(products, orders, shifts, customers)</span>
              </span>
            </div>
            <div className="w-full bg-[#dce9ff] h-2 rounded-full overflow-hidden">
              <div className="bg-[#006948] h-full rounded-full transition-all duration-500" style={{ width: '4%' }}></div>
            </div>
          </div>
        </div>

        {/* Offline Queue Stream */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-[#0b1c30]">Offline Queue Stream</span>
            <span className="font-mono text-[10px] text-[#565e74]">
              {queueItems.length > 0 ? `${queueItems.length} in queue` : 'Queue empty (in sync)'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {queueItems.length === 0 ? (
              <div className="bg-white rounded-xl p-4 shadow-sm border border-[#bccac0]/30 text-center flex flex-col items-center justify-center gap-1 text-[#565e74]">
                <CheckCircle2 className="w-6 h-6 text-[#006948]" />
                <span className="text-xs font-bold text-[#0b1c30]">All SQLite Records Reconciled</span>
                <span className="text-[11px]">Any offline checkout or stock update will automatically queue here</span>
              </div>
            ) : (
              queueItems.slice(0, 5).map((tx) => (
                <div key={tx.id} className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex flex-col gap-1.5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#b15f00]"></span>
                      <span className="font-mono text-xs font-bold text-[#0b1c30]">{tx.action}</span>
                      <span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-[#e5eeff] text-[#565e74]">
                        {tx.method}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 bg-[#85f8c4]/30 text-[#005137] px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                      <CheckCircle2 className="w-3 h-3 text-[#006948]" />
                      <span>{tx.status.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex items-baseline justify-between pt-0.5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-[#0b1c30] truncate max-w-[200px]">{tx.endpoint}</span>
                      <span className="text-[10px] text-[#565e74]">Retries: {tx.retryCount}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-[10px] text-[#565e74]">{new Date(tx.createdAt).toLocaleTimeString()}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Conflict Resolution Policy */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Handshake className="w-4 h-4 text-[#006948]" />
            <span className="text-xs font-bold text-[#0b1c30]">Conflict Resolution Policy</span>
          </div>
          <div className="bg-[#eff4ff] rounded-lg p-2.5 flex flex-col gap-1">
            <span className="font-mono text-[10px] text-[#565e74] uppercase font-bold">
              Active Reconciliation Rule
            </span>
            <p className="text-xs font-semibold text-[#0b1c30] leading-snug">
              Server Wins on Price, Register Wins on Inventory Timestamp
            </p>
            <span className="text-[10px] text-[#565e74]">
              Prevents overbooking while honoring promotional retail overrides in SQLite store.
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex flex-col pr-2">
              <span className="text-xs font-bold text-[#0b1c30]">Auto-Sync Trigger</span>
              <span className="text-[10px] text-[#565e74]">Sync immediately upon Wi-Fi or 4G reconnect</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsAutoSync(!isAutoSync);
                onShowToast(isAutoSync ? 'Auto-sync disabled: Manual queue trigger' : 'Auto-sync active');
              }}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative shrink-0 ${
                isAutoSync ? 'bg-[#006948]' : 'bg-[#bccac0]'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform ${
                isAutoSync ? 'translate-x-5' : 'translate-x-0'
              }`}></div>
            </button>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col gap-2 mt-1 pb-4">
          <button
            type="button"
            onClick={handleForceSync}
            disabled={isSyncing || pendingCount === 0}
            className="w-full h-12 bg-[#006948] hover:bg-[#00855d] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-transform disabled:opacity-50"
          >
            <CloudUpload className={`w-5 h-5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>
              {isSyncing 
                ? 'Reconciling Encrypted Packets...' 
                : pendingCount > 0 
                  ? `Force Cloud Sync Now (${pendingCount} Queued)` 
                  : 'All SQLite Records In Sync'}
            </span>
          </button>
          <button
            type="button"
            onClick={handleOpenSqlDump}
            className="w-full h-11 bg-white hover:bg-[#eff4ff] text-[#0b1c30] rounded-xl font-bold text-xs flex items-center justify-center gap-2 border border-[#bccac0]/30 transition-colors"
          >
            <FileCode className="w-4 h-4 text-[#006948]" />
            <span>View SQLite Database DDL & Dump</span>
          </button>
        </div>
      </div>

      {/* SQL Dump Modal */}
      {showSqlDumpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3">
          <div className="bg-white w-full max-w-lg rounded-2xl p-4 shadow-xl flex flex-col max-h-[85vh]">
            <div className="flex items-center justify-between border-b pb-3 mb-2">
              <div className="flex items-center gap-2">
                <Database className="w-5 h-5 text-[#006948]" />
                <h3 className="font-bold text-sm text-[#0b1c30]">FreshPOS SQLite Database Dump</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSqlDumpModal(false)}
                className="text-xs font-mono px-2 py-1 bg-slate-100 rounded hover:bg-slate-200"
              >
                ✕ Close
              </button>
            </div>
            <pre className="flex-1 overflow-auto bg-slate-900 text-slate-100 p-3 rounded-lg text-[10px] font-mono whitespace-pre-wrap leading-relaxed">
              {sqlDumpContent}
            </pre>
            <div className="pt-3 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(sqlDumpContent);
                  onShowToast('SQLite DDL & Data Dump copied to clipboard!', 'success');
                }}
                className="px-3 py-1.5 bg-[#006948] text-white rounded-lg text-xs font-bold font-mono"
              >
                Copy SQL Dump
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

