<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    header('Allow: POST');
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$organization = trim((string) ($_POST['organization'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));
$consent = isset($_POST['consent']) && (string) $_POST['consent'] !== '';
$honeypot = trim((string) ($_POST['website'] ?? ''));

if ($honeypot !== '') {
    echo json_encode(['ok' => true]);
    exit;
}

if (strlen($name) > 400 || strlen($organization) > 500 || strlen($email) > 400 || strlen($message) > 40000) {
    http_response_code(413);
    echo json_encode(['ok' => false, 'error' => 'Request is too large.']);
    exit;
}

if ($name === '' || $organization === '' || $message === '' || !$consent || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Please complete all required fields.']);
    exit;
}

foreach ([$name, $organization, $email, $message] as $value) {
    if (preg_match('/[\r\n]/', $value)) {
        http_response_code(422);
        echo json_encode(['ok' => false, 'error' => 'Invalid form data.']);
        exit;
    }
}

$name = mb_substr($name, 0, 120);
$organization = mb_substr($organization, 0, 160);
$email = mb_substr($email, 0, 254);
$message = mb_substr($message, 0, 10000);

// Recipient address for website inquiries. Change here if needed.
$TO_EMAIL = 'contact@nanutechsolution.com';
$subject = 'New website inquiry from ' . $name;
$body = "New website inquiry\n\nName: {$name}\nOrganization: {$organization}\nEmail: {$email}\n\nMessage:\n{$message}\n";
$headers = [
    'From: Website contact <' . $TO_EMAIL . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
];

$sent = mail($TO_EMAIL, $subject, $body, implode("\r\n", $headers));
if (!$sent) {
    http_response_code(503);
    echo json_encode(['ok' => false, 'error' => 'The message could not be sent. Please try again later.']);
    exit;
}

echo json_encode(['ok' => true]);
