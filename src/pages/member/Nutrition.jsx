import React from 'react';
import { Utensils, Apple, Droplets, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

const Nutrition = ({ user }) => {
  const meals = [
    { name: 'Power Breakfast', time: '07:30 AM', items: 'Oats, Berries, Whey', cals: 450, macros: '35P 50C 10F', status: 'eaten' },
    { name: 'Post-Workout', time: '11:00 AM', items: 'Chicken, Rice, Broccoli', cals: 620, macros: '50P 60C 12F', status: 'eaten' },
    { name: 'Lean Dinner', time: '07:30 PM', items: 'Salmon, Asparagus', cals: 510, macros: '45P 10C 25F', status: 'pending' }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black italic text-white uppercase">Nutrition <span className="text-emerald-500">Log</span></h3>
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-bold uppercase">Today's Intake</p>
              <p className="text-2xl font-black text-white">1,580 <span className="text-xs text-slate-600">/ 2,400</span></p>
            </div>
          </div>

          <div className="space-y-6">
            {meals.map((meal, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <span className="text-[10px] font-black text-slate-600 uppercase mb-2">{meal.time}</span>
                  <div className={`w-1 flex-1 rounded-full ${meal.status === 'eaten' ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                </div>
                <div className="flex-1 pb-8 border-b border-slate-800/50 group-last:border-0 group-last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-slate-200">{meal.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">{meal.items}</p>
                      <p className="text-[10px] text-slate-700 font-black uppercase tracking-widest mt-2">{meal.macros}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-white">{meal.cals} kcal</p>
                      <button className={`mt-2 text-[10px] font-black uppercase px-2 py-1 rounded border ${meal.status === 'eaten' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'border-slate-800 text-slate-600'}`}>
                        {meal.status}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-slate-900 to-blue-950/20">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-sm font-black uppercase tracking-widest text-blue-400">Hydration</h4>
            <Droplets size={20} className="text-blue-500" />
          </div>
          <div className="flex justify-between items-end h-24 gap-1.5 mb-4">
            {[1, 1, 1, 1, 0.4, 0, 0, 0].map((level, i) => (
              <div key={i} className={`flex-1 rounded-t-lg transition-all ${level > 0 ? 'bg-blue-500' : 'bg-slate-800'}`} style={{ height: `${level * 100}%` }} />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-lg font-black">2.4 <span className="text-xs text-slate-500">LITERS</span></p>
            <button className="p-2 rounded-lg bg-blue-500 text-white shadow-lg shadow-blue-500/20">+</button>
          </div>
        </div>

        <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
          <Zap className="text-emerald-500 mb-4" size={24} />
          <h4 className="text-sm font-bold text-white mb-2">Smart Suggestion</h4>
          <p className="text-xs text-slate-400 leading-relaxed italic">
            "Based on your high intensity squat session, prioritize an extra 20g of protein in your dinner for muscle recovery."
          </p>
        </div>
      </div>
    </div>
  );
};

export default Nutrition;