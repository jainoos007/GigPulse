"use client";

import React from "react";
import { Meeting } from "../types/meeting.types";
import { Calendar, Video, ExternalLink, User, Trash2, Bell } from "lucide-react";

interface Props {
  meeting: Meeting;
  onDelete: (id: string) => void;
}

export const MeetingCard: React.FC<Props> = ({ meeting, onDelete }) => {
  const isPast = new Date(meeting.meetingDate) < new Date();

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
              {meeting.title}
            </h3>
            {meeting.clientName && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {meeting.clientName}
              </p>
            )}
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
              isPast
                ? "bg-slate-800 text-slate-400 border-slate-700"
                : "bg-blue-500/10 text-blue-400 border-blue-500/20"
            }`}
          >
            {isPast ? "Past" : "Upcoming"}
          </span>
        </div>

        <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-blue-400 font-medium">
            <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
            <span>{new Date(meeting.meetingDate).toLocaleString()}</span>
          </div>

          {meeting.platform && (
            <div className="flex items-center gap-2">
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
                className="text-blue-400 hover:underline truncate"
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
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/50 flex items-center justify-between">
        {meeting.reminder ? (
          <span className="text-[10px] text-emerald-400 flex items-center gap-1">
            <Bell className="w-3 h-3" /> Reminder active
          </span>
        ) : (
          <span className="text-[10px] text-slate-600">No reminder</span>
        )}

        <button
          onClick={() => onDelete(meeting.id)}
          className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
          title="Delete Meeting"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
