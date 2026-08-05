import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FreelanceFlow – CRM for Freelancers",
  description: "Manage clients, projects, invoices, meetings, tasks, and files from a single platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <ReduxProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </ReduxProvider>
      </body>
    </html>
  );
}
