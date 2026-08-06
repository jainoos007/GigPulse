"use client";

import React, { useState } from "react";
import { useInvoices } from "../hooks/useInvoices";
import { InvoiceCard } from "./InvoiceCard";
import { CreateInvoiceModal } from "./CreateInvoiceModal";
import { RecordPaymentModal } from "./RecordPaymentModal";
import { Invoice } from "../types/invoice.types";
import { Search, Plus, FileText, DollarSign, AlertCircle, TrendingUp, X } from "lucide-react";
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

  const statusOptions = [
    { id: "ALL", label: "All Statuses", color: "bg-slate-400" },
    { id: "DRAFT", label: "Draft", color: "bg-slate-400" },
    { id: "SENT", label: "Sent", color: "bg-blue-500" },
    { id: "PAID", label: "Paid", color: "bg-emerald-500" },
    { id: "OVERDUE", label: "Overdue", color: "bg-rose-500" },
    { id: "CANCELLED", label: "Cancelled", color: "bg-amber-500" },
  ];

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
          className="gap-2 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-sm hover:shadow"
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
      <Card className="bg-white/80 dark:bg-slate-900/60 p-3.5 sm:p-4 border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md space-y-3 transition-all">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by invoice number or notes..."
              className="pl-10 pr-9 h-10 bg-slate-50/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 rounded-md"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filter Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <div className="relative w-full sm:w-[190px]">
              <Select
                value={statusFilter || "ALL"}
                onValueChange={(val) => setStatusFilter(val === "ALL" ? "" : val)}
              >
                <SelectTrigger className="h-10 w-full bg-slate-50/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-xs sm:text-sm font-medium">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-xl">
                  {statusOptions.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      <span className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${opt.color}`} />
                        <span>{opt.label}</span>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {(search || statusFilter) && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800/80 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-slate-400 dark:text-slate-500 font-medium">Active filters:</span>

              {search && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/50 font-medium text-[11px]">
                  <span>Search: &quot;{search}&quot;</span>
                  <button
                    onClick={() => setSearch("")}
                    className="hover:text-emerald-900 dark:hover:text-white transition-colors"
                    title="Remove search filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {statusFilter && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-900/50 font-medium text-[11px]">
                  <span>Status: {statusFilter}</span>
                  <button
                    onClick={() => setStatusFilter("")}
                    className="hover:text-emerald-900 dark:hover:text-white transition-colors"
                    title="Remove status filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSearch("");
                setStatusFilter("");
              }}
              className="h-7 px-2.5 text-[11px] font-semibold text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors shrink-0"
            >
              Clear all filters
            </Button>
          </div>
        )}
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
