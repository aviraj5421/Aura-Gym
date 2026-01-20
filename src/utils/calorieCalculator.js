/**
 * Calculates calories burned using the MET (Metabolic Equivalent of Task) formula.
 * Formula: Calories = MET * Weight(kg) * Time(hrs)
 * * @param {number} met - The MET value for the specific exercise.
 * @param {number} weightKg - The user's weight in kilograms.
 * @param {number} durationMinutes - Duration of exercise in minutes.
 * @returns {number} Rounded calories burned.
 */
export const calculateCaloriesBurned = (met, weightKg, durationMinutes) => {
  if (!met || !weightKg || !durationMinutes) return 0;
  
  // MET * weight in kg * (duration in hours)
  const durationHours = durationMinutes / 60;
  const caloriesBurned = met * weightKg * durationHours;
  
  return Math.round(caloriesBurned);
};

/**
 * Standard MET values for various athletic activities
 * used for precision energy expenditure tracking.
 */
export const ACTIVITY_MET_VALUES = {
  STRENGTH_TRAINING_HEAVY: 6.0,
  STRENGTH_TRAINING_LIGHT: 3.5,
  RUNNING_MODERATE: 9.8,
  RUNNING_VIGOROUS: 12.3,
  CYCLING_MODERATE: 7.5,
  CYCLING_VIGOROUS: 12.0,
  HIIT_CORE: 8.0,
  YOGA_VINYASA: 3.0,
  SWIMMING_LAPS: 5.8,
  WALKING_BRISK: 3.8
};