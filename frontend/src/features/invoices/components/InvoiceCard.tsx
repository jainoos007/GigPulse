"use client";

import React from "react";
import { Invoice } from "../types/invoice.types";
import { FileText, Calendar, DollarSign, User, Trash2, PlusCircle } from "lucide-react";

interface Props {
  invoice: Invoice;
  onOpenRecordPayment: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
}

export const InvoiceCard: React.FC<Props> = ({ invoice, onOpenRecordPayment, onDelete }) => {
  const statusColors = {
    DRAFT: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    SENT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    PAID: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    OVERDUE: "bg-red-500/10 text-red-400 border-red-500/20 font-bold",
    CANCELLED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  const totalPaid = invoice.payments?.reduce((acc, p) => acc + p.amount, 0) || 0;

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors font-mono">
              #{invoice.invoiceNumber}
            </h3>
            {invoice.clientName && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {invoice.clientName}
              </p>
            )}
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
              statusColors[invoice.status] || statusColors.DRAFT
            }`}
          >
            {invoice.status}
          </span>
        </div>

        <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-between font-bold text-emerald-400 text-sm">
            <span>Total Amount:</span>
            <span>${invoice.totalAmount.toFixed(2)}</span>
          </div>

          {totalPaid > 0 && (
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Paid to Date:</span>
              <span className="text-emerald-400">${totalPaid.toFixed(2)}</span>
            </div>
          )}

          <div className="flex items-center gap-2 text-slate-400">
            <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
            <span>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</span>
          </div>

          {invoice.projectName && (
            <div className="flex items-center gap-2 text-slate-500">
              <FileText className="w-4 h-4 text-slate-600 shrink-0" />
              <span>Project: {invoice.projectName}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/50 flex items-center justify-between">
        {invoice.status !== "PAID" ? (
          <button
            onClick={() => onOpenRecordPayment(invoice)}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5 hover:underline"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Record Payment
          </button>
        ) : (
          <span className="text-xs text-emerald-400 font-semibold">Settled</span>
        )}

        <button
          onClick={() => onDelete(invoice.id)}
          className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
          title="Delete Invoice"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
