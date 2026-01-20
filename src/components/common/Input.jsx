import React from 'react';
import { twMerge } from 'tailwind-merge';

/**
 * Common Input Primitive
 * Handles standard form states with the Aura Pro glassmorphism design.
 */
const Input = ({ label, error, icon: Icon, className, ...props }) => {
  return (
    <div className="w-full space-y-2">
      {label && (
        <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
          {label}
        </label>
      ) }
      <div className="relative group">
        {Icon && (
          <Icon 
            size={18} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" 
          />
        )}
        <input
          className={twMerge(
            "w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-700",
            Icon ? "pl-12 pr-4" : "px-4",
            error ? "border-rose-500/50 focus:ring-rose-500" : "border-slate-800",
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-[10px] text-rose-500 font-bold uppercase tracking-tight ml-1 animate-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;