import React from 'react';
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
 * CalorieChart Component
 * Visualizes the relationship between caloric intake and metabolic burn.
 */
const CalorieChart = ({ data }) => {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden h-[400px] w-full">
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div>
          <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">Performance Matrix</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Daily Energy Balance</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Intake</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Burned</span>
          </div>
        </div>
      </div>
      
      <div className="h-64 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <YAxis hide domain={['auto', 'auto']} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #1e293b', 
                borderRadius: '16px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
              }} 
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
              labelStyle={{ color: '#64748b', marginBottom: '4px', fontSize: '10px', textTransform: 'uppercase' }}
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
  );
};

export default CalorieChart;