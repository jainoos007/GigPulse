import { LeadStatusEnum } from "../../../shared/enums/lead-status.enum";

export interface CreateLeadData {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  companyName?: string;
  estimatedValue?: number;
  source?: string;
  status?: LeadStatusEnum;
  notes?: string;
}

export interface UpdateLeadData {
  name?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  estimatedValue?: number;
  source?: string;
  status?: LeadStatusEnum;
  notes?: string;
  convertedToId?: string;
}

export interface LeadQueryFilter {
  userId: string;
  search?: string;
  status?: LeadStatusEnum;
  source?: string;
  page?: number;
  limit?: number;
}
