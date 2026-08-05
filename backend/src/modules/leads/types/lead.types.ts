import { LeadStatusEnum } from "../../../shared/enums/lead-status.enum";

export interface LeadResponseDto {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  estimatedValue: number | null;
  source: string | null;
  status: LeadStatusEnum;
  notes: string | null;
  convertedToId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
