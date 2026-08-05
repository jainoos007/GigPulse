import { z } from "zod";

export const meetingSchema = z.object({
  clientId: z.string().min(1, "Client selection is required"),
  title: z.string().min(1, "Meeting title is required"),
  meetingDate: z.string().min(1, "Meeting date & time is required"),
  platform: z.string().optional(),
  locationUrl: z.string().optional(),
  notes: z.string().optional(),
  reminder: z.boolean().default(true),
});

export type MeetingSchemaType = z.infer<typeof meetingSchema>;
