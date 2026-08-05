"use client";

import React, { useState } from "react";
import { useMeetings } from "../hooks/useMeetings";
import { MeetingCard } from "./MeetingCard";
import { CreateMeetingModal } from "./CreateMeetingModal";
import { Search, Plus, Calendar, Filter } from "lucide-react";

export const MeetingList: React.FC = () => {
  const {
    meetings,
    isLoading,
    search,
    setSearch,
    upcomingOnly,
    setUpcomingOnly,
    addMeeting,
    removeMeeting,
  } = useMeetings();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Meetings & Calls</h1>
          <p className="text-sm text-slate-400 mt-1">Schedule and organize client video calls, agendas, and join links</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-blue-600/25 transition-all"
        >
          <Plus className="w-4 h-4" /> Schedule Meeting
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search meetings by title, platform, or notes..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 text-sm"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <label className="flex items-center gap-2 text-sm text-slate-300 cursor-pointer font-medium">
            <input
              type="checkbox"
              checked={upcomingOnly}
              onChange={(e) => setUpcomingOnly(e.target.checked)}
              className="w-4 h-4 rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-blue-500"
            />
            Upcoming Only
          </label>
        </div>
      </div>

      {/* Meeting Cards Grid */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading meetings schedule...</div>
      ) : meetings.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">No meetings found</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Schedule calls with your clients to discuss project progress and proposals.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} onDelete={removeMeeting} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateMeetingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addMeeting}
      />
    </div>
  );
};
