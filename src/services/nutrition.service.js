import { 
  collection, 
  doc, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { db, appId } from './firebase';

/**
 * NutritionService
 * Manages dietary logs, macro tracking, and meal history.
 */
export const NutritionService = {
  /**
   * Fetches the user's diet logs for a specific day.
   * @param {string} userId 
   * @param {number} timestamp - The start of the day in ms
   * @param {function} callback 
   */
  getDailyLogs: (userId, dateStr, callback) => {
    const logsRef = collection(db, 'artifacts', appId, 'users', userId, 'nutrition');
    const q = query(
      logsRef, 
      where('date', '==', dateStr),
      orderBy('createdAt', 'asc')
    );

    return onSnapshot(q, (snapshot) => {
      const logs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(logs);
    }, (error) => {
      console.error("Failed to fetch nutrition logs:", error);
    });
  },

  /**
   * Logs a new meal or food item.
   * @param {string} userId 
   * @param {object} mealData - { name, calories, protein, carbs, fats, type }
   */
  logMeal: async (userId, mealData) => {
    const logsRef = collection(db, 'artifacts', appId, 'users', userId, 'nutrition');
    const dateStr = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    return await addDoc(logsRef, {
      ...mealData,
      date: dateStr,
      createdAt: Date.now()
    });
  }
};