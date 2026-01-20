import { 
  doc, 
  updateDoc, 
  getDoc,
  collection,
  query,
  where,
  onSnapshot
} from 'firebase/firestore';
import { db, appId } from './firebase';

/**
 * SubscriptionService
 * Manages membership tiers, billing cycles, and access validation.
 */
export const SubscriptionService = {
  /**
   * Updates a user's subscription plan.
   * @param {string} userId 
   * @param {object} planData - { planId, durationDays, price }
   */
  updatePlan: async (userId, planData) => {
    const userRef = doc(db, 'artifacts', appId, 'users', userId);
    const now = Date.now();
    const expiry = now + (planData.durationDays * 24 * 60 * 60 * 1000);

    return await updateDoc(userRef, {
      'subscription.plan': planData.planId,
      'subscription.active': true,
      'subscription.started': now,
      'subscription.expiry': expiry,
      'subscription.price': planData.price
    });
  },

  /**
   * Validates if a user currently has gym access.
   * @param {string} userId 
   * @returns {Promise<boolean>}
   */
  checkAccessValidity: async (userId) => {
    const userRef = doc(db, 'artifacts', appId, 'users', userId);
    const snap = await getDoc(userRef);
    
    if (!snap.exists()) return false;
    
    const data = snap.data();
    const isPlanActive = data.subscription?.active;
    const isNotExpired = data.subscription?.expiry > Date.now();
    
    return isPlanActive && isNotExpired;
  },

  /**
   * Listens for changes to the user's subscription status.
   * Useful for the Digital Entry Card UI.
   */
  subscribeToStatus: (userId, callback) => {
    const userRef = doc(db, 'artifacts', appId, 'users', userId);
    
    return onSnapshot(userRef, (snap) => {
      if (snap.exists()) {
        callback(snap.data().subscription);
      }
    }, (error) => {
      console.error("Subscription sync error:", error);
    });
  }
};