"use client";

import React, { useState } from "react";
import { Task, TaskStatus, USERS } from "@/types";
import { useTaskContext } from "@/context/TaskContext";

interface Props {
  task: Task;
  onClose: () => void;
}

const priorityColors: Record<string, string> = {
  Alta: "bg-red-100 text-red-700 border-red-200",
  Media: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Baja: "bg-green-100 text-green-700 border-green-200",
};

const statusOptions: TaskStatus[] = ["Pendiente", "En Proceso", "Terminado"];

export default function TaskDetailModal({ task, onClose }: Props) {
  const { updateTaskStatus, deleteTask, addComment } = useTaskContext();
  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState(USERS[0]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateTaskStatus(task.id, e.target.value as TaskStatus);
  };

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addComment(task.id, commentAuthor, commentText.trim());
    setCommentText("");
  };

  const handleDelete = () => {
    if (confirm("¿Eliminar esta tarea?")) {
      deleteTask(task.id);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100">
          <div className="flex-1 pr-4">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <h2 className="text-xl font-bold text-slate-800 mt-2">{task.title}</h2>
            <p className="text-sm text-slate-500 mt-1">Creada el {task.createdAt}</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-2xl font-light leading-none mt-1"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Descripción */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Descripción</h3>
            <p className="text-slate-700 text-sm leading-relaxed">{task.description}</p>
          </div>

          {/* Assignee + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Asignado a</h3>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                  {task.assignee.charAt(0)}
                </div>
                <span className="text-sm text-slate-700">{task.assignee}</span>
              </div>
            </div>
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Estado</h3>
              <select
                value={task.status}
                onChange={handleStatusChange}
                className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white text-slate-700 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {statusOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Comentarios */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Comentarios ({task.comments.length})
            </h3>
            {task.comments.length === 0 && (
              <p className="text-slate-400 text-sm italic">Sin comentarios aún.</p>
            )}
            <div className="space-y-3">
              {task.comments.map((c) => (
                <div key={c.id} className="bg-slate-50 rounded-xl p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">
                      {c.author.charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{c.author}</span>
                    <span className="text-xs text-slate-400">{c.createdAt}</span>
                  </div>
                  <p className="text-sm text-slate-700 pl-8">{c.text}</p>
                </div>
              ))}
            </div>

            {/* Nuevo comentario */}
            <div className="mt-4 space-y-2">
              <select
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {USERS.filter((u) => u !== "Sin asignar").map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                  placeholder="Escribe un comentario..."
                  className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={handleDelete}
            className="text-sm text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition"
          >
            🗑 Eliminar tarea
          </button>
        </div>
      </div>
    </div>
  );
}
