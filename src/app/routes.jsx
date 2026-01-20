import React from 'react';
import ProtectedRoute from './ProtectedRoute';

// Modular Page Imports
import MemberDashboard from '../pages/member/Dashboard';
import Workouts from '../pages/member/Workouts';
import Nutrition from '../pages/member/Nutrition';
import Subscription from '../pages/member/Subscription';
import Entry from '../pages/member/Entry';
import MemberControl from '../pages/trainer/MemberControl';
import PlanBuilder from '../pages/trainer/PlanBuilder';

/**
 * AppRoutes Component
 * Acts as the internal router for the state-based navigation system.
 * It maps the currentTab state to the corresponding modular page component.
 * * @param {string} currentTab - The active view identifier
 * @param {object} userData - The authenticated user's profile data
 */
const AppRoutes = ({ currentTab, userData }) => {
  const renderCurrentPage = () => {
    switch (currentTab) {
      case 'dashboard':
        return <MemberDashboard userData={userData} />;
      
      case 'workout':
        return (
          <ProtectedRoute role="MEMBER">
            <Workouts userData={userData} />
          </ProtectedRoute>
        );

      case 'nutrition':
        return (
          <ProtectedRoute role="MEMBER">
            <Nutrition userData={userData} />
          </ProtectedRoute>
        );

      case 'entry':
        return (
          <ProtectedRoute role="MEMBER">
            <Entry userData={userData} />
          </ProtectedRoute>
        );

      case 'subscription':
        return (
          <ProtectedRoute role="MEMBER">
            <Subscription userData={userData} />
          </ProtectedRoute>
        );

      case 'members':
        return (
          <ProtectedRoute role="TRAINER">
            <MemberControl />
          </ProtectedRoute>
        );

      case 'builder':
        return (
          <ProtectedRoute role="TRAINER">
            <PlanBuilder />
          </ProtectedRoute>
        );

      default:
        return <MemberDashboard userData={userData} />;
    }
  };

  return (
    <div className="w-full h-full animate-in fade-in duration-500">
      {renderCurrentPage()}
    </div>
  );
};

export default AppRoutes;