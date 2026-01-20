import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Lock } from 'lucide-react';

/**
 * ProtectedRoute Component
 * Prevents unauthorized access to pages based on the user's role.
 * * Note: Ensure src/context/AuthContext.jsx exists in your local project 
 * for this relative import to resolve correctly.
 */
const ProtectedRoute = ({ children, role }) => {
  const { user, userData, loading } = useAuth();

  // 1. Handle Loading State
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-8 h-8 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      </div>
    );
  }

  // 2. Check if user is authenticated
  if (!user) {
    return <AccessDenied reason="authentication" />;
  }

  // 3. Check for Role Authorization
  if (role && userData?.role !== role) {
    return <AccessDenied reason="authorization" roleRequired={role} />;
  }

  // 4. Authorized: Render children
  return children;
};

/**
 * Access Denied UI
 * A premium fallback UI for unauthorized attempts.
 */
const AccessDenied = ({ reason, roleRequired }) => (
  <div className="flex flex-col items-center justify-center py-20 animate-in fade-in zoom-in-95 duration-500">
    <div className="p-6 bg-rose-500/10 rounded-[2.5rem] border border-rose-500/20 mb-6 shadow-2xl shadow-rose-500/5">
      {reason === 'authentication' ? (
        <Lock className="w-12 h-12 text-rose-500" />
      ) : (
        <ShieldAlert className="w-12 h-12 text-rose-500" />
      )}
    </div>
    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">
      {reason === 'authentication' ? 'Identity Required' : 'Access Restricted'}
    </h3>
    <p className="text-slate-500 text-sm max-w-xs text-center leading-relaxed">
      {reason === 'authentication' 
        ? "Please re-establish your secure connection to view this performance module." 
        : `This section is exclusive to our ${roleRequired} staff members.`}
    </p>
    <button 
      onClick={() => window.location.reload()}
      className="mt-8 px-8 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all"
    >
      Return to Base
    </button>
  </div>
);

export default ProtectedRoute;