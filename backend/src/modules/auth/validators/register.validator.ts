import { z } from "zod";
import { AUTH_CONSTANTS } from "../constants/auth.constants";

export const registerValidator = z.object({
  body: z.object({
    email: z.string().email("Invalid email address format"),
    password: z
      .string()
      .min(AUTH_CONSTANTS.MIN_PASSWORD_LENGTH, `Password must be at least ${AUTH_CONSTANTS.MIN_PASSWORD_LENGTH} characters`)
      .max(AUTH_CONSTANTS.MAX_PASSWORD_LENGTH, `Password cannot exceed ${AUTH_CONSTANTS.MAX_PASSWORD_LENGTH} characters`),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    companyName: z.string().optional(),
  }),
});

export type RegisterInput = z.infer<typeof registerValidator>["body"];
