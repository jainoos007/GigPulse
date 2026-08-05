import { ClientStatusEnum } from "../../../shared/enums/client-status.enum";

export interface ClientResponseDto {
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
  status: ClientStatusEnum;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}
