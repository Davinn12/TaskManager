-- ─────────────────────────────────────────────────────────────
--  TaskManager — Schema de base de datos
--  Motor: MySQL 8
-- ─────────────────────────────────────────────────────────────

CREATE DATABASE IF NOT EXISTS taskmanager
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE taskmanager;

-- ── Usuarios ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)        NOT NULL,
  email      VARCHAR(150)        NOT NULL UNIQUE,
  created_at DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── Tareas ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS tasks (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(200)        NOT NULL,
  description TEXT,
  status      ENUM('pending','in-progress','done') NOT NULL DEFAULT 'pending',
  due_date    DATE,
  assigned_to INT UNSIGNED,
  created_at  DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP
                                  ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ── Comentarios ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  task_id    INT UNSIGNED        NOT NULL,
  content    TEXT                NOT NULL,
  author     VARCHAR(100)        NOT NULL DEFAULT 'Anónimo',
  created_at DATETIME            NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── Datos iniciales ───────────────────────────────────────────
INSERT INTO users (name, email) VALUES
  ('Juan Felipe De Hoyos', 'juanfelipe@taskmanager.com'),
  ('Matias Betancurt',      'matias@taskmanager.com'),
  ('Cristian Gutierrez',    'cristian@taskmanager.com'),
  ('Davison Valencia',      'davison@taskmanager.com');

INSERT INTO tasks (title, description, status, assigned_to) VALUES
  ('Configurar Docker Compose',   'Levantar frontend, backend y base de datos en contenedores', 'done',        4),
  ('Implementar pipeline Jenkins','Configurar Jenkinsfile con etapas de CI/CD',                'done',        4),
  ('Agregar GitHub Actions',      'Crear workflow .yml con lint, pruebas y build',              'done',        1),
  ('Desarrollar API REST',        'Endpoints CRUD para tareas, usuarios y comentarios',         'in-progress', 2),
  ('Pruebas unitarias Jest',      'Cobertura de funciones principales del frontend',            'in-progress', 3),
  ('Diseño UI tablero Kanban',    'Columnas Pendiente / En Proceso / Terminado con drag&drop',  'pending',     1);

INSERT INTO comments (task_id, content, author) VALUES
  (1, 'Contenedores comunicados correctamente en red taskmanager_net', 'Davison Valencia'),
  (2, 'Pipeline ejecutándose automáticamente ante cada push a main',    'Davison Valencia'),
  (3, 'Build en verde y rojo evidenciados para la Entrega 3',           'Juan Felipe De Hoyos');
