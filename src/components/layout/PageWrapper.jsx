import React from 'react';
import { clsx } from 'clsx';

/**
 * PageWrapper Component
 * Provides a standardized container for all views with premium entry animations
 * and responsive spacing.
 * * @param {React.ReactNode} children - The page content
 * @param {string} className - Additional classes for the container
 * @param {boolean} animate - Whether to apply the slide-in animation
 */
const PageWrapper = ({ children, className, animate = true }) => {
  return (
    <div 
      className={clsx(
        "w-full max-w-7xl mx-auto px-6 md:px-10 py-8 min-h-[calc(100vh-80px)]",
        animate && "animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out",
        className
      )}
    >
      {/* Background Decorative Gradient (Subtle) */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      {children}
    </div>
  );
};

/**
 * PageHeader Utility
 * A sub-component for consistent page titles within the wrapper.
 */
export const PageHeader = ({ title, subtitle, actions }) => (
  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
    <div>
      <h3 className="text-3xl font-black italic text-white uppercase tracking-tighter leading-none">
        {title}
      </h3>
      {subtitle && (
        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-2">
          {subtitle}
        </p>
      )}
      <div className="h-1 w-12 bg-emerald-500 mt-4 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
    </div>
    {actions && (
      <div className="flex gap-3 w-full md:w-auto">
        {actions}
      </div>
    )}
  </div>
);

export default PageWrapper;