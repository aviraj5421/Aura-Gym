import React, { useState } from 'react';
import { 
  Zap, 
  Mail, 
  Lock, 
  ArrowRight, 
  Github, 
  Chrome,
  ShieldCheck,
  Flame
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Login Component
 * Handles user authentication with a premium, high-performance aesthetic.
 */
const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      console.error("Authentication failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-rose-500/10 blur-[100px] rounded-full opacity-20 pointer-events-none" />

      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in-95 duration-700">
        {/* Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-emerald-500/10 mb-4 border border-emerald-500/20 shadow-lg shadow-emerald-500/5">
            <Zap className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
            Aura<span className="text-emerald-500">Fitness</span>
          </h1>
          <p className="text-slate-500 text-sm mt-2 font-medium">Precision. Performance. Progress.</p>
        </div>

        {/* Login Card */}
        <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">
                Identity Profile
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="email" 
                  required 
                  placeholder="athlete@aurapro.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  Access Key
                </label>
                <button type="button" className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">
                  Lost Key?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <input 
                  type="password" 
                  required 
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-2xl pl-12 pr-4 py-4 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-slate-700"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Establish Connection <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Social Auth Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase">
              <span className="bg-[#121a2a] px-4 text-slate-600 tracking-widest">Alternative Sync</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
              <Chrome size={16} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all">
              <Github size={16} /> GitHub
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <p className="text-center mt-8 text-slate-500 text-xs">
          New athlete? <button className="text-emerald-500 font-bold hover:underline">Apply for Aura Membership</button>
        </p>

        {/* Security Badge */}
        <div className="mt-12 flex items-center justify-center gap-2 text-slate-700">
          <ShieldCheck size={14} />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Secured by Aura Quantum v2</span>
        </div>
      </div>
    </div>
  );
};

export default Login;