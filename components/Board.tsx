"use client";

import React, { useState } from "react";
import { Task, TaskStatus, COLUMNS } from "@/types";
import { useTaskContext } from "@/context/TaskContext";
import KanbanColumn from "./KanbanColumn";
import TaskDetailModal from "./TaskDetailModal";
import CreateTaskModal from "./CreateTaskModal";

export default function Board() {
  const { tasks } = useTaskContext();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [createStatus, setCreateStatus] = useState<TaskStatus | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCount = tasks.filter((t) =>
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.assignee.toLowerCase().includes(searchQuery.toLowerCase())
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold text-lg shadow">
              T
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-800 leading-tight">TaskManager CI</h1>
              <p className="text-xs text-slate-500">Integración Continua — Módulo</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative hidden sm:block">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar tareas..."
                className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400 w-52"
              />
            </div>

            {/* Stats */}
            <div className="hidden md:flex items-center gap-3 text-xs text-slate-500">
              <span className="bg-slate-100 px-3 py-1.5 rounded-full font-medium">
                {tasks.length} tareas
              </span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-medium">
                {tasks.filter(t => t.status === "En Proceso").length} en proceso
              </span>
            </div>

            {/* New task button */}
            <button
              onClick={() => setCreateStatus("Pendiente")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition shadow-sm hover:shadow-md"
            >
              <span className="text-base leading-none">+</span>
              <span className="hidden sm:inline">Nueva tarea</span>
            </button>
          </div>
        </div>
      </header>

      {/* Board */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Search results notice */}
        {searchQuery && (
          <div className="mb-4 text-sm text-slate-500">
            Mostrando resultados para{" "}
            <span className="font-semibold text-slate-700">&ldquo;{searchQuery}&rdquo;</span> — {filteredCount} coincidencia(s)
            <button onClick={() => setSearchQuery("")} className="ml-2 text-blue-600 hover:underline">Limpiar</button>
          </div>
        )}

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              onCardClick={(task) => setSelectedTask(task)}
              onAddTask={(status) => setCreateStatus(status)}
            />
          ))}
        </div>

        {/* Footer info */}
        <div className="mt-6 text-center text-xs text-slate-400">
          Arrastra las tarjetas entre columnas para cambiar su estado · Haz clic en una tarjeta para ver detalles
        </div>
      </main>

      {/* Modals */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
      {createStatus && (
        <CreateTaskModal
          defaultStatus={createStatus}
          onClose={() => setCreateStatus(null)}
        />
      )}
    </div>
  );
}
