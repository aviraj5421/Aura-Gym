import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { 
  Dumbbell, LayoutDashboard, Utensils, CreditCard, Users, 
  Settings, LogOut, Zap, Activity, Flame, Apple, Clock, 
  ChevronRight, CheckCircle2, QrCode, Plus, TrendingUp,
  Award, Calendar, Filter
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, doc, getDoc, setDoc, collection, 
  onSnapshot, query, where, addDoc 
} from 'firebase/firestore';
import { 
  getAuth, onAuthStateChanged, signInAnonymously, 
  signInWithCustomToken, signOut 
} from 'firebase/auth';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// --- CONFIGURATION ---
const firebaseConfig = JSON.parse(__firebase_config);
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'aura-fitness-pro';

// --- UTILITIES ---
const formatDate = (date) => {
  if (!date) return 'N/A';
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const isSubscriptionExpired = (expiry) => Date.now() > expiry;

const calculateCaloriesBurned = (met, weight, duration) => Math.round(met * weight * (duration / 60));

// --- AUTH CONTEXT ---
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
        await signInWithCustomToken(auth, __initial_auth_token);
      } else {
        await signInAnonymously(auth);
      }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const userRef = doc(db, 'artifacts', appId, 'users', u.uid);
        const snap = await getDoc(userRef);
        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          // Initialize default member data for new anonymous users
          const defaultData = {
            uid: u.uid,
            name: "Elite Member",
            role: 'MEMBER',
            weight: 75,
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
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, logout: () => signOut(auth) }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// --- UI COMPONENTS ---

const Sidebar = ({ currentTab, setTab, role, logout }) => (
  <aside className="fixed left-0 top-0 h-screen w-20 md:w-64 bg-slate-900 border-r border-slate-800 z-50 transition-all">
    <div className="p-6 mb-8 flex items-center gap-3">
      <div className="p-2 rounded-lg bg-emerald-500 shadow-lg shadow-emerald-500/20">
        <Zap className="w-6 h-6 text-white" />
      </div>
      <span className="hidden md:block text-xl font-bold tracking-tighter italic text-white">
        AURA<span className="text-emerald-500">PRO</span>
      </span>
    </div>

    <nav className="px-3 space-y-2">
      <NavItem active={currentTab === 'dashboard'} icon={<LayoutDashboard size={20}/>} label="Dashboard" onClick={() => setTab('dashboard')} />
      {role === 'MEMBER' && (
        <>
          <NavItem active={currentTab === 'workout'} icon={<Dumbbell size={20}/>} label="Workouts" onClick={() => setTab('workout')} />
          <NavItem active={currentTab === 'nutrition'} icon={<Utensils size={20}/>} label="Nutrition" onClick={() => setTab('nutrition')} />
          <NavItem active={currentTab === 'entry'} icon={<CreditCard size={20}/>} label="Entry Card" onClick={() => setTab('entry')} />
        </>
      )}
      {role === 'TRAINER' && (
        <NavItem active={currentTab === 'members'} icon={<Users size={20}/>} label="Member Control" onClick={() => setTab('members')} />
      )}
      <div className="pt-8 mt-8 border-t border-slate-800">
        <NavItem active={false} icon={<LogOut size={20}/>} label="Sign Out" onClick={logout} />
      </div>
    </nav>
  </aside>
);

const NavItem = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
      active 
        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
    }`}
  >
    {icon}
    <span className="hidden md:block font-medium">{label}</span>
  </button>
);

const StatCard = ({ label, value, unit, icon, colorClass }) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4 hover:bg-slate-800/50 transition-colors shadow-xl">
    <div className={`p-3 bg-slate-950 rounded-xl border border-slate-800 ${colorClass}`}>{icon}</div>
    <div>
      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-white">{value}</span>
        <span className="text-[10px] text-slate-500 font-bold">{unit}</span>
      </div>
    </div>
  </div>
);

// --- PAGES ---

const MemberDashboard = ({ user }) => {
  const chartData = [
    { name: 'Mon', burn: 400, intake: 2100 },
    { name: 'Tue', burn: 600, intake: 1900 },
    { name: 'Wed', burn: 300, intake: 2300 },
    { name: 'Thu', burn: 800, intake: 2000 },
    { name: 'Fri', burn: 700, intake: 2050 },
    { name: 'Sat', burn: 1100, intake: 2400 },
    { name: 'Sun', burn: 500, intake: 2100 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Burned" value="2,840" unit="kcal" icon={<Flame size={20}/>} colorClass="text-rose-500" />
        <StatCard label="Intake" value="2,150" unit="kcal" icon={<Apple size={20}/>} colorClass="text-emerald-500" />
        <StatCard label="Streak" value="14" unit="days" icon={<Zap size={20}/>} colorClass="text-amber-500" />
        <StatCard label="Target" value="92" unit="%" icon={<Award size={20}/>} colorClass="text-blue-500" />
      </div>
      
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-black italic text-white uppercase tracking-tighter">Performance <span className="text-emerald-500">Analytics</span></h3>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500"/> Intake</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-rose-500"/> Burned</div>
          </div>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
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
              <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
              <Area type="monotone" dataKey="intake" stroke="#10b981" fillOpacity={1} fill="url(#colorIntake)" strokeWidth={3} />
              <Area type="monotone" dataKey="burn" stroke="#f43f5e" fillOpacity={1} fill="url(#colorBurn)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const EntryCard = ({ user }) => {
  const isExpired = isSubscriptionExpired(user.subscription.expiry);
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in zoom-in-95 duration-500">
      <div className={`w-[340px] h-[520px] relative rounded-[2.5rem] p-8 overflow-hidden border-4 ${isExpired ? 'border-rose-500/50' : 'border-emerald-500/50'} shadow-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900`}>
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-emerald-500 text-[10px] font-black tracking-widest uppercase mb-1">Elite Membership</p>
            <h3 className="text-2xl font-black italic text-white">AURA<span className="text-slate-500 font-light">FIT</span></h3>
          </div>
          <div className="w-12 h-12 bg-slate-800/80 rounded-2xl flex items-center justify-center border border-slate-700">
            <QrCode className="w-8 h-8 text-white opacity-40" />
          </div>
        </div>

        <div className="text-center space-y-4 mb-12">
          <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-950 mx-auto overflow-hidden flex items-center justify-center text-4xl">
            👤
          </div>
          <div>
            <h4 className="text-xl font-bold text-white">{user.name}</h4>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">ID: {user.uid.slice(-8).toUpperCase()}</p>
          </div>
        </div>

        <div className="space-y-4 pt-6 border-t border-slate-800/50">
          <div className="flex justify-between items-center px-4">
            <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">STATUS</p>
              <p className={`text-sm font-bold ${isExpired ? 'text-rose-400' : 'text-emerald-400'}`}>
                {isExpired ? 'EXPIRED' : 'ACTIVE'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">EXPIRES</p>
              <p className="text-sm font-bold text-white">{formatDate(user.subscription.expiry)}</p>
            </div>
          </div>
          <div className={`py-4 rounded-2xl text-center font-black text-sm tracking-widest uppercase border-2 ${isExpired ? 'bg-rose-500/10 border-rose-500/20 text-rose-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'}`}>
            {isExpired ? 'ACCESS DENIED' : 'VERIFIED ACCESS'}
          </div>
        </div>
      </div>
      <p className="mt-8 text-slate-500 text-sm italic">Scan at the front desk for seamless check-in</p>
    </div>
  );
};

// --- APP ENTRY ---

const AppContent = () => {
  const { user, userData, logout } = useAuth();
  const [currentTab, setCurrentTab] = useState('dashboard');

  if (!user || !userData) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full text-center shadow-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-emerald-500 mx-auto mb-6"></div>
        <h1 className="text-2xl font-black italic text-white mb-2 tracking-tighter">AURA<span className="text-emerald-500">FITNESS</span></h1>
        <p className="text-slate-400">Synchronizing performance data...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Sidebar 
        currentTab={currentTab} 
        setTab={setCurrentTab} 
        role={userData.role} 
        logout={logout}
      />
      
      <main className="pl-20 md:pl-64 min-h-screen">
        <header className="px-10 py-6 flex justify-between items-center border-b border-slate-800 sticky top-0 bg-slate-950/90 backdrop-blur-xl z-40">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight uppercase italic">{currentTab}</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Precision Tracking v1.0</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <p className="text-sm font-bold text-white">{userData.name}</p>
               <p className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter">Gold Tier</p>
             </div>
             <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl font-bold shadow-lg">
               {userData.name[0]}
             </div>
          </div>
        </header>

        <section className="p-10 max-w-7xl mx-auto">
          {currentTab === 'dashboard' && <MemberDashboard user={userData} />}
          {currentTab === 'entry' && <EntryCard user={userData} />}
          {currentTab === 'workout' && <div className="text-center py-20 text-slate-500 italic">Workouts module loading...</div>}
          {currentTab === 'nutrition' && <div className="text-center py-20 text-slate-500 italic">Nutrition module loading...</div>}
          {currentTab === 'members' && <div className="text-center py-20 text-slate-500 italic">Trainer Control module loading...</div>}
        </section>
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}