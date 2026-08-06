"use client";

import React, { useState } from "react";
import { useLeads } from "../hooks/useLeads";
import { Lead } from "../types/lead.types";
import { LeadCard } from "./LeadCard";
import { CreateLeadModal } from "./CreateLeadModal";
import { EditLeadModal } from "./EditLeadModal";
import { Search, Plus, Target, X } from "lucide-react";
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

export const LeadList: React.FC = () => {
  const {
    leads,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    addLead,
    updateLead,
    convertLead,
    removeLead,
  } = useLeads();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const stageOptions = [
    { id: "ALL", label: "All Stages", color: "bg-slate-400" },
    { id: "NEW", label: "New", color: "bg-blue-400" },
    { id: "CONTACTED", label: "Contacted", color: "bg-blue-600" },
    { id: "PROPOSAL_SENT", label: "Proposal Sent", color: "bg-purple-500" },
    { id: "NEGOTIATION", label: "Negotiation", color: "bg-amber-500" },
    { id: "WON", label: "Won", color: "bg-emerald-500" },
    { id: "LOST", label: "Lost", color: "bg-rose-500" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Leads & Opportunities</h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">Track prospect pipeline stages and convert deals to clients</p>
        </div>

        <Button
          onClick={() => setIsModalOpen(true)}
          className="gap-2 text-xs sm:text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white rounded-xl shadow-sm hover:shadow"
        >
          <Plus className="w-4 h-4" /> Add Lead
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <Card className="bg-white/80 dark:bg-slate-900/60 p-3.5 sm:p-4 border-slate-200/80 dark:border-slate-800 shadow-sm backdrop-blur-md space-y-3 transition-all">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 transition-colors" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search leads by name, email, or company..."
              className="pl-10 pr-9 h-10 bg-slate-50/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-xs sm:text-sm placeholder:text-slate-400 dark:placeholder:text-slate-500 transition-all"
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
                <SelectTrigger className="h-10 w-full bg-slate-50/80 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-xs sm:text-sm font-medium">
                  <SelectValue placeholder="All Stages" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 rounded-xl shadow-xl">
                  {stageOptions.map((opt) => (
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
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-900/50 font-medium text-[11px]">
                  <span>Search: &quot;{search}&quot;</span>
                  <button
                    onClick={() => setSearch("")}
                    className="hover:text-purple-900 dark:hover:text-white transition-colors"
                    title="Remove search filter"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {statusFilter && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-900/50 font-medium text-[11px]">
                  <span>Stage: {statusFilter}</span>
                  <button
                    onClick={() => setStatusFilter("")}
                    className="hover:text-purple-900 dark:hover:text-white transition-colors"
                    title="Remove stage filter"
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

      {/* Lead Cards Grid */}
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
      ) : leads.length === 0 ? (
        <Card className="text-center py-16 bg-white/40 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800">
          <CardContent className="space-y-3 pt-6">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 flex items-center justify-center mx-auto">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">No leads found</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              Track potential clients and convert them to active client accounts with one click.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="mt-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Add First Lead
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {leads.map((lead) => (
            <LeadCard key={lead.id} lead={lead} onConvert={convertLead} onDelete={removeLead} onEdit={setEditingLead} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      <CreateLeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addLead}
      />

      {/* Edit Modal */}
      <EditLeadModal
        isOpen={!!editingLead}
        lead={editingLead}
        onClose={() => setEditingLead(null)}
        onSubmit={updateLead}
      />
    </div>
  );
};
