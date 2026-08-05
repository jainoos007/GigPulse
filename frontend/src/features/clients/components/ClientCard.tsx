"use client";

import React from "react";
import { Client } from "../types/client.types";
import { Building, Mail, Phone, Globe, Trash2, Tag } from "lucide-react";

interface Props {
  client: Client;
  onDelete: (id: string) => void;
}

export const ClientCard: React.FC<Props> = ({ client, onDelete }) => {
  const statusColors = {
    ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    PROSPECT: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    INACTIVE: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    ARCHIVED: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all space-y-4 flex flex-col justify-between group">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
              {client.name}
            </h3>
            {client.companyName && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                {client.companyName}
              </p>
            )}
          </div>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${
              statusColors[client.status] || statusColors.ACTIVE
            }`}
          >
            {client.status}
          </span>
        </div>

        <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-500 shrink-0" />
            <span className="truncate">{client.email}</span>
          </div>

          {client.phone && (
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-slate-500 shrink-0" />
              <span>{client.phone}</span>
            </div>
          )}

          {client.industry && (
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4 text-slate-500 shrink-0" />
              <span>{client.industry}</span>
            </div>
          )}

          {client.website && (
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-500 shrink-0" />
              <a
                href={client.website}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 hover:underline truncate"
              >
                {client.website.replace(/^https?:\/\//, "")}
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 border-t border-slate-800/50 flex items-center justify-between">
        <span className="text-[10px] text-slate-500">
          Added {new Date(client.createdAt).toLocaleDateString()}
        </span>
        <button
          onClick={() => onDelete(client.id)}
          className="text-slate-500 hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors"
          title="Delete Client"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
