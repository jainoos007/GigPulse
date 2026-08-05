"use client";

import React, { useState } from "react";
import { Task, TaskStatus } from "../types/task.types";
import { Calendar, Briefcase, Trash2, ArrowRightLeft } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  task: Task;
  onMoveStage: (id: string, status: TaskStatus) => void;
  onDelete: (id: string) => void;
}

export const TaskCard: React.FC<Props> = ({ task, onMoveStage, onDelete }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "LOW":
        return <Badge variant="secondary">Low</Badge>;
      case "MEDIUM":
        return <Badge variant="default">Medium</Badge>;
      case "HIGH":
        return <Badge variant="warning">High</Badge>;
      case "URGENT":
        return <Badge variant="destructive">Urgent</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const nextStatusMap: Record<TaskStatus, TaskStatus> = {
    TODO: "IN_PROGRESS",
    IN_PROGRESS: "REVIEW",
    REVIEW: "COMPLETED",
    COMPLETED: "TODO",
  };

  const handleMove = () => {
    const nextStage = nextStatusMap[task.status];
    onMoveStage(task.id, nextStage);
    toast.success("Task Stage Advanced", {
      description: `Task "${task.title}" moved to ${nextStage.replace("_", " ")}.`,
    });
  };

  const handleDelete = () => {
    onDelete(task.id);
    toast.success("Task deleted", {
      description: `Task "${task.title}" was removed.`,
    });
  };

  return (
    <Card className="p-4 bg-slate-900 border-slate-800 hover:border-slate-700 transition-all space-y-3 shadow-md group">
      <div className="flex items-start justify-between gap-2">
        <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
          {task.title}
        </h4>
        {getPriorityBadge(task.priority)}
      </div>

      {task.description && (
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{task.description}</p>
      )}

      {task.projectName && (
        <p className="text-[11px] text-slate-400 flex items-center gap-1">
          <Briefcase className="w-3 h-3 text-slate-500" />
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
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMove}
            className="h-7 px-2 text-[11px] text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 font-semibold"
            title={`Move to ${nextStatusMap[task.status].replace("_", " ")}`}
          >
            <ArrowRightLeft className="w-3 h-3 mr-1" /> Advance
          </Button>

          <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                title="Delete Task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Task &quot;{task.title}&quot;?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently delete this task from the Kanban board.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete Task</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
};
