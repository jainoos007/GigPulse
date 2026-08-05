export interface Meeting {
  id: string;
  userId: string;
  clientId: string;
  clientName?: string;
  title: string;
  meetingDate: string;
  platform: string | null;
  locationUrl: string | null;
  notes: string | null;
  reminder: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MeetingMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
