"use client";

import React, { useState } from "react";
import { Meeting } from "../types/meeting.types";
import { Calendar, Video, ExternalLink, User, Trash2, Bell } from "lucide-react";
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
  meeting: Meeting;
  onDelete: (id: string) => void;
}

export const MeetingCard: React.FC<Props> = ({ meeting, onDelete }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const isPast = new Date(meeting.meetingDate) < new Date();

  const handleDelete = () => {
    onDelete(meeting.id);
    toast.success("Meeting removed", {
      description: `Meeting "${meeting.title}" deleted.`,
    });
  };

  return (
    <Card className="flex flex-col justify-between hover:border-slate-700 transition-all group">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">
              {meeting.title}
            </h3>
            {meeting.clientName && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {meeting.clientName}
              </p>
            )}
          </div>
          <Badge variant={isPast ? "secondary" : "default"}>
            {isPast ? "Past" : "Upcoming"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-5 py-3 space-y-2 text-xs text-slate-300 border-t border-b border-slate-800/60 my-2">
        <div className="flex items-center gap-2 text-blue-400 font-semibold">
          <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
          <span>{new Date(meeting.meetingDate).toLocaleString()}</span>
        </div>

        {meeting.platform && (
          <div className="flex items-center gap-2 text-slate-300">
            <Video className="w-4 h-4 text-slate-500 shrink-0" />
            <span>{meeting.platform}</span>
          </div>
        )}

        {meeting.locationUrl && (
          <div className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-slate-500 shrink-0" />
            <a
              href={meeting.locationUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:underline truncate font-medium"
            >
              Join Meeting Link
            </a>
          </div>
        )}

        {meeting.notes && (
          <p className="text-xs text-slate-400 line-clamp-2 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/50 mt-1">
            {meeting.notes}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-5 pt-2 flex items-center justify-between">
        {meeting.reminder ? (
          <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
            <Bell className="w-3 h-3" /> Reminder active
          </span>
        ) : (
          <span className="text-[10px] text-slate-600">No reminder</span>
        )}

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10"
              title="Delete Meeting"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Meeting &quot;{meeting.title}&quot;?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will remove the scheduled call from your calendar.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete Meeting</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
