import { ProposalStatusEnum } from "../../../shared/enums/proposal-status.enum";

export interface CreateProposalData {
  userId: string;
  clientId: string;
  leadId?: string;
  title: string;
  value?: number;
  content?: string;
  status?: ProposalStatusEnum;
  expiryDate?: Date;
}

export interface UpdateProposalData {
  clientId?: string;
  leadId?: string;
  title?: string;
  value?: number;
  content?: string;
  status?: ProposalStatusEnum;
  expiryDate?: Date;
  convertedToId?: string;
}

export interface ProposalQueryFilter {
  userId: string;
  clientId?: string;
  search?: string;
  status?: ProposalStatusEnum;
  page?: number;
  limit?: number;
}
