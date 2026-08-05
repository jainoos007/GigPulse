"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceSchema, InvoiceSchemaType } from "../schemas/invoice.schema";
import { ClientService } from "@/features/clients/services/client.service";
import { ProjectService } from "@/features/projects/services/project.service";
import { Client } from "@/features/clients/types/client.types";
import { Project } from "@/features/projects/types/project.types";
import { X, FileText, DollarSign, Percent, Calendar } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InvoiceSchemaType) => Promise<void>;
}

export const CreateInvoiceModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (isOpen) {
      ClientService.getClients({ limit: 100 }).then((res) => setClients(res.data)).catch(() => {});
      ProjectService.getProjects({ limit: 100 }).then((res) => setProjects(res.data)).catch(() => {});
    }
  }, [isOpen]);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceSchemaType>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      status: "DRAFT",
      tax: 0,
      discount: 0,
      amount: 0,
    },
  });

  const amountVal = watch("amount") || 0;
  const taxVal = watch("tax") || 0;
  const discountVal = watch("discount") || 0;
  const estimatedTotal = Math.max(0, amountVal - discountVal + (amountVal * taxVal) / 100);

  if (!isOpen) return null;

  const handleFormSubmit = async (data: InvoiceSchemaType) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Create New Invoice</h2>
            <p className="text-xs text-slate-400">Generate a billing invoice with tax and discounts</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Select Client *
              </label>
              <select
                {...register("clientId")}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm"
              >
                <option value="">Select a Client</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} {c.companyName ? `(${c.companyName})` : ""}
                  </option>
                ))}
              </select>
              {errors.clientId && <p className="text-red-400 text-xs mt-1">{errors.clientId.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Linked Project (Optional)
              </label>
              <select
                {...register("projectId")}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm"
              >
                <option value="">No Project Selected</option>
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Subtotal Amount ($) *
              </label>
              <input
                {...register("amount", { valueAsNumber: true })}
                type="number"
                step="0.01"
                placeholder="1000.00"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
              />
              {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Tax Rate (%)
              </label>
              <input
                {...register("tax", { valueAsNumber: true })}
                type="number"
                step="0.1"
                placeholder="10"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Discount ($)
              </label>
              <input
                {...register("discount", { valueAsNumber: true })}
                type="number"
                step="0.01"
                placeholder="50"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-sm">
            <span className="text-slate-400 font-medium">Calculated Total:</span>
            <span className="text-emerald-400 font-bold text-base">${estimatedTotal.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Due Date *
              </label>
              <input
                {...register("dueDate")}
                type="date"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm"
              />
              {errors.dueDate && <p className="text-red-400 text-xs mt-1">{errors.dueDate.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Status
              </label>
              <select
                {...register("status")}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm"
              >
                <option value="DRAFT">Draft</option>
                <option value="SENT">Sent</option>
                <option value="PAID">Paid</option>
                <option value="OVERDUE">Overdue</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Payment Terms & Notes
            </label>
            <textarea
              {...register("notes")}
              rows={3}
              placeholder="Payment due within 14 days. Bank Transfer details..."
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Generating..." : "Generate Invoice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
