"use client";

import React from "react";
import { Lead } from "../types/lead.types";
import { Building, Mail, Phone, DollarSign, Trash2, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface Props {
  lead: Lead;
  onConvert: (id: string) => void;
  onDelete: (id: string) => void;
}

export const LeadCard: React.FC<Props> = ({ lead, onConvert, onDelete }) => {
  const statusColors = {
    NEW: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    CONTACTED: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    PROPOSAL_SENT: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    NEGOTIATION: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    WON: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    LOST: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors">
              {lead.name}
            </h3>
            {lead.companyName && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                {lead.companyName}
              </p>
            )}
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
              statusColors[lead.status] || statusColors.NEW
            }`}
          >
            {lead.status.replace("_", " ")}
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="truncate">{lead.email}</span>
          </div>

          {lead.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-500 shrink-0" />
              <span>{lead.phone}</span>
            </div>
          )}

          {lead.estimatedValue && (
            <div className="flex items-center gap-2 font-medium text-emerald-400">
              <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>${lead.estimatedValue.toLocaleString()} Deal Value</span>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/50 flex items-center justify-between">
        {lead.convertedToId ? (
          <span className="text-xs text-emerald-400 font-medium flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Converted to Client
          </span>
        ) : (
          <button
            onClick={() => onConvert(lead.id)}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 hover:underline"
          >
            Convert to Client <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}

        <button
          onClick={() => onDelete(lead.id)}
          className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
          title="Delete Lead"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
