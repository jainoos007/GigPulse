"use client";

import React, { useState } from "react";
import { useInvoices } from "../hooks/useInvoices";
import { InvoiceCard } from "./InvoiceCard";
import { CreateInvoiceModal } from "./CreateInvoiceModal";
import { RecordPaymentModal } from "./RecordPaymentModal";
import { Invoice } from "../types/invoice.types";
import { Search, Plus, FileText, Filter, DollarSign, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const InvoiceList: React.FC = () => {
  const {
    invoices,
    metrics,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    addInvoice,
    recordPayment,
    removeInvoice,
  } = useInvoices();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInvoiceForPayment, setSelectedInvoiceForPayment] = useState<Invoice | null>(null);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Invoices & Financials</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Generate client billing, track payments, and review financial metrics</p>
        </div>

        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="gap-2 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white"
        >
          <Plus className="w-4 h-4" /> Create Invoice
        </Button>
      </div>

      {/* Financial Metrics Cards */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <span>Total Revenue Collected</span>
              <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${metrics.totalRevenue.toFixed(2)}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Settled client payments</p>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <span>Pending Revenue</span>
              <DollarSign className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">${metrics.pendingRevenue.toFixed(2)}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Active outstanding invoices</p>
          </Card>

          <Card className="p-6 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-2 shadow-sm dark:shadow-none">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
              <span>Overdue Amount</span>
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">${metrics.overdueAmount.toFixed(2)}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Past due date balance</p>
          </Card>
        </div>
      )}

      {/* Filter & Search Bar */}
      <Card className="bg-white/80 dark:bg-slate-900/60 p-4 border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by invoice number or notes..."
              className="pl-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <Select
              value={statusFilter || "ALL"}
              onValueChange={(val) => setStatusFilter(val === "ALL" ? "" : val)}
            >
              <SelectTrigger className="w-full sm:w-[180px] bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="SENT">Sent</SelectItem>
                <SelectItem value="PAID">Paid</SelectItem>
                <SelectItem value="OVERDUE">Overdue</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Invoice Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-6 space-y-4 bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-4 w-1/3" />
            </Card>
          ))}
        </div>
      ) : invoices.length === 0 ? (
        <Card className="text-center py-16 bg-white/40 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800">
          <CardContent className="space-y-3 pt-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No invoices found</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              Create invoices to bill clients and record incoming payments.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Create First Invoice
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invoices.map((invoice) => (
            <InvoiceCard
              key={invoice.id}
              invoice={invoice}
              onOpenRecordPayment={(inv) => setSelectedInvoiceForPayment(inv)}
              onDelete={removeInvoice}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateInvoiceModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={addInvoice}
      />

      {/* Record Payment Modal */}
      <RecordPaymentModal
        invoice={selectedInvoiceForPayment}
        isOpen={!!selectedInvoiceForPayment}
        onClose={() => setSelectedInvoiceForPayment(null)}
        onSubmit={async (id, data) => {
          await recordPayment(id, data);
        }}
      />
    </div>
  );
};
