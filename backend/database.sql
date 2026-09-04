-- ============================================================
-- FIT KATS GYM MANAGEMENT SYSTEM — DATABASE SCHEMA
-- Run this in phpMyAdmin (Import tab) or via mysql CLI
-- ============================================================

CREATE DATABASE IF NOT EXISTS fit_kats_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE fit_kats_db;

-- ------------------------------------------------------------
-- USERS
-- ------------------------------------------------------------
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  phone VARCHAR(30),
  role ENUM('visitor','member','staff','manager') NOT NULL DEFAULT 'member',
  membership_tier ENUM('student','job_seeker','middle_class','premium') DEFAULT NULL,
  avatar_url VARCHAR(255),
  reward_points INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  joined_at DATE NOT NULL DEFAULT (CURRENT_DATE),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- PASSWORD RESET TOKENS
-- ------------------------------------------------------------
CREATE TABLE password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  token VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  used TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- SESSIONS (simple token-based auth)
-- ------------------------------------------------------------
CREATE TABLE sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  session_token VARCHAR(255) NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- MEMBERSHIP PLANS (reference table)
-- ------------------------------------------------------------
CREATE TABLE membership_plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tier ENUM('student','job_seeker','middle_class','premium') NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,
  price_annual DECIMAL(10,2) NOT NULL,
  description VARCHAR(255),
  is_popular TINYINT(1) DEFAULT 0
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- CLASSES
-- ------------------------------------------------------------
CREATE TABLE classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  instructor VARCHAR(100) NOT NULL,
  category VARCHAR(80) NOT NULL,
  description VARCHAR(500),
  start_time DATETIME NOT NULL,
  duration_minutes INT NOT NULL DEFAULT 45,
  capacity INT NOT NULL DEFAULT 20,
  location VARCHAR(100) NOT NULL DEFAULT 'Main Studio',
  intensity ENUM('low','medium','high') NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- BOOKINGS
-- ------------------------------------------------------------
CREATE TABLE bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  class_id INT NOT NULL,
  status ENUM('confirmed','waitlisted','cancelled','attended') NOT NULL DEFAULT 'confirmed',
  booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- PAYMENTS
-- ------------------------------------------------------------
CREATE TABLE payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  description VARCHAR(255) NOT NULL,
  status ENUM('paid','pending','failed') NOT NULL DEFAULT 'paid',
  method VARCHAR(50) NOT NULL DEFAULT 'Card',
  invoice_number VARCHAR(50) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- WORKOUT PROGRESS
-- ------------------------------------------------------------
CREATE TABLE workout_entries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  entry_date DATE NOT NULL,
  workout_type VARCHAR(100) NOT NULL,
  duration_minutes INT NOT NULL,
  calories INT NOT NULL,
  avg_heart_rate INT NOT NULL,
  notes VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- REWARDS CATALOGUE
-- ------------------------------------------------------------
CREATE TABLE reward_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description VARCHAR(255),
  points_required INT NOT NULL,
  category VARCHAR(80) NOT NULL,
  icon VARCHAR(50) DEFAULT 'gift'
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- REWARD REDEMPTIONS (per user)
-- ------------------------------------------------------------
CREATE TABLE reward_redemptions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  reward_item_id INT NOT NULL,
  redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('pending','fulfilled') NOT NULL DEFAULT 'pending',
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reward_item_id) REFERENCES reward_items(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- NOTIFICATIONS
-- ------------------------------------------------------------
CREATE TABLE notifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(150) NOT NULL,
  message VARCHAR(500) NOT NULL,
  type ENUM('info','success','warning') NOT NULL DEFAULT 'info',
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- ANNOUNCEMENTS (staff/manager posted, visible to members)
-- ------------------------------------------------------------
CREATE TABLE announcements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  body VARCHAR(1000) NOT NULL,
  posted_by INT NOT NULL,
  priority ENUM('low','medium','high') NOT NULL DEFAULT 'medium',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (posted_by) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- AI COACH RESPONSES (simulated — pre-written, keyed by topic)
-- ------------------------------------------------------------
CREATE TABLE ai_coach_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic VARCHAR(100) NOT NULL,
  keywords VARCHAR(255) NOT NULL,
  response_text VARCHAR(1000) NOT NULL
) ENGINE=InnoDB;

-- ============================================================
-- SEED DATA
-- ============================================================

-- Membership plans
INSERT INTO membership_plans (tier, name, price_monthly, price_annual, description, is_popular) VALUES
('student', 'Student', 349.00, 3350.00, 'For registered students building the habit.', 0),
('job_seeker', 'Job Seeker', 279.00, 2670.00, 'Affordable access while you get back on your feet.', 0),
('middle_class', 'Middle Class', 599.00, 5750.00, 'Full access for people training seriously, every week.', 1),
('premium', 'Premium', 999.00, 9590.00, 'The complete experience — coaching, recovery, priority everything.', 0);

-- Demo users (password for all demo accounts is: password123)
-- Hash generated with PHP password_hash('password123', PASSWORD_BCRYPT)
INSERT INTO users (first_name, last_name, email, password_hash, phone, role, membership_tier, reward_points, joined_at) VALUES
('Lindiwe', 'Mokoena', 'member@fitkats.co.za', '$2y$10$92yG1kx1qF6b1P5nQKq0v.1XsOZ8U8Z3cQdI1p4KcYVYQmQnE0nJa', '082 555 0101', 'member', 'premium', 1240, '2025-02-14'),
('Sipho', 'Ndlovu', 'staff@fitkats.co.za', '$2y$10$92yG1kx1qF6b1P5nQKq0v.1XsOZ8U8Z3cQdI1p4KcYVYQmQnE0nJa', '082 555 0102', 'staff', NULL, 0, '2024-08-01'),
('Amara', 'Botha', 'manager@fitkats.co.za', '$2y$10$92yG1kx1qF6b1P5nQKq0v.1XsOZ8U8Z3cQdI1p4KcYVYQmQnE0nJa', '082 555 0103', 'manager', NULL, 0, '2023-11-20'),
('Thabo', 'Mahlangu', 'thabo.m@example.com', '$2y$10$92yG1kx1qF6b1P5nQKq0v.1XsOZ8U8Z3cQdI1p4KcYVYQmQnE0nJa', '082 555 0104', 'member', 'student', 320, '2025-09-10'),
('Aisha', 'Rahman', 'aisha.r@example.com', '$2y$10$92yG1kx1qF6b1P5nQKq0v.1XsOZ8U8Z3cQdI1p4KcYVYQmQnE0nJa', '082 555 0105', 'member', 'middle_class', 780, '2025-05-22');

-- Classes (relative to NOW so they always look current)
INSERT INTO classes (name, instructor, category, description, start_time, duration_minutes, capacity, location, intensity) VALUES
('Sunrise HIIT', 'Naledi Khumalo', 'HIIT', 'High-intensity interval training to start your day.', DATE_ADD(NOW(), INTERVAL 1 DAY), 45, 20, 'Studio A', 'high'),
('Power Yoga', 'Zanele Dube', 'Yoga', 'Strength-focused vinyasa flow.', DATE_ADD(NOW(), INTERVAL 1 DAY), 60, 18, 'Studio B', 'medium'),
('Spin Sessions', 'Karabo Molefe', 'Cycling', 'Rhythm-based indoor cycling.', DATE_ADD(NOW(), INTERVAL 2 DAY), 45, 24, 'Cycle Room', 'high'),
('Strength Foundations', 'Chen Wei', 'Strength', 'Compound lift technique and progression.', DATE_ADD(NOW(), INTERVAL 2 DAY), 60, 12, 'Weight Room', 'medium'),
('Recovery Mobility', 'Zanele Dube', 'Mobility', 'Guided stretching and mobility work.', DATE_ADD(NOW(), INTERVAL 3 DAY), 30, 20, 'Studio B', 'low'),
('Boxing Fundamentals', 'Karabo Molefe', 'Boxing', 'Technique, footwork, and pad work.', DATE_ADD(NOW(), INTERVAL 3 DAY), 45, 16, 'Studio A', 'high'),
('Evening Pilates', 'Naledi Khumalo', 'Pilates', 'Core-focused low-impact conditioning.', DATE_ADD(NOW(), INTERVAL 4 DAY), 50, 18, 'Studio B', 'low');

-- Bookings (member id 1 = Lindiwe, premium)
INSERT INTO bookings (user_id, class_id, status) VALUES
(1, 1, 'confirmed'),
(1, 4, 'confirmed'),
(1, 6, 'waitlisted'),
(4, 2, 'confirmed'),
(5, 3, 'confirmed');

-- Payments
INSERT INTO payments (user_id, amount, description, status, method, invoice_number, created_at) VALUES
(1, 999.00, 'Premium Membership — Monthly', 'paid', 'Card', 'INV-2026-0701', DATE_SUB(NOW(), INTERVAL 30 DAY)),
(1, 999.00, 'Premium Membership — Monthly', 'paid', 'Card', 'INV-2026-0801', NOW()),
(4, 349.00, 'Student Membership — Monthly', 'paid', 'EFT', 'INV-2026-0710', DATE_SUB(NOW(), INTERVAL 10 DAY)),
(5, 599.00, 'Middle Class Membership — Monthly', 'pending', 'Card', 'INV-2026-0805', NOW());

-- Workout entries (member id 1)
INSERT INTO workout_entries (user_id, entry_date, workout_type, duration_minutes, calories, avg_heart_rate, notes) VALUES
(1, DATE_SUB(CURDATE(), INTERVAL 6 DAY), 'Strength Training', 55, 420, 138, 'Upper body — felt strong'),
(1, DATE_SUB(CURDATE(), INTERVAL 5 DAY), 'HIIT', 45, 580, 162, 'Sunrise HIIT class'),
(1, DATE_SUB(CURDATE(), INTERVAL 4 DAY), 'Yoga', 60, 210, 104, 'Recovery day'),
(1, DATE_SUB(CURDATE(), INTERVAL 3 DAY), 'Cycling', 45, 490, 151, 'Spin session'),
(1, DATE_SUB(CURDATE(), INTERVAL 2 DAY), 'Strength Training', 60, 460, 142, 'Lower body'),
(1, DATE_SUB(CURDATE(), INTERVAL 1 DAY), 'Boxing', 45, 540, 158, 'Pad work with Karabo'),
(1, CURDATE(), 'Mobility', 30, 140, 96, 'Light stretching');

-- Reward items
INSERT INTO reward_items (title, description, points_required, category, icon) VALUES
('Fit Kats Water Bottle', 'Premium stainless steel bottle with logo.', 200, 'Merchandise', 'droplet'),
('Free Personal Training Session', 'One 1-on-1 session with any trainer.', 800, 'Training', 'user-check'),
('Fit Kats T-Shirt', 'Limited edition training tee.', 350, 'Merchandise', 'shirt'),
('Guest Pass', 'Bring a friend for a free day pass.', 150, 'Access', 'users'),
('Recovery Suite Session', 'One session in the recovery suite (sauna + cold plunge).', 600, 'Wellness', 'heart-pulse'),
('Premium Upgrade Discount', '10% off your next Premium tier upgrade.', 1000, 'Membership', 'crown');

-- Notifications (member id 1)
INSERT INTO notifications (user_id, title, message, type, is_read) VALUES
(1, 'Class Confirmed', 'Your booking for Sunrise HIIT tomorrow is confirmed.', 'success', 0),
(1, 'Payment Received', 'Your monthly payment of R999.00 was processed successfully.', 'info', 1),
(1, 'Waitlist Update', 'You are #2 on the waitlist for Boxing Fundamentals.', 'warning', 0);

-- Announcements (posted by manager id 3)
INSERT INTO announcements (title, body, posted_by, priority) VALUES
('Public Holiday Hours', 'Fit Kats Sandton will operate on reduced hours (7am-2pm) this coming public holiday.', 3, 'medium'),
('New Recovery Suite Now Open', 'Our sauna and cold plunge recovery suite is now open to Premium members on Level 2.', 3, 'high'),
('Spin Bikes Upgraded', 'All spin bikes in the Cycle Room have been upgraded with new resistance systems.', 2, 'low');

-- AI Coach simulated responses
INSERT INTO ai_coach_responses (topic, keywords, response_text) VALUES
('form_squat', 'squat,knee,form', 'Keep your chest up, drive through your heels, and let your knees track over your toes. If your knees cave inward, slow the tempo and reduce load until the pattern is clean.'),
('recovery', 'sore,recovery,rest,tired', 'Soreness after training is normal for 24-48 hours. Prioritise sleep, hydration, and light mobility work. If pain persists past 3 days or feels sharp, consider a full rest day.'),
('nutrition_general', 'protein,diet,nutrition,eat', 'Aim for roughly 1.6-2.2g of protein per kg of bodyweight daily, spread across 3-4 meals, to support recovery and muscle retention.'),
('motivation', 'motivation,lazy,skip,unmotivated', 'Consistency beats intensity. Even a shorter, lighter session keeps the habit alive — showing up matters more than any single workout being perfect.'),
('cardio_plan', 'cardio,run,running,endurance', 'For general fitness, aim for 2-3 cardio sessions weekly, mixing steady-state (30-40 min) with one shorter high-intensity interval session.'),
('weight_loss', 'weight,fat,lose,cut', 'A sustainable fat loss rate is about 0.5-1% of bodyweight per week, driven mainly by a modest calorie deficit and consistent strength training to preserve muscle.');