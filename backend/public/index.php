<?php

declare(strict_types=1);

use DI\ContainerBuilder;
use Slim\Factory\AppFactory;

require __DIR__ . '/../vendor/autoload.php';

// ── Contenedor de dependencias ────────────────────────────────
$builder = new ContainerBuilder();
$builder->addDefinitions([
    PDO::class => function () {
        $host     = getenv('DB_HOST')     ?: 'db';
        $port     = getenv('DB_PORT')     ?: '3306';
        $dbname   = getenv('DB_NAME')     ?: 'taskmanager';
        $user     = getenv('DB_USER')     ?: 'taskuser';
        $password = getenv('DB_PASSWORD') ?: 'taskpass';

        $pdo = new PDO(
            "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
            $user,
            $password,
            [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]
        );
        return $pdo;
    },
]);

$container = $builder->build();
AppFactory::setContainer($container);

$app = AppFactory::create();

// ── Middleware ────────────────────────────────────────────────
$app->addBodyParsingMiddleware();
$app->addRoutingMiddleware();
$app->addErrorMiddleware(true, true, true);

// ── CORS ──────────────────────────────────────────────────────
$app->add(function ($request, $handler) {
    $response = $handler->handle($request);
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});

$app->options('/{routes:.+}', function ($request, $response) {
    return $response;
});

// ── Rutas ─────────────────────────────────────────────────────
require __DIR__ . '/../src/routes.php';

$app->run();
