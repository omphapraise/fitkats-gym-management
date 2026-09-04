<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_error('Method not allowed.', 405);
}

$body = get_json_body();
$token = trim($body['token'] ?? '');
$new_password = $body['password'] ?? '';

if ($token === '' || strlen($new_password) < 6) {
    send_error('A valid token and a password of at least 6 characters are required.');
}

try {
    $db = Database::getConnection();
    $stmt = $db->prepare(
        'SELECT id, user_id, expires_at, used FROM password_resets WHERE token = :token'
    );
    $stmt->execute(['token' => $token]);
    $reset = $stmt->fetch();

    if (!$reset || (int) $reset['used'] === 1) {
        send_error('This reset link is invalid or has already been used.', 400);
    }

    if (strtotime($reset['expires_at']) < time()) {
        send_error('This reset link has expired. Please request a new one.', 400);
    }

    $password_hash = password_hash($new_password, PASSWORD_BCRYPT);

    $update = $db->prepare('UPDATE users SET password_hash = :hash WHERE id = :id');
    $update->execute(['hash' => $password_hash, 'id' => $reset['user_id']]);

    $markUsed = $db->prepare('UPDATE password_resets SET used = 1 WHERE id = :id');
    $markUsed->execute(['id' => $reset['id']]);

    send_success(null, 'Password reset successfully. You can now log in.');
} catch (PDOException $e) {
    send_error('Something went wrong. Please try again.', 500);
}