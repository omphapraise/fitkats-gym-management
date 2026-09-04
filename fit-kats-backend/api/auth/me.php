<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../config/database.php';
require_once __DIR__ . '/../../helpers/response.php';

if (empty($_SESSION['user_id'])) {
    send_error('Not authenticated.', 401);
}

try {
    $db = Database::getConnection();
    $stmt = $db->prepare(
        'SELECT id, first_name, last_name, email, phone, role, membership_tier, avatar_url, reward_points, joined_at
         FROM users WHERE id = :id'
    );
    $stmt->execute(['id' => $_SESSION['user_id']]);
    $user = $stmt->fetch();

    if (!$user) {
        send_error('User not found.', 404);
    }

    send_success($user);
} catch (PDOException $e) {
    send_error('Could not fetch user.', 500);
}