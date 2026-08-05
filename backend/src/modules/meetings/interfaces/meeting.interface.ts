export interface CreateMeetingData {
  userId: string;
  clientId: string;
  title: string;
  meetingDate: Date;
  platform?: string;
  locationUrl?: string;
  notes?: string;
  reminder?: boolean;
}

export interface UpdateMeetingData {
  clientId?: string;
  title?: string;
  meetingDate?: Date;
  platform?: string;
  locationUrl?: string;
  notes?: string;
  reminder?: boolean;
}

export interface MeetingQueryFilter {
  userId: string;
  clientId?: string;
  search?: string;
  upcomingOnly?: boolean;
  page?: number;
  limit?: number;
}
