<?php

// $host = "localhost";
// $db_user = "bit_academy";
// $db_pass = "";
// $db_name = "GameDevelopmentLogboek";

$host = "sql303.infinityfree.com";
$db_user = "if0_39215451";
$db_pass = "KMkc6gjMzunf";
$db_name = "if0_39215451_logboek";

$conn = new mysqli($host, $db_user, $db_pass, $db_name);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Databaseverbinding mislukt: ' . $conn->connect_error]));
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$note = $data['note'] ?? '';
$day = $data['day'] ?? '';
$date = $data['date'] ?? '';

if ($note && $day && $date) {
    $stmt = $conn->prepare("INSERT INTO logboek (notitie, dag, datum) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $note, $day, $date);

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Notitie opgeslagen"];
    } else {
        $response = ["status" => "error", "message" => "Fout bij opslaan: " . $stmt->error];
    }

    $stmt->close();
} else {
    $response = ["status" => "error", "message" => "Ontbrekende gegevens"];
}

$conn->close();

header("Content-Type: application/json");

echo json_encode($response);
