<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$servername = "localhost:3307";
$username = "root";
$password = "";
$dbname = "admin";
$target_dir = "./";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $Name = $_POST['Name'] ?? null;
    $Email = $_POST['Email'] ?? null;
    $Position = $_POST['Position'] ?? null;
    $Phone = $_POST['Phone'] ?? null;
    $Message = $_POST['Message'] ?? null;

    if ($Name && $Email && $Position && $Phone && $Message && isset($_FILES['Resume'])) {
        $resume = $_FILES['Resume']['name'];
        $resume_tmp_name = $_FILES['Resume']['tmp_name'];

        if (move_uploaded_file($resume_tmp_name, $target_dir . $resume)) {
            $stmt = $conn->prepare("INSERT INTO applicants1 (Name, Email, Position, Phone, Message, Resume) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssss", $Name, $Email, $Position, $Phone, $Message, $resume);

            if ($stmt->execute()) {
                echo json_encode(['success' => 'Form submitted successfully']);
            } else {
                http_response_code(500);
                echo json_encode(['error' => 'Error inserting data: ' . $stmt->error]);
            }

            $stmt->close();
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Error uploading file']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT image_url, Position, experience, description, button, link FROM job_cards";
    $result = $conn->query($sql);

    $cards = [];

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $cards[] = $row;
        }
        echo json_encode($cards);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'No job cards found']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}

$conn->close();
?>