export type UserRole = 'visitor' | 'member' | 'staff' | 'manager';

export type MembershipTier = 'student' | 'job_seeker' | 'middle_class' | 'premium';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
  membership_tier?: MembershipTier;
  avatar_url?: string;
  joined_at: string;
  phone?: string;
}

export interface MembershipPlan {
  id: number;
  tier: MembershipTier;
  name: string;
  price_monthly: number;
  description: string;
  features: string[];
  color: string;
  popular?: boolean;
}

export interface GymClass {
  id: number;
  name: string;
  instructor: string;
  category: string;
  start_time: string;
  duration_minutes: number;
  capacity: number;
  booked_count: number;
  location: string;
  intensity: 'low' | 'medium' | 'high';
}

export interface Booking {
  id: number;
  class_id: number;
  class_name: string;
  user_id: number;
  status: 'confirmed' | 'waitlisted' | 'cancelled' | 'attended';
  booked_at: string;
  class_time: string;
}

export interface Payment {
  id: number;
  user_id: number;
  amount: number;
  description: string;
  status: 'paid' | 'pending' | 'failed';
  method: string;
  invoice_number: string;
  created_at: string;
}

export interface WorkoutEntry {
  id: number;
  user_id: number;
  date: string;
  type: string;
  duration_minutes: number;
  calories: number;
  avg_heart_rate: number;
  notes?: string;
}

export interface RewardItem {
  id: number;
  title: string;
  description: string;
  points_required: number;
  category: string;
  icon: string;
}

export interface Notification {
  id: number;
  user_id: number;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  type: 'info' | 'success' | 'warning';
}

export interface Announcement {
  id: number;
  title: string;
  body: string;
  posted_by: string;
  created_at: string;
  priority: 'low' | 'medium' | 'high';
}