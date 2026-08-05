"use client";

import React, { useState } from "react";
import { useLeads } from "../hooks/useLeads";
import { LeadCard } from "./LeadCard";
import { CreateLeadModal } from "./CreateLeadModal";
import { Search, Plus, Target, Filter } from "lucide-react";

export const LeadList: React.FC = () => {
  const {
    leads,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    addLead,
    convertLead,
    removeLead,
  } = useLeads();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Leads & Opportunities</h1>
          <p className="text-sm text-slate-400 mt-1">Track prospect pipeline stages and convert deals to clients</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Lead
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search leads by name, email, or company..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-purple-500 text-sm w-full sm:w-auto"
          >
            <option value="">All Stages</option>
            <option value="NEW">New</option>
            <option value="CONTACTED">Contacted</option>
            <option value="PROPOSAL_SENT">Proposal Sent</option>
            <option value="NEGOTIATION">Negotiation</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
          </select>
        </div>
      </div>

      {/* Lead Cards Grid */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading leads pipeline...</div>
      ) : leads.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">No leads found</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Track potential clients and convert them to active client accounts with one click.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onConvert={convertLead} onDelete={removeLead} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addLead}
      />
    </div>
  );
};
