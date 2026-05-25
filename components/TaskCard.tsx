"use client";

import React from "react";
import { Task } from "@/types";

interface Props {
  task: Task;
  onClick: (task: Task) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const priorityColors: Record<string, string> = {
  Alta: "bg-red-100 text-red-600",
  Media: "bg-amber-100 text-amber-600",
  Baja: "bg-emerald-100 text-emerald-600",
};

const priorityDot: Record<string, string> = {
  Alta: "bg-red-500",
  Media: "bg-amber-400",
  Baja: "bg-emerald-500",
};

export default function TaskCard({ task, onClick, onDragStart }: Props) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onClick={() => onClick(task)}
      className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 select-none group"
    >
      {/* Priority badge */}
      <div className="flex items-center justify-between mb-2">
        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[task.priority]}`} />
          {task.priority}
        </span>
        {task.comments.length > 0 && (
          <span className="text-xs text-slate-400 flex items-center gap-1">
            💬 {task.comments.length}
          </span>
        )}
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-1 group-hover:text-blue-700 transition-colors">
        {task.title}
      </h3>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
          {task.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center text-xs font-bold">
            {task.assignee.charAt(0)}
          </div>
          <span className="text-xs text-slate-500 truncate max-w-[90px]">{task.assignee}</span>
        </div>
        <span className="text-xs text-slate-400">{task.createdAt}</span>
      </div>
    </div>
  );
}
