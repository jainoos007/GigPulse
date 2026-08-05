"use client";

import React, { useState } from "react";
import { Lead } from "../types/lead.types";
import { Building, Mail, Phone, DollarSign, Trash2, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface Props {
  lead: Lead;
  onConvert: (id: string) => void;
  onDelete: (id: string) => void;
}

export const LeadCard: React.FC<Props> = ({ lead, onConvert, onDelete }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return <Badge variant="default">New</Badge>;
      case "CONTACTED":
        return <Badge variant="purple">Contacted</Badge>;
      case "PROPOSAL_SENT":
        return <Badge variant="warning">Proposal Sent</Badge>;
      case "NEGOTIATION":
        return <Badge variant="outline">Negotiation</Badge>;
      case "WON":
        return <Badge variant="success">Won</Badge>;
      case "LOST":
        return <Badge variant="destructive">Lost</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleConvert = () => {
    onConvert(lead.id);
    toast.success("Lead Converted!", {
      description: `${lead.name} has been successfully converted into an active client.`,
    });
  };

  const handleDelete = () => {
    onDelete(lead.id);
    toast.success("Lead removed", {
      description: `${lead.name} has been deleted from pipeline.`,
    });
  };

  return (
    <Card className="flex flex-col justify-between hover:border-slate-700 transition-all group">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
              {lead.name}
            </h3>
            {lead.companyName && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                <Building className="w-3.5 h-3.5 text-slate-500" />
                {lead.companyName}
              </p>
            )}
          </div>
          {getStatusBadge(lead.status)}
        </div>
      </CardHeader>

      <CardContent className="p-5 py-3 space-y-2 text-xs text-slate-300 border-t border-b border-slate-800/60 my-2">
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
          <div className="flex items-center gap-2 font-semibold text-emerald-400 pt-1">
            <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>${lead.estimatedValue.toLocaleString()} Deal Value</span>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-5 pt-2 flex items-center justify-between">
        {lead.convertedToId ? (
          <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" /> Converted to Client
          </span>
        ) : (
          <Button
            variant="link"
            size="sm"
            onClick={handleConvert}
            className="p-0 h-auto text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
          >
            Convert to Client <ArrowUpRight className="w-3.5 h-3.5" />
          </Button>
        )}

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10"
              title="Delete Lead"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Lead &quot;{lead.name}&quot;?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will remove the lead opportunity from your pipeline.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete Lead</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
