// app/page.tsx
'use client';

import { useState } from 'react';
import { Menu, X, ArrowDown } from 'lucide-react';

export default function LitVMDex() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-[#0a1428] border-b border-blue-900/50 fixed w-full z-50 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:text-blue-400 transition"
          >
            <Menu size={32} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center font-bold text-3xl shadow-lg">
              L
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold tracking-tighter">LitVM</span>
              <span className="text-blue-400 text-lg -mt-1">Dex</span>
            </div>
          </div>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-2xl font-semibold transition">
          CONNECT WALLET
        </button>
      </nav>

      {/* Sidebar Menu */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-[#0a1428] border-r border-blue-900/50 z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="pt-20 px-4">
          <button onClick={() => setIsSidebarOpen(false)} className="absolute top-6 right-6">
            <X size={32} />
          </button>

          <ul className="mt-10 space-y-2">
            <li><a href="#" className="nav-link flex items-center gap-4 px-6 py-4 text-blue-400 bg-blue-900/30 rounded-2xl"><Menu size={22} /> Swap</a></li>
            <li><a href="#" className="nav-link flex items-center gap-4 px-6 py-4 rounded-2xl"><span className="text-xl">💼</span> Portfolio</a></li>
            <li><a href="#" className="nav-link flex items-center gap-4 px-6 py-4 rounded-2xl"><span className="text-xl">🔒</span> Locks</a></li>
            <li><a href="#" className="nav-link flex items-center gap-4 px-6 py-4 rounded-2xl"><span className="text-xl">🗳️</span> Votes</a></li>
            <li><a href="#" className="nav-link flex items-center gap-4 px-6 py-4 rounded-2xl"><span className="text-xl">🎁</span> Incentives</a></li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-24 px-4 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold tracking-tighter mb-3">LitVM Dex</h1>
          <p className="text-blue-300 text-xl">The central trading and liquidity hub</p>
        </div>

        {/* Swap Box */}
        <div className="bg-[#112240] border border-blue-900/50 rounded-3xl p-8">
          <div className="flex gap-2 mb-8 border-b border-blue-900 pb-2">
            <button className="bg-blue-600 px-8 py-3 rounded-2xl font-semibold">Swap</button>
            <button className="px-8 py-3 rounded-2xl hover:bg-blue-900/50 transition">Limit</button>
          </div>

          {/* From */}
          <div className="bg-[#0a1428] rounded-2xl p-6 mb-3">
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-gray-400">From</span>
              <span className="text-blue-400 cursor-pointer hover:underline">Max</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-2xl flex items-center justify-center text-3xl">A</div>
              <div className="flex-1">
                <select className="bg-transparent text-2xl font-medium w-full focus:outline-none">
                  <option>Token A</option>
                </select>
              </div>
              <input type="text" placeholder="0.00" className="text-4xl text-right bg-transparent w-36 focus:outline-none" />
            </div>
          </div>

          {/* Swap Arrow */}
          <div className="flex justify-center -my-4 relative z-10">
            <div className="bg-[#0a1428] p-4 rounded-2xl border border-blue-900">
              <ArrowDown size={32} className="text-blue-400" />
            </div>
          </div>

          {/* To */}
          <div className="bg-[#0a1428] rounded-2xl p-6">
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-gray-400">To</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-3xl">B</div>
              <div className="flex-1">
                <select className="bg-transparent text-2xl font-medium w-full focus:outline-none">
                  <option>Token B</option>
                </select>
              </div>
              <input type="text" placeholder="0.00" className="text-4xl text-right bg-transparent w-36 focus:outline-none" />
            </div>
          </div>

          <button className="w-full mt-10 bg-gradient-to-r from-blue-600 to-cyan-500 py-5 text-xl font-bold rounded-2xl hover:brightness-110 transition">
            SWAP
          </button>
        </div>
      </div>
    </div>
  );
}
