export type ClientStatus = "ACTIVE" | "INACTIVE" | "PROSPECT" | "ARCHIVED";

export interface Client {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  companyName: string | null;
  website: string | null;
  industry: string | null;
  taxId: string | null;
  status: ClientStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ClientMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
