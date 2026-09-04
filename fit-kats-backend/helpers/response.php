<?php
/**
 * Small helper functions shared across API endpoints.
 */

function send_json(array $payload, int $status = 200): void {
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

function send_success($data = null, string $message = ''): void {
    send_json([
        'success' => true,
        'data' => $data,
        'message' => $message,
    ]);
}

function send_error(string $message, int $status = 400): void {
    send_json([
        'success' => false,
        'message' => $message,
    ], $status);
}

function get_json_body(): array {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function require_login(): array {
    if (empty($_SESSION['user_id'])) {
        send_error('Not authenticated.', 401);
    }
    return $_SESSION;
}

function require_role(array $allowed_roles): array {
    $session = require_login();
    if (!in_array($session['role'], $allowed_roles, true)) {
        send_error('You do not have permission to perform this action.', 403);
    }
    return $session;
}