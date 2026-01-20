import { auth, db, appId } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

/**
 * AuthService
 * Encapsulates common authentication and profile update operations.
 */
export const AuthService = {
  /**
   * Updates the physical metrics for the current user.
   * @param {string} uid 
   * @param {object} metrics - { weight, height }
   */
  updatePhysicalMetrics: async (uid, metrics) => {
    const userRef = doc(db, 'artifacts', appId, 'users', uid);
    return await updateDoc(userRef, {
      weight: parseFloat(metrics.weight),
      height: parseFloat(metrics.height)
    });
  },

  /**
   * Updates user display name.
   */
  updateProfileName: async (uid, name) => {
    const userRef = doc(db, 'artifacts', appId, 'users', uid);
    return await updateDoc(userRef, { name });
  }
};