<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_error('Method not allowed.', 405);
}

$body = get_json_body();
$email = trim(strtolower($body['email'] ?? ''));
$password = $body['password'] ?? '';

if ($email === '' || $password === '') {
    send_error('Please provide both email and password.');
}

try {
    $db = Database::getConnection();
    $stmt = $db->prepare(
        'SELECT id, first_name, last_name, email, password_hash, phone, role, membership_tier, avatar_url, joined_at, is_active
         FROM users WHERE email = :email'
    );
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password_hash'])) {
        send_error('Invalid email or password.', 401);
    }

    if ((int) $user['is_active'] === 0) {
        send_error('This account has been deactivated. Please contact support.', 403);
    }

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['email'] = $user['email'];

    unset($user['password_hash'], $user['is_active']);

    send_success($user, 'Logged in successfully.');
} catch (PDOException $e) {
    send_error('Login failed. Please try again.', 500);
}