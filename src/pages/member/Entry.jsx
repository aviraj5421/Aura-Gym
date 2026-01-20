import React, { useState } from 'react';
import { 
  QrCode, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ChevronRight,
  Info,
  RefreshCw
} from 'lucide-react';

/**
 * Entry Page
 * Displays the member's digital access card and QR code for gym check-in.
 */
const Entry = ({ userData }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Logic to determine if access is valid based on subscription
  const isAccessGranted = userData?.subscription?.active && 
                          new Date(userData.subscription.expiry) > new Date();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center">
        <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
          Digital <span className="text-emerald-500">Access</span>
        </h2>
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">
          Tap card to reveal check-in QR
        </p>
      </div>

      {/* Access Card Container */}
      <div 
        className="relative w-[340px] h-[520px] transition-all duration-700 cursor-pointer preserve-3d"
        style={{ 
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d'
        }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <div className="absolute inset-0 backface-hidden rounded-[2.5rem] p-8 border-4 border-emerald-500/30 bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/20 shadow-2xl overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-emerald-500 text-[10px] font-black tracking-widest uppercase mb-1">Elite Membership</p>
              <h3 className="text-2xl font-black italic text-white uppercase">Aura<span className="text-slate-500 font-light">Fit</span></h3>
            </div>
            <div className="w-10 h-10 bg-slate-800/50 rounded-xl flex items-center justify-center border border-slate-700">
              <ShieldCheck className="text-emerald-500" size={24} />
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-950 mx-auto overflow-hidden flex items-center justify-center text-4xl shadow-2xl shadow-black/50">
              👤
            </div>
            <div>
              <h4 className="text-xl font-bold text-white uppercase tracking-tight">{userData?.name || 'Aura Athlete'}</h4>
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">
                UID: {userData?.uid?.slice(-8).toUpperCase() || 'REF-8842'}
              </p>
            </div>
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-800/50">
            <div className="flex justify-between items-center px-2">
              <div className="text-center">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Status</p>
                <p className={`text-sm font-black ${isAccessGranted ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isAccessGranted ? 'ACTIVE' : 'EXPIRED'}
                </p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Expires</p>
                <p className="text-sm font-black text-white">
                  {userData?.subscription?.expiry ? new Date(userData.subscription.expiry).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>
            <div className={`py-4 rounded-2xl text-center font-black text-sm tracking-widest uppercase border-2 transition-colors ${
              isAccessGranted ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-rose-500/10 border-rose-500/20 text-rose-500'
            }`}>
              {isAccessGranted ? 'Verified Access' : 'Renew Required'}
            </div>
          </div>
        </div>

        {/* Back of Card (QR) */}
        <div 
          className="absolute inset-0 backface-hidden rounded-[2.5rem] p-8 border-4 border-slate-800 bg-slate-950 shadow-2xl flex flex-col items-center justify-center text-center"
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="w-full bg-white p-6 rounded-3xl mb-8 flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.05)]">
            <div className="w-48 h-48 bg-slate-950 flex items-center justify-center rounded-xl overflow-hidden p-2">
               <QrCode className="w-full h-full text-white" />
            </div>
          </div>
          <p className="text-slate-400 text-xs font-medium leading-relaxed px-6">
            Present this code to the scanner for session validation. Valid for 1 entry.
          </p>
          <div className="mt-8 flex items-center gap-2 text-slate-600">
             <RefreshCw size={12} className="animate-spin-slow" />
             <span className="text-[10px] font-black uppercase tracking-widest">Rotates every 30s</span>
          </div>
        </div>
      </div>

      {/* Location Status */}
      <div className="flex items-center gap-6 px-6 py-4 bg-slate-900 border border-slate-800 rounded-2xl">
        <div className="flex items-center gap-3">
          <MapPin size={18} className="text-rose-500" />
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Primary Hub</p>
            <p className="text-xs font-bold text-white">Central Performance Facility</p>
          </div>
        </div>
        <div className="w-px h-8 bg-slate-800" />
        <div className="flex items-center gap-3">
          <Clock size={18} className="text-emerald-500" />
          <div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Operating</p>
            <p className="text-xs font-bold text-white">24/7 Access Active</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entry;