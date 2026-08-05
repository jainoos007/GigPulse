import { useState, useCallback, useEffect } from "react";
import { LeadService } from "../services/lead.service";
import { Lead, LeadMeta } from "../types/lead.types";
import { LeadSchemaType } from "../schemas/lead.schema";

export const useLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meta, setMeta] = useState<LeadMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await LeadService.getLeads({
        search,
        status: statusFilter || undefined,
      });
      setLeads(res.data);
      setMeta(res.meta);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch leads");
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const addLead = async (data: LeadSchemaType) => {
    await LeadService.createLead(data);
    await fetchLeads();
  };

  const updateLead = async (id: string, data: Partial<LeadSchemaType>) => {
    await LeadService.updateLead(id, data);
    await fetchLeads();
  };

  const convertLead = async (id: string) => {
    await LeadService.convertLead(id);
    await fetchLeads();
  };

  const removeLead = async (id: string) => {
    await LeadService.deleteLead(id);
    await fetchLeads();
  };

  return {
    leads,
    meta,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    error,
    addLead,
    updateLead,
    convertLead,
    removeLead,
    refresh: fetchLeads,
  };
};
