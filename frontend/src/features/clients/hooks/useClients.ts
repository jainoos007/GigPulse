import { useState, useCallback, useEffect } from "react";
import { ClientService } from "../services/client.service";
import { Client, ClientMeta } from "../types/client.types";
import { ClientSchemaType } from "../schemas/client.schema";

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [meta, setMeta] = useState<ClientMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchClients = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await ClientService.getClients({
        search,
        status: statusFilter || undefined,
      });
      setClients(res.data);
      setMeta(res.meta);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch clients");
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const addClient = async (data: ClientSchemaType) => {
    await ClientService.createClient(data);
    await fetchClients();
  };

  const updateClient = async (id: string, data: Partial<ClientSchemaType>) => {
    await ClientService.updateClient(id, data);
    await fetchClients();
  };

  const removeClient = async (id: string) => {
    await ClientService.deleteClient(id);
    await fetchClients();
  };

  return {
    clients,
    meta,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    error,
    addClient,
    updateClient,
    removeClient,
    refresh: fetchClients,
  };
};
