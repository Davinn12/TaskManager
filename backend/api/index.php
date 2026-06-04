<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$host = getenv("DB_HOST") ?: "db";
$port = getenv("DB_PORT") ?: "3306";
$dbname = getenv("DB_NAME") ?: "taskmanager";
$user = getenv("DB_USER") ?: "taskuser";
$password = getenv("DB_PASSWORD") ?: "taskpass";

try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
        $user,
        $password
    );

    echo json_encode([
        "status" => "ok",
        "message" => "Comunicación exitosa entre backend y base de datos",
        "backend" => "PHP 8.2 + Apache",
        "database" => "MySQL 8",
        "container_connection" => "backend -> db"
    ]);
} catch (Exception $e) {
    echo json_encode([
        "status" => "error",
        "message" => "El backend funciona, pero no se pudo conectar a la base de datos",
        "detail" => $e->getMessage()
    ]);
}