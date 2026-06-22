<?php

declare(strict_types=1);

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\App;

/** @var App $app */

// ── Health check ──────────────────────────────────────────────
$app->get('/', function (Request $request, Response $response) {
    $data = [
        'status'  => 'ok',
        'service' => 'TaskManager API',
        'version' => '1.0.0',
        'stack'   => 'PHP 8.2 + Slim Framework 4 + MySQL 8',
    ];
    $response->getBody()->write(json_encode($data));
    return $response->withHeader('Content-Type', 'application/json');
});

// ════════════════════════════════════════════════════════════
//  USUARIOS
// ════════════════════════════════════════════════════════════

// GET /users — listar todos los usuarios
$app->get('/users', function (Request $request, Response $response) {
    $pdo   = $this->get(PDO::class);
    $users = $pdo->query('SELECT * FROM users ORDER BY id')->fetchAll();
    $response->getBody()->write(json_encode($users));
    return $response->withHeader('Content-Type', 'application/json');
});

// POST /users — crear usuario
$app->post('/users', function (Request $request, Response $response) {
    $pdo  = $this->get(PDO::class);
    $body = $request->getParsedBody();

    if (empty($body['name']) || empty($body['email'])) {
        $response->getBody()->write(json_encode(['error' => 'name y email son requeridos']));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }

    $stmt = $pdo->prepare('INSERT INTO users (name, email) VALUES (:name, :email)');
    $stmt->execute(['name' => $body['name'], 'email' => $body['email']]);

    $user = $pdo->query('SELECT * FROM users WHERE id = ' . $pdo->lastInsertId())->fetch();
    $response->getBody()->write(json_encode($user));
    return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
});

// ════════════════════════════════════════════════════════════
//  TAREAS
// ════════════════════════════════════════════════════════════

// GET /tasks — listar todas las tareas (con usuario asignado)
$app->get('/tasks', function (Request $request, Response $response) {
    $pdo = $this->get(PDO::class);
    $sql = '
        SELECT t.*, u.name AS assigned_name
        FROM tasks t
        LEFT JOIN users u ON t.assigned_to = u.id
        ORDER BY t.created_at DESC
    ';
    $tasks = $pdo->query($sql)->fetchAll();
    $response->getBody()->write(json_encode($tasks));
    return $response->withHeader('Content-Type', 'application/json');
});

// GET /tasks/{id} — obtener una tarea
$app->get('/tasks/{id}', function (Request $request, Response $response, array $args) {
    $pdo  = $this->get(PDO::class);
    $stmt = $pdo->prepare('
        SELECT t.*, u.name AS assigned_name
        FROM tasks t
        LEFT JOIN users u ON t.assigned_to = u.id
        WHERE t.id = :id
    ');
    $stmt->execute(['id' => $args['id']]);
    $task = $stmt->fetch();

    if (!$task) {
        $response->getBody()->write(json_encode(['error' => 'Tarea no encontrada']));
        return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
    }

    $response->getBody()->write(json_encode($task));
    return $response->withHeader('Content-Type', 'application/json');
});

// POST /tasks — crear tarea
$app->post('/tasks', function (Request $request, Response $response) {
    $pdo  = $this->get(PDO::class);
    $body = $request->getParsedBody();

    if (empty($body['title'])) {
        $response->getBody()->write(json_encode(['error' => 'title es requerido']));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }

    $stmt = $pdo->prepare('
        INSERT INTO tasks (title, description, status, due_date, assigned_to)
        VALUES (:title, :description, :status, :due_date, :assigned_to)
    ');
    $stmt->execute([
        'title'       => $body['title'],
        'description' => $body['description'] ?? null,
        'status'      => $body['status']      ?? 'pending',
        'due_date'    => $body['due_date']    ?? null,
        'assigned_to' => $body['assigned_to'] ?? null,
    ]);

    $task = $pdo->query('SELECT * FROM tasks WHERE id = ' . $pdo->lastInsertId())->fetch();
    $response->getBody()->write(json_encode($task));
    return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
});

// PUT /tasks/{id} — actualizar tarea (título, descripción, estado, asignado)
$app->put('/tasks/{id}', function (Request $request, Response $response, array $args) {
    $pdo  = $this->get(PDO::class);
    $body = $request->getParsedBody();

    $stmt = $pdo->prepare('SELECT id FROM tasks WHERE id = :id');
    $stmt->execute(['id' => $args['id']]);
    if (!$stmt->fetch()) {
        $response->getBody()->write(json_encode(['error' => 'Tarea no encontrada']));
        return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
    }

    $fields = [];
    $params = ['id' => $args['id']];

    foreach (['title', 'description', 'status', 'due_date', 'assigned_to'] as $field) {
        if (array_key_exists($field, $body)) {
            $fields[] = "$field = :$field";
            $params[$field] = $body[$field];
        }
    }

    if (!empty($fields)) {
        $pdo->prepare('UPDATE tasks SET ' . implode(', ', $fields) . ' WHERE id = :id')
            ->execute($params);
    }

    $task = $pdo->query('SELECT * FROM tasks WHERE id = ' . $args['id'])->fetch();
    $response->getBody()->write(json_encode($task));
    return $response->withHeader('Content-Type', 'application/json');
});

// DELETE /tasks/{id} — eliminar tarea
$app->delete('/tasks/{id}', function (Request $request, Response $response, array $args) {
    $pdo  = $this->get(PDO::class);
    $stmt = $pdo->prepare('DELETE FROM tasks WHERE id = :id');
    $stmt->execute(['id' => $args['id']]);

    if ($stmt->rowCount() === 0) {
        $response->getBody()->write(json_encode(['error' => 'Tarea no encontrada']));
        return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
    }

    $response->getBody()->write(json_encode(['message' => 'Tarea eliminada']));
    return $response->withHeader('Content-Type', 'application/json');
});

// ════════════════════════════════════════════════════════════
//  COMENTARIOS
// ════════════════════════════════════════════════════════════

// GET /tasks/{id}/comments — listar comentarios de una tarea
$app->get('/tasks/{id}/comments', function (Request $request, Response $response, array $args) {
    $pdo  = $this->get(PDO::class);
    $stmt = $pdo->prepare('SELECT * FROM comments WHERE task_id = :id ORDER BY created_at ASC');
    $stmt->execute(['id' => $args['id']]);
    $comments = $stmt->fetchAll();
    $response->getBody()->write(json_encode($comments));
    return $response->withHeader('Content-Type', 'application/json');
});

// POST /tasks/{id}/comments — agregar comentario a una tarea
$app->post('/tasks/{id}/comments', function (Request $request, Response $response, array $args) {
    $pdo  = $this->get(PDO::class);
    $body = $request->getParsedBody();

    if (empty($body['content'])) {
        $response->getBody()->write(json_encode(['error' => 'content es requerido']));
        return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
    }

    $stmt = $pdo->prepare('
        INSERT INTO comments (task_id, content, author)
        VALUES (:task_id, :content, :author)
    ');
    $stmt->execute([
        'task_id' => $args['id'],
        'content' => $body['content'],
        'author'  => $body['author'] ?? 'Anónimo',
    ]);

    $comment = $pdo->query('SELECT * FROM comments WHERE id = ' . $pdo->lastInsertId())->fetch();
    $response->getBody()->write(json_encode($comment));
    return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
});
