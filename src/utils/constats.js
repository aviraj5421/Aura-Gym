/**
 * Global Constants for Aura Fitness Professional
 * Centralizes roles, subscription tiers, and system configurations.
 */

export const ROLES = {
  MEMBER: 'MEMBER',
  TRAINER: 'TRAINER',
  ADMIN: 'ADMIN'
};

export const SUBSCRIPTION_PLANS = [
  { 
    id: 'monthly', 
    name: 'Standard Monthly', 
    durationDays: 30, 
    price: 49,
    features: ['Basic Gym Access', 'Workout Logs']
  },
  { 
    id: 'quarterly', 
    name: 'Pro Quarterly', 
    durationDays: 90, 
    price: 129,
    features: ['All Standard Features', 'Trainer Consultation']
  },
  { 
    id: 'yearly', 
    name: 'Elite Yearly', 
    durationDays: 365, 
    price: 399,
    popular: true,
    features: ['All Pro Features', 'Nutrition Strategist', 'Priority Access']
  },
];

export const UI_THEME = {
  colors: {
    primary: '#10b981', // Emerald 500
    secondary: '#f43f5e', // Rose 500
    accent: '#f59e0b', // Amber 500
    background: '#020617', // Slate 950
    surface: '#0f172a' // Slate 900
  },
  animation: {
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    duration: 300
  }
};

export const MACRO_RATIOS = {
  CUTTING: { protein: 40, carbs: 30, fats: 30 },
  MAINTENANCE: { protein: 30, carbs: 45, fats: 25 },
  BULKING: { protein: 25, carbs: 55, fats: 20 }
};