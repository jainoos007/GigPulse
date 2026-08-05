# Product Requirements Document (PRD)

# FreelanceFlow – CRM for Freelancers

**Version:** 1.0  
**Status:** Draft  
**Project Type:** Full-Stack SaaS Application  
**Architecture:** Modular Monolith

---

# Table of Contents

1. Overview
2. Problem Statement
3. Objectives
4. Target Users
5. Technology Stack
6. System Architecture
7. Project Structure
8. User Roles
9. Core Modules
10. Search & Filtering
11. Dashboard Analytics
12. Functional Requirements
13. Non-Functional Requirements
14. Database Entities
15. REST API Design
16. Future Enhancements
17. Resume Highlights
18. Development Roadmap

---

# 1. Overview

## Purpose

FreelanceFlow is a web-based Customer Relationship Management (CRM) system designed specifically for freelancers to manage clients, projects, invoices, meetings, tasks, files, and business operations from a single platform.

The application replaces spreadsheets and disconnected tools with a centralized, production-ready system that streamlines freelance business management.

---

# 2. Problem Statement

Freelancers typically rely on multiple disconnected tools to manage their business.

Examples include:

- Excel for client information
- WhatsApp for communication
- Google Calendar for meetings
- Notion for notes
- Google Drive for files
- Separate invoice generators

This fragmented workflow often leads to:

- Missed follow-ups
- Poor organization
- Lost revenue
- Difficult project tracking
- Scattered client information
- Inefficient business operations

FreelanceFlow solves these issues by bringing everything into a single application.

---

# 3. Objectives

The primary objective is to build a production-quality SaaS-style application that demonstrates modern software engineering practices.

## Technical Goals

- Authentication & Authorization
- Modular Monolith Architecture
- RESTful API Design
- Relational Database Modeling
- Production Deployment
- Secure File Management
- Dashboard Analytics
- Clean Code Principles
- Scalable Backend Design
- Secure Development Practices

---

# 4. Target Users

## Primary User

Freelancers across various industries, including:

- Web Developers
- UI/UX Designers
- Graphic Designers
- Video Editors
- Marketing Consultants
- Content Writers
- Photographers
- Social Media Managers
- Software Consultants

---

# 5. Technology Stack

## Frontend

- Next.js
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Hook Form
- Zod
- Axios
- shadcn/ui
- Recharts

---

## Backend

- Express.js
- TypeScript
- Prisma ORM
- MySQL
- JWT Authentication
- Bcrypt
- Multer
- Cloudinary SDK

---

## Deployment

- Oracle Cloud VPS
- Ubuntu
- Nginx
- PM2
- Let's Encrypt SSL

---

# 6. System Architecture

```
Client

↓

Next.js

↓

Redux Toolkit

↓

REST API

↓

Express.js

↓

Business Layer

↓

Repository Layer (Prisma)

↓

MySQL

↓

Cloudinary
```

---

## Architecture Style

The application follows a **Modular Monolith** architecture to maintain clear separation of concerns while remaining easy to deploy and maintain.

Each module owns its:

- Routes
- Controllers
- Services
- Repositories
- DTOs
- Validation
- Types

Business logic remains isolated between modules.

---

# 7. Project Structure

```
src/
│
├── modules/
│   ├── auth/
│   ├── users/
│   ├── dashboard/
│   ├── clients/
│   ├── leads/
│   ├── projects/
│   ├── tasks/
│   ├── meetings/
│   ├── invoices/
│   ├── payments/
│   ├── files/
│   └── notifications/
│
├── shared/
├── config/
├── middleware/
├── database/
├── utils/
├── types/
└── server.ts
```

Each module contains:

```
controller/
service/
repository/
routes/
validation/
dto/
types/
```

---

# 8. User Roles

## Freelancer

The primary application user.

Permissions:

- Full system access
- Manage clients
- Manage leads
- Manage projects
- Manage invoices
- View analytics
- Manage settings

---

## Assistant (Optional)

Permissions:

- Manage clients
- Update tasks
- Schedule meetings

Restrictions:

- Cannot delete projects
- Cannot access financial reports
- Cannot manage application settings

---

# 9. Core Modules

## 9.1 Authentication

### Features

- User Registration
- Login
- Logout
- Refresh Token
- Forgot Password
- Reset Password
- Change Password
- Update Profile

---

## 9.2 Dashboard

Displays business metrics including:

- Total Clients
- Active Projects
- Pending Tasks
- Upcoming Meetings
- Pending Invoices
- Monthly Revenue
- Revenue Chart
- Recent Activities

---

## 9.3 Lead Management

### Lead Status

- New
- Contacted
- Proposal Sent
- Negotiation
- Won
- Lost

### Features

- Add Lead
- Edit Lead
- Delete Lead
- Search
- Filter
- Convert Lead to Client

---

## 9.4 Client Management

Each client stores:

- Personal Information
- Company Details
- Contact Information
- Notes
- Uploaded Files
- Associated Projects
- Meetings
- Invoices

---

## 9.5 Project Management

### Project Fields

- Name
- Description
- Budget
- Start Date
- Deadline
- Status
- Priority
- Progress

### Status

- Planning
- Active
- On Hold
- Completed
- Cancelled

---

## 9.6 Task Management

Tasks belong to projects.

### Fields

- Title
- Description
- Due Date
- Priority
- Status

### Status

- Todo
- In Progress
- Review
- Completed

### Features

- Drag-and-drop Kanban Board
- Due Date Reminders
- Task Comments

---

## 9.7 Meeting Management

Store:

- Client
- Date
- Time
- Platform
- Notes
- Reminder

---

## 9.8 Invoice Management

Invoice contains:

- Invoice Number
- Client
- Project
- Amount
- Tax
- Discount
- Due Date

### Status

- Draft
- Sent
- Paid
- Overdue

---

## 9.9 Payment Tracking

Track:

- Amount
- Payment Method
- Transaction ID
- Paid Date

Dashboard Metrics:

- Total Revenue
- Pending Payments
- Overdue Payments

---

## 9.10 Notes Module

Supports:

- Rich Text Notes
- Attachments
- Internal Comments

Notes can belong to:

- Clients
- Projects

---

## 9.11 File Management

Upload:

- Images
- Contracts
- PDFs
- ZIP Files
- Documents

Storage Provider:

- Cloudinary

---

## 9.12 Activity Timeline

Every important action creates an activity log.

Examples:

- Client Created
- Invoice Paid
- Project Completed
- Task Updated
- Meeting Scheduled

---

## 9.13 Notification Module

Examples:

- Project deadline tomorrow
- Invoice overdue
- Meeting starts in 30 minutes
- Task assigned
- Lead follow-up due

---

# 10. Search & Filtering

## Global Search

Search across:

- Clients
- Leads
- Projects
- Tasks
- Invoices

---

## Filters

### Projects

- Status
- Priority
- Client
- Deadline

### Invoices

- Paid
- Pending
- Overdue

### Clients

- Industry
- Company

---

# 11. Dashboard Analytics

Visual dashboards include:

- Revenue Chart
- Active Projects
- Client Growth
- Lead Conversion Rate
- Invoice Status Distribution
- Monthly Growth Trends

---

# 12. Functional Requirements

## Authentication

- JWT Authentication
- Refresh Tokens
- Password Hashing
- Protected Routes
- Role-Based Access Control

---

## Clients

- Create
- Read
- Update
- Delete
- Pagination
- Search
- Soft Delete

---

## Leads

- CRUD Operations
- Convert Lead to Client

---

## Projects

- CRUD Operations
- Progress Tracking

---

## Tasks

- CRUD Operations
- Kanban Board
- Due Dates
- Comments

---

## Meetings

- CRUD Operations
- Calendar View

---

## Files

- Upload
- Preview
- Delete

---

## Invoices

- CRUD Operations
- PDF Export

---

## Payments

- Record Payments
- Revenue Reports

---

# 13. Non-Functional Requirements

## Security

- Password Hashing
- JWT Authentication
- Input Validation
- SQL Injection Protection (Prisma)
- Rate Limiting
- Helmet
- CORS

---

## Performance

- Pagination
- Database Indexes
- Lazy Loading
- Image Optimization

---

## Scalability

The modular architecture should support future additions without major refactoring, including:

- Team Collaboration
- Subscription Plans
- Email Integration
- CRM Automation

---

# 14. Database Entities

Primary entities include:

- User
- Lead
- Client
- Project
- Task
- Meeting
- Invoice
- Payment
- Activity
- Notification
- File
- Note

---

# 15. REST API Design

```
/api/auth

/api/users

/api/dashboard

/api/leads

/api/clients

/api/projects

/api/tasks

/api/meetings

/api/invoices

/api/payments

/api/files

/api/activities

/api/notifications
```

---

# 16. Future Enhancements

## Version 2

Potential future features:

- Email Integration
- Calendar Sync
- Stripe Payments
- Team Collaboration
- Client Portal
- Proposal Generator
- Expense Tracking
- Time Tracking
- AI Email Writer
- AI Project Summary
- AI Invoice Assistant

---

# 17. Resume Highlights

This project demonstrates:

- Full-stack development using **Next.js** and **Express.js**
- End-to-end **TypeScript** development
- Scalable client-side state management with **Redux Toolkit**
- Relational database modeling using **Prisma ORM** and **MySQL**
- Production-ready **Modular Monolith** architecture
- Secure authentication using **JWT** and role-based authorization
- File uploads and media management with **Cloudinary**
- RESTful API design and request validation
- Business analytics dashboards and reporting
- Self-hosted deployment on an **Oracle Cloud VPS** using **Nginx**, **PM2**, and **Let's Encrypt SSL**

---

# 18. Development Roadmap

## Phase 1 – Foundation

Focus on building the core MVP.

Features:

- Authentication
- Dashboard
- Clients
- Leads
- Projects
- Tasks

---

## Phase 2 – Business Features

Expand the application with business-focused functionality.

Features:

- Meetings
- File Uploads
- Invoices
- Payments
- Activity Timeline

---

## Phase 3 – Production Quality

Polish the application for production readiness.

Features:

- Role-Based Access Control
- Dashboard Analytics
- Global Search
- Advanced Filters
- PDF Invoice Export
- Docker Support (Optional)
- Unit Tests
- Integration Tests
- GitHub Actions CI/CD
- Deployment to Oracle Cloud VPS

---

# Success Criteria

The MVP will be considered successful if it:

- Provides a seamless workflow for managing freelance clients and projects.
- Demonstrates production-grade backend architecture and clean code organization.
- Implements secure authentication and authorization.
- Supports scalable CRUD operations across all core modules.
- Includes analytics and reporting capabilities.
- Is fully deployable on an Oracle Cloud VPS using Nginx, PM2, and HTTPS.
- Serves as a portfolio-quality project showcasing modern full-stack engineering practices.
