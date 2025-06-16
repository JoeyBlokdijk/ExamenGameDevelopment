<?php

header('Content-Type: application/json');

// $host = "localhost";
// $user = "bit_academy";
// $password = "";
// $database = "GameDevelopmentLogboek";

$host = "sql303.infinityfree.com";
$db_user = "if0_39215451";
$db_pass = "KMkc6gjMzunf";
$db_name = "if0_39215451_logboek";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Verbinding mislukt: " . $conn->connect_error);
} else {
    echo "Verbinding gelukt";
}

$sql = "SELECT * FROM logboek ORDER BY datum DESC";
$result = $conn->query($sql);

$notities = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $notities[] = $row;
    }
}

$conn->close();

echo json_encode($notities);
