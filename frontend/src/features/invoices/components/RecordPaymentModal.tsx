"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recordPaymentSchema, RecordPaymentSchemaType } from "../schemas/invoice.schema";
import { Invoice } from "../types/invoice.types";
import { X, DollarSign, CreditCard } from "lucide-react";

interface Props {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (invoiceId: string, data: RecordPaymentSchemaType) => Promise<void>;
}

export const RecordPaymentModal: React.FC<Props> = ({ invoice, isOpen, onClose, onSubmit }) => {
  const totalPaid = invoice?.payments?.reduce((acc, p) => acc + p.amount, 0) || 0;
  const remaining = invoice ? Math.max(0, invoice.totalAmount - totalPaid) : 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RecordPaymentSchemaType>({
    resolver: zodResolver(recordPaymentSchema),
    defaultValues: {
      amount: remaining,
      paymentMethod: "BANK_TRANSFER",
    },
  });

  if (!isOpen || !invoice) return null;

  const handleFormSubmit = async (data: RecordPaymentSchemaType) => {
    await onSubmit(invoice.id, data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Record Payment</h2>
            <p className="text-xs text-slate-400">Invoice #{invoice.invoiceNumber}</p>
          </div>
        </div>

        <div className="p-3 mb-4 bg-slate-950 rounded-xl border border-slate-800 space-y-1 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Invoice Total:</span>
            <span className="font-semibold text-white">${invoice.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Already Paid:</span>
            <span className="font-semibold text-emerald-400">${totalPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-300 font-bold pt-1 border-t border-slate-800">
            <span>Remaining Due:</span>
            <span className="text-amber-400">${remaining.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Payment Amount ($) *
            </label>
            <input
              {...register("amount", { valueAsNumber: true })}
              type="number"
              step="0.01"
              defaultValue={remaining}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm"
            />
            {errors.amount && <p className="text-red-400 text-xs mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Payment Method
            </label>
            <select
              {...register("paymentMethod")}
              className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm"
            >
              <option value="BANK_TRANSFER">Bank Transfer</option>
              <option value="CREDIT_CARD">Credit Card</option>
              <option value="PAYPAL">PayPal</option>
              <option value="CASH">Cash</option>
              <option value="OTHER">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Transaction ID / Ref (Optional)
            </label>
            <input
              {...register("transactionId")}
              placeholder="TXN-998822"
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
              {isSubmitting ? "Recording..." : "Record Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
