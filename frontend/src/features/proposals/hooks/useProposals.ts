import { useState, useCallback, useEffect } from "react";
import { ProposalService } from "../services/proposal.service";
import { Proposal, ProposalMeta } from "../types/proposal.types";
import { ProposalSchemaType } from "../schemas/proposal.schema";

export const useProposals = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [meta, setMeta] = useState<ProposalMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchProposals = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await ProposalService.getProposals({
        search,
        status: statusFilter || undefined,
      });
      setProposals(res.data);
      setMeta(res.meta);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch proposals");
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchProposals();
  }, [fetchProposals]);

  const addProposal = async (data: ProposalSchemaType) => {
    await ProposalService.createProposal(data);
    await fetchProposals();
  };

  const updateProposal = async (id: string, data: Partial<ProposalSchemaType>) => {
    await ProposalService.updateProposal(id, data);
    await fetchProposals();
  };

  const convertProposalToProject = async (id: string) => {
    await ProposalService.convertProposal(id);
    await fetchProposals();
  };

  const removeProposal = async (id: string) => {
    await ProposalService.deleteProposal(id);
    await fetchProposals();
  };

  return {
    proposals,
    meta,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    error,
    addProposal,
    updateProposal,
    convertProposalToProject,
    removeProposal,
    refresh: fetchProposals,
  };
};
