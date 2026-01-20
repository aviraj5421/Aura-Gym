import React, { useState } from 'react';
import { Dumbbell, Clock, Flame, CheckCircle2, Plus, Calendar } from 'lucide-react';

const Workouts = ({ user }) => {
  const [activeTab, setActiveTab] = useState('plan');

  const routines = [
    {
      id: 1,
      name: "Compound Strength A",
      duration: "55m",
      intensity: "High",
      exercises: [
        { name: 'Barbell Squat', sets: 4, reps: '8-10', weight: '100kg', status: 'done' },
        { name: 'Bench Press', sets: 4, reps: '8-10', weight: '80kg', status: 'pending' },
        { name: 'Overhead Press', sets: 3, reps: '12', weight: '45kg', status: 'pending' }
      ]
    }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">Active <span className="text-rose-500">Regimen</span></h3>
          <p className="text-slate-500 text-xs font-bold uppercase mt-1">Hypertrophy Phase • Week 4</p>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all"><Calendar size={18}/></button>
          <button className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-all">+ New Log</button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {routines.map(routine => (
          <div key={routine.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
              <div>
                <h4 className="text-lg font-bold text-white">{routine.name}</h4>
                <div className="flex gap-4 mt-1">
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase"><Clock size={12}/> {routine.duration}</span>
                  <span className="flex items-center gap-1.5 text-[10px] text-slate-500 font-bold uppercase"><Flame size={12} className="text-rose-500"/> {routine.intensity}</span>
                </div>
              </div>
              <button className="text-xs font-black text-emerald-500 uppercase tracking-widest">Start Session</button>
            </div>
            <div className="p-6 space-y-4">
              {routine.exercises.map((ex, i) => (
                <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${ex.status === 'done' ? 'bg-emerald-500/5 border-emerald-500/20 opacity-60' : 'bg-slate-950 border-slate-800'}`}>
                  <div className={`w-6 h-6 rounded-lg border flex items-center justify-center ${ex.status === 'done' ? 'bg-emerald-500 border-emerald-500 text-slate-950' : 'border-slate-700 text-transparent'}`}>
                    <CheckCircle2 size={14} />
                  </div>
                  <div className="flex-1">
                    <p className={`font-bold ${ex.status === 'done' ? 'text-emerald-500' : 'text-slate-200'}`}>{ex.name}</p>
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{ex.sets} Sets • {ex.reps} Reps • {ex.weight}</p>
                  </div>
                  <Plus size={16} className="text-slate-700 cursor-pointer hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Workouts;