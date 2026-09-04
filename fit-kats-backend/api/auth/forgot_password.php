<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_error('Method not allowed.', 405);
}

$body = get_json_body();
$email = trim(strtolower($body['email'] ?? ''));

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    send_error('Please provide a valid email address.');
}

try {
    $db = Database::getConnection();
    $stmt = $db->prepare('SELECT id FROM users WHERE email = :email');
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch();

    // Always respond success (even if user not found) to avoid leaking
    // which emails are registered — standard security practice.
    if ($user) {
        $token = bin2hex(random_bytes(32));
        $expires = date('Y-m-d H:i:s', strtotime('+30 minutes'));

        $insert = $db->prepare(
            'INSERT INTO password_resets (user_id, token, expires_at) VALUES (:user_id, :token, :expires_at)'
        );
        $insert->execute([
            'user_id' => $user['id'],
            'token' => $token,
            'expires_at' => $expires,
        ]);

        // In a real system this would email a reset link.
        // For this university project, the token is simply logged/stored,
        // simulating the email being "sent".
    }

    send_success(null, 'If an account exists for this email, a reset link has been sent.');
} catch (PDOException $e) {
    send_error('Something went wrong. Please try again.', 500);
}
