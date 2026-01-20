import React, { useState } from 'react';
import { 
  CreditCard, 
  Check, 
  Zap, 
  Calendar, 
  ShieldCheck, 
  ArrowUpRight,
  Clock,
  Award
} from 'lucide-react';

const Subscription = ({ user }) => {
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const plans = [
    {
      id: 'monthly',
      name: 'Standard Monthly',
      price: '49',
      period: 'mo',
      features: ['Basic Gym Access', 'Workout Tracking', 'Nutrition Log'],
      color: 'slate'
    },
    {
      id: 'quarterly',
      name: 'Pro Quarterly',
      price: '129',
      period: '3 mo',
      features: ['All Standard Features', 'Trainer Consultation', 'Advanced Analytics'],
      color: 'blue'
    },
    {
      id: 'yearly',
      name: 'Elite Yearly',
      price: '399',
      period: 'yr',
      features: ['All Pro Features', 'Personalized Diet Plans', '24/7 Priority Support', 'Free Guest Passes'],
      color: 'emerald',
      popular: true
    }
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Current Status Header */}
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldCheck size={120} className="text-emerald-500" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border border-emerald-500/20">
                Active Membership
              </span>
            </div>
            <h3 className="text-3xl font-black text-white italic tracking-tighter">
              {user?.subscription?.plan === 'yearly' ? 'ELITE YEARLY' : 'STANDARD PLAN'}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Valid until <span className="text-slate-300 font-bold">January 15, 2026</span>
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl text-center min-w-[120px]">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Days Left</p>
              <p className="text-2xl font-black text-white">358</p>
            </div>
            <div className="bg-slate-950/50 border border-slate-800 p-4 rounded-2xl text-center min-w-[120px]">
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Auto-Renew</p>
              <p className="text-sm font-black text-emerald-500 uppercase mt-1">Enabled</p>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Selection */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h4 className="text-xl font-black text-white italic tracking-tight uppercase">Upgrade Your <span className="text-emerald-500">Performance</span></h4>
          <p className="text-slate-500 text-sm">Select the membership tier that aligns with your athletic goals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative cursor-pointer transition-all duration-300 group rounded-3xl p-8 border-2 flex flex-col ${
                selectedPlan === plan.id 
                  ? 'bg-slate-900 border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-[1.02]' 
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 bg-emerald-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                  Best Value
                </div>
              )}

              <div className="mb-8">
                <h5 className="text-lg font-bold text-white mb-1">{plan.name}</h5>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">${plan.price}</span>
                  <span className="text-slate-500 text-sm font-medium">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <Check size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                selectedPlan === plan.id 
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                  : 'bg-slate-800 text-slate-400 group-hover:bg-slate-700'
              }`}>
                {selectedPlan === plan.id ? 'Current Plan' : 'Choose Plan'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h4 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
            <Clock size={16} className="text-slate-500" />
            Billing History
          </h4>
          <button className="text-[10px] font-black text-emerald-500 uppercase tracking-widest hover:underline">
            Download All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-950/50 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Plan</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              <BillingRow date="Jan 15, 2024" plan="Elite Yearly" amount="$399.00" method="Visa **** 4242" />
              <BillingRow date="Jan 15, 2023" plan="Standard Monthly" amount="$49.00" method="Visa **** 4242" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const BillingRow = ({ date, plan, amount, method }) => (
  <tr className="group hover:bg-slate-800/30 transition-colors">
    <td className="px-6 py-4 text-sm text-slate-300 font-medium">{date}</td>
    <td className="px-6 py-4">
      <div className="flex items-center gap-2">
        <Award size={14} className="text-amber-500" />
        <span className="text-sm text-slate-400">{plan}</span>
      </div>
    </td>
    <td className="px-6 py-4 text-sm font-black text-white">{amount}</td>
    <td className="px-6 py-4 text-xs text-slate-500">{method}</td>
    <td className="px-6 py-4 text-right">
      <button className="p-2 text-slate-600 hover:text-emerald-400 transition-colors">
        <ArrowUpRight size={18} />
      </button>
    </td>
  </tr>
);

export default Subscription;