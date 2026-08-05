"use client";

import React, { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import { TaskCard } from "./TaskCard";
import { CreateTaskModal } from "./CreateTaskModal";
import { TaskStatus } from "../types/task.types";
import { Plus, CheckSquare, Layers } from "lucide-react";

export const KanbanBoard: React.FC = () => {
  const { board, isLoading, addTask, moveTaskStage, removeTask } = useTasks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const columns: { key: TaskStatus; title: string; color: string }[] = [
    { key: "TODO", title: "To Do", color: "bg-slate-500/20 text-slate-300 border-slate-700" },
    { key: "IN_PROGRESS", title: "In Progress", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    { key: "REVIEW", title: "In Review", color: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
    { key: "COMPLETED", title: "Completed", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Task Kanban Board</h1>
          <p className="text-sm text-slate-400 mt-1">Organize project deliverables and move tasks across stages</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Task
        </button>
      </div>

      {/* Kanban Board Columns */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading Kanban board...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {columns.map((col) => {
            const taskList = board[col.key] || [];
            return (
              <div
                key={col.key}
                className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 min-h-[500px] flex flex-col"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${col.color}`}>
                      {col.title}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">{taskList.length}</span>
                </div>

                <div className="space-y-3 flex-1">
                  {taskList.length === 0 ? (
                    <div className="h-32 rounded-xl border border-dashed border-slate-800/80 flex items-center justify-center text-xs text-slate-600">
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
              </div>
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
