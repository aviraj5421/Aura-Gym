import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import * as ReactDOMClient from 'react-dom/client';
import './styles/tailwind.css';
import { 
  Dumbbell, LayoutDashboard, Utensils, CreditCard, Users, 
  LogOut, Zap, Activity, Flame, Apple, Clock, CheckCircle2, 
  QrCode, Plus, TrendingUp, Award, Target, ShieldCheck, 
  Settings, ChevronRight, Bell, Search, MapPin
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, doc, getDoc, setDoc, collection, 
  onSnapshot, query, where, addDoc, updateDoc, orderBy, limit 
} from 'firebase/firestore';
import { 
  getAuth, onAuthStateChanged, signInAnonymously, 
  signInWithCustomToken, signOut 
} from 'firebase/auth';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// --- STYLES (Tailwind classes consolidated for single-file runtime) ---
const UI = {
  glass: "bg-slate-900/60 backdrop-blur-xl border border-slate-800",
  card: "bg-slate-900 border border-slate-800 rounded-[2rem] p-6 shadow-xl",
  button: "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50",
  input: "w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-700",
};

// --- CONFIGURATION & FIREBASE ---
const getFirebaseConfig = () => {
  // Priority 1: Canvas injected global config
  if (typeof __firebase_config !== 'undefined' && __firebase_config) {
    try {
      return JSON.parse(__firebase_config);
    } catch (e) {
      console.error("Failed to parse __firebase_config", e);
    }
  }
  
  // Priority 2: Local development environment variables (Vite pattern)
  let env = {};
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      env = import.meta.env;
    }
  } catch (e) {}

  return {
    apiKey: env.VITE_FIREBASE_API_KEY || "",
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "",
    projectId: env.VITE_FIREBASE_PROJECT_ID || "",
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: env.VITE_FIREBASE_APP_ID || ""
  };
};

const firebaseConfig = getFirebaseConfig();
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'aura-fitness-pro';

// --- AUTH CONTEXT ---
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          // Attempt anonymous sign-in, but catch errors if it's disabled in console
          await signInAnonymously(auth).catch((err) => {
            if (err.code === 'auth/admin-restricted-operation') {
              console.warn("Anonymous Auth is disabled in Firebase Console. App will run in guest mode.");
            } else {
              throw err;
            }
          });
        }
      } catch (err) { 
        console.error("Auth init failed:", err); 
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        try {
          const userRef = doc(db, 'artifacts', appId, 'users', u.uid);
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            setUserData(snap.data());
          } else {
            const defaultData = {
              uid: u.uid,
              name: "Elite Athlete",
              role: 'MEMBER',
              weight: 75,
              height: 180,
              subscription: {
                active: true,
                plan: 'yearly',
                expiry: Date.now() + (365 * 24 * 60 * 60 * 1000),
                started: Date.now()
              }
            };
            await setDoc(userRef, defaultData);
            setUserData(defaultData);
          }
          setUser(u);
        } catch (e) {
          console.error("Error fetching user data", e);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, logout: () => signOut(auth) }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// --- UTILITIES ---
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

// --- COMPONENTS ---

const StatCard = ({ label, value, unit, icon, colorClass, trend }) => (
  <div className={`${UI.card} flex items-center gap-4 hover:bg-slate-800/50 transition-all group`}>
    <div className={`p-3 bg-slate-950 rounded-xl border border-slate-800 ${colorClass}`}>{icon}</div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{label}</p>
        {trend && <span className={`text-[10px] font-black ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>{trend}</span>}
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors">{value}</span>
        <span className="text-[10px] text-slate-500 font-bold uppercase">{unit}</span>
      </div>
    </div>
  </div>
);

const Dashboard = ({ userData }) => {
  const chartData = useMemo(() => [
    { name: 'Mon', burn: 400, intake: 2100 }, 
    { name: 'Tue', burn: 600, intake: 1900 },
    { name: 'Wed', burn: 300, intake: 2300 }, 
    { name: 'Thu', burn: 800, intake: 2000 },
    { name: 'Fri', burn: 700, intake: 2050 }, 
    { name: 'Sat', burn: 1100, intake: 2400 },
    { name: 'Sun', burn: 500, intake: 2100 }
  ], []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Burned" value="2,840" unit="kcal" icon={<Flame size={20}/>} colorClass="text-rose-500" trend="+12%" />
        <StatCard label="Intake" value="2,150" unit="kcal" icon={<Apple size={20}/>} colorClass="text-emerald-500" trend="-5%" />
        <StatCard label="Streak" value="14" unit="days" icon={<Zap size={20}/>} colorClass="text-amber-500" trend="Elite" />
        <StatCard label="Target" value="92" unit="%" icon={<Target size={20}/>} colorClass="text-blue-500" trend="+3%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="flex justify-between items-center mb-8 relative z-10">
            <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">Performance Matrix</h3>
            <div className="flex gap-4 text-[10px] font-bold uppercase">
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"/> Intake</div>
              <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"/> Burned</div>
            </div>
          </div>
          {/* Fix: Added minWidth={0} and explicit style height to ResponsiveContainer to prevent -1 height calculation error */}
          <div className="h-80 w-full relative z-10 overflow-hidden">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorIntake" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorBurn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '16px' }} />
                <Area type="monotone" dataKey="intake" stroke="#10b981" fillOpacity={1} fill="url(#colorIntake)" strokeWidth={3} />
                <Area type="monotone" dataKey="burn" stroke="#f43f5e" fillOpacity={1} fill="url(#colorBurn)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] shadow-xl">
            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2"><Award className="text-amber-500" size={18}/> Milestones</h3>
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-950/50 border border-slate-800/50">
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-emerald-500"><TrendingUp size={16}/></div>
              <div><p className="text-xs font-bold text-white">Strength Catalyst</p><p className="text-[10px] text-slate-500">100kg Squat Hit</p></div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-[2.5rem] shadow-xl group cursor-pointer overflow-hidden relative">
            <Dumbbell className="text-white mb-4 relative z-10" size={24}/>
            <h4 className="text-xl font-black text-white italic uppercase relative z-10">Next Training</h4>
            <p className="text-emerald-100/70 text-[10px] font-bold uppercase tracking-widest mt-1 relative z-10">Lower Body Power • 18:00</p>
            <div className="absolute -bottom-4 -right-4 opacity-10 group-hover:scale-110 transition-transform">
                <Dumbbell size={100} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---

const App = () => {
  const { userData, loading, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState('dashboard');

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500"></div>
    </div>
  );

  // Fallback for UI if userData is not loaded yet (e.g. auth failed)
  const safeUserData = userData || { name: "Guest User", role: "GUEST" };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-emerald-500/30">
      {/* Navigation Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-slate-900 border-r border-slate-800 z-50 flex flex-col">
        <div className="p-6 mb-8 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500 shadow-lg shadow-emerald-500/20"><Zap className="w-6 h-6 text-white" /></div>
          <span className="hidden md:block text-xl font-black tracking-tighter italic text-white uppercase">Aura<span className="text-emerald-500">Pro</span></span>
        </div>
        <nav className="flex-1 px-3 space-y-2">
          <NavButton active={currentTab === 'dashboard'} onClick={() => setCurrentTab('dashboard')} icon={<LayoutDashboard size={20}/>} label="Dashboard" />
          <NavButton active={currentTab === 'workout'} onClick={() => setCurrentTab('workout')} icon={<Dumbbell size={20}/>} label="Workouts" />
          <NavButton active={currentTab === 'nutrition'} onClick={() => setCurrentTab('nutrition')} icon={<Utensils size={20}/>} label="Nutrition" />
          <NavButton active={currentTab === 'entry'} onClick={() => setCurrentTab('entry')} icon={<CreditCard size={20}/>} label="Entry Card" />
        </nav>
        <div className="p-4 border-t border-slate-800 mt-auto">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-rose-500 hover:bg-rose-500/10 transition-all font-bold">
            <LogOut size={20}/><span className="hidden md:block">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="pl-20 md:pl-64 min-h-screen flex flex-col">
        <header className="px-10 py-6 flex justify-between items-center border-b border-slate-800 sticky top-0 bg-slate-950/90 backdrop-blur-xl z-40">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">{currentTab}</h2>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Precision Performance v1.0</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-black text-white">{safeUserData.name}</p>
              <p className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter">
                {safeUserData.role === 'MEMBER' ? 'Elite Tier Member' : safeUserData.role}
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl font-bold shadow-lg">
              {safeUserData.name?.charAt(0)}
            </div>
          </div>
        </header>
        
        <section className="p-10 max-w-7xl mx-auto w-full">
          {currentTab === 'dashboard' && <Dashboard userData={safeUserData} />}
          {currentTab === 'entry' && <div className="text-center p-20 text-slate-500 italic">Entry Card Module (Consolidated)</div>}
          {currentTab === 'workout' && <div className="text-center p-20 text-slate-500 italic">Workout Module (Consolidated)</div>}
          {currentTab === 'nutrition' && <div className="text-center p-20 text-slate-500 italic">Nutrition Module (Consolidated)</div>}
        </section>
      </main>
    </div>
  );
};

const NavButton = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick} 
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
      active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
    }`}
  >
    {icon}<span className="hidden md:block font-bold">{label}</span>
  </button>
);

// --- ROOT MOUNT ---
const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOMClient.createRoot(rootElement);
  root.render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}