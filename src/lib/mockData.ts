import { GymClass, Booking, Payment, WorkoutEntry, RewardItem, Notification, Announcement } from '@/types';

export const MOCK_CLASSES: GymClass[] = [
  { id: 1, name: 'Sunrise HIIT', instructor: 'Naledi Khumalo', category: 'HIIT', start_time: '2026-08-01T06:00:00', duration_minutes: 45, capacity: 20, booked_count: 17, location: 'Studio A', intensity: 'high' },
  { id: 2, name: 'Power Yoga', instructor: 'Zanele Dube', category: 'Yoga', start_time: '2026-08-01T08:00:00', duration_minutes: 60, capacity: 18, booked_count: 12, location: 'Studio B', intensity: 'medium' },
  { id: 3, name: 'Spin Sessions', instructor: 'Karabo Molefe', category: 'Cycling', start_time: '2026-08-02T07:00:00', duration_minutes: 45, capacity: 24, booked_count: 24, location: 'Cycle Room', intensity: 'high' },
  { id: 4, name: 'Strength Foundations', instructor: 'Chen Wei', category: 'Strength', start_time: '2026-08-02T17:00:00', duration_minutes: 60, capacity: 12, booked_count: 9, location: 'Weight Room', intensity: 'medium' },
  { id: 5, name: 'Recovery Mobility', instructor: 'Zanele Dube', category: 'Mobility', start_time: '2026-08-03T09:00:00', duration_minutes: 30, capacity: 20, booked_count: 6, location: 'Studio B', intensity: 'low' },
  { id: 6, name: 'Boxing Fundamentals', instructor: 'Karabo Molefe', category: 'Boxing', start_time: '2026-08-03T18:00:00', duration_minutes: 45, capacity: 16, booked_count: 16, location: 'Studio A', intensity: 'high' },
  { id: 7, name: 'Evening Pilates', instructor: 'Naledi Khumalo', category: 'Pilates', start_time: '2026-08-04T19:00:00', duration_minutes: 50, capacity: 18, booked_count: 10, location: 'Studio B', intensity: 'low' },
];

export const MOCK_BOOKINGS: Booking[] = [
  { id: 1, class_id: 1, class_name: 'Sunrise HIIT', user_id: 1, status: 'confirmed', booked_at: '2026-07-28T10:00:00', class_time: '2026-08-01T06:00:00' },
  { id: 2, class_id: 4, class_name: 'Strength Foundations', user_id: 1, status: 'confirmed', booked_at: '2026-07-27T14:20:00', class_time: '2026-08-02T17:00:00' },
  { id: 3, class_id: 6, class_name: 'Boxing Fundamentals', user_id: 1, status: 'waitlisted', booked_at: '2026-07-29T09:15:00', class_time: '2026-08-03T18:00:00' },
];

export const MOCK_PAYMENTS: Payment[] = [
  { id: 1, user_id: 1, amount: 999, description: 'Premium Membership — Monthly', status: 'paid', method: 'Card', invoice_number: 'INV-2026-0701', created_at: '2026-07-01T09:00:00' },
  { id: 2, user_id: 1, amount: 999, description: 'Premium Membership — Monthly', status: 'paid', method: 'Card', invoice_number: 'INV-2026-0801', created_at: '2026-07-30T09:00:00' },
  { id: 3, user_id: 1, amount: 250, description: 'Personal Training Add-on', status: 'pending', method: 'EFT', invoice_number: 'INV-2026-0805', created_at: '2026-07-30T11:00:00' },
];

export const MOCK_WORKOUTS: WorkoutEntry[] = [
  { id: 1, user_id: 1, date: '2026-07-25', type: 'Strength Training', duration_minutes: 55, calories: 420, avg_heart_rate: 138, notes: 'Upper body — felt strong' },
  { id: 2, user_id: 1, date: '2026-07-26', type: 'HIIT', duration_minutes: 45, calories: 580, avg_heart_rate: 162, notes: 'Sunrise HIIT class' },
  { id: 3, user_id: 1, date: '2026-07-27', type: 'Yoga', duration_minutes: 60, calories: 210, avg_heart_rate: 104, notes: 'Recovery day' },
  { id: 4, user_id: 1, date: '2026-07-28', type: 'Cycling', duration_minutes: 45, calories: 490, avg_heart_rate: 151, notes: 'Spin session' },
  { id: 5, user_id: 1, date: '2026-07-29', type: 'Strength Training', duration_minutes: 60, calories: 460, avg_heart_rate: 142, notes: 'Lower body' },
  { id: 6, user_id: 1, date: '2026-07-30', type: 'Boxing', duration_minutes: 45, calories: 540, avg_heart_rate: 158, notes: 'Pad work' },
  { id: 7, user_id: 1, date: '2026-07-31', type: 'Mobility', duration_minutes: 30, calories: 140, avg_heart_rate: 96, notes: 'Light stretching' },
];

export const MOCK_REWARDS: RewardItem[] = [
  { id: 1, title: 'Fit Kats Water Bottle', description: 'Premium stainless steel bottle with logo.', points_required: 200, category: 'Merchandise', icon: 'droplet' },
  { id: 2, title: 'Free Personal Training Session', description: 'One 1-on-1 session with any trainer.', points_required: 800, category: 'Training', icon: 'user-check' },
  { id: 3, title: 'Fit Kats T-Shirt', description: 'Limited edition training tee.', points_required: 350, category: 'Merchandise', icon: 'shirt' },
  { id: 4, title: 'Guest Pass', description: 'Bring a friend for a free day pass.', points_required: 150, category: 'Access', icon: 'users' },
  { id: 5, title: 'Recovery Suite Session', description: 'One session in the recovery suite (sauna + cold plunge).', points_required: 600, category: 'Wellness', icon: 'heart-pulse' },
  { id: 6, title: 'Premium Upgrade Discount', description: '10% off your next Premium tier upgrade.', points_required: 1000, category: 'Membership', icon: 'crown' },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 1, user_id: 1, title: 'Class Confirmed', message: 'Your booking for Sunrise HIIT tomorrow is confirmed.', read: false, created_at: '2026-07-30T08:00:00', type: 'success' },
  { id: 2, user_id: 1, title: 'Payment Received', message: 'Your monthly payment of R999.00 was processed successfully.', read: true, created_at: '2026-07-01T09:05:00', type: 'info' },
  { id: 3, user_id: 1, title: 'Waitlist Update', message: 'You are #2 on the waitlist for Boxing Fundamentals.', read: false, created_at: '2026-07-29T09:20:00', type: 'warning' },
];

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 1, title: 'Public Holiday Hours', body: 'Fit Kats Sandton will operate on reduced hours (7am-2pm) this coming public holiday.', posted_by: 'Amara Botha', created_at: '2026-07-20T10:00:00', priority: 'medium' },
  { id: 2, title: 'New Recovery Suite Now Open', body: 'Our sauna and cold plunge recovery suite is now open to Premium members on Level 2.', posted_by: 'Amara Botha', created_at: '2026-07-15T09:00:00', priority: 'high' },
  { id: 3, title: 'Spin Bikes Upgraded', body: 'All spin bikes in the Cycle Room have been upgraded with new resistance systems.', posted_by: 'Sipho Ndlovu', created_at: '2026-07-10T11:00:00', priority: 'low' },
];

export function getGymCapacity(): number {
  return Math.floor(Math.random() * (85 - 25 + 1)) + 25;
}

export function getRecoveryScore(): number {
  return Math.floor(Math.random() * (95 - 60 + 1)) + 60;
}

export const AI_COACH_RESPONSES: { keywords: string[]; response: string }[] = [
  { keywords: ['squat', 'knee', 'form'], response: 'Keep your chest up, drive through your heels, and let your knees track over your toes. If your knees cave inward, slow the tempo and reduce load until the pattern is clean.' },
  { keywords: ['sore', 'recovery', 'rest', 'tired'], response: 'Soreness after training is normal for 24-48 hours. Prioritise sleep, hydration, and light mobility work. If pain persists past 3 days or feels sharp, consider a full rest day.' },
  { keywords: ['protein', 'diet', 'nutrition', 'eat'], response: 'Aim for roughly 1.6-2.2g of protein per kg of bodyweight daily, spread across 3-4 meals, to support recovery and muscle retention.' },
  { keywords: ['motivation', 'lazy', 'skip', 'unmotivated'], response: 'Consistency beats intensity. Even a shorter, lighter session keeps the habit alive — showing up matters more than any single workout being perfect.' },
  { keywords: ['cardio', 'run', 'running', 'endurance'], response: 'For general fitness, aim for 2-3 cardio sessions weekly, mixing steady-state (30-40 min) with one shorter high-intensity interval session.' },
  { keywords: ['weight', 'fat', 'lose', 'cut'], response: 'A sustainable fat loss rate is about 0.5-1% of bodyweight per week, driven mainly by a modest calorie deficit and consistent strength training to preserve muscle.' },
];

export function getAICoachResponse(message: string): string {
  const lower = message.toLowerCase();
  const match = AI_COACH_RESPONSES.find((entry) =>
    entry.keywords.some((kw) => lower.includes(kw))
  );
  return (
    match?.response ??
    "That's a great question — for anything specific to your program, log it in Workout Progress and I'll factor it into your next recommendation. In general: consistency, sleep, and protein intake are the three biggest levers most people underuse."
  );
}

// ===== STAFF / MANAGER MOCK DATA =====

export interface MemberRecord {
  id: number;
  name: string;
  email: string;
  tier: string;
  status: 'active' | 'suspended' | 'pending_verification';
  joined: string;
}

export const MOCK_MEMBERS: MemberRecord[] = [
  { id: 1, name: 'Lindiwe Mokoena', email: 'member@fitkats.co.za', tier: 'Premium', status: 'active', joined: '2025-02-14' },
  { id: 2, name: 'Thabo Mahlangu', email: 'thabo.m@example.com', tier: 'Student', status: 'active', joined: '2025-09-10' },
  { id: 3, name: 'Aisha Rahman', email: 'aisha.r@example.com', tier: 'Middle Class', status: 'active', joined: '2025-05-22' },
  { id: 4, name: 'Karabo Sithole', email: 'karabo.s@example.com', tier: 'Job Seeker', status: 'pending_verification', joined: '2026-07-20' },
  { id: 5, name: 'Zanele Nkosi', email: 'zanele.n@example.com', tier: 'Premium', status: 'suspended', joined: '2024-11-03' },
  { id: 6, name: 'Sizwe Dlamini', email: 'sizwe.d@example.com', tier: 'Student', status: 'active', joined: '2026-01-15' },
];

export interface MaintenanceRequest {
  id: number;
  title: string;
  location: string;
  reportedBy: string;
  status: 'open' | 'in_progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export const MOCK_MAINTENANCE: MaintenanceRequest[] = [
  { id: 1, title: 'Spin bike #4 resistance not engaging', location: 'Cycle Room', reportedBy: 'Sipho Ndlovu', status: 'open', priority: 'medium', createdAt: '2026-07-30' },
  { id: 2, title: 'Sauna thermostat reading incorrectly', location: 'Recovery Suite', reportedBy: 'Karabo Molefe', status: 'in_progress', priority: 'high', createdAt: '2026-07-28' },
  { id: 3, title: 'Locker room tap dripping', location: "Men's Locker Room", reportedBy: 'Chen Wei', status: 'open', priority: 'low', createdAt: '2026-07-31' },
  { id: 4, title: 'Studio A speaker crackling', location: 'Studio A', reportedBy: 'Naledi Khumalo', status: 'resolved', priority: 'medium', createdAt: '2026-07-22' },
  { id: 5, title: 'Treadmill #2 belt slipping', location: 'Cardio Floor', reportedBy: 'Sipho Ndlovu', status: 'resolved', priority: 'high', createdAt: '2026-07-18' },
];

export interface PerkRedemption {
  id: number;
  member: string;
  item: string;
  category: 'Drink' | 'Merch' | 'Trainer Session' | 'Massage';
  status: 'pending' | 'confirmed';
  requestedAt: string;
}

export const MOCK_PERK_REDEMPTIONS: PerkRedemption[] = [
  { id: 1, member: 'Lindiwe Mokoena', item: 'Protein Shake', category: 'Drink', status: 'pending', requestedAt: '2026-08-01T07:15:00' },
  { id: 2, member: 'Aisha Rahman', item: 'Fit Kats T-Shirt', category: 'Merch', status: 'pending', requestedAt: '2026-08-01T08:02:00' },
  { id: 3, member: 'Zanele Nkosi', item: '1-on-1 Session with Chen Wei', category: 'Trainer Session', status: 'pending', requestedAt: '2026-07-31T16:40:00' },
  { id: 4, member: 'Thabo Mahlangu', item: 'Recovery Massage', category: 'Massage', status: 'confirmed', requestedAt: '2026-07-30T10:00:00' },
];

export interface StaffAccount {
  id: number;
  name: string;
  email: string;
  role: 'staff' | 'manager';
  status: 'active' | 'inactive';
  lastActive: string;
}

export const MOCK_STAFF: StaffAccount[] = [
  { id: 1, name: 'Sipho Ndlovu', email: 'staff@fitkats.co.za', role: 'staff', status: 'active', lastActive: '2026-08-01T06:45:00' },
  { id: 2, name: 'Karabo Molefe', email: 'karabo.molefe@fitkats.co.za', role: 'staff', status: 'active', lastActive: '2026-08-01T07:10:00' },
  { id: 3, name: 'Naledi Khumalo', email: 'naledi.k@fitkats.co.za', role: 'staff', status: 'active', lastActive: '2026-07-31T18:20:00' },
  { id: 4, name: 'Amara Botha', email: 'manager@fitkats.co.za', role: 'manager', status: 'active', lastActive: '2026-08-01T07:30:00' },
];

export interface Announcement2 {
  id: number;
  title: string;
  body: string;
  postedBy: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export const MOCK_ANNOUNCEMENTS_FULL: Announcement2[] = [
  { id: 1, title: 'Public Holiday Hours', body: 'Fit Kats Sandton will operate on reduced hours (7am-2pm) this coming public holiday.', postedBy: 'Amara Botha', priority: 'medium', createdAt: '2026-07-20T10:00:00' },
  { id: 2, title: 'New Recovery Suite Now Open', body: 'Our sauna and cold plunge recovery suite is now open to Premium members on Level 2.', postedBy: 'Amara Botha', priority: 'high', createdAt: '2026-07-15T09:00:00' },
  { id: 3, title: 'Spin Bikes Upgraded', body: 'All spin bikes in the Cycle Room have been upgraded with new resistance systems.', postedBy: 'Sipho Ndlovu', priority: 'low', createdAt: '2026-07-10T11:00:00' },
];

export interface RevenueReportRow {
  month: string;
  revenue: number;
  newMembers: number;
  cancellations: number;
}

export const MOCK_REVENUE_REPORT: RevenueReportRow[] = [
  { month: 'Feb 2026', revenue: 412000, newMembers: 62, cancellations: 14 },
  { month: 'Mar 2026', revenue: 438000, newMembers: 71, cancellations: 11 },
  { month: 'Apr 2026', revenue: 445000, newMembers: 58, cancellations: 19 },
  { month: 'May 2026', revenue: 461000, newMembers: 66, cancellations: 12 },
  { month: 'Jun 2026', revenue: 479000, newMembers: 74, cancellations: 9 },
  { month: 'Jul 2026', revenue: 502000, newMembers: 81, cancellations: 15 },
];

// ===== TIER PRICING (for Payments empty state) =====

export const TIER_PRICING: Record<string, { name: string; price: number }> = {
  student: { name: 'Student', price: 349 },
  job_seeker: { name: 'Job Seeker', price: 279 },
  middle_class: { name: 'Middle Class', price: 599 },
  premium: { name: 'Premium', price: 999 },
};