"use client";
import { TaskProvider } from "@/context/TaskContext";
export default function Providers({ children }: { children: React.ReactNode }) {
  return <TaskProvider>{children}</TaskProvider>;
}
