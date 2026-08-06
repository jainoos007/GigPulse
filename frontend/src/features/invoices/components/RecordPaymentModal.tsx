"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recordPaymentSchema, RecordPaymentSchemaType } from "../schemas/invoice.schema";
import { Invoice } from "../types/invoice.types";
import { DollarSign, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface Props {
  invoice: Invoice | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (invoiceId: string, data: RecordPaymentSchemaType) => Promise<void>;
}

export const RecordPaymentModal: React.FC<Props> = ({ invoice, isOpen, onClose, onSubmit }) => {
  const totalPaid = invoice?.payments?.reduce((acc, p) => acc + p.amount, 0) || 0;
  const remaining = invoice ? Math.max(0, invoice.totalAmount - totalPaid) : 0;

  const form = useForm<RecordPaymentSchemaType>({
    resolver: zodResolver(recordPaymentSchema),
    defaultValues: {
      amount: remaining,
      paymentMethod: "BANK_TRANSFER",
      transactionId: "",
    },
  });

  useEffect(() => {
    if (invoice) {
      form.setValue("amount", remaining);
    }
  }, [invoice, remaining, form]);

  if (!invoice) return null;

  const handleFormSubmit = async (data: RecordPaymentSchemaType) => {
    try {
      await onSubmit(invoice.id, data);
      toast.success("Payment Recorded!", {
        description: `$${data.amount.toFixed(2)} recorded for Invoice #${invoice.invoiceNumber}.`,
      });
      form.reset();
      onClose();
    } catch (err: any) {
      toast.error("Failed to record payment", {
        description: err.message || "An error occurred.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-900 dark:text-white">Record Payment</DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400 text-xs font-mono">
                Invoice #{invoice.invoiceNumber}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1 text-xs my-2">
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Invoice Total:</span>
            <span className="font-semibold text-slate-900 dark:text-white">${invoice.totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-600 dark:text-slate-400">
            <span>Already Paid:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">${totalPaid.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-700 dark:text-slate-300 font-bold pt-1 border-t border-slate-200 dark:border-slate-800">
            <span>Remaining Due:</span>
            <span className="text-amber-600 dark:text-amber-400">${remaining.toFixed(2)}</span>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300">Payment Amount ($) *</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300">Payment Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                        <SelectValue placeholder="Method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                      <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                      <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
                      <SelectItem value="PAYPAL">PayPal</SelectItem>
                      <SelectItem value="CASH">Cash</SelectItem>
                      <SelectItem value="OTHER">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="transactionId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 dark:text-slate-300">Transaction ID / Ref (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="TXN-998822" className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              <Button type="button" variant="outline" onClick={onClose} className="border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting} className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold">
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Recording...
                  </>
                ) : (
                  "Record Payment"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
