"use client";

import React, { useState } from "react";
import { useProposals } from "../hooks/useProposals";
import { ProposalCard } from "./ProposalCard";
import { CreateProposalModal } from "./CreateProposalModal";
import { Search, Plus, FileCode, Filter } from "lucide-react";
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
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Proposals & Contracts</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">Draft project scopes, manage contract terms, and convert accepted proposals</p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 text-xs sm:text-sm font-semibold bg-purple-600 hover:bg-purple-500 shadow-purple-600/20"
        >
          <Plus className="w-4 h-4" /> Create Proposal
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <Card className="bg-slate-900/60 p-4 border-slate-800">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search proposals by title or scope details..."
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <Select
              value={statusFilter || "ALL"}
              onValueChange={(val) => setStatusFilter(val === "ALL" ? "" : val)}
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Statuses</SelectItem>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="SENT">Sent</SelectItem>
                <SelectItem value="ACCEPTED">Accepted</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
                <SelectItem value="EXPIRED">Expired</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Proposal Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-4 w-1/3" />
            </Card>
          ))}
        </div>
      ) : proposals.length === 0 ? (
        <Card className="text-center py-16 bg-slate-900/40 border-dashed border-slate-800">
          <CardContent className="space-y-3 pt-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <FileCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-white">No proposals found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Draft proposals for your prospective leads and clients to seal deals.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="mt-2"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Create First Proposal
            </Button>
          </CardContent>
        </Card>
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
