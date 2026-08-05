"use client";

import React from "react";
import { Proposal } from "../types/proposal.types";
import { FileCode, Calendar, DollarSign, User, Trash2, ArrowRightLeft, CheckCircle2 } from "lucide-react";

interface Props {
  proposal: Proposal;
  onConvert: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProposalCard: React.FC<Props> = ({ proposal, onConvert, onDelete }) => {
  const statusColors = {
    DRAFT: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    SENT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    ACCEPTED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 font-bold",
    REJECTED: "bg-red-500/10 text-red-400 border-red-500/20",
    EXPIRED: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
              {proposal.title}
            </h3>
            {proposal.clientName && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-500" />
                {proposal.clientName}
              </p>
            )}
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
              statusColors[proposal.status] || statusColors.DRAFT
            }`}
          >
            {proposal.status}
          </span>
        </div>

        {proposal.content && (
          <p className="text-xs text-slate-400 line-clamp-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/50">
            {proposal.content}
          </p>
        )}

        <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
          {proposal.value !== null && proposal.value !== undefined && (
            <div className="flex items-center justify-between font-bold text-purple-400 text-sm">
              <span>Estimated Value:</span>
              <span>${proposal.value.toLocaleString()}</span>
            </div>
          )}

          {proposal.expiryDate && (
            <div className="flex items-center gap-2 text-slate-400">
              <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Valid Until: {new Date(proposal.expiryDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/50 flex items-center justify-between">
        {!proposal.convertedToId ? (
          <button
            onClick={() => onConvert(proposal.id)}
            className="text-xs text-purple-400 hover:text-purple-300 font-medium px-2.5 py-1 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" /> Convert to Project
          </button>
        ) : (
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Converted to Project
          </span>
        )}

        <button
          onClick={() => onDelete(proposal.id)}
          className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
          title="Delete Proposal"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
