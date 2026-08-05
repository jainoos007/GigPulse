"use client";

import React, { useState } from "react";
import { Project } from "../types/project.types";
import { Calendar, DollarSign, User, Trash2, Flag } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Props {
  project: Project;
  onDelete: (id: string) => void;
}

export const ProjectCard: React.FC<Props> = ({ project, onDelete }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PLANNING":
        return <Badge variant="secondary">Planning</Badge>;
      case "ACTIVE":
        return <Badge variant="default">Active</Badge>;
      case "ON_HOLD":
        return <Badge variant="warning">On Hold</Badge>;
      case "COMPLETED":
        return <Badge variant="success">Completed</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "LOW":
        return <span className="text-slate-400 font-medium">Low</span>;
      case "MEDIUM":
        return <span className="text-blue-400 font-medium">Medium</span>;
      case "HIGH":
        return <span className="text-amber-400 font-semibold">High</span>;
      case "URGENT":
        return <span className="text-red-400 font-bold">Urgent</span>;
      default:
        return <span className="text-slate-400">{priority}</span>;
    }
  };

  const handleDelete = () => {
    onDelete(project.id);
    toast.success("Project deleted", {
      description: `${project.name} has been removed from workspace.`,
    });
  };

  return (
    <Card className="flex flex-col justify-between hover:border-slate-700 transition-all group">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
              {project.name}
            </h3>
            {project.clientName && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {project.clientName}
              </p>
            )}
          </div>
          {getStatusBadge(project.status)}
        </div>
      </CardHeader>

      <CardContent className="p-5 py-3 space-y-3 text-xs border-t border-b border-slate-800/60 my-2">
        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-400">Progress</span>
            <span className="text-blue-400">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="space-y-1.5 text-slate-300 pt-1">
          {project.budget && (
            <div className="flex items-center gap-2 font-semibold text-emerald-400">
              <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Budget: ${project.budget.toLocaleString()}</span>
            </div>
          )}

          {project.deadline && (
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-slate-400">
            <Flag className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Priority: {getPriorityBadge(project.priority)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-2 flex items-center justify-between">
        <span className="text-[10px] text-slate-500">
          Created {new Date(project.createdAt).toLocaleDateString()}
        </span>

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10"
              title="Delete Project"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Project &quot;{project.name}&quot;?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the project and all related tasks.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete Project</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
