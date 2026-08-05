import { useState, useCallback, useEffect } from "react";
import { MeetingService } from "../services/meeting.service";
import { Meeting, MeetingMeta } from "../types/meeting.types";
import { MeetingSchemaType } from "../schemas/meeting.schema";

export const useMeetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [meta, setMeta] = useState<MeetingMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [upcomingOnly, setUpcomingOnly] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMeetings = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await MeetingService.getMeetings({
        search,
        upcomingOnly,
      });
      setMeetings(res.data);
      setMeta(res.meta);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch meetings");
    } finally {
      setIsLoading(false);
    }
  }, [search, upcomingOnly]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

  const addMeeting = async (data: MeetingSchemaType) => {
    await MeetingService.createMeeting(data);
    await fetchMeetings();
  };

  const updateMeeting = async (id: string, data: Partial<MeetingSchemaType>) => {
    await MeetingService.updateMeeting(id, data);
    await fetchMeetings();
  };

  const removeMeeting = async (id: string) => {
    await MeetingService.deleteMeeting(id);
    await fetchMeetings();
  };

  return {
    meetings,
    meta,
    isLoading,
    search,
    setSearch,
    upcomingOnly,
    setUpcomingOnly,
    error,
    addMeeting,
    updateMeeting,
    removeMeeting,
    refresh: fetchMeetings,
  };
};
