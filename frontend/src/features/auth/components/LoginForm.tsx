"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "../schemas/login.schema";
import { useAuth } from "../hooks/useAuth";
import Link from "next/link";
import { Lock, Mail, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Logo } from "@/components/ui/Logo";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export const LoginForm: React.FC = () => {
  const { login, error } = useAuth();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      await login(data);
      toast.success("Welcome back!", {
        description: "Successfully signed into your GigPulse workspace.",
      });
    } catch (err: any) {
      toast.error("Sign in failed", {
        description: err.message || "Invalid credentials provided.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-xl shadow-xl dark:shadow-2xl text-slate-900 dark:text-slate-100">
      <CardHeader className="text-center pb-6">
        <Link
          href="/"
          title="Go to GigPulse home"
          className="inline-block mx-auto group focus:outline-none"
        >
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/20 flex items-center justify-center p-2 mb-3 shadow-md shadow-blue-500/10 group-hover:scale-105 group-hover:border-blue-500/40 transition-all duration-200">
            <Logo className="w-full h-full" />
          </div>
        </Link>
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Welcome back</CardTitle>
        <CardDescription className="text-slate-600 dark:text-slate-400 text-xs">
          Sign in to access your GigPulse CRM workspace
        </CardDescription>
      </CardHeader>

      <CardContent>
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
            {error}
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                      <Input
                        type="email"
                        placeholder="alex@freelance.dev"
                        className="pl-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-11 text-sm font-semibold mt-2 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-xs text-slate-600 dark:text-slate-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Create account
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
