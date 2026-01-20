import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { NutritionService } from '../services/nutrition.service';
import { WorkoutService } from '../services/workout.service';

/**
 * useCalories Hook
 * Handles the aggregation of nutritional intake and activity burn.
 * @returns {object} { dailyIntake, dailyBurn, netBalance, loading }
 */
export const useCalories = () => {
  const { user, userData } = useAuth();
  const [meals, setMeals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dateStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  useEffect(() => {
    if (!user) return;

    // Listen to daily nutrition logs
    const unsubscribeNutrition = NutritionService.getDailyLogs(user.uid, dateStr, (data) => {
      setMeals(data);
    });

    // Listen to daily workout logs
    const unsubscribeWorkouts = WorkoutService.getAssignedWorkouts(user.uid, (data) => {
      // Filter for workouts completed today in a real production scenario
      setWorkouts(data);
      setLoading(false);
    });

    return () => {
      unsubscribeNutrition();
      unsubscribeWorkouts();
    };
  }, [user, dateStr]);

  // Aggregate Intake
  const dailyIntake = useMemo(() => {
    return meals.reduce((sum, meal) => sum + (Number(meal.calories) || 0), 0);
  }, [meals]);

  // Aggregate Burn
  const dailyBurn = useMemo(() => {
    // In a production app, we would sum the 'caloriesBurned' field from completed sessions
    return workouts.reduce((sum, w) => sum + (Number(w.caloriesBurned) || 0), 0);
  }, [workouts]);

  const netBalance = dailyIntake - dailyBurn;

  return {
    dailyIntake,
    dailyBurn,
    netBalance,
    loading,
    meals,
    workouts
  };
};