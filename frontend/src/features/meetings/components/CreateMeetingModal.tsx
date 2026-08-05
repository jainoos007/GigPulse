"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { meetingSchema, MeetingSchemaType } from "../schemas/meeting.schema";
import { ClientService } from "@/features/clients/services/client.service";
import { Client } from "@/features/clients/types/client.types";
import { X, Calendar, Video, Link as LinkIcon, Bell } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MeetingSchemaType) => Promise<void>;
}

export const CreateMeetingModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    if (isOpen) {
      ClientService.getClients({ limit: 100 }).then((res) => setClients(res.data)).catch(() => {});
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<MeetingSchemaType>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      platform: "Google Meet",
      reminder: true,
    },
  });

  if (!isOpen) return null;

  const handleFormSubmit = async (data: MeetingSchemaType) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Schedule Meeting</h2>
            <p className="text-xs text-slate-400">Set up client calls, platform links, and reminders</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Select Client *
            </label>
            <select
              {...register("clientId")}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 text-sm"
            >
              <option value="">Select a Client</option>
              {clients.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} {c.companyName ? `(${c.companyName})` : ""}
                </option>
              ))}
            </select>
            {errors.clientId && <p className="text-red-400 text-xs mt-1">{errors.clientId.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Meeting Title *
            </label>
            <input
              {...register("title")}
              placeholder="Project Kickoff Call / Sprint Review"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
            />
            {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Date & Time *
              </label>
              <input
                {...register("meetingDate")}
                type="datetime-local"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 text-sm"
              />
              {errors.meetingDate && <p className="text-red-400 text-xs mt-1">{errors.meetingDate.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Platform
              </label>
              <select
                {...register("platform")}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 text-sm"
              >
                <option value="Google Meet">Google Meet</option>
                <option value="Zoom">Zoom</option>
                <option value="Microsoft Teams">Microsoft Teams</option>
                <option value="Phone Call">Phone Call</option>
                <option value="In Person">In Person</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Join Link / Location URL
            </label>
            <input
              {...register("locationUrl")}
              placeholder="https://meet.google.com/xyz-abc-def"
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Agenda / Notes
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="Key discussion points, agenda topics..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              {...register("reminder")}
              type="checkbox"
              id="reminder"
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="reminder" className="text-xs text-slate-300 font-medium cursor-pointer">
              Send 30-minute automated notification reminder
            </label>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Scheduling..." : "Schedule Meeting"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
