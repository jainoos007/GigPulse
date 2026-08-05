"use client";

import React from "react";
import { Task, TaskStatus } from "../types/task.types";
import { Calendar, Briefcase, Trash2, ArrowRightLeft } from "lucide-react";

interface Props {
  task: Task;
  onMoveStage: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<Props> = ({ task, onMoveStage, onDelete }) => {
  const priorityColors = {
    LOW: "bg-slate-800 text-slate-400 border-slate-700",
    MEDIUM: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    HIGH: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    URGENT: "bg-red-500/10 text-red-400 border-red-500/20 font-bold",
  };

  const nextStatusMap: Record<TaskStatus, TaskStatus> = {
    TODO: "IN_PROGRESS",
    IN_PROGRESS: "REVIEW",
    REVIEW: "COMPLETED",
    COMPLETED: "TODO",
  };

  return (
    <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-md group">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
          {task.title}
        </h4>
        <span
          className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold border ${
            priorityColors[task.priority] || priorityColors.MEDIUM
          }`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-slate-400 line-clamp-2">{task.description}</p>
      )}

      {task.projectName && (
        <p className="text-[11px] text-slate-500 flex items-center gap-1">
          <Briefcase className="w-3 h-3 text-slate-600" />
          {task.projectName}
        </p>
      )}

      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between">
        {task.dueDate ? (
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <Calendar className="w-3 h-3 text-slate-500" />
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        ) : (
          <span className="text-[10px] text-slate-600">No Due Date</span>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={() => onMoveStage(task.id, nextStatusMap[task.status])}
            className="text-[11px] text-emerald-400 hover:text-emerald-300 font-medium px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg flex items-center gap-1 transition-colors"
            title={`Move to ${nextStatusMap[task.status].replace("_", " ")}`}
          >
            <ArrowRightLeft className="w-3 h-3" /> Advance
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-slate-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors"
            title="Delete Task"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
