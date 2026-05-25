"use client";

import React, { useState } from "react";
import { Task, TaskStatus, Column } from "@/types";
import { useTaskContext } from "@/context/TaskContext";
import TaskCard from "./TaskCard";

interface Props {
  column: Column;
  onCardClick: (task: Task) => void;
  onAddTask: (status: TaskStatus) => void;
}

export default function KanbanColumn({ column, onCardClick, onAddTask }: Props) {
  const { getTasksByStatus, updateTaskStatus } = useTaskContext();
  const [isDragOver, setIsDragOver] = useState(false);

  const tasks = getTasksByStatus(column.id);

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData("taskId");
    if (taskId) updateTaskStatus(taskId, column.id);
  };

  const columnHeaderColors: Record<string, string> = {
    Pendiente: "bg-slate-200 text-slate-700",
    "En Proceso": "bg-blue-200 text-blue-800",
    Terminado: "bg-green-200 text-green-800",
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`flex flex-col rounded-2xl transition-all duration-200 ${
        isDragOver ? "ring-2 ring-blue-400 ring-offset-2 bg-blue-50/60" : column.bgColor
      } border ${column.borderColor} min-h-[500px]`}
    >
      {/* Column header */}
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${columnHeaderColors[column.id]}`}>
              {column.title}
            </span>
          </div>
          <span className={`text-xs font-semibold ${column.color} bg-white/70 w-6 h-6 rounded-full flex items-center justify-center`}>
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Cards */}
      <div className="flex-1 px-3 space-y-2.5 overflow-y-auto min-h-[200px]">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={onCardClick}
            onDragStart={handleDragStart}
          />
        ))}

        {tasks.length === 0 && !isDragOver && (
          <div className="flex items-center justify-center h-24 rounded-xl border-2 border-dashed border-slate-200 text-slate-300 text-sm">
            Arrastra tarjetas aquí
          </div>
        )}
      </div>

      {/* Add task button */}
      <div className="p-3 pt-2">
        <button
          onClick={() => onAddTask(column.id)}
          className={`w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium transition-colors ${column.color} hover:bg-white/70 border border-dashed ${column.borderColor}`}
        >
          <span className="text-lg leading-none">+</span> Agregar tarea
        </button>
      </div>
    </div>
  );
}
