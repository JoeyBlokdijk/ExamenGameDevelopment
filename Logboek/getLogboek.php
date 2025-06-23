<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

$host = "sql303.infinityfree.com";
$db_user = "if0_39215451";
$db_pass = "KMkc6gjMzunf";
$db_name = "if0_39215451_logboek";

$conn = new mysqli($host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    file_put_contents("error_log.txt", "DB connect error: " . $conn->connect_error . "\n", FILE_APPEND);
    
    http_response_code(500);
    echo json_encode(["error" => "Verbinding mislukt."]);
    exit;
}

$sql = "SELECT * FROM logboek ORDER BY id DESC";
$result = $conn->query($sql);

if (!$result) {
    file_put_contents("error_log.txt", "SQL query error: " . $conn->error . "\n", FILE_APPEND);
    
    http_response_code(500);
    echo json_encode(["error" => "SQL query mislukt."]);
    exit;
}

$notities = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $notities[] = $row;
    }
}

$conn->close();

echo json_encode($notities);
