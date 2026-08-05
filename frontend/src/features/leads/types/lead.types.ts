export type LeadStatus = "NEW" | "CONTACTED" | "PROPOSAL_SENT" | "NEGOTIATION" | "WON" | "LOST";

export interface Lead {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  estimatedValue: number | null;
  source: string | null;
  status: LeadStatus;
  notes: string | null;
  convertedToId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface LeadMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
