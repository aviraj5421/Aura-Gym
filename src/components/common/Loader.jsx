import React from 'react';
import { Zap } from 'lucide-react';

/**
 * Loader Component
 * A high-end loading indicator that can be used as a full-page overlay 
 * or an inline component.
 * * @param {boolean} fullPage - If true, renders as a fixed full-screen overlay.
 */
const Loader = ({ fullPage = false }) => {
  const containerClasses = fullPage 
    ? "fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center"
    : "flex flex-col items-center justify-center p-12 w-full";

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping" />
        
        {/* Spinner Ring */}
        <div className="w-16 h-16 border-4 border-slate-800 border-t-emerald-500 rounded-full animate-spin" />
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Zap size={24} className="text-emerald-400 animate-pulse" />
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-[10px] font-black text-white uppercase tracking-[0.3em] animate-pulse">
          Synchronizing Performance
        </p>
        <div className="mt-2 flex gap-1 justify-center">
          <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Loader;