import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';

/**
 * MacroPie Component
 * Displays nutritional breakdown (Protein, Carbs, Fats) in a donut chart.
 */
const MacroPie = ({ data, totalCalories }) => {
  const COLORS = ['#10b981', '#3b82f6', '#f59e0b']; // Emerald, Blue, Amber

  return (
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-[2.5rem] shadow-xl relative h-[400px]">
      <h3 className="text-sm font-black text-white uppercase tracking-widest mb-2">Macro Distribution</h3>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mb-6">Target Precision</p>

      <div className="h-56 w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              paddingAngle={8}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #1e293b', 
                borderRadius: '12px' 
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Centered Summary */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-3xl font-black text-white tracking-tighter italic">
            {totalCalories}
          </span>
          <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
            Kcal Total
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-3 gap-2 mt-8">
        {data.map((macro, index) => (
          <div key={macro.name} className="flex flex-col items-center p-3 rounded-2xl bg-slate-950/50 border border-slate-800/50">
            <div className="flex items-center gap-1.5 mb-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
              <span className="text-[10px] font-black text-slate-400 uppercase">{macro.name}</span>
            </div>
            <span className="text-sm font-black text-white">{macro.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MacroPie;