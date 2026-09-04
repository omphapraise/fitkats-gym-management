import { Booking, Payment, WorkoutEntry } from '@/types';

interface UserData {
  hasCompletedOnboarding: boolean;
  workoutPlan: WorkoutPlanAssignment | null;
  points: number;
  bookings: Booking[];
  payments: Payment[];
  workouts: WorkoutEntry[];
}

export interface WorkoutPlanAssignment {
  planId: string;
  planName: string;
  daysPerWeek: 3 | 5;
  goal: string;
  height: string;
  weight: string;
  assignedAt: string;
}

const STORAGE_PREFIX = 'fitkats_userdata_';

const DEFAULT_DATA: UserData = {
  hasCompletedOnboarding: false,
  workoutPlan: null,
  points: 0,
  bookings: [],
  payments: [],
  workouts: [],
};

// Demo accounts get rich pre-populated data instead of empty state
const DEMO_DATA: Record<string, Partial<UserData>> = {
  'member@fitkats.co.za': {
    hasCompletedOnboarding: true,
    points: 1240,
    workoutPlan: {
      planId: 'muscle-gain-5day',
      planName: 'Muscle Gain — 5 Day Split',
      daysPerWeek: 5,
      goal: 'Muscle Gain',
      height: '172cm',
      weight: '68kg',
      assignedAt: '2025-02-14',
    },
  },
};

function getKey(email: string): string {
  return STORAGE_PREFIX + email.toLowerCase();
}

export function getUserData(email: string): UserData {
  const key = getKey(email);
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return { ...DEFAULT_DATA, ...JSON.parse(stored) };
    } catch {
      // fall through to defaults
    }
  }
  const demoDefaults = DEMO_DATA[email.toLowerCase()];
  const initial = { ...DEFAULT_DATA, ...(demoDefaults ?? {}) };
  localStorage.setItem(key, JSON.stringify(initial));
  return initial;
}

export function saveUserData(email: string, data: Partial<UserData>): UserData {
  const current = getUserData(email);
  const updated = { ...current, ...data };
  localStorage.setItem(getKey(email), JSON.stringify(updated));
  return updated;
}

export function completeOnboarding(email: string, plan: WorkoutPlanAssignment): void {
  saveUserData(email, { hasCompletedOnboarding: true, workoutPlan: plan });
}