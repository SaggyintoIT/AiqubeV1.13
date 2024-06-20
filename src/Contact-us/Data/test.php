<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
require 'database.php';

$method = $_SERVER['REQUEST_METHOD'];

switch($method) {
    case 'GET':
        $stmt = $pdo->query('SELECT * FROM contact');
        $contact = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($contact);
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $stmt = $pdo->prepare('INSERT INTO contact (name, email, message) VALUES (?, ?, ?)');
        $stmt->execute([$input['name'], $input['email'], $input['message']]);
        echo json_encode(['status' => 'success']);
        break;

    // Handle other methods (PUT, DELETE) similarly if needed
}
?>
