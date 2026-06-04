<?php

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

echo json_encode([
    "status" => "ok",
    "message" => "Backend PHP funcionando correctamente",
    "service" => "TaskManager Backend"
]);