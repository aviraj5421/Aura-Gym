import React from 'react';
import { 
  Bell, 
  Search, 
  Activity, 
  ChevronDown, 
  Zap,
  Flame,
  Target
} from 'lucide-react';

/**
 * Header Component
 * Provides context-aware navigation titles, search, and user status indicators.
 */
const Header = ({ title, userData }) => {
  return (
    <header className="px-6 md:px-10 py-4 flex justify-between items-center border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur-xl z-40">
      {/* Title Section */}
      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-black text-white tracking-tight uppercase italic flex items-center gap-2">
          {title}
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </h2>
        <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mt-0.5">
          Precision Performance <span className="text-slate-700 mx-1">•</span> v1.0.4
        </p>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Quick Stats - Visible on Desktop */}
        <div className="hidden lg:flex items-center gap-4 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-2xl">
          <div className="flex items-center gap-2">
            <Flame size={14} className="text-rose-500" />
            <span className="text-xs font-black text-white">2.8k <span className="text-slate-500 font-medium">kcal</span></span>
          </div>
          <div className="w-px h-4 bg-slate-800" />
          <div className="flex items-center gap-2">
            <Target size={14} className="text-blue-500" />
            <span className="text-xs font-black text-white">92% <span className="text-slate-500 font-medium">Goal</span></span>
          </div>
        </div>

        {/* Interaction Group */}
        <div className="flex items-center gap-2 md:gap-3">
          <button className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all group">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-slate-950 group-hover:scale-110 transition-transform" />
          </button>
          
          <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all hidden sm:block">
            <Search size={20} />
          </button>
        </div>

        {/* User Profile Trigger */}
        <div className="flex items-center gap-3 pl-3 md:pl-6 border-l border-slate-800 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-black text-white group-hover:text-emerald-400 transition-colors">
              {userData?.name || 'Aura Athlete'}
            </p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
              {userData?.role === 'TRAINER' ? 'System Admin' : 'Premium Member'}
            </p>
          </div>
          <div className="relative">
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 p-[2px] shadow-lg shadow-emerald-500/10 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center font-black text-white overflow-hidden text-sm">
                {userData?.name?.charAt(0) || 'A'}
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-slate-950 border border-slate-800 rounded-full p-0.5">
              <ChevronDown size={10} className="text-slate-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;