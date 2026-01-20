import React from 'react';
import { 
  Flame, 
  Apple, 
  Zap, 
  Award, 
  TrendingUp, 
  Clock, 
  Dumbbell,
  Target,
  ChevronRight,
  Activity
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

/**
 * MemberDashboard Component
 * The primary landing page for members, featuring activity summaries and performance charts.
 */
const MemberDashboard = ({ userData }) => {
  // Mock performance data for the activity chart
  const performanceData = [
    { name: 'Mon', burn: 450, intake: 2100 },
    { name: 'Tue', burn: 620, intake: 1950 },
    { name: 'Wed', burn: 310, intake: 2300 },
    { name: 'Thu', burn: 840, intake: 2050 },
    { name: 'Fri', burn: 710, intake: 2150 },
    { name: 'Sat', burn: 1150, intake: 2500 },
    { name: 'Sun', burn: 520, intake: 2100 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">
            Performance <span className="text-emerald-500">Summary</span>
          </h1>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            System Analysis <span className="text-slate-700 mx-2">•</span> Optimal Recovery Detected
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-2xl">
          <Activity size={16} className="text-emerald-500" />
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Live Sync: Active</span>
        </div>
      </div>

      {/* Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          label="Calories Burned" 
          value="2,840" 
          unit="kcal" 
          icon={<Flame size={20} />} 
          trend="+12.4%" 
          color="rose" 
        />
        <StatCard 
          label="Caloric Intake" 
          value="2,150" 
          unit="kcal" 
          icon={<Apple size={20} />} 
          trend="-5.2%" 
          color="emerald" 
        />
        <StatCard 
          label="Activity Streak" 
          value="14" 
          unit="days" 
          icon={<Zap size={20} />} 
          trend="Elite" 
          color="amber" 
        />
        <StatCard 
          label="Goal Completion" 
          value="92" 
          unit="%" 
          icon={<Target size={20} />} 
          trend="+3.1%" 
          color="blue" 
        />
      </div>

      {/* Charts and Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2 bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-black text-white italic uppercase tracking-tight">Performance Matrix</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Intake</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="text-[10px] font-bold text-slate-500 uppercase">Burn</span>
              </div>
            </div>
          </div>
          
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.5} />
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false}
                  tick={{ fontWeight: 700 }}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: '1px solid #1e293b', 
                    borderRadius: '16px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="intake" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorIntake)" 
                  strokeWidth={3} 
                />
                <Area 
                  type="monotone" 
                  dataKey="burn" 
                  stroke="#f43f5e" 
                  fillOpacity={1} 
                  fill="url(#colorBurn)" 
                  strokeWidth={3} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Achievements & Progress */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] shadow-xl">
            <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Award className="text-amber-500" size={18} />
              Elite Milestones
            </h3>
            <div className="space-y-4">
              <AchievementItem 
                title="Strength Catalyst" 
                desc="100kg Squat Reached" 
                date="Today" 
                icon={<TrendingUp size={14} />} 
              />
              <AchievementItem 
                title="Hydration Pro" 
                desc="7 Day Water Target" 
                date="2d ago" 
                icon={<Activity size={14} />} 
              />
              <AchievementItem 
                title="Consistency King" 
                desc="14 Day Workout Streak" 
                date="3d ago" 
                icon={<Zap size={14} />} 
              />
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-6 rounded-[2.5rem] shadow-2xl shadow-emerald-500/10 group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <Dumbbell className="text-white" size={24} />
              <ChevronRight className="text-white/50 group-hover:translate-x-1 transition-transform" />
            </div>
            <h4 className="text-xl font-black text-white italic uppercase leading-none">Next Training</h4>
            <p className="text-emerald-100/70 text-[10px] font-bold uppercase tracking-widest mt-2">
              Heavy Lower Body <span className="mx-2">•</span> 18:00
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, unit, icon, trend, color }) => {
  const colorMap = {
    rose: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
    emerald: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    blue: 'text-blue-500 bg-blue-500/10 border-blue-500/20',
  };

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] hover:bg-slate-800/50 transition-all group shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-2xl border ${colorMap[color]}`}>
          {icon}
        </div>
        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-full border ${colorMap[color]}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-white group-hover:text-emerald-400 transition-colors">{value}</span>
          <span className="text-xs text-slate-600 font-bold uppercase">{unit}</span>
        </div>
      </div>
    </div>
  );
};

const AchievementItem = ({ title, desc, date, icon }) => (
  <div className="flex items-center gap-4 p-3 rounded-2xl bg-slate-950/50 border border-slate-800/50 hover:border-slate-700 transition-colors cursor-pointer group">
    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-emerald-500 group-hover:border-emerald-500/30 transition-all">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-bold text-slate-200 truncate">{title}</p>
      <p className="text-[10px] text-slate-500 truncate">{desc}</p>
    </div>
    <span className="text-[10px] font-bold text-slate-600 uppercase">{date}</span>
  </div>
);

export default MemberDashboard;