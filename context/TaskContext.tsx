"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Task, TaskStatus, Comment, INITIAL_TASKS } from "@/types";

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "comments">) => void;
  updateTaskStatus: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
  addComment: (taskId: string, author: string, text: string) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
}

const TaskContext = createContext<TaskContextType | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const addTask = useCallback((taskData: Omit<Task, "id" | "createdAt" | "comments">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
      comments: [],
    };
    setTasks((prev) => [...prev, newTask]);
  }, []);

  const updateTaskStatus = useCallback((id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status } : t))
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addComment = useCallback((taskId: string, author: string, text: string) => {
    const comment: Comment = {
      id: Date.now().toString(),
      author,
      text,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, comments: [...t.comments, comment] } : t
      )
    );
  }, []);

  const getTasksByStatus = useCallback(
    (status: TaskStatus) => tasks.filter((t) => t.status === status),
    [tasks]
  );

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, updateTaskStatus, deleteTask, addComment, getTasksByStatus }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTaskContext must be used inside TaskProvider");
  return ctx;
}
