import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Common Button Primitive
 * Standardizes the high-performance aesthetic across the platform.
 */
const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  icon: Icon,
  ...props 
}) => {
  const variants = {
    primary: "bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
    secondary: "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white",
    danger: "bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-500/20",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-900 hover:text-slate-200"
  };

  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-4 text-sm"
  };

  return (
    <button
      disabled={loading || props.disabled}
      className={twMerge(
        "inline-flex items-center justify-center gap-2 rounded-2xl font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {loading ? (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {Icon && <Icon size={16} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;