"use client";

import React, { useState } from "react";
import { useProjects } from "../hooks/useProjects";
import { Project } from "../types/project.types";
import { ProjectCard } from "./ProjectCard";
import { CreateProjectModal } from "./CreateProjectModal";
import { EditProjectModal } from "./EditProjectModal";
import { Search, Plus, Briefcase, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const ProjectList: React.FC = () => {
  const {
    projects,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    addProject,
    updateProject,
    removeProject,
  } = useProjects();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const statusOptions = [
    { id: "ALL", label: "All Statuses", color: "bg-slate-400" },
    { id: "PLANNING", label: "Planning", color: "bg-blue-400" },
    { id: "ACTIVE", label: "Active", color: "bg-emerald-500" },
    { id: "ON_HOLD", label: "On Hold", color: "bg-amber-500" },
    { id: "COMPLETED", label: "Completed", color: "bg-blue-600" },
    { id: "CANCELLED", label: "Cancelled", color: "bg-rose-500" },
  ];

  const priorityOptions = [
    { id: "ALL", label: "All Priorities", color: "bg-slate-400" },
    { id: "LOW", label: "Low", color: "bg-slate-400" },
    { id: "MEDIUM", label: "Medium", color: "bg-blue-500" },
    { id: "HIGH", label: "High", color: "bg-amber-500" },
    { id: "URGENT", label: "Urgent", color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Projects</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Track active projects, budgets, priorities, and progress</p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-sm hover:shadow"
        >
          <Plus className="w-4 h-4" /> Create Project
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <Card className="bg-white/80 dark:bg-slate-900/60 p-3.5 sm:p-4 border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md space-y-3 transition-all">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects by name or description..."
              className="pl-10 pr-9 h-10 bg-slate-50/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-md"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
            <div className="relative flex-1 sm:flex-initial sm:w-[170px]">
              <Select
                value={statusFilter || "ALL"}
                onValueChange={(val) => setStatusFilter(val === "ALL" ? "" : val)}
              >
                <SelectTrigger className="h-10 w-full bg-slate-50/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs sm:text-sm font-medium">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-xl">
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                        <span>{opt.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative flex-1 sm:flex-initial sm:w-[170px]">
              <Select
                value={priorityFilter || "ALL"}
                onValueChange={(val) => setPriorityFilter(val === "ALL" ? "" : val)}
              >
                <SelectTrigger className="h-10 w-full bg-slate-50/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-xs sm:text-sm font-medium">
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-xl">
                  {priorityOptions.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                        <span>{opt.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {(search || statusFilter || priorityFilter) && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 dark:text-slate-500 font-medium">Active filters:</span>

              {search && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50 font-medium text-[11px]">
                  <span>Search: &quot;{search}&quot;</span>
                  <button
                    onClick={() => setSearch("")}
                    className="hover:text-blue-900 dark:hover:text-white transition-colors"
                    title="Remove search filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {statusFilter && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/50 font-medium text-[11px]">
                  <span>Status: {statusFilter}</span>
                  <button
                    onClick={() => setStatusFilter("")}
                    className="hover:text-emerald-900 dark:hover:text-white transition-colors"
                    title="Remove status filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {priorityFilter && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200/60 dark:border-amber-900/50 font-medium text-[11px]">
                  <span>Priority: {priorityFilter}</span>
                  <button
                    onClick={() => setPriorityFilter("")}
                    className="hover:text-amber-900 dark:hover:text-white transition-colors"
                    title="Remove priority filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("");
                setStatusFilter("");
                setPriorityFilter("");
              }}
              className="h-7 px-2.5 text-[11px] font-semibold text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors shrink-0"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </Card>

      {/* Project Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-6 space-y-4 bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-4 w-1/3" />
            </Card>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <Card className="text-center py-16 bg-white/40 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800">
          <CardContent className="space-y-3 pt-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No projects found</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              Start tracking project milestones, deadlines, and deliverables for your clients.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="mt-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Create First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onDelete={removeProject} onEdit={setEditingProject} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addProject}
      />

      {/* Edit Modal */}
      <EditProjectModal
        isOpen={!!editingProject}
        project={editingProject}
        onClose={() => setEditingProject(null)}
        onSubmit={updateProject}
      />
    </div>
  );
};
