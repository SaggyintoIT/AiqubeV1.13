
<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
// Rest of your PHP script...

// Database connection
$servername = "localhost";
$username = "u782754589_TestAiqube";
$password = "23Test69@@"; // Replace with your actual password
$dbname = "u782754589_TestAiqube";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch footer links from database
$sql = "SELECT icon_link, hyperlink FROM footer_links";
$result = $conn->query($sql);

$footerLinks = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $footerLinks[] = $row;
    }
}

$conn->close();

// Output JSON
echo json_encode($footerLinks);
?>
