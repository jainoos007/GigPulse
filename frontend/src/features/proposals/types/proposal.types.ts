export type ProposalStatus = "DRAFT" | "SENT" | "ACCEPTED" | "REJECTED" | "EXPIRED";

export interface Proposal {
  id: string;
  userId: string;
  clientId: string;
  clientName?: string;
  leadId: string | null;
  leadName?: string;
  title: string;
  value: number | null;
  content: string | null;
  status: ProposalStatus;
  expiryDate: string | null;
  convertedToId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProposalMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
