import { z } from "zod";

export const updateMeetingValidator = z.object({
  body: z.object({
    clientId: z.string().uuid("Invalid client ID format").optional(),
    title: z.string().min(1).optional(),
    meetingDate: z.string().optional().transform((val) => (val ? new Date(val) : undefined)),
    platform: z.string().optional(),
    locationUrl: z.string().optional(),
    notes: z.string().optional(),
    reminder: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string().uuid("Invalid meeting ID format"),
  }),
});

export type UpdateMeetingInput = z.infer<typeof updateMeetingValidator>["body"];
