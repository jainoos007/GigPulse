import { z } from "zod";

export const createMeetingValidator = z.object({
  body: z.object({
    clientId: z.string().uuid("Invalid client ID format"),
    title: z.string().min(1, "Meeting title is required"),
    meetingDate: z.string().transform((val) => new Date(val)),
    platform: z.string().optional(),
    locationUrl: z.string().optional(),
    notes: z.string().optional(),
    reminder: z.boolean().optional(),
  }),
});

export type CreateMeetingInput = z.infer<typeof createMeetingValidator>["body"];
