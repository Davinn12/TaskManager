/**
 * ARCHIVO TEMPORAL — solo para demostrar build en ROJO
 * 
 * Instrucciones:
 *   1. Renombrar a taskUtils.test.js (reemplazando el original)
 *   2. git add + commit + push → capturar el build en rojo
 *   3. Restaurar el archivo original (taskUtils.test.js del paso anterior)
 *   4. git add + commit + push → capturar el build en verde
 */

function createTask(title, status = 'pending') {
  return { id: 1, title, status };
}

describe('createTask — prueba intencionalmente rota', () => {
  test('FALLA: espera un estado que no existe', () => {
    const task = createTask('Tarea de prueba');
    // Esta aserción falla a propósito: el estado real es 'pending', no 'completado'
    expect(task.status).toBe('completado');
  });

  test('FALLA: espera un título modificado que no ocurre', () => {
    const task = createTask('Hola');
    // Esta aserción falla a propósito
    expect(task.title).toBe('Mundo');
  });
});
