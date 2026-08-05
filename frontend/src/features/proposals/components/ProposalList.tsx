"use client";

import React, { useState } from "react";
import { useProposals } from "../hooks/useProposals";
import { ProposalCard } from "./ProposalCard";
import { CreateProposalModal } from "./CreateProposalModal";
import { Search, Plus, FileCode, Filter } from "lucide-react";

export const ProposalList: React.FC = () => {
  const {
    proposals,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    addProposal,
    convertProposalToProject,
    removeProposal,
  } = useProposals();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Proposals & Contracts</h1>
          <p className="text-sm text-slate-400 mt-1">Draft project scopes, manage contract terms, and convert accepted proposals</p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-purple-600/25 transition-all"
        >
          <Plus className="w-4 h-4" /> Create Proposal
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search proposals by title or scope details..."
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
            <option value="">All Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="SENT">Sent</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="REJECTED">Rejected</option>
            <option value="EXPIRED">Expired</option>
          </select>
        </div>
      </div>

      {/* Proposal Cards Grid */}
      {isLoading ? (
        <div className="text-center py-16 text-slate-400">Loading proposals...</div>
      ) : proposals.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/30 rounded-2xl border border-dashed border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
            <FileCode className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white">No proposals found</h3>
          <p className="text-sm text-slate-400 max-w-sm mx-auto">
            Draft proposals for your prospective leads and clients to seal deals.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              onConvert={convertProposalToProject}
              onDelete={removeProposal}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addProposal}
      />
    </div>
  );
};
