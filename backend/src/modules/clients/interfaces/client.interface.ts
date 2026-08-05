import { ClientStatusEnum } from "../../../shared/enums/client-status.enum";

export interface CreateClientData {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  companyName?: string;
  website?: string;
  industry?: string;
  taxId?: string;
  status?: ClientStatusEnum;
  notes?: string;
}

export interface UpdateClientData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  companyName?: string;
  website?: string;
  industry?: string;
  taxId?: string;
  status?: ClientStatusEnum;
  notes?: string;
}

export interface ClientQueryFilter {
  userId: string;
  search?: string;
  status?: ClientStatusEnum;
  industry?: string;
  page?: number;
  limit?: number;
}
