"use client";

import { Code2, Server, Cpu, Database, Shield, Layers, Cloud, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TechStackSection() {
  const stackCategories = [
    {
      category: "Frontend Architecture",
      icon: Code2,
      description: "Modern, type-safe client built with server and client components.",
      color: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30",
      technologies: [
        { name: "Next.js 14", desc: "React Framework with App Router" },
        { name: "TypeScript", desc: "Strict Type Safety & Interfaces" },
        { name: "Redux Toolkit", desc: "Global State & Async Thunks" },
        { name: "Tailwind CSS", desc: "Utility-First Responsive Styling" },
        { name: "shadcn/ui", desc: "Accessible Radix-Based Components" },
      ],
    },
    {
      category: "Backend Engine",
      icon: Server,
      description: "Modular Express server RESTful API layer with relational database modeling.",
      color: "from-indigo-500/20 to-purple-500/10 text-indigo-400 border-indigo-500/30",
      technologies: [
        { name: "Express.js", desc: "Node.js Web Application Framework" },
        { name: "Prisma ORM", desc: "Next-Gen Node & TS Database Toolkit" },
        { name: "MySQL", desc: "Relational Database Engine" },
        { name: "JWT Auth", desc: "HttpOnly Token Authentication" },
        { name: "Cloudinary API", desc: "Secure Digital Asset & File Storage" },
      ],
    },
    {
      category: "Infrastructure & DevOps",
      icon: Cloud,
      description: "Production infrastructure tuned for low-latency response and reliability.",
      color: "from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30",
      technologies: [
        { name: "Oracle Cloud VPS", desc: "Dedicated Compute Engine" },
        { name: "Nginx", desc: "High-Performance Reverse Proxy" },
        { name: "PM2", desc: "Production Process Manager" },
        { name: "SSL / TLS", desc: "HTTPS Encrypted Traffic" },
        { name: "REST Protocols", desc: "Structured JSON Endpoints" },
      ],
    },
  ];

  return (
    <section className="py-20 sm:py-32 bg-slate-950 relative border-t border-slate-800/80" id="tech-stack">
      {/* Background Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="outline" className="border-indigo-500/30 text-indigo-400 bg-indigo-500/10 px-3.5 py-1 text-xs">
            <Cpu className="w-3.5 h-3.5 mr-1.5" /> Full Stack Stack Showcase
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Powered by Production-Grade Technologies
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Built with modern web standards, type safety, modular architecture, and battle-tested deployment tools.
          </p>
        </div>

        {/* 3 Column Stack Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {stackCategories.map((col) => {
            const Icon = col.icon;
            return (
              <div
                key={col.category}
                className="bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-6 sm:p-8 space-y-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 shadow-xl shadow-slate-950/40 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${col.color} border flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{col.category}</h3>
                      <p className="text-xs text-slate-400">{col.description}</p>
                    </div>
                  </div>

                  {/* Tech List Badges/Cards */}
                  <div className="space-y-3 pt-2">
                    {col.technologies.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700/80 transition-colors group/tech"
                      >
                        <div className="space-y-0.5">
                          <p className="text-sm font-semibold text-white group-hover/tech:text-blue-400 transition-colors">
                            {tech.name}
                          </p>
                          <p className="text-[11px] text-slate-400">{tech.desc}</p>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-blue-500/60 group-hover/tech:bg-blue-400 group-hover/tech:scale-125 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
