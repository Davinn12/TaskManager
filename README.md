# TaskManager CI 🗂️

Sistema de gestión de tareas estilo Trello — Proyecto universitario de Integración Continua.

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | Next.js 14 + React 18 + TypeScript + Tailwind CSS |
| Backend | PHP 8.2 + Slim Framework 4 *(próxima iteración)* |
| Base de datos | MySQL 8 *(próxima iteración)* |
| CI/CD | GitHub Actions |
| Contenedores | Docker + Docker Compose *(próxima iteración)* |

## Funcionalidades

- 📋 Tablero Kanban con columnas: **Pendiente**, **En Proceso**, **Terminado**
- ✏️ Crear, editar y eliminar tareas
- 👤 Asignar usuarios a cada tarea
- 🏷️ Prioridades: Alta, Media, Baja
- 💬 Comentarios por tarea
- 🖱️ Drag & drop entre columnas

## Inicio rápido

```bash
# Clonar repositorio
git clone https://github.com/<usuario>/task-manager-ci.git
cd task-manager-ci/task-manager

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
# → http://localhost:3000
```

## Scripts

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # Análisis de código
npm test         # Pruebas unitarias
```

## Flujo de ramas

```
main ──── (producción, solo merges aprobados)
  └── develop ──── (integración continua)
        └── feature/<nombre> ──── (trabajo individual)
```

## Integrantes

| Nombre | Rol |
|--------|-----|
| Integrante 1 | Desarrollador Frontend |
| Integrante 2 | Desarrollador Backend |
| Integrante 3 | DevOps / Base de Datos |
