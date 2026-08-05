import { z } from "zod";

export const clientSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  address: z.string().optional(),
  companyName: z.string().optional(),
  website: z.string().url("Invalid URL format").optional().or(z.literal("")),
  industry: z.string().optional(),
  taxId: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "PROSPECT", "ARCHIVED"]).default("ACTIVE"),
  notes: z.string().optional(),
});

export type ClientSchemaType = z.infer<typeof clientSchema>;
