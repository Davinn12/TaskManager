# TaskManager CI 🗂️

Sistema de gestión de tareas colaborativo estilo Trello, desarrollado como proyecto universitario para el módulo de **Integración Continua**. Permite organizar tareas en un tablero Kanban, asignar responsables, cambiar estados y agregar comentarios, todo con un pipeline de CI/CD automatizado sobre GitHub Actions.

---

## 👥 Integrantes

| Nombre | Rol |
|--------|-----|
| Juan Felipe De Hoyos Montes | Full Stack |
| Matias Betancurt Malagón | Full Stack |
| Davison Arley Valencia Valencia | Full Stack |

---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | Next.js 14 · React 18 · TypeScript · Tailwind CSS |
| Backend | PHP 8.2 + Slim Framework 4 *(próxima iteración)* |
| Base de datos | MySQL 8 *(próxima iteración)* |
| CI/CD | GitHub Actions |
| Contenedores | Docker + Docker Compose *(próxima iteración)* |

---

## ✨ Funcionalidades

- 📋 **Tablero Kanban** con tres columnas: `Pendiente`, `En Proceso` y `Terminado`
- ➕ **Crear tareas** con título, descripción, prioridad y responsable
- 🖱️ **Drag & drop** — arrastra las tarjetas entre columnas para cambiar el estado
- 🏷️ **Prioridades** — Alta, Media y Baja con indicadores de color
- 👤 **Asignación de usuarios** — asigna un integrante a cada tarea
- 💬 **Comentarios** — agrega seguimiento directamente en cada tarjeta
- 🗑️ **Eliminar tareas** desde el modal de detalle
- 🔍 **Búsqueda** por título o nombre del responsable

---

## 📋 Requisitos previos

Antes de clonar y ejecutar el proyecto asegúrate de tener instalado:

| Herramienta | Versión mínima | Cómo verificar |
|-------------|---------------|----------------|
| [Node.js](https://nodejs.org/) | 18.x o superior | `node --version` |
| [npm](https://www.npmjs.com/) | 9.x o superior | `npm --version` |
| [Git](https://git-scm.com/) | cualquiera | `git --version` |

---

## 📥 Instalación y ejecución local

### 1. Clonar el repositorio

```bash
git clone https://github.com/Davinn12/TaskManager.git
cd TaskManager
```

### 2. Instalar dependencias

```bash
npm install
```

> Esto descargará todos los paquetes necesarios definidos en `package.json`. Solo se necesita hacerlo la primera vez o cuando cambien las dependencias.

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

Abre tu navegador en **[http://localhost:3000](http://localhost:3000)** y verás el tablero funcionando.

---

## 🔧 Scripts disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo con hot-reload
npm run build    # Genera el build optimizado de producción
npm run start    # Ejecuta el build de producción en local
npm run lint     # Analiza el código con ESLint
npm test         # Ejecuta las pruebas unitarias (Jest)
```

---

## 🗂️ Estructura del proyecto

```
TaskManager/
├── app/
│   ├── layout.tsx          # Layout raíz de la aplicación
│   ├── page.tsx            # Página principal → renderiza el Board
│   ├── providers.tsx       # Proveedor del contexto global
│   └── globals.css         # Estilos globales con Tailwind
│
├── components/
│   ├── Board.tsx           # Contenedor principal del tablero Kanban
│   ├── KanbanColumn.tsx    # Columna individual (Pendiente / En Proceso / Terminado)
│   ├── TaskCard.tsx        # Tarjeta de tarea con drag & drop
│   ├── CreateTaskModal.tsx # Modal para crear nuevas tareas
│   └── TaskDetailModal.tsx # Modal de detalle, comentarios y cambio de estado
│
├── context/
│   └── TaskContext.tsx     # Estado global con React Context API
│
├── types/
│   └── index.ts            # Tipos TypeScript + datos iniciales de ejemplo
│
├── .github/
│   └── workflows/
│       └── ci.yml          # Pipeline de CI/CD con GitHub Actions
│
├── public/                 # Archivos estáticos
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## ⚙️ Pipeline de CI/CD

El archivo `.github/workflows/ci.yml` define un pipeline que se ejecuta automáticamente en cada `push` o `pull request` a las ramas `main` y `develop`. El pipeline realiza los siguientes pasos:

1. **Checkout** — descarga el código del repositorio
2. **Setup Node.js 20** — configura el entorno con caché de dependencias
3. **npm ci** — instalación limpia de dependencias
4. **ESLint** — análisis estático del código (`npm run lint`)
5. **Build** — compila el proyecto (`npm run build`)
6. **Tests** — ejecuta las pruebas unitarias (`npm test`)

Si cualquiera de estos pasos falla, el merge queda bloqueado hasta corregir el error.

---

## 🌿 Flujo de ramas

```
main ──────────────── producción (solo merges aprobados y con CI verde)
  └── develop ──────── integración (punto de unión de features)
        ├── feature/kanban-board
        ├── feature/auth
        └── feature/api-backend
```

**Convención de commits:**
```
feat: nueva funcionalidad
fix: corrección de bug
chore: tareas de configuración o mantenimiento
docs: cambios en documentación
test: adición o modificación de pruebas
```

---

## 🤝 Contribuir al proyecto

1. Crea tu rama desde `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/nombre-de-la-funcionalidad
   ```

2. Haz tus cambios y commitea:
   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   ```

3. Sube tu rama y abre un Pull Request hacia `develop`:
   ```bash
   git push origin feature/nombre-de-la-funcionalidad
   ```

4. Espera que el pipeline de CI pase y solicita revisión a un compañero.

---

## 📄 Licencia

Proyecto académico — Módulo de Integración Continua.
