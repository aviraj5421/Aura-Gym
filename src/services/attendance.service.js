import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  where, 
  orderBy,
  limit 
} from 'firebase/firestore';
import { db, appId } from './firebase';

/**
 * AttendanceService
 * Handles gym check-ins and session history based on the Entry Card system.
 */
export const AttendanceService = {
  /**
   * Records a new gym entry (triggered by QR scan).
   * @param {string} userId 
   * @param {string} facilityId 
   */
  recordCheckIn: async (userId, facilityId = 'central-hub-01') => {
    const attendanceRef = collection(db, 'artifacts', appId, 'public', 'data', 'attendance');
    
    return await addDoc(attendanceRef, {
      userId,
      facilityId,
      timestamp: Date.now(),
      type: 'ENTRY_QR'
    });
  },

  /**
   * Gets the recent attendance history for a specific user.
   * @param {string} userId 
   * @param {function} callback 
   */
  getUserAttendance: (userId, callback) => {
    const attendanceRef = collection(db, 'artifacts', appId, 'public', 'data', 'attendance');
    const q = query(
      attendanceRef, 
      where('userId', '==', userId),
      orderBy('timestamp', 'desc'),
      limit(10)
    );

    return onSnapshot(q, (snapshot) => {
      const history = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      callback(history);
    }, (error) => {
      console.error("Attendance sync error:", error);
    });
  }
};