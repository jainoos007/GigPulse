import { ProposalStatusEnum } from "../../../shared/enums/proposal-status.enum";

export interface ProposalResponseDto {
  id: string;
  userId: string;
  clientId: string;
  clientName?: string;
  leadId: string | null;
  leadName?: string;
  title: string;
  value: number | null;
  content: string | null;
  status: ProposalStatusEnum;
  expiryDate: Date | null;
  convertedToId: string | null;
  createdAt: Date;
  updatedAt: Date;
}
