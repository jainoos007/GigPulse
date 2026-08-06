import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("[SEED] Starting database seeding for GigPulse CRM...");

  // Clean existing records in reverse dependency order (if tables exist)
  try {
    await prisma.payment.deleteMany();
    await prisma.invoice.deleteMany();
    await prisma.meeting.deleteMany();
    await prisma.task.deleteMany();
    await prisma.project.deleteMany();
    await prisma.proposal.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.client.deleteMany();
    await prisma.refreshToken.deleteMany();
    await prisma.user.deleteMany();
    console.log("[CLEAN] Cleaned old database records.");
  } catch (err) {
    console.log("[INFO] Skipping cleanup: Database tables do not exist yet or are clean.");
  }

  // 1. Create Demo User
  const passwordHash = await bcrypt.hash("Password123!", 10);
  const demoUser = await prisma.user.create({
    data: {
      email: "demo@gigpulse.com",
      passwordHash,
      firstName: "Alex",
      lastName: "Rivers",
      companyName: "Rivers Digital Studio",
      role: "FREELANCER",
      isActive: true,
    },
  });

  console.log(`[USER] Created Demo User: ${demoUser.email} (Password: Password123!)`);

  // 2. Create Clients
  const client1 = await prisma.client.create({
    data: {
      userId: demoUser.id,
      name: "Acme Corporation",
      email: "contact@acmecorp.com",
      phone: "+1 (555) 234-5678",
      companyName: "Acme Corp",
      industry: "Software & SaaS",
      website: "https://acmecorp.example.com",
      status: "ACTIVE",
      notes: "Enterprise SaaS client on monthly retainer.",
    },
  });

  const client2 = await prisma.client.create({
    data: {
      userId: demoUser.id,
      name: "Nexus Media Ltd",
      email: "billing@nexusmedia.io",
      phone: "+1 (555) 876-5432",
      companyName: "Nexus Media",
      industry: "E-Commerce & Digital Retail",
      website: "https://nexusmedia.example.com",
      status: "ACTIVE",
      notes: "High priority client for quarterly storefront revamps.",
    },
  });

  console.log("[CLIENTS] Created Clients: Acme Corporation & Nexus Media Ltd");

  // 3. Create Leads
  const lead1 = await prisma.lead.create({
    data: {
      userId: demoUser.id,
      name: "Vanguard Tech Inc",
      email: "partnerships@vanguardtech.com",
      phone: "+1 (555) 999-1122",
      companyName: "Vanguard Tech",
      estimatedValue: 14500,
      source: "Inbound Website Contact Form",
      status: "PROPOSAL_SENT",
      notes: "Requested full-stack custom CRM dashboard build.",
    },
  });

  const lead2 = await prisma.lead.create({
    data: {
      userId: demoUser.id,
      name: "Solaris BioTech",
      email: "info@solarisbio.com",
      companyName: "Solaris BioTech",
      estimatedValue: 9000,
      source: "LinkedIn Outreach",
      status: "CONTACTED",
      notes: "Interested in bio-informatics web portal redesign.",
    },
  });

  console.log("[LEADS] Created Sales Leads: Vanguard Tech & Solaris BioTech");

  // 4. Create Projects
  const project1 = await prisma.project.create({
    data: {
      userId: demoUser.id,
      clientId: client1.id,
      name: "Acme SaaS Portal Redesign",
      description: "Complete UI overhaul, React frontend upgrade, and Node API performance tuning.",
      budget: 15000,
      startDate: new Date("2026-07-01"),
      deadline: new Date("2026-09-30"),
      status: "ACTIVE",
      priority: "HIGH",
      progress: 65,
    },
  });

  const project2 = await prisma.project.create({
    data: {
      userId: demoUser.id,
      clientId: client2.id,
      name: "Nexus E-Commerce Checkout Integration",
      description: "Stripe and PayPal payment gateway integration with webhooks and automated receipts.",
      budget: 8500,
      startDate: new Date("2026-08-01"),
      deadline: new Date("2026-10-15"),
      status: "PLANNING",
      priority: "URGENT",
      progress: 15,
    },
  });

  console.log("[PROJECTS] Created Projects: Acme SaaS Portal & Nexus E-Commerce Checkout");

  // 5. Create Tasks (Kanban Board Items)
  await prisma.task.createMany({
    data: [
      {
        userId: demoUser.id,
        projectId: project1.id,
        title: "Implement JWT Cookie Auth & RBAC Middleware",
        description: "Secure API endpoints with access token rotation and role verification.",
        status: "COMPLETED",
        priority: "URGENT",
        dueDate: new Date("2026-07-15"),
      },
      {
        userId: demoUser.id,
        projectId: project1.id,
        title: "Design Dark Mode Glassmorphism Dashboard UI",
        description: "Figma mockup implementation using Tailwind CSS and Next.js components.",
        status: "IN_PROGRESS",
        priority: "HIGH",
        dueDate: new Date("2026-08-20"),
      },
      {
        userId: demoUser.id,
        projectId: project2.id,
        title: "Setup Stripe Webhooks & Event Listeners",
        description: "Handle checkout.session.completed and invoice.payment_succeeded events.",
        status: "REVIEW",
        priority: "MEDIUM",
        dueDate: new Date("2026-08-25"),
      },
      {
        userId: demoUser.id,
        projectId: project2.id,
        title: "Draft Technical Architecture Documentation",
        description: "Document data flows, database schemas, and external API integrations.",
        status: "TODO",
        priority: "LOW",
        dueDate: new Date("2026-09-01"),
      },
    ],
  });

  console.log("[TASKS] Created Kanban Tasks across TODO, IN_PROGRESS, REVIEW, and COMPLETED columns");

  // 6. Create Meetings
  await prisma.meeting.createMany({
    data: [
      {
        userId: demoUser.id,
        clientId: client1.id,
        title: "Sprint Review & Progress Demo",
        meetingDate: new Date(Date.now() + 86400000 * 2), // 2 days in future
        platform: "Google Meet",
        locationUrl: "https://meet.google.com/abc-demo-xyz",
        notes: "Demo completed authentication modules and review task roadmap.",
        reminder: true,
      },
      {
        userId: demoUser.id,
        clientId: client2.id,
        title: "Project Scope & Gateway Alignment",
        meetingDate: new Date(Date.now() - 86400000 * 3), // 3 days in past
        platform: "Zoom",
        locationUrl: "https://zoom.us/j/99887766",
        notes: "Aligned on payment gateway scope and transaction fee limits.",
        reminder: true,
      },
    ],
  });

  console.log("[MEETINGS] Created Scheduled & Past Client Meetings");

  // 7. Create Invoices & Payments
  const invoice1 = await prisma.invoice.create({
    data: {
      userId: demoUser.id,
      clientId: client1.id,
      projectId: project1.id,
      invoiceNumber: "INV-2026-001",
      amount: 5000,
      tax: 10,
      discount: 0,
      totalAmount: 5500,
      dueDate: new Date("2026-07-31"),
      status: "PAID",
      notes: "Milestone 1 Deposit - SaaS Portal Redesign Project",
    },
  });

  await prisma.payment.create({
    data: {
      userId: demoUser.id,
      invoiceId: invoice1.id,
      amount: 5500,
      paymentMethod: "BANK_TRANSFER",
      transactionId: "TXN-BANK-998822",
      paidDate: new Date("2026-07-28"),
    },
  });

  await prisma.invoice.create({
    data: {
      userId: demoUser.id,
      clientId: client2.id,
      projectId: project2.id,
      invoiceNumber: "INV-2026-002",
      amount: 3500,
      tax: 5,
      discount: 100,
      totalAmount: 3575,
      dueDate: new Date(Date.now() + 86400000 * 14), // 14 days in future
      status: "SENT",
      notes: "Initial Deposit - E-Commerce Checkout Integration",
    },
  });

  console.log("[INVOICES] Created Invoices & Payments (Settled & Outstanding)");

  // 8. Create Proposals
  await prisma.proposal.createMany({
    data: [
      {
        userId: demoUser.id,
        clientId: client1.id,
        title: "Mobile Native Companion App Proposal",
        value: 12000,
        content: "Draft proposal for building companion iOS and Android app for Acme Corp.",
        status: "SENT",
        expiryDate: new Date(Date.now() + 86400000 * 30),
      },
      {
        userId: demoUser.id,
        clientId: client2.id,
        title: "Cloud Infrastructure & Database Performance Audit",
        value: 4500,
        content: "Audit existing AWS RDS MySQL instance and introduce Redis caching layer.",
        status: "ACCEPTED",
        expiryDate: new Date(Date.now() + 86400000 * 15),
      },
    ],
  });

  console.log("[PROPOSALS] Created Proposals & Contracts");

  console.log("\n[SUCCESS] Database Seeding Successfully Completed!");
  console.log("Demo Login Credentials:");
  console.log("   Email: demo@gigpulse.com");
  console.log("   Password: Password123!\n");
}

main()
  .catch((e) => {
    console.error("[ERROR] Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
