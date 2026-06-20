/**
 * Pruebas unitarias — TaskManager
 * Estas pruebas validan la lógica básica de gestión de tareas.
 * Se ejecutan automáticamente en cada push mediante el pipeline de CI.
 */

// ── Utilidades de tareas ─────────────────────────────────────
function createTask(title, status = 'pending') {
  if (!title || title.trim() === '') {
    throw new Error('El título de la tarea no puede estar vacío');
  }
  return {
    id: Date.now(),
    title: title.trim(),
    status,
    createdAt: new Date().toISOString(),
  };
}

function updateTaskStatus(task, newStatus) {
  const validStatuses = ['pending', 'in-progress', 'done'];
  if (!validStatuses.includes(newStatus)) {
    throw new Error(`Estado inválido: ${newStatus}`);
  }
  return { ...task, status: newStatus };
}

function filterByStatus(tasks, status) {
  return tasks.filter(t => t.status === status);
}

// ── Tests ────────────────────────────────────────────────────
describe('createTask', () => {
  test('crea una tarea con título y estado por defecto', () => {
    const task = createTask('Diseñar interfaz');
    expect(task.title).toBe('Diseñar interfaz');
    expect(task.status).toBe('pending');
    expect(task.id).toBeDefined();
  });

  test('crea una tarea con estado personalizado', () => {
    const task = createTask('Implementar API', 'in-progress');
    expect(task.status).toBe('in-progress');
  });

  test('elimina espacios al inicio y final del título', () => {
    const task = createTask('  Revisar PR  ');
    expect(task.title).toBe('Revisar PR');
  });

  test('lanza error si el título está vacío', () => {
    expect(() => createTask('')).toThrow('El título de la tarea no puede estar vacío');
  });
});

describe('updateTaskStatus', () => {
  test('actualiza el estado de una tarea correctamente', () => {
    const task = createTask('Escribir pruebas');
    const updated = updateTaskStatus(task, 'done');
    expect(updated.status).toBe('done');
    expect(updated.title).toBe('Escribir pruebas');
  });

  test('lanza error si el estado no es válido', () => {
    const task = createTask('Deploy');
    expect(() => updateTaskStatus(task, 'cancelado')).toThrow('Estado inválido');
  });
});

describe('filterByStatus', () => {
  const tasks = [
    createTask('Tarea 1', 'pending'),
    createTask('Tarea 2', 'in-progress'),
    createTask('Tarea 3', 'done'),
    createTask('Tarea 4', 'pending'),
  ];

  test('filtra tareas pendientes', () => {
    const pending = filterByStatus(tasks, 'pending');
    expect(pending).toHaveLength(2);
  });

  test('filtra tareas en progreso', () => {
    const inProgress = filterByStatus(tasks, 'in-progress');
    expect(inProgress).toHaveLength(1);
  });

  test('retorna arreglo vacío si no hay coincidencias', () => {
    const result = filterByStatus(tasks, 'done');
    expect(result).toHaveLength(1);
  });
});
