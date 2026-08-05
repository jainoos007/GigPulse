export interface MeetingResponseDto {
  id: string;
  userId: string;
  clientId: string;
  clientName?: string;
  title: string;
  meetingDate: Date;
  platform: string | null;
  locationUrl: string | null;
  notes: string | null;
  reminder: boolean;
  createdAt: Date;
  updatedAt: Date;
}
