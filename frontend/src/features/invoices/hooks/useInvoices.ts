import { useState, useCallback, useEffect } from "react";
import { InvoiceService } from "../services/invoice.service";
import { Invoice, InvoiceMeta, InvoiceMetrics } from "../types/invoice.types";
import { InvoiceSchemaType, RecordPaymentSchemaType } from "../schemas/invoice.schema";

export const useInvoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [meta, setMeta] = useState<InvoiceMeta | null>(null);
  const [metrics, setMetrics] = useState<InvoiceMetrics | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const fetchInvoices = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await InvoiceService.getInvoices({
        search,
        status: statusFilter || undefined,
      });
      setInvoices(res.data);
      setMeta(res.meta);
      setMetrics(res.metrics);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch invoices");
    } finally {
      setIsLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const addInvoice = async (data: InvoiceSchemaType) => {
    await InvoiceService.createInvoice(data);
    await fetchInvoices();
  };

  const updateInvoice = async (id: string, data: Partial<InvoiceSchemaType>) => {
    await InvoiceService.updateInvoice(id, data);
    await fetchInvoices();
  };

  const recordPayment = async (id: string, data: RecordPaymentSchemaType) => {
    await InvoiceService.recordPayment(id, data);
    await fetchInvoices();
  };

  const removeInvoice = async (id: string) => {
    await InvoiceService.deleteInvoice(id);
    await fetchInvoices();
  };

  return {
    invoices,
    meta,
    metrics,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    error,
    addInvoice,
    updateInvoice,
    recordPayment,
    removeInvoice,
    refresh: fetchInvoices,
  };
};
