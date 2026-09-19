import React, { useState } from 'react';
import { 
  Building, 
  ArrowLeft, 
  Calendar, 
  Sliders, 
  ShieldCheck, 
  FileText, 
  Download, 
  FileSpreadsheet, 
  Gavel, 
  AlertTriangle, 
  Trash2, 
  Star 
} from 'lucide-react';
import { ScreenType } from '../../types';

interface TaxAuditScreenProps {
  onShowToast: (msg: string) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const TaxAuditScreen: React.FC<TaxAuditScreenProps> = ({
  onShowToast,
  onNavigate
}) => {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handleDownloadPdf = () => {
    setIsGeneratingPdf(true);
    setTimeout(() => {
      setIsGeneratingPdf(false);
      onShowToast('CPA Ready Audit Package (PDF) generated and downloaded');
    }, 1000);
  };

  return (
    <div className="flex-1 flex flex-col w-full pb-20">
      <div className="px-3 py-3 flex flex-col gap-3">
        {/* Report Subheader & Period Controls */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('analytics_hub')}
                className="w-8 h-8 rounded-lg bg-[#eff4ff] flex items-center justify-center text-[#0b1c30]"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div>
                <h1 className="text-sm font-bold text-[#0b1c30]">Margin & Tax Audit</h1>
                <p className="text-[11px] text-[#565e74]">General Ledger Reconciliation • Form ST-100</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#85f8c4] text-[#002114] font-mono text-[9px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006948]"></span>
              ON TRACK
            </span>
          </div>

          {/* Fiscal Period Trigger */}
          <div className="bg-[#eff4ff] rounded-xl p-2.5 flex items-center justify-between shadow-sm border border-[#bccac0]/30">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#e5eeff] flex items-center justify-center text-[#006948]">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-xs text-[#0b1c30] font-semibold">Q4 2024 • Oct 1 – Present</div>
                <div className="text-[10px] text-[#565e74]">Closed 18 min ago • POS Cluster #04</div>
              </div>
            </div>
            <button
              onClick={() => onShowToast('Custom fiscal period filter selected')}
              className="w-8 h-8 rounded-lg bg-white hover:bg-[#dce9ff] flex items-center justify-center text-[#0b1c30] shadow-sm border border-[#bccac0]/30"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tax Liability & Collections Bento Card */}
        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#bccac0]/30 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-[#006948]" />
              <span className="font-mono text-[10px] text-[#0b1c30] font-bold uppercase tracking-wider">
                Tax Liability & Collections
              </span>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#eff4ff] text-[#565e74] font-mono text-[10px] font-bold">
              Eff. 4.93%
            </span>
          </div>

          <div className="bg-[#eff4ff] rounded-lg p-2.5 flex items-baseline justify-between">
            <div>
              <div className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Tax Collected (7.5%)</div>
              <div className="text-xl font-black text-[#006948] font-mono tracking-tight">$2,731.50</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[9px] text-[#565e74] uppercase font-bold">Taxable Gross</div>
              <div className="font-mono text-sm text-[#0b1c30] font-bold">$36,420.00</div>
            </div>
          </div>

          {/* Zero-Tax Grocery Exemption Block */}
          <div className="bg-[#e5eeff] rounded-lg p-2.5 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#006948]" />
                <span className="text-xs font-bold text-[#0b1c30]">Zero-Tax Exempt Groceries</span>
              </div>
              <span className="px-1.5 py-0.2 rounded-full bg-[#00855d] text-white font-mono text-[9px] font-bold">
                EXEMPT 0.0%
              </span>
            </div>
            <div className="flex items-baseline justify-between pt-0.5">
              <span className="text-[11px] text-[#565e74]">Raw Produce, Milk, Bread, Staple Grains</span>
              <span className="font-mono text-xs text-[#0b1c30] font-semibold">$18,940.00</span>
            </div>
          </div>

          {/* Gauge Bar */}
          <div className="flex flex-col gap-1 pt-0.5">
            <div className="flex justify-between font-mono text-[9px] text-[#565e74]">
              <span>Taxable Revenue (65.8%)</span>
              <span>Exempt Staples (34.2%)</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[#dce9ff] overflow-hidden flex">
              <div className="h-full bg-[#006948]" style={{ width: '65.8%' }}></div>
              <div className="h-full bg-[#68dba9]" style={{ width: '34.2%' }}></div>
            </div>
          </div>
        </div>

        {/* Audited Departments Carousel */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[9px] text-[#0b1c30] font-bold uppercase tracking-wider">
              Audited Departments
            </span>
            <span className="font-mono text-[9px] text-[#565e74]">5 Active Lanes</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="relative rounded-lg overflow-hidden h-20 bg-[#e5eeff]">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV5VYIV0zgWkWNm3gTGBiotMlxI7w-Y1fFIKAg17x7EPD7mpAAiQIGADQK0NAE47n2aTZ6spHGPu6S7BqSHqLbgSpWqnwxLO5ZLy1BkbfTi0F7KVkBmghLU69EzXmyoZYdS4E9HM5T1mDDXDV86wZRlwedGIgdruanGyn5KqN2zo4DD83R_Rn0Yvqn6Cc3otjUWEpOFP3SyJUZSaR89Lkf_LYZqby4PCgvD68ehFz9_RGLqLzP1C8S1g"
                alt="Fresh Produce"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-2 text-white">
                <span className="text-xs font-bold leading-tight">Fresh Produce</span>
                <span className="font-mono text-[10px] text-[#85f8c4] font-bold">40.0% Margin</span>
              </div>
            </div>

            <div className="relative rounded-lg overflow-hidden h-20 bg-[#e5eeff]">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQgCnCjky8oxuQMMNfIt0jxZa9-7Ick4BMbYNNweCb90gYiV0Jsw-f64gTIjepoZnSo7JAdmYSumClHM4rqhxZ-hYx4npvMhJ_4sB3sRBPWlyPZ6Qgys68nf8z0SLm4nNDxxOc6Hw_STWU00P0O4KGPiw7wMDO6CoBEiGbeXccmA4MBnRg2M3uBsRHlSfhb0vp4pj9IX_MSJfkZg-HN1CsN0v7Q_QmWjGEKoRmguUpHERRWH_WHECjyg"
                alt="Bakery & Deli"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-2 text-white">
                <span className="text-xs font-bold leading-tight">Bakery & Deli</span>
                <span className="font-mono text-[10px] text-[#ffdcc3] font-bold">50.0% Margin • Top</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Margin Performance Ledger */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[9px] text-[#0b1c30] font-bold uppercase tracking-wider">
              Category Margin Breakdown
            </span>
            <span className="font-mono text-[9px] text-[#565e74]">COGS vs Rev</span>
          </div>

          {[
            {
              name: 'Fresh Produce',
              sub: 'Tax-Exempt • High Velocity',
              margin: '40.0%',
              badge: 'HIGH PROFIT',
              rev: '$14,200.00',
              cogs: '$8,520.00',
              barWidth: '40%',
              color: 'bg-[#006948]'
            },
            {
              name: 'Bakery & Prepared Deli',
              sub: 'Standard 7.5% Tax • In-House Prep',
              margin: '50.0%',
              badge: 'TOP MARGIN',
              rev: '$7,850.00',
              cogs: '$3,925.00',
              barWidth: '50%',
              color: 'bg-[#b15f00]'
            },
            {
              name: 'Dairy & Cold Storage',
              sub: 'Tax-Exempt • Fast Turnover',
              margin: '22.0%',
              badge: 'LOW MARGIN',
              rev: '$11,300.00',
              cogs: '$8,814.00',
              barWidth: '22%',
              color: 'bg-[#565e74]'
            },
            {
              name: 'Beverages & Soda',
              sub: 'Sugar Tax: $118.50 Excise',
              margin: '43.0%',
              badge: 'EXCISE INCL.',
              rev: '$3,950.00',
              cogs: '$2,250.00',
              barWidth: '43%',
              color: 'bg-[#00855d]'
            },
          ].map((cat, idx) => (
            <div key={idx} className="bg-white rounded-xl p-3 shadow-sm border border-[#bccac0]/30 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="truncate">
                  <div className="text-xs font-bold text-[#0b1c30] truncate">{cat.name}</div>
                  <div className="text-[10px] text-[#565e74]">{cat.sub}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="font-mono text-sm text-[#006948] font-bold">{cat.margin}</div>
                  <span className="font-mono text-[9px] text-[#006948] font-bold">{cat.badge}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-[#eff4ff] rounded p-2 text-xs">
                <div>
                  <span className="font-mono text-[9px] text-[#565e74] block">REVENUE</span>
                  <span className="font-mono font-semibold text-[#0b1c30]">{cat.rev}</span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-[#565e74] block">COST OF GOODS</span>
                  <span className="font-mono font-semibold text-[#0b1c30]">{cat.cogs}</span>
                </div>
              </div>

              <div className="w-full h-1.5 rounded-full bg-[#dce9ff] overflow-hidden">
                <div className={`h-full ${cat.color} rounded-full`} style={{ width: cat.barWidth }}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Spoilage & Shrinkage Impact */}
        <div className="bg-[#ffdad6] text-[#93000a] rounded-xl p-3.5 shadow-sm flex flex-col gap-1.5 border border-[#ffdad6]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Trash2 className="w-4 h-4 text-[#ba1a1a]" />
              <span className="font-mono text-[10px] text-[#ba1a1a] font-bold uppercase tracking-wider">
                Shrinkage & Spoilage Loss
              </span>
            </div>
            <span className="font-mono text-xs font-bold text-[#ba1a1a]">1.2% of COGS</span>
          </div>

          <div className="flex items-baseline justify-between pt-1">
            <div>
              <div className="font-mono text-[9px] text-[#93000a]/80 uppercase">Write-Off Deduction</div>
              <div className="text-xl font-black text-[#ba1a1a] font-mono">-$462.80</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[9px] text-[#93000a]/80 uppercase">Net Operating Margin</div>
              <div className="text-xl font-black text-[#006948] font-mono">32.4%</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white text-[#0b1c30] font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
              Expired Dairy: -$184.20
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white text-[#0b1c30] font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8d4b00]"></span>
              Cull Produce: -$210.60
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white text-[#0b1c30] font-mono text-[10px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#565e74]"></span>
              Packaging: -$68.00
            </span>
          </div>
        </div>

        {/* Compliance & Export Actions */}
        <div className="flex flex-col gap-2 pt-1">
          <span className="font-mono text-[10px] text-[#0b1c30] font-bold uppercase tracking-wider px-1">
            Compliance & Export
          </span>
          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="h-12 w-full rounded-xl bg-[#006948] hover:bg-[#00855d] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isGeneratingPdf ? 'Compiling Form ST-100...' : 'Download CPA Ready Audit Package (PDF)'}</span>
          </button>
          <button
            onClick={() => onShowToast('Exported State Sales Tax Schedule CSV (Form ST-100)')}
            className="h-11 w-full rounded-xl bg-white hover:bg-[#eff4ff] text-[#0b1c30] text-xs font-bold flex items-center justify-center gap-2 border border-[#bccac0]/30 shadow-sm transition-all"
          >
            <FileSpreadsheet className="w-4 h-4 text-[#565e74]" />
            <span>Export State Sales Tax Schedule (CSV)</span>
          </button>
        </div>

        {/* Statutory Compliance Footer */}
        <div className="bg-[#eff4ff] rounded-lg p-2.5 text-center border border-[#bccac0]/30">
          <div className="flex items-center justify-center gap-1 text-[#565e74] pb-1">
            <Gavel className="w-3.5 h-3.5" />
            <span className="font-mono text-[9px] uppercase font-bold">Statutory POS Standard</span>
          </div>
          <p className="text-[10px] text-[#565e74] leading-relaxed">
            Compliant with IRS Rev. Proc. 98-25 & State Department of Revenue POS electronic audit trail retention standards. All record hashes anchored.
          </p>
        </div>
      </div>
    </div>
  );
};
