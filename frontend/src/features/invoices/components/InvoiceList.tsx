"use client";

import React, { useState } from "react";
import { useInvoices } from "../hooks/useInvoices";
import { InvoiceCard } from "./InvoiceCard";
import { CreateInvoiceModal } from "./CreateInvoiceModal";
import { RecordPaymentModal } from "./RecordPaymentModal";
import { Invoice } from "../types/invoice.types";
import { Search, Plus, FileText, Filter, DollarSign, AlertCircle, TrendingUp } from "lucide-react";

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
          <h1 className="text-3xl font-bold text-white tracking-tight">Invoices & Financials</h1>
          <p className="text-sm text-slate-400 mt-1">Generate client billing, track payments, and review financial metrics</p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/25 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Invoice
        </button>
      </div>

      {/* Financial Metrics Cards */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <span>Total Revenue Collected</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-400">${metrics.totalRevenue.toFixed(2)}</h3>
            <p className="text-xs text-slate-500">Settled client payments</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <span>Pending Revenue</span>
              <DollarSign className="w-4 h-4 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-blue-400">${metrics.pendingRevenue.toFixed(2)}</h3>
            <p className="text-xs text-slate-500">Active outstanding invoices</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold uppercase tracking-wider">
              <span>Overdue Amount</span>
              <AlertCircle className="w-4 h-4 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold text-red-400">${metrics.overdueAmount.toFixed(2)}</h3>
            <p className="text-xs text-slate-500">Past due date balance</p>
          </div>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by invoice number or notes..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 text-sm w-full sm:w-auto"
          >
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="PAID">Paid</option>
            <option value="OVERDUE">Overdue</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Invoice Cards Grid */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading invoices...</div>
      ) : invoices.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <FileText className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">No invoices found</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Create invoices to bill clients and record incoming payments.
          </p>
        </div>
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
