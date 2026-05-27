'use client';

import { useState } from 'react';
import { Menu, X, ArrowDown, Settings } from 'lucide-react';

export default function LitVMDex() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('SWAP');
  const [showCreateLock, setShowCreateLock] = useState(false);

  const handleNavClick = (tabName: string) => {
    setActiveTab(tabName);
    setIsSidebarOpen(false);
    setShowCreateLock(false);
  };

  return (
    <div className="min-h-screen bg-[#070e1e] text-white relative overflow-hidden min-w-[360px]">
      
      {/* BACKGROUND LOGO */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 select-none overflow-hidden">
        <img 
          src="/logo.png" 
          alt="LitVM Background" 
          className="w-[180%] max-w-[850px] h-auto object-contain opacity-[0.35] -translate-y-6 scale-[1.35]"
          style={{ mixBlendMode: 'screen' }}
        />
      </div>

      {/* NAVBAR */}
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

      {/* SIDEBAR */}
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

      {/* MAIN CONTENT */}
      <div className="pt-24 pb-16 px-4 max-w-[460px] mx-auto relative z-10">
        
        <div className="mb-6 text-center">
          <h2 className="text-[10px] font-black tracking-[0.3em] text-white/30 uppercase">CURRENT INTERFACE</h2>
          <h1 className="text-2xl font-black tracking-widest mt-1 uppercase text-cyan-400">{activeTab}</h1>
        </div>

        <div className="bg-white/[0.01] backdrop-blur-2xl border border-white/[0.08] rounded-[32px] p-5 shadow-2xl shadow-black/40 relative overflow-hidden">

          {/* ==================== SWAP ==================== */}
          {activeTab === 'SWAP' && (
            <div className="animate-in fade-in duration-500">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-1.5"><button className="px-2.5 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-white/60 uppercase">SL</button></div>
                <div className="text-[11px] font-bold text-cyan-400/90 uppercase">1% SLIPPAGE</div>
              </div>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 mb-2">
                <div className="text-[10px] font-black text-white/30 mb-2 uppercase tracking-widest">FROM</div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 bg-white/[0.03] px-3 py-1.5 rounded-xl uppercase font-bold text-sm tracking-tight">🔴 TOKEN A</div>
                  <input type="text" placeholder="0" className="text-3xl font-semibold text-right bg-transparent w-32 focus:outline-none placeholder-white/10" />
                </div>
              </div>

              <div className="flex justify-center -my-4 relative z-20">
                <div className="bg-[#070e1e]/80 border border-white/10 p-2 rounded-xl"><ArrowDown size={16} className="text-cyan-400" /></div>
              </div>

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

          {/* ==================== LIQUIDITY ==================== */}
          {activeTab === 'LIQUIDITY' && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold tracking-widest">Liquidity Pools</h2>
              
              {/* Filter Tabs - Improved Layout */}
              <div className="flex flex-wrap gap-2 pb-2">
                <button className="bg-yellow-400 text-black px-6 py-2.5 rounded-2xl font-bold text-sm whitespace-nowrap">ALL</button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-2xl font-medium text-sm whitespace-nowrap">BASIC</button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-2xl font-medium text-sm whitespace-nowrap">CONCENTRATED</button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-2xl font-medium text-sm whitespace-nowrap">STABLE</button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2.5 rounded-2xl font-medium text-sm whitespace-nowrap">VOLATILE</button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search by name or address..." 
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3.5 px-5 pl-12 text-sm focus:outline-none"
                />
                <div className="absolute left-5 top-4 text-gray-400">🔍</div>
              </div>

              {/* Content Area */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-12 text-center min-h-[300px] flex items-center justify-center">
                <div>
                  <p className="text-gray-400">No liquidity pools available yet.</p>
                  <p className="text-xs text-white/30 mt-2">Start by creating the first pool</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== PORTFOLIO ==================== */}
          {activeTab === 'PORTFOLIO' && (
            <div className="space-y-6 py-2">
              <div>
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold tracking-widest text-sm">LIQUIDITY POSITIONS</span>
                    <span className="text-gray-400 text-lg">?</span>
                  </div>
                  <span className="text-yellow-400 font-bold text-xs tracking-widest">NEW DEPOSIT</span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-center">
                  <p className="text-gray-400 text-sm">Stake your liquidity position to<br />receive <span className="text-cyan-400 font-semibold">LitVM</span> emissions.</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <span className="font-bold tracking-widest text-sm">LIQUIDITY REWARDS</span>
                  <span className="text-gray-400 text-lg">?</span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-center">
                  <p className="text-gray-400 text-sm">Start by depositing and<br />staking liquidity.</p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 px-1">
                  <span className="font-bold tracking-widest text-sm">LOCKS</span>
                  <span className="text-gray-400 text-lg">?</span>
                </div>
                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-center">
                  <p className="text-gray-400 text-sm">Create a lock and vote to receive<br />fees and incentives.</p>
                </div>
              </div>
            </div>
          )}

          {/* ==================== LOCKS ==================== */}
          {activeTab === 'LOCKS' && !showCreateLock && (
            <div className="space-y-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-widest text-lg">LOCKS</span>
                  <span className="text-gray-400 text-xl">?</span>
                </div>
                <button onClick={() => setShowCreateLock(true)} className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2.5 rounded-2xl text-sm tracking-widest transition-all active:scale-95">
                  CREATE LOCK
                </button>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-8 text-center">
                <p className="text-gray-400 text-sm">Create a lock and vote to receive<br />fees and incentives.</p>
              </div>
            </div>
          )}

          {/* CREATE LOCK */}
          {activeTab === 'LOCKS' && showCreateLock && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="font-bold tracking-widest text-lg">NEW LOCK</h2>
                <button onClick={() => setShowCreateLock(false)} className="text-gray-400">Cancel</button>
              </div>
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                <div className="mb-4">
                  <label className="text-xs text-gray-400 block mb-1">Amount to lock</label>
                  <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-2xl p-4">
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                      <span>🔒</span>
                      <span className="font-bold">LitVM</span>
                    </div>
                    <input type="text" placeholder="0" className="flex-1 text-3xl bg-transparent focus:outline-none text-right" />
                  </div>
                </div>
                <button className="w-full mt-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold py-4 rounded-2xl text-sm tracking-widest">
                  CREATE LOCK
                </button>
              </div>
            </div>
          )}

          {/* ==================== VOTES ==================== */}
          {activeTab === 'VOTES' && (
            <div className="space-y-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm text-gray-400">Voting deadline for</div>
                    <div className="text-xl font-bold">Epoch #45</div>
                  </div>
                  <div className="bg-yellow-400/10 text-yellow-400 px-4 py-2 rounded-2xl font-mono text-sm text-center">
                    00d:18h:59m:37s
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  Voters earn rewards by driving LitVM emissions to pools. Epoch flip is one hour following the voting deadline.
                </p>
              </div>

              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm">Votes already cast this epoch</span>
                  <span className="font-mono">446.90M / 969.36M</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full mb-6 overflow-hidden">
                  <div className="h-full bg-yellow-400 w-[46%] rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>Total Fees:</div>
                  <div className="text-right font-mono text-emerald-400">\~$86,502</div>
                  <div>Total Incentives:</div>
                  <div className="text-right font-mono">\~$6,452</div>
                  <div>Total Rewards:</div>
                  <div className="text-right font-mono text-emerald-400">\~$92,954</div>
                  <div>Total Emissions:</div>
                  <div className="text-right font-mono">11.07M</div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold tracking-widest">Select Liquidity Pools for Voting</span>
                  <span className="text-gray-400 text-xl">?</span>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-3">
                  <button className="bg-yellow-400 text-black px-6 py-2 rounded-2xl font-bold text-sm whitespace-nowrap">ALL</button>
                  <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-2xl font-medium text-sm whitespace-nowrap">BASIC</button>
                  <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-2xl font-medium text-sm whitespace-nowrap">CONCENTRATED</button>
                  <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-2xl font-medium text-sm whitespace-nowrap">STABLE</button>
                  <button className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-2xl font-medium text-sm whitespace-nowrap">VOLATILE</button>
                </div>

                <div className="relative mb-4">
                  <input type="text" placeholder="name or address..." className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 px-4 pl-12 text-sm" />
                  <div className="absolute left-4 top-3.5 text-gray-400">🔍</div>
                </div>

                <div className="grid grid-cols-7 text-[10px] font-bold text-gray-400 border-b border-white/10 pb-2 mb-2">
                  <div>POOLS</div>
                  <div className="text-center">TVL</div>
                  <div className="text-center">FEES</div>
                  <div className="text-center">INCENTIVES</div>
                  <div className="text-center">TOTAL REWARDS</div>
                  <div className="text-center">VAPR</div>
                  <div className="text-center">VOTES</div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-12 text-center">
                  <p className="text-gray-400">No pools selected yet</p>
                </div>
              </div>
            </div>
          )}

          {/* INCENTIVES PAGE - Mirip Gambar */}
          {activeTab === 'INCENTIVES' && (
            <div className="space-y-6">
              {/* Pool Info */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center text-xl">🔄</div>
                  <div>
                    <div className="font-bold">CL200-GUN/WAVAX</div>
                    <div className="text-xs text-gray-400">0.25% • Gauge</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm border-t border-white/10 pt-4">
                  <div>
                    <div className="text-gray-400 text-xs">Liquidity</div>
                    <div className="font-mono">151,112.1 GUN</div>
                    <div className="font-mono text-xs text-gray-400">23.97 WAVAX</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Your Deposits</div>
                    <div className="font-mono">0 GUN</div>
                    <div className="font-mono text-xs text-gray-400">0 WAVAX</div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
                  <div>
                    <div className="text-gray-400 text-xs">APR</div>
                    <div className="font-bold text-emerald-400">2,607.6%</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Current Votes</div>
                    <div className="font-mono">145,548.76</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Current Incentives</div>
                    <div className="font-mono text-emerald-400">-$0.02197</div>
                  </div>
                </div>
              </div>

              {/* Incentive Input */}
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm">Your Incentive</span>
                  <span className="text-sm text-gray-400">Available 0 LitVM</span>
                </div>
                <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-2xl p-4">
                  <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl">
                    <span>🔒</span>
                    <span className="font-bold">LitVM</span>
                  </div>
                  <input type="text" placeholder="0" className="flex-1 text-3xl bg-transparent focus:outline-none text-right" />
                </div>
              </div>

              {/* Warning & Confirm */}
              <div className="bg-yellow-400/10 border border-yellow-400/30 rounded-3xl p-5 text-sm">
                <p className="text-yellow-400 font-medium">Warning: Only proceed if you understand the risks.</p>
                <p className="text-gray-400 text-xs mt-1">Actions are final and irreversible. Deposited funds will be used as voting rewards for veLitVM voters at epoch flip.</p>
              </div>

              <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-4 rounded-2xl text-sm tracking-widest transition-all active:scale-95">
                CONFIRM
              </button>

              {/* Status Steps */}
              <div className="space-y-4 pt-4">
                <div className="flex gap-3 items-center text-sm">
                  <div className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">✓</div>
                  <span>Gauge for GUN/WAVAX found</span>
                </div>
                <div className="flex gap-3 items-center text-sm">
                  <div className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">🔒</div>
                  <span>LitVM can be used as incentives</span>
                </div>
                <div className="flex gap-3 items-center text-sm">
                  <div className="w-6 h-6 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center">🔒</div>
                  <span>LitVM access granted</span>
                </div>
                <div className="flex gap-3 items-center text-sm opacity-60">
                  <div className="w-6 h-6 border border-white/30 rounded-full flex items-center justify-center">✕</div>
                  <span>Waiting for pending actions...</span>
                </div>
              </div>
            </div>
          )}

          {/* DEFAULT PAGE */}
          {activeTab !== 'SWAP' && activeTab !== 'LIQUIDITY' && activeTab !== 'PORTFOLIO' && activeTab !== 'LOCKS' && activeTab !== 'VOTES' && activeTab !== 'INCENTIVES' && (
            <div className="py-12 text-center">
              <span className="text-4xl mb-4 block">⚡</span>
              <h3 className="text-lg font-bold">Entering {activeTab} Module</h3>
              <p className="text-white/40 mt-2">Under Development</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
                  }
