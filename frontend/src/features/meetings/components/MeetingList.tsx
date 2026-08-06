"use client";

import React, { useState } from "react";
import { useMeetings } from "../hooks/useMeetings";
import { MeetingCard } from "./MeetingCard";
import { CreateMeetingModal } from "./CreateMeetingModal";
import { Search, Plus, Calendar, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

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
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Meetings & Calls</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Schedule and organize client video calls, agendas, and join links</p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-sm hover:shadow"
        >
          <Plus className="w-4 h-4" /> Schedule Meeting
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <Card className="bg-white/80 dark:bg-slate-900/60 p-3.5 sm:p-4 border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md space-y-3 transition-all">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search meetings by title, platform, or notes..."
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

          <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-slate-50/80 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shrink-0 w-full sm:w-auto">
            <Checkbox
              id="upcomingOnly"
              checked={upcomingOnly}
              onCheckedChange={(checked) => setUpcomingOnly(!!checked)}
              className="data-[state=checked]:bg-blue-600 border-slate-300 dark:border-slate-700"
            />
            <label htmlFor="upcomingOnly" className="text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer select-none">
              Upcoming Only
            </label>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {(search || upcomingOnly) && (
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

              {upcomingOnly && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50 font-medium text-[11px]">
                  <span>Upcoming Only</span>
                  <button
                    onClick={() => setUpcomingOnly(false)}
                    className="hover:text-blue-900 dark:hover:text-white transition-colors"
                    title="Show all meetings"
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
                setUpcomingOnly(false);
              }}
              className="h-7 px-2.5 text-[11px] font-semibold text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors shrink-0"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </Card>

      {/* Meeting Cards Grid */}
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
      ) : meetings.length === 0 ? (
        <Card className="text-center py-16 bg-white/40 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800">
          <CardContent className="space-y-3 pt-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No meetings found</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              Schedule calls with your clients to discuss project progress and proposals.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="mt-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Schedule First Meeting
            </Button>
          </CardContent>
        </Card>
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
