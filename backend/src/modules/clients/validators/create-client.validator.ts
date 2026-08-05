import { z } from "zod";
import { ClientStatusEnum } from "../../../shared/enums/client-status.enum";

export const createClientValidator = z.object({
  body: z.object({
    name: z.string().min(1, "Client name is required"),
    email: z.string().email("Invalid email address format"),
    phone: z.string().optional(),
    address: z.string().optional(),
    companyName: z.string().optional(),
    website: z.string().url("Invalid website URL format").optional().or(z.literal("")),
    industry: z.string().optional(),
    taxId: z.string().optional(),
    status: z.nativeEnum(ClientStatusEnum).optional(),
    notes: z.string().optional(),
  }),
});

export type CreateClientInput = z.infer<typeof createClientValidator>["body"];
