<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

require 'database.php'; // Include your database connection

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $stmt = $pdo->query('SELECT * FROM contactInfo LIMIT 1');
    $contact = $stmt->fetch(PDO::FETCH_ASSOC);
    echo json_encode($contact);
}
?>
