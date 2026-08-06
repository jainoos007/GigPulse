"use client";

import React, { useState } from "react";
import { Invoice } from "../types/invoice.types";
import { FileText, Calendar, DollarSign, User, Trash2, PlusCircle } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Props {
  invoice: Invoice;
  onOpenRecordPayment: (invoice: Invoice) => void;
  onDelete: (id: string) => void;
}

export const InvoiceCard: React.FC<Props> = ({ invoice, onOpenRecordPayment, onDelete }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <Badge variant="secondary">Draft</Badge>;
      case "SENT":
        return <Badge variant="default">Sent</Badge>;
      case "PAID":
        return <Badge variant="success">Paid</Badge>;
      case "OVERDUE":
        return <Badge variant="destructive">Overdue</Badge>;
      case "CANCELLED":
        return <Badge variant="warning">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const totalPaid = invoice.payments?.reduce((acc, p) => acc + p.amount, 0) || 0;

  const handleDelete = () => {
    onDelete(invoice.id);
    toast.success("Invoice deleted", {
      description: `Invoice #${invoice.invoiceNumber} removed.`,
    });
  };

  return (
    <Card className="flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all group bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-mono">
              #{invoice.invoiceNumber}
            </h3>
            {invoice.clientName && (
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                {invoice.clientName}
              </p>
            )}
          </div>
          {getStatusBadge(invoice.status)}
        </div>
      </CardHeader>

      <CardContent className="p-5 py-3 space-y-2 text-xs text-slate-600 dark:text-slate-300 border-t border-b border-slate-200 dark:border-slate-800/60 my-2">
        <div className="flex items-center justify-between font-bold text-emerald-600 dark:text-emerald-400 text-sm">
          <span>Total Amount:</span>
          <span>${invoice.totalAmount.toFixed(2)}</span>
        </div>

        {totalPaid > 0 && (
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs">
            <span>Paid to Date:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">${totalPaid.toFixed(2)}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <span>Due Date: {new Date(invoice.dueDate).toLocaleDateString()}</span>
        </div>

        {invoice.projectName && (
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <FileText className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <span>Project: {invoice.projectName}</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-5 pt-2 flex items-center justify-between">
        {invoice.status !== "PAID" ? (
          <Button
            variant="link"
            size="sm"
            onClick={() => onOpenRecordPayment(invoice)}
            className="p-0 h-auto text-xs text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" /> Record Payment
          </Button>
        ) : (
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Settled</span>
        )}

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10"
              title="Delete Invoice"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Invoice #{invoice.invoiceNumber}?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600 dark:text-slate-400 text-xs">
                This action will remove the invoice and associated payment records.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-slate-200 dark:border-slate-800">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete Invoice</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
