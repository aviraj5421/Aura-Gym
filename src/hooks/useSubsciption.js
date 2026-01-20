import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { SubscriptionService } from '../services/subscription.service';

/**
 * useSubscription Hook
 * Simplifies subscription management and access validation within components.
 * * @returns {object} { subscription, isExpired, daysRemaining, upgradePlan, loading }
 */
export const useSubscription = () => {
  const { user, userData } = useAuth();
  const [subscription, setSubscription] = useState(userData?.subscription || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Subscribe to real-time status updates from the Canvas service
    const unsubscribe = SubscriptionService.subscribeToStatus(user.uid, (status) => {
      setSubscription(status);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  /**
   * Calculates if the current subscription is expired.
   */
  const isExpired = subscription?.expiry ? Date.now() > subscription.expiry : true;

  /**
   * Calculates numerical days remaining.
   */
  const daysRemaining = subscription?.expiry 
    ? Math.max(0, Math.ceil((subscription.expiry - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  /**
   * Helper to initiate a plan upgrade.
   */
  const upgradePlan = async (planData) => {
    if (!user) return;
    return await SubscriptionService.updatePlan(user.uid, planData);
  };

  return {
    subscription,
    isExpired,
    daysRemaining,
    upgradePlan,
    loading
  };
};