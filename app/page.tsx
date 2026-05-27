'use client';

import { useState } from 'react';
import { Menu, X, ArrowDown, Settings } from 'lucide-react';

export default function LitVMDex() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('SWAP');

  // Fungsi untuk menutup sidebar dan ganti tab
  const handleNavClick = (tabName: string) => {
    setActiveTab(tabName);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#070e1e] text-white relative overflow-hidden min-w-[360px]">
      
      {/* 1. BACKGROUND LOGO - TETAP STANDBY DI BELAKANG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
        <img 
          src="/logo.png" 
          alt="LitVM Background" 
          className="w-[180%] max-w-[850px] h-auto object-contain opacity-[0.35] -translate-y-6 scale-[1.35]"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      {/* 2. BAGIAN NAVBAR */}
      <nav className="bg-[#070e1e]/60 backdrop-blur-xl border-b border-white/5 fixed top-0 left-0 w-full z-50 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-white/80 hover:text-white transition-colors">
            <Menu size={28} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center">
              <span className="font-bold text-xl tracking-tight">L</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold tracking-tight uppercase">LitVM</span>
              <span className="text-cyan-400 text-lg font-medium uppercase ml-1">Dex</span>
            </div>
          </div>
        </div>
        <button className="bg-white/5 hover:bg-white/10 text-white/90 border border-white/10 px-5 py-2.5 rounded-xl font-bold text-[10px] tracking-widest transition-all active:scale-95 uppercase">
          CONNECT WALLET
        </button>
      </nav>

      {/* 3. SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* 4. SIDEBAR MENU - NAVIGASI AKTIF */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-[#040814]/95 backdrop-blur-2xl border-r border-white/5 z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="pt-20 px-4 relative h-full">
          <button onClick={() => setIsSidebarOpen(false)} className="absolute top-6 right-6 text-white/60 hover:text-white">
            <X size={28} />
          </button>
          
          <ul className="mt-8 space-y-2">
            {['SWAP', 'LIQUIDITY', 'PORTFOLIO', 'LOCKS', 'VOTES', 'INCENTIVES'].map((item) => (
              <li key={item}>
                <button 
                  onClick={() => handleNavClick(item)}
                  className={`w-full text-left px-6 py-3.5 rounded-xl font-bold text-xs tracking-[0.15em] uppercase transition-all ${
                    activeTab === item ? 'text-cyan-400 bg-white/5' : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 5. BAGIAN KONTEN UTAMA - BERUBAH SESUAI TAB */}
      <div className="pt-24 pb-16 px-4 max-w-[460px] mx-auto relative z-10 flex flex-col justify-center min-h-screen">
        
        {/* Judul Halaman Dinamis */}
        <div className="mb-6 text-center">
            <h2 className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase">CURRENT INTERFACE</h2>
            <h1 className="text-2xl font-black tracking-widest mt-1 uppercase text-cyan-400">{activeTab}</h1>
        </div>

        {/* Kotak Dex Utama */}
        <div className="bg-white/[0.01] backdrop-blur-2xl border border-white/[0.08] rounded-[32px] p-5 shadow-2xl shadow-black/40 relative overflow-hidden transition-all duration-500">
          
          {activeTab === 'SWAP' && (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1.5"><button className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-white/60 uppercase">SL</button></div>
                <div className="text-[11px] font-bold text-cyan-400/90 uppercase">1% SLIPPAGE</div>
              </div>

              {/* Box Input A */}
              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 mb-2">
                <div className="text-[10px] font-black text-white/30 mb-2 uppercase tracking-widest">FROM</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 bg-white/[0.03] px-3 py-1.5 rounded-xl uppercase font-bold text-sm tracking-tight">🔴 TOKEN A</div>
                  <input type="text" placeholder="0" className="text-3xl font-semibold text-right bg-transparent w-32 focus:outline-none placeholder-white/10" />
                </div>
              </div>

              {/* Panah Tukar */}
              <div className="flex justify-center -my-4 relative z-20">
                <div className="bg-[#070e1e]/80 border border-white/10 p-2 rounded-xl"><ArrowDown size={16} className="text-cyan-400" /></div>
              </div>

              {/* Box Input B */}
              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 mt-2">
                <div className="text-[10px] font-black text-white/30 mb-2 uppercase tracking-widest">TO</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 bg-white/[0.03] px-3 py-1.5 rounded-xl uppercase font-bold text-sm tracking-tight">💎 TOKEN B</div>
                  <input type="text" placeholder="0" className="text-3xl font-semibold text-right bg-transparent w-32 focus:outline-none placeholder-white/10" />
                </div>
              </div>

              <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-cyan-400 py-4 text-[11px] font-black tracking-[0.2em] rounded-2xl shadow-lg uppercase">EXECUTE SWAP</button>
            </div>
          )}

          {activeTab !== 'SWAP' && (
            <div className="py-12 text-center animate-in slide-in-from-bottom-4 duration-500">
               <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <span className="text-2xl opacity-50">⚡</span>
               </div>
               <p className="text-[10px] font-black tracking-[0.2em] text-white/40 uppercase mb-2">Notice</p>
               <h3 className="text-lg font-bold uppercase tracking-widest">Entering {activeTab} Module</h3>
               <p className="text-xs text-white/30 mt-4 max-w-[200px] mx-auto leading-relaxed">THIS INTERFACE IS CURRENTLY UNDER DEVELOPMENT FOR THE LITVM NETWORK.</p>
               <button onClick={() => setActiveTab('SWAP')} className="mt-8 text-[10px] font-bold text-cyan-400 border-b border-cyan-400/30 pb-1 uppercase tracking-widest">RETURN TO SWAP</button>
            </div>
          )}

        </div>

        {/* Petunjuk Langkah (Hanya Muncul di Swap) */}
        {activeTab === 'SWAP' && (
          <div className="mt-6 space-y-3 px-1 animate-in fade-in duration-700">
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 bg-amber-500 text-black rounded-md flex items-center justify-center font-black text-[11px] shrink-0 uppercase">1</div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Enter amount to swap</p>
            </div>
            <div className="flex gap-3 items-start">
              <div className="w-5 h-5 bg-amber-500 text-black rounded-md flex items-center justify-center font-black text-[11px] shrink-0 uppercase">2</div>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider">Confirm destination token</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
