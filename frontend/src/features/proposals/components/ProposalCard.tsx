"use client";

import React, { useState } from "react";
import { Proposal } from "../types/proposal.types";
import { FileCode, Calendar, DollarSign, User, Trash2, ArrowRightLeft, CheckCircle2 } from "lucide-react";
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
  proposal: Proposal;
  onConvert: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ProposalCard: React.FC<Props> = ({ proposal, onConvert, onDelete }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <Badge variant="secondary">Draft</Badge>;
      case "SENT":
        return <Badge variant="default">Sent</Badge>;
      case "ACCEPTED":
        return <Badge variant="success">Accepted</Badge>;
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>;
      case "EXPIRED":
        return <Badge variant="warning">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleConvert = () => {
    onConvert(proposal.id);
    toast.success("Proposal Converted!", {
      description: `Proposal "${proposal.title}" has been converted into an active project.`,
    });
  };

  const handleDelete = () => {
    onDelete(proposal.id);
    toast.success("Proposal deleted", {
      description: `Proposal "${proposal.title}" removed.`,
    });
  };

  return (
    <Card className="flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all group bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
              {proposal.title}
            </h3>
            {proposal.clientName && (
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                {proposal.clientName}
              </p>
            )}
          </div>
          {getStatusBadge(proposal.status)}
        </div>
      </CardHeader>

      <CardContent className="p-5 py-3 space-y-2 text-xs text-slate-600 dark:text-slate-300 border-t border-b border-slate-200 dark:border-slate-800/60 my-2">
        {proposal.content && (
          <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 bg-slate-100/80 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800/50 leading-relaxed">
            {proposal.content}
          </p>
        )}

        <div className="space-y-2 pt-1">
          {proposal.value !== null && proposal.value !== undefined && (
            <div className="flex items-center justify-between font-bold text-purple-600 dark:text-purple-400 text-sm">
              <span>Estimated Value:</span>
              <span>${proposal.value.toLocaleString()}</span>
            </div>
          )}

          {proposal.expiryDate && (
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Calendar className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
              <span>Valid Until: {new Date(proposal.expiryDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-2 flex items-center justify-between">
        {!proposal.convertedToId ? (
          <Button
            variant="link"
            size="sm"
            onClick={handleConvert}
            className="p-0 h-auto text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-semibold flex items-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" /> Convert to Project
          </Button>
        ) : (
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Converted to Project
          </span>
        )}

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10"
              title="Delete Proposal"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Proposal &quot;{proposal.title}&quot;?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600 dark:text-slate-400 text-xs">
                This action will permanently delete the proposal record.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-slate-200 dark:border-slate-800">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete Proposal</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
