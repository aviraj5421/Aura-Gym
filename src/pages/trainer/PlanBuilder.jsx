import React, { useState } from 'react';
import { 
  Plus, 
  Dumbbell, 
  Utensils, 
  Save, 
  Trash2, 
  ChevronRight, 
  Zap,
  Clock,
  Flame,
  Apple
} from 'lucide-react';

const PlanBuilder = () => {
  const [activeMode, setActiveMode] = useState('workout'); // workout | nutrition

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">
            Architect <span className="text-rose-500">Studio</span>
          </h3>
          <p className="text-slate-500 text-xs font-bold uppercase mt-1">
            Designing Performance Protocols • Version 2.4
          </p>
        </div>
        
        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button 
            onClick={() => setActiveMode('workout')}
            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              activeMode === 'workout' ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Workouts
          </button>
          <button 
            onClick={() => setActiveMode('nutrition')}
            className={`px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              activeMode === 'nutrition' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Nutrition
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Builder Sidebar - Template Selection */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl">
            <h4 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2">
              <Zap size={16} className="text-amber-500" />
              Quick Templates
            </h4>
            <div className="space-y-3">
              {activeMode === 'workout' ? (
                <>
                  <TemplateItem icon={<Flame size={14}/>} title="Fat Loss Circuit" intensity="High" color="rose" />
                  <TemplateItem icon={<Dumbbell size={14}/>} title="Hypertrophy Split" intensity="Mid" color="blue" />
                  <TemplateItem icon={<Zap size={14}/>} title="Powerlifting Core" intensity="Elite" color="amber" />
                </>
              ) : (
                <>
                  <TemplateItem icon={<Apple size={14}/>} title="Keto Shred" intensity="Strict" color="emerald" />
                  <TemplateItem icon={<Utensils size={14}/>} title="Mass Gainer" intensity="High Cal" color="blue" />
                  <TemplateItem icon={<Zap size={14}/>} title="Competition Prep" intensity="Elite" color="rose" />
                </>
              )}
            </div>
            <button className="w-full mt-6 py-3 border border-dashed border-slate-700 rounded-xl text-xs font-bold text-slate-500 hover:text-white hover:border-slate-500 transition-all">
              + Custom Template
            </button>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 p-6 rounded-2xl">
            <h4 className="text-xs font-black text-emerald-500 uppercase tracking-widest mb-2 text-center">Protocol Integrity</h4>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-emerald-500 w-[85%]" />
            </div>
            <p className="text-[10px] text-slate-500 mt-3 italic text-center leading-relaxed">
              "This plan adheres to metabolic efficiency standards for muscle preservation during caloric deficits."
            </p>
          </div>
        </div>

        {/* Main Builder Canvas */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-32 h-32 opacity-5 -translate-y-8 translate-x-8 ${activeMode === 'workout' ? 'text-rose-500' : 'text-emerald-500'}`}>
              {activeMode === 'workout' ? <Dumbbell size={128}/> : <Utensils size={128}/>}
            </div>

            <div className="flex justify-between items-center mb-8">
              <div>
                <input 
                  type="text" 
                  defaultValue={activeMode === 'workout' ? "Advanced Hypertrophy Phase 1" : "Performance Fueling Protocol"}
                  className="bg-transparent text-xl font-black text-white focus:outline-none border-b border-transparent focus:border-slate-700 pb-1 w-full md:w-80"
                />
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
                  Drafting {activeMode} Plan
                </p>
              </div>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white transition-all shadow-lg ${
                activeMode === 'workout' ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/20'
              }`}>
                <Save size={16} /> Save Plan
              </button>
            </div>

            {/* Dynamic Items List */}
            <div className="space-y-4">
              <BuilderItem 
                title={activeMode === 'workout' ? "Barbell Back Squat" : "Pre-Workout Meal"}
                meta={activeMode === 'workout' ? "4 Sets • 8-10 Reps • 60s Rest" : "450 kcal • 40P 50C 10F"}
                mode={activeMode}
              />
              <BuilderItem 
                title={activeMode === 'workout' ? "Dumbbell Bench Press" : "Mid-Day Fuel"}
                meta={activeMode === 'workout' ? "3 Sets • 10-12 Reps • 45s Rest" : "620 kcal • 50P 60C 12F"}
                mode={activeMode}
              />
              <div className="p-4 border border-dashed border-slate-800 rounded-xl flex items-center justify-center gap-2 text-slate-600 hover:text-slate-400 hover:border-slate-600 cursor-pointer transition-all">
                <Plus size={16} />
                <span className="text-xs font-bold uppercase tracking-widest">Append new {activeMode === 'workout' ? 'exercise' : 'meal'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TemplateItem = ({ icon, title, intensity, color }) => {
  const colorMap = {
    rose: 'text-rose-500 bg-rose-500/10',
    emerald: 'text-emerald-500 bg-emerald-500/10',
    blue: 'text-blue-500 bg-blue-500/10',
    amber: 'text-amber-500 bg-amber-500/10'
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 cursor-pointer group transition-all">
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${colorMap[color]}`}>{icon}</div>
        <div>
          <p className="text-xs font-bold text-slate-200 group-hover:text-white">{title}</p>
          <p className="text-[10px] text-slate-500 font-medium">{intensity} Intensity</p>
        </div>
      </div>
      <ChevronRight size={14} className="text-slate-700 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
    </div>
  );
};

const BuilderItem = ({ title, meta, mode }) => (
  <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-xl group hover:border-slate-700 transition-all">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 group-hover:text-slate-200 transition-all">
        {mode === 'workout' ? <Dumbbell size={16} /> : <Utensils size={16} />}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-200">{title}</p>
        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5">{meta}</p>
      </div>
    </div>
    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="p-2 text-slate-600 hover:text-white transition-colors"><Plus size={16}/></button>
      <button className="p-2 text-slate-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
    </div>
  </div>
);

export default PlanBuilder;