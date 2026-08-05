import { z } from "zod";
import { ClientStatusEnum } from "../../../shared/enums/client-status.enum";

export const updateClientValidator = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    email: z.string().email("Invalid email format").optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    companyName: z.string().optional(),
    website: z.string().url("Invalid website URL").optional().or(z.literal("")),
    industry: z.string().optional(),
    taxId: z.string().optional(),
    status: z.nativeEnum(ClientStatusEnum).optional(),
    notes: z.string().optional(),
  }),
  params: z.object({
    id: z.string().uuid("Invalid client ID format"),
  }),
});

export type UpdateClientInput = z.infer<typeof updateClientValidator>["body"];
