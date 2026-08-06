"use client";

import React, { useState } from "react";
import { Client } from "../types/client.types";
import { Building, Mail, Phone, Globe, Trash2, Tag } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  client: Client;
  onDelete: (id: string) => void;
}

export const ClientCard: React.FC<Props> = ({ client, onDelete }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge variant="success">Active</Badge>;
      case "PROSPECT":
        return <Badge variant="default">Prospect</Badge>;
      case "INACTIVE":
        return <Badge variant="warning">Inactive</Badge>;
      case "ARCHIVED":
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const initials = client.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  const handleDelete = () => {
    onDelete(client.id);
    toast.success("Client removed", {
      description: `${client.name} has been deleted from clients directory.`,
    });
  };

  return (
    <Card className="flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all group bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-none">
      <CardHeader className="p-5 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border-blue-500/20">
              <AvatarFallback className="bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {client.name}
              </h3>
              {client.companyName && (
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  {client.companyName}
                </p>
              )}
            </div>
          </div>
          {getStatusBadge(client.status)}
        </div>
      </CardHeader>

      <CardContent className="p-5 py-3 space-y-2 text-xs text-slate-600 dark:text-slate-300 border-t border-b border-slate-200 dark:border-slate-800/60 my-2">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <span className="truncate">{client.email}</span>
        </div>

        {client.phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <span>{client.phone}</span>
          </div>
        )}

        {client.industry && (
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <span>{client.industry}</span>
          </div>
        )}

        {client.website && (
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
            <a
              href={client.website}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline truncate font-medium"
            >
              {client.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-5 pt-2 flex items-center justify-between">
        <span className="text-[10px] text-slate-400 dark:text-slate-500">
          Added {new Date(client.createdAt).toLocaleDateString()}
        </span>

        <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <AlertDialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-500/10"
              title="Delete Client"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100">
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Client &quot;{client.name}&quot;?</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-600 dark:text-slate-400 text-xs">
                This action cannot be undone. This will permanently delete the client record and disassociate related projects and invoices.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-slate-200 dark:border-slate-800">Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white">Delete Client</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
