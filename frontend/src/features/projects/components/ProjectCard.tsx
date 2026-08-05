"use client";

import React from "react";
import { Project } from "../types/project.types";
import { Calendar, DollarSign, User, Trash2, Flag } from "lucide-react";

interface Props {
  project: Project;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<Props> = ({ project, onDelete }) => {
  const statusColors = {
    PLANNING: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    ACTIVE: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    ON_HOLD: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    COMPLETED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    CANCELLED: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const priorityColors = {
    LOW: "text-slate-400",
    MEDIUM: "text-blue-400",
    HIGH: "text-amber-400",
    URGENT: "text-red-400 font-bold",
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
              {project.name}
            </h3>
            {project.clientName && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {project.clientName}
              </p>
            )}
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
              statusColors[project.status] || statusColors.PLANNING
            }`}
          >
            {project.status.replace("_", " ")}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-slate-400">Progress</span>
            <span className="text-blue-400 font-bold">{project.progress}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
          {project.budget && (
            <div className="flex items-center gap-2 font-medium text-emerald-400">
              <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Budget: ${project.budget.toLocaleString()}</span>
            </div>
          )}

          {project.deadline && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
            </div>
          )}

          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-slate-500 shrink-0" />
            <span className={priorityColors[project.priority]}>
              Priority: {project.priority}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/50 flex items-center justify-between">
        <span className="text-[10px] text-slate-500">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={() => onDelete(project.id)}
          className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
          title="Delete Project"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
