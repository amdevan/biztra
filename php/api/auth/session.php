<?php
/**
 * GET /api/auth/session — Check current session status
 */

header('Content-Type: application/json');

require_once __DIR__ . '/../../includes/auth.php';
require_once __DIR__ . '/../../includes/helpers.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    json_response(['error' => 'Method not allowed'], 405);
}

$user = getSessionUser();

if ($user) {
    json_response(['authenticated' => true, 'email' => $user['email']]);
} else {
    json_response(['authenticated' => false]);
}