<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_error('Method not allowed.', 405);
}

$body = get_json_body();

$first_name = trim($body['first_name'] ?? '');
$last_name = trim($body['last_name'] ?? '');
$email = trim(strtolower($body['email'] ?? ''));
$phone = trim($body['phone'] ?? '');
$password = $body['password'] ?? '';
$membership_tier = $body['membership_tier'] ?? 'student';

$valid_tiers = ['student', 'job_seeker', 'middle_class', 'premium'];

if ($first_name === '' || $last_name === '' || $email === '' || $password === '') {
    send_error('All required fields must be filled in.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_error('Please provide a valid email address.');
}

if (strlen($password) < 6) {
    send_error('Password must be at least 6 characters.');
}

if (!in_array($membership_tier, $valid_tiers, true)) {
    $membership_tier = 'student';
}

try {
    $db = Database::getConnection();

    $check = $db->prepare('SELECT id FROM users WHERE email = :email');
    $check->execute(['email' => $email]);
    if ($check->fetch()) {
        send_error('An account with this email already exists.', 409);
    }

    $password_hash = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $db->prepare(
        'INSERT INTO users (first_name, last_name, email, password_hash, phone, role, membership_tier, joined_at)
         VALUES (:first_name, :last_name, :email, :password_hash, :phone, :role, :membership_tier, CURDATE())'
    );

    $stmt->execute([
        'first_name' => $first_name,
        'last_name' => $last_name,
        'email' => $email,
        'password_hash' => $password_hash,
        'phone' => $phone,
        'role' => 'member',
        'membership_tier' => $membership_tier,
    ]);

    $user_id = (int) $db->lastInsertId();

    $welcome = $db->prepare(
        'INSERT INTO notifications (user_id, title, message, type) VALUES (:user_id, :title, :message, :type)'
    );
    $welcome->execute([
        'user_id' => $user_id,
        'title' => 'Welcome to Fit Kats',
        'message' => 'Your account has been created. Book your biometric enrolment session anytime from Settings.',
        'type' => 'success',
    ]);

    send_success(['id' => $user_id], 'Account created successfully.');
} catch (PDOException $e) {
    send_error('Registration failed. Please try again.', 500);
}