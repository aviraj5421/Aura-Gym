import React from 'react';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Utensils, 
  CreditCard, 
  Users, 
  LogOut, 
  Zap,
  Settings,
  ChevronRight
} from 'lucide-react';

/**
 * Sidebar Component
 * Handles navigation and role-based access control for the main menu.
 */
const Sidebar = ({ currentTab, setTab, role, userData, logout }) => {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-slate-900 border-r border-slate-800 z-50 transition-all duration-300 ease-in-out flex flex-col">
      {/* Branding Section */}
      <div className="p-6 mb-8 flex items-center gap-3">
        <div className="p-2 rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/20 shrink-0">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <span className="hidden md:block text-xl font-black tracking-tighter italic text-white uppercase">
          Aura<span className="text-emerald-500">Pro</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar">
        <NavItem 
          active={currentTab === 'dashboard'} 
          icon={<LayoutDashboard size={20}/>} 
          label="Dashboard" 
          onClick={() => setTab('dashboard')} 
        />

        {role === 'MEMBER' && (
          <>
            <NavItem 
              active={currentTab === 'workout'} 
              icon={<Dumbbell size={20}/>} 
              label="Workouts" 
              onClick={() => setTab('workout')} 
            />
            <NavItem 
              active={currentTab === 'nutrition'} 
              icon={<Utensils size={20}/>} 
              label="Nutrition" 
              onClick={() => setTab('nutrition')} 
            />
            <NavItem 
              active={currentTab === 'entry'} 
              icon={<CreditCard size={20}/>} 
              label="Entry Card" 
              onClick={() => setTab('entry')} 
            />
          </>
        )}

        {role === 'TRAINER' && (
          <>
            <NavItem 
              active={currentTab === 'members'} 
              icon={<Users size={20}/>} 
              label="Member Control" 
              onClick={() => setTab('members')} 
            />
            <NavItem 
              active={currentTab === 'builder'} 
              icon={<Settings size={20}/>} 
              label="Plan Builder" 
              onClick={() => setTab('builder')} 
            />
          </>
        )}
      </nav>

      {/* User Session Section */}
      <div className="p-4 border-t border-slate-800 mt-auto">
        <div className="mb-4">
          <NavItem 
            active={false} 
            icon={<LogOut size={20} className="text-rose-500" />} 
            label="Sign Out" 
            onClick={logout} 
          />
        </div>
        
        {/* Compact User Profile */}
        <div className="hidden md:flex items-center gap-3 p-3 rounded-2xl bg-slate-950/50 border border-slate-800/50 group cursor-pointer hover:border-slate-700 transition-all">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-white shadow-inner">
            {userData?.name?.charAt(0) || 'U'}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-black text-white truncate">{userData?.name || 'User'}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter truncate">
              {role || 'Standard'}
            </p>
          </div>
          <ChevronRight size={14} className="text-slate-700 group-hover:text-slate-400 transition-colors" />
        </div>
      </div>
    </aside>
  );
};

/**
 * Internal NavItem component for Sidebar
 */
const NavItem = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
        : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800/50'
    }`}
  >
    <div className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'} transition-colors`}>
      {icon}
    </div>
    <span className={`hidden md:block font-bold text-sm tracking-tight ${active ? 'text-white' : 'text-slate-500 group-hover:text-slate-200'}`}>
      {label}
    </span>
    {active && (
      <div className="ml-auto hidden md:block w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
    )}
  </button>
);

export default Sidebar;