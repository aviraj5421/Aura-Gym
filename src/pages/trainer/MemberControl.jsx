import React, { useState } from 'react';
import { 
  Users, Search, Filter, MoreVertical, 
  CheckCircle2, Clock, ChevronRight,
  TrendingUp, ShieldAlert, Activity
} from 'lucide-react';

const MemberControl = () => {
  // Mock data representing members fetched from Firestore
  const [members] = useState([
    { id: '1', name: 'Alexander Pierce', email: 'alex@example.com', status: 'Active', plan: 'Elite Yearly', joined: '2023-08-12', burnAvg: '850', trend: '+12%' },
    { id: '2', name: 'Sarah Jenkins', email: 'sarah.j@example.com', status: 'Expired', plan: 'Standard Monthly', joined: '2023-05-20', burnAvg: '420', trend: '-5%' },
    { id: '3', name: 'Marcus Chen', email: 'm.chen@example.com', status: 'Active', plan: 'Pro Quarterly', joined: '2023-11-05', burnAvg: '710', trend: '+8%' },
    { id: '4', name: 'Elena Rodriguez', email: 'elena.r@example.com', status: 'Active', plan: 'Elite Yearly', joined: '2024-01-15', burnAvg: '940', trend: '+22%' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h3 className="text-2xl font-black italic text-white uppercase tracking-tighter">
            Member <span className="text-emerald-500">Command</span>
          </h3>
          <p className="text-slate-500 text-xs font-bold uppercase mt-1">
            Managing {members.length} Active Athletes • System Online
          </p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Filter athletes..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* High-Level Trainer Insights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl border-l-4 border-l-emerald-500">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 text-emerald-500">Active Now</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">42</span>
            <span className="text-xs text-emerald-500 font-bold">+12%</span>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl border-l-4 border-l-rose-500">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 text-rose-500">Risk Alerts</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">03</span>
            <span className="text-xs text-slate-500 font-medium">Inactive {'>'} 7 Days</span>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl border-l-4 border-l-blue-500">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1 text-blue-500">Avg Compliance</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-white">94%</span>
            <span className="text-xs text-blue-500 font-bold">Optimal</span>
          </div>
        </div>
      </div>

      {/* Athlete Roster Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/50 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                <th className="px-6 py-4">Athlete</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Membership</th>
                <th className="px-6 py-4">Perf. Avg</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {members.map((member) => (
                <tr key={member.id} className="group hover:bg-slate-800/30 transition-colors cursor-pointer">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-slate-400 group-hover:border-emerald-500/50 transition-all">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{member.name}</p>
                        <p className="text-[10px] text-slate-500 tracking-tight">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      member.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                      {member.status}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs text-slate-300 font-medium">{member.plan}</p>
                    <p className="text-[10px] text-slate-600 uppercase tracking-tighter">Joined {member.joined}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-white">{member.burnAvg} <span className="text-[10px] text-slate-500 font-normal">kcal</span></span>
                      <span className={`text-[10px] font-bold flex items-center gap-0.5 ${member.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                        <TrendingUp size={10} className={member.trend.startsWith('-') ? 'rotate-180' : ''}/>
                        {member.trend}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-600 hover:text-white transition-colors bg-slate-950 rounded-lg border border-slate-800">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-950/30 border-t border-slate-800 flex justify-between items-center">
          <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Aura Professional Member Registry</p>
          <div className="flex gap-2">
            <button className="p-1.5 rounded-lg border border-slate-800 text-slate-500 hover:text-white" disabled>
              <ChevronRight className="rotate-180" size={16} />
            </button>
            <button className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberControl;