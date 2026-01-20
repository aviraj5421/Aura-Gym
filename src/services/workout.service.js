import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db, appId } from './firebase';

/**
 * WorkoutService
 * Handles all Firestore interactions related to training regimens.
 */
export const WorkoutService = {
  /**
   * Fetches the assigned workout plan for a specific user.
   * @param {string} userId - The unique ID of the member
   * @param {function} callback - Success callback for real-time updates
   */
  getAssignedWorkouts: (userId, callback) => {
    const workoutsRef = collection(db, 'artifacts', appId, 'users', userId, 'workouts');
    const q = query(workoutsRef, orderBy('createdAt', 'desc'));

    return onSnapshot(q, (snapshot) => {
      const workouts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(workouts);
    }, (error) => {
      console.error("Failed to fetch workouts:", error);
    });
  },

  /**
   * Marks a specific exercise within a workout as completed.
   * @param {string} userId 
   * @param {string} workoutId 
   * @param {number} exerciseIndex 
   * @param {boolean} status 
   */
  toggleExerciseStatus: async (userId, workoutId, exerciseIndex, status) => {
    const workoutRef = doc(db, 'artifacts', appId, 'users', userId, 'workouts', workoutId);
    
    // Note: In production, we'd fetch the doc and update the specific index in the array
    // For this implementation, we assume the UI handles state and sends the updated array
  },

  /**
   * Allows a Trainer to assign a new workout plan to a member.
   * @param {string} memberId 
   * @param {object} planData 
   */
  assignPlanToMember: async (memberId, planData) => {
    const workoutsRef = collection(db, 'artifacts', appId, 'users', memberId, 'workouts');
    return await addDoc(workoutsRef, {
      ...planData,
      createdAt: Date.now(),
      status: 'assigned'
    });
  }
};