"use client";

import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "./TaskCard";
import { CreateTaskModal } from "./CreateTaskModal";
import { TaskStatus } from "../types/task.types";
import { Plus, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export const KanbanBoard: React.FC = () => {
  const { board, isLoading, addTask, moveTaskStage, removeTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: { key: TaskStatus; title: string; variant: "outline" | "default" | "warning" | "success" }[] = [
    { key: "TODO", title: "To Do", variant: "outline" },
    { key: "IN_PROGRESS", title: "In Progress", variant: "default" },
    { key: "REVIEW", title: "In Review", variant: "warning" },
    { key: "COMPLETED", title: "Completed", variant: "success" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Task Kanban Board</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Organize project deliverables and move tasks across stages</p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
        >
          <Plus className="w-4 h-4" /> Create Task
        </Button>
      </div>

      {/* Kanban Board Columns */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="p-4 space-y-4 min-h-[400px] bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-28 w-full" />
              <Skeleton className="h-28 w-full" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {columns.map((col) => {
            const taskList = board[col.key] || [];
            return (
              <Card
                key={col.key}
                className="p-4 bg-slate-100/70 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 space-y-4 min-h-[500px] flex flex-col shadow-sm dark:shadow-none"
              >
                <div className="flex items-center justify-between">
                  <Badge variant={col.variant} className="text-xs font-bold">
                    {col.title}
                  </Badge>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">{taskList.length}</span>
                </div>

                <div className="space-y-3 flex-1">
                  {taskList.length === 0 ? (
                    <div className="h-32 rounded-xl border border-dashed border-slate-300 dark:border-slate-800/80 flex items-center justify-center text-xs text-slate-400 dark:text-slate-600">
                      No tasks in {col.title}
                    </div>
                  ) : (
                    taskList.map((task) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        onMoveStage={moveTaskStage}
                        onDelete={removeTask}
                      />
                    ))
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Create Modal */}
      <CreateTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addTask}
      />
    </div>
  );
};
