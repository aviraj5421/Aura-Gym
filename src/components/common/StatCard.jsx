import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { clsx } from 'clsx';

/**
 * StatCard Component
 * Displays a metric with an icon, trend indicator, and premium styling.
 */
const StatCard = ({ label, value, unit, trend, icon, color = 'emerald' }) => {
  const colorVariants = {
    emerald: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10 shadow-emerald-500/5',
    rose: 'text-rose-400 border-rose-500/20 bg-rose-500/10 shadow-rose-500/5',
    amber: 'text-amber-400 border-amber-500/20 bg-amber-500/10 shadow-amber-500/5',
    blue: 'text-blue-400 border-blue-500/20 bg-blue-500/10 shadow-blue-500/5',
  };

  const isPositive = trend?.startsWith('+');
  const isNegative = trend?.startsWith('-');

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] hover:bg-slate-800/50 transition-all group shadow-xl relative overflow-hidden">
      {/* Background Glow */}
      <div className={clsx(
        "absolute -top-10 -right-10 w-24 h-24 blur-[60px] opacity-20 transition-opacity group-hover:opacity-40",
        isPositive ? "bg-emerald-500" : isNegative ? "bg-rose-500" : "bg-blue-500"
      )} />

      <div className="flex justify-between items-start mb-6">
        <div className={clsx("p-3 rounded-2xl border transition-transform group-hover:scale-110 duration-500", colorVariants[color])}>
          {icon}
        </div>
        
        {trend && (
          <div className={clsx(
            "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border transition-all",
            isPositive ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500" : 
            isNegative ? "bg-rose-500/10 border-rose-500/20 text-rose-500" : 
            "bg-slate-800 border-slate-700 text-slate-400"
          )}>
            {isPositive && <TrendingUp size={10} />}
            {isNegative && <TrendingDown size={10} />}
            {!isPositive && !isNegative && <Minus size={10} />}
            {trend}
          </div>
        )}
      </div>

      <div>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">
          {label}
        </p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">
            {value}
          </span>
          <span className="text-xs text-slate-600 font-bold uppercase">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;