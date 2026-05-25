export type TaskStatus = "Pendiente" | "En Proceso" | "Terminado";
export type Priority = "Alta" | "Media" | "Baja";

export interface Comment {
  id: string;
  author: string;
  text: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignee: string;
  priority: Priority;
  createdAt: string;
  comments: Comment[];
}

export interface Column {
  id: TaskStatus;
  title: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export const COLUMNS: Column[] = [
  {
    id: "Pendiente",
    title: "📋 Pendiente",
    color: "text-slate-700",
    bgColor: "bg-slate-100",
    borderColor: "border-slate-300",
  },
  {
    id: "En Proceso",
    title: "⚙️ En Proceso",
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-300",
  },
  {
    id: "Terminado",
    title: "✅ Terminado",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
  },
];

export const USERS = [
  "Integrante 1",
  "Integrante 2",
  "Integrante 3",
  "Sin asignar",
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Configurar repositorio GitHub",
    description: "Crear el repo, agregar colaboradores y configurar las ramas main y develop.",
    status: "Terminado",
    assignee: "Integrante 3",
    priority: "Alta",
    createdAt: "2026-05-20",
    comments: [
      { id: "c1", author: "Integrante 3", text: "Repositorio creado y colaboradores vinculados.", createdAt: "2026-05-20" },
    ],
  },
  {
    id: "2",
    title: "Diseñar UI del tablero Kanban",
    description: "Crear los componentes del tablero con las columnas Pendiente, En Proceso y Terminado.",
    status: "En Proceso",
    assignee: "Integrante 1",
    priority: "Alta",
    createdAt: "2026-05-21",
    comments: [],
  },
  {
    id: "3",
    title: "Configurar pipeline CI/CD",
    description: "Crear el archivo .github/workflows/ci.yml para ejecutar pruebas automáticas.",
    status: "En Proceso",
    assignee: "Integrante 3",
    priority: "Media",
    createdAt: "2026-05-22",
    comments: [],
  },
  {
    id: "4",
    title: "Implementar API de tareas",
    description: "Crear los endpoints REST en PHP/Slim para CRUD de tareas y usuarios.",
    status: "Pendiente",
    assignee: "Integrante 2",
    priority: "Alta",
    createdAt: "2026-05-23",
    comments: [],
  },
  {
    id: "5",
    title: "Diseñar esquema MySQL",
    description: "Crear las tablas: usuarios, tareas, comentarios con sus relaciones.",
    status: "Pendiente",
    assignee: "Integrante 3",
    priority: "Alta",
    createdAt: "2026-05-23",
    comments: [],
  },
  {
    id: "6",
    title: "Escribir pruebas unitarias frontend",
    description: "Implementar tests con Jest + React Testing Library para los componentes principales.",
    status: "Pendiente",
    assignee: "Integrante 1",
    priority: "Media",
    createdAt: "2026-05-24",
    comments: [],
  },
];
