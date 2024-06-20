<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Database configuration
$servername = "localhost:3307";
$username = "root";
$password = ""; // Replace with your actual password
$dbname = "admin";


// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Fetch testimonials
$sql = "SELECT name, image, rating, title, content FROM testimonials";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $testimonials = [];
    while($row = $result->fetch_assoc()) {
        $testimonials[] = $row;
    }
    echo json_encode($testimonials);
} else {
    echo json_encode([]);
}

$conn->close();
?>
