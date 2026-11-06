<?php
/**
 * POST /api/auth/login — Authenticate admin user
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(['error' => 'Method not allowed'], 405);
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input || empty($input['email']) || empty($input['password'])) {
    json_response(['error' => 'Email and password are required'], 400);
}

$email = trim($input['email']);
$password = $input['password'];

$user = validateCredentials($email, $password);
if (!$user) {
    json_response(['error' => 'Invalid credentials'], 401);
}

$token = generateSessionToken($email);
setSessionCookie($token);

json_response(['success' => true, 'email' => $email]);