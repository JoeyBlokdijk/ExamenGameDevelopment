<?php

session_start();
ini_set('display_errors', 1);
error_reporting(E_ALL);

$gebruikersnaam = 'LogboekAdmin';
$wachtwoord = 'LogboekWachtwoord12!';

if (isset($_POST['username']) && isset($_POST['password'])) {
    if ($_POST['username'] === $gebruikersnaam && $_POST['password'] === $wachtwoord) {
        $_SESSION['loggedin'] = true;
    } else {
        $foutmelding = "Verkeerde gebruikersnaam of wachtwoord.";
    }
}

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    echo "<!DOCTYPE html>";
    echo "<html>";
    echo "<head>";
    echo "<link rel='stylesheet' href='Logboek.css' type='text/css'>";
    echo "</head>";
    echo "<body>";
    echo "<div class='placeForInputField'></div>";
    echo "<div class='placeForEveryThing'></div>";
    echo "<script src='Logboek.js'></script>";
    echo "</body>";
    echo "</html>";
} else {
    echo "<!DOCTYPE html>";
    echo "<html>";
    echo "<head><title>Login</title></head>";
    echo "<body>";
    if (isset($foutmelding)) {
        echo "<p style='color:red;'>$foutmelding</p>";
    }
    echo "<form method='post'>";
    echo "Gebruikersnaam: <input type='text' name='username'><br>";
    echo "Wachtwoord: <input type='password' name='password'><br>";
    echo "<input type='submit' value='Inloggen'>";
    echo "</form>";
    echo "</body>";
    echo "</html>";
}
?>