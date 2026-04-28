'use client';

import Link from "next/link";
import React, { useState } from "react";

function NavLink({ href = "#", children, onClick, className = "" }) {
  return (
    <a href={href} onClick={onClick} className={className}>
      {children}
    </a>
  );
}

function HeroStat({ value, label }) {
  return (
    <div>
      <div className="font-sans text-[clamp(18px,2.2vw,24px)] font-extrabold leading-none tracking-tight text-[#0a0d14]">{value}</div>
      <div className="text-xs text-[#6b7280] font-medium">{label}</div>
    </div>
  );
}

function DashboardMetricCard({ label, value, trend, tone }) {
  return (
    <div className="bg-[#f4f6fb] rounded-xl p-3 border border-[rgba(0,0,0,0.07)]">
      <div className="text-[10px] text-[#6b7280] font-semibold uppercase tracking-wider">{label}</div>
      <div className="font-sans text-xl font-extrabold text-[#0a0d14] my-1">{value}</div>
      <div className={`${tone} text-[11px] font-semibold`}>{trend}</div>
    </div>
  );
}

function FeatureCard({ icon, title, description, accent }) {
  return (
    <div className="cursor-pointer relative bg-[#f4f6fb] rounded-2xl p-7 border border-[rgba(0,0,0,0.07)] transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_4px_24px_rgba(79,110,247,0.1)] group">
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl bg-current scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
        style={{ color: accent }}
      ></div>
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
        style={{ background: `${accent}10` }}
      >
        {icon}
      </div>
      <div className="font-sans font-semibold text-base mb-2 text-[#0a0d14]">{title}</div>
      <div className="text-sm text-[#6b7280] leading-relaxed">{description}</div>
    </div>
  );
}

function IntegrationChip({ children }) {
  return (
    <div className="cursor-pointer bg-white border border-[rgba(0,0,0,0.07)] rounded-xl py-3.5 px-6 font-sans font-semibold text-sm text-[#2e3347] tracking-normal transition-all hover:border-[#4f6ef7] hover:text-[#4f6ef7] hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(79,110,247,0.1)]">
      {children}
    </div>
  );
}

function SectionStat({ num, label }) {
  return (
    <div className="flex min-w-[180px] flex-1 flex-col items-center justify-center text-center rounded-2xl border border-white/10 bg-white/5 py-6 px-4 md:min-w-[240px] md:px-6 relative z-10">
      <div className="font-sans text-[clamp(20px,4vw,36px)] md:text-[clamp(22px,3vw,38px)] leading-none font-extrabold text-white tracking-tight whitespace-nowrap mb-2">
        {num}
      </div>
      <div className="max-w-full text-xs sm:text-sm text-white/45 font-normal leading-snug">{label}</div>
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const preventDefault = (e) => e.preventDefault();

  return (
    <div className="font-['DM_Sans',sans-serif] bg-[#f4f6fb] text-[#0a0d14] overflow-x-hidden">
        {/* NAVBAR */}
        <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 md:px-12 h-16 bg-[#f4f6fb]/85 backdrop-blur-md border-b border-[rgba(0,0,0,0.07)]">
          <div className="font-sans font-bold text-[20px] tracking-tight text-[#0a0d14] flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#4f6ef7]"></div>
            Inventra
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {["Product", "Features", "Pricing", "Docs"].map((item) => (
              <NavLink
                key={item}
                href="#"
                onClick={preventDefault}
                className="text-[#6b7280] text-sm font-medium hover:text-[#0a0d14] transition-colors"
              >
                {item}
              </NavLink>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex gap-2">
            <Link href="/login" className="cursor-pointer px-5 py-2 rounded-lg border border-[rgba(0,0,0,0.07)] bg-transparent text-[#2e3347] text-sm font-medium hover:border-[#4f6ef7] hover:text-[#4f6ef7] transition-all">
              Customer Login
            </Link>
            <Link href="/signup" className="cursor-pointer px-5 py-2 rounded-lg border-none bg-[#4f6ef7] text-white text-sm font-semibold shadow-md shadow-[#4f6ef7]/30 hover:bg-[#3d5ce6] hover:-translate-y-px transition-all">
              Admin Signup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="cursor-pointer md:hidden flex flex-col gap-1.5 w-6 h-6"
          >
            <span className={`block w-full h-0.5 bg-[#0a0d14] rounded transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-full h-0.5 bg-[#0a0d14] transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-full h-0.5 bg-[#0a0d14] rounded transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed top-16 left-0 right-0 z-[99] bg-white border-b border-[rgba(0,0,0,0.07)] md:hidden">
            <div className="px-6 py-4 flex flex-col gap-4">
              {["Product", "Features", "Pricing", "Docs"].map((item) => (
                <NavLink
                  key={item}
                  href="#"
                  onClick={(e) => {
                    preventDefault(e);
                    setMobileMenuOpen(false);
                  }}
                  className="text-[#6b7280] text-sm font-medium hover:text-[#4f6ef7] transition-colors"
                >
                  {item}
                </NavLink>
              ))}
              <div className="border-t border-[rgba(0,0,0,0.07)] pt-4 flex flex-col gap-3">
                <Link href="/login" className="cursor-pointer w-full px-5 py-2 rounded-lg border border-[rgba(0,0,0,0.07)] bg-transparent text-[#2e3347] text-sm font-medium hover:border-[#4f6ef7] hover:text-[#4f6ef7] transition-all text-center">
                  Customer Login
                </Link>
                <Link href="/signup" className="cursor-pointer w-full px-5 py-2 rounded-lg border-none bg-[#4f6ef7] text-white text-sm font-semibold shadow-md shadow-[#4f6ef7]/30 hover:bg-[#3d5ce6] transition-all text-center">
                  Admin Signup
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* HERO SECTION */}
        <section className="relative min-h-screen grid md:grid-cols-2 items-center gap-0 pt-24 pb-16 px-6 md:px-12 overflow-hidden">
          {/* Background decorations */}
          <div className="absolute -top-32 -right-32 w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(79,110,247,0.12)_0%,transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(14,196,168,0.10)_0%,transparent_70%)] pointer-events-none" />

          {/* Left content */}
          <div className="relative z-10">
            <div className="animate-fadeUp inline-flex items-center gap-1.5 bg-[#4f6ef7]/10 border border-[#4f6ef7]/30 rounded-full px-3.5 py-1 text-[#4f6ef7] text-xs font-semibold mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4f6ef7] animate-pulse"></span>
              Trusted by 5,000+ Enterprises
            </div>
            <h1 className="font-sans text-[clamp(38px,5vw,64px)] font-bold leading-[1.08] tracking-tight text-[#0a0d14] mb-5 animate-fadeUp [animation-delay:100ms]">
              The Modern<br />
              <span className="text-[#4f6ef7]">ERP Platform</span>
              <br />
              Built to Scale
            </h1>
            <p className="text-[17px] leading-relaxed text-[#6b7280] max-w-[420px] mb-10 animate-fadeUp [animation-delay:200ms]">
              Streamline your operations, automate workflows, and grow with
              confidence — all from one intelligent platform.
            </p>
            <div className="flex gap-3 items-center animate-fadeUp [animation-delay:300ms]">
              <button className="cursor-pointer group px-8 py-3.5 rounded-xl border-none bg-[#4f6ef7] text-white font-semibold shadow-lg shadow-[#4f6ef7]/35 hover:bg-[#3d5ce6] hover:-translate-y-0.5 hover:shadow-xl transition-all flex items-center gap-2">
                Get Started Free
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className="group-hover:translate-x-0.5 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
              <button className="cursor-pointer px-7 py-3.5 rounded-xl border border-[rgba(0,0,0,0.07)] bg-transparent text-[#2e3347] font-medium hover:border-[#4f6ef7] hover:text-[#4f6ef7] transition-all">
                Watch Demo
              </button>
            </div>
            <div className="flex gap-7 mt-12 animate-fadeUp [animation-delay:400ms]">
              <HeroStat value="$2.4B+" label="Revenue Managed" />
              <HeroStat value="99.9%" label="Uptime SLA" />
              <HeroStat value="180+" label="Integrations" />
            </div>
          </div>

          {/* Right side mockup */}
          <div className="relative flex items-center justify-center z-10 animate-fadeUp [animation-delay:200ms]">
            <div className="relative w-full max-w-[500px]">
              {/* Floating card top */}
              <div className="absolute -top-4 -right-12 md:-right-12 bg-white rounded-xl shadow-[0_8px_32px_rgba(10,13,20,0.12)] border border-[rgba(0,0,0,0.07)] p-2.5 flex items-center gap-2 text-xs animate-float z-20">
                <div className="w-7 h-7 rounded-lg bg-[#0ec4a8]/10 flex items-center justify-center text-base">✅</div>
                <div>
                  <div className="font-bold text-[#0a0d14] text-[11px]">Order #4821 Fulfilled</div>
                  <div className="text-[#6b7280] text-[10px]">Just now</div>
                </div>
              </div>

              {/* Main window */}
              <div
                className="bg-white rounded-2xl shadow-[0_24px_80px_rgba(10,13,20,0.14),0_4px_16px_rgba(79,110,247,0.08)] border border-[rgba(0,0,0,0.07)] overflow-hidden transition-all duration-[400ms]"
                style={{ transform: "perspective(1200px) rotateY(-6deg) rotateX(3deg)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "perspective(1200px) rotateY(-2deg) rotateX(1deg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "perspective(1200px) rotateY(-6deg) rotateX(3deg)";
                }}
              >
                <div className="bg-[#f0f2f7] px-4 py-3 flex items-center gap-2 border-b border-[rgba(0,0,0,0.07)]">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"></div>
                  <div className="flex-1 bg-[#e4e8f0] rounded-md text-[11px] text-[#6b7280] px-2.5 py-1 font-mono">
                    https://app.inventra.io/dashboard
                  </div>
                </div>
                <div className="p-4">
                  {/* KPIs */}
                  <div className="grid grid-cols-3 gap-2.5 mb-3.5">
                    <DashboardMetricCard label="Sales" value="$124K" trend="▲ +21%" tone="text-[#0ec4a8]" />
                    <DashboardMetricCard label="Orders" value="1,429" trend="▲ +8%" tone="text-[#0ec4a8]" />
                    <DashboardMetricCard label="Revenue" value="$89K" trend="▲ +12%" tone="text-[#f59e0b]" />
                  </div>

                  {/* Chart */}
                  <div className="bg-[#f4f6fb] rounded-xl p-3 border border-[rgba(0,0,0,0.07)] mb-3.5">
                    <div className="flex justify-between items-center mb-2.5">
                      <div className="text-xs font-semibold text-[#2e3347]">Sales Performance</div>
                      <div className="text-[10px] text-[#6b7280]">Last 7 months</div>
                    </div>
                    <svg className="w-full h-[70px]" viewBox="0 0 420 70" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4f6ef7" stopOpacity="0.18" />
                          <stop offset="100%" stopColor="#4f6ef7" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.14" />
                          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <polyline
                        points="20,55 80,45 140,48 200,36 260,30 320,22 380,14"
                        fill="none"
                        stroke="#4f6ef7"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <polyline
                        points="20,62 80,56 140,58 200,52 260,46 320,40 380,34"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="380" cy="14" r="4" fill="#4f6ef7" />
                      <circle cx="380" cy="34" r="3" fill="#f59e0b" />
                    </svg>
                  </div>

                  {/* Bottom mini cards */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="bg-[#f4f6fb] rounded-xl p-3 border border-[rgba(0,0,0,0.07)]">
                      <div className="text-[10px] font-semibold text-[#2e3347] mb-2">Product Revenue</div>
                      <div className="flex gap-1 items-end h-10">
                        {[60, 80, 45, 90, 65, 75].map((height, idx) => (
                          <div
                            key={idx}
                            className="flex-1 rounded-t-sm animate-growUp"
                            style={{
                              height: `${height}%`,
                              background:
                                idx % 2 === 0
                                  ? idx === 2
                                    ? "#0ec4a8"
                                    : "#4f6ef7"
                                  : idx === 5
                                  ? "#7b93ff"
                                  : idx === 4
                                  ? "#f43f5e"
                                  : "#7b93ff",
                              animationDelay: `${idx * 0.1}s`,
                            }}
                          ></div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#f4f6fb] rounded-xl p-3 border border-[rgba(0,0,0,0.07)]">
                      <div className="text-[10px] font-semibold text-[#2e3347] mb-2">Transaction Split</div>
                      <div className="flex flex-col gap-1.5">
                        {[
                          { label: "Cash", pct: 45, color: "#4f6ef7" },
                          { label: "Accounts Payable", pct: 30, color: "#0ec4a8" },
                          { label: "Receivable", pct: 25, color: "#f59e0b" },
                        ].map((item) => (
                          <div key={item.label}>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-[#2e3347]">{item.label}</span>
                              <span className="text-[10px] font-bold text-[#0a0d14]">{item.pct}%</span>
                            </div>
                            <div className="w-full h-[3px] bg-black/6 rounded-full mt-0.5">
                              <div
                                className="h-[3px] rounded-full"
                                style={{ width: `${item.pct}%`, background: item.color }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card bottom */}
              <div className="absolute -bottom-5 -left-12 md:-left-12 bg-white rounded-xl shadow-[0_8px_32px_rgba(10,13,20,0.12)] border border-[rgba(0,0,0,0.07)] p-2.5 flex items-center gap-2 text-xs animate-float [animation-delay:2s] z-20">
                <div className="w-7 h-7 rounded-lg bg-[#4f6ef7]/10 flex items-center justify-center text-sm">📦</div>
                <div>
                  <div className="font-bold text-[#0a0d14] text-[11px]">Stock Replenished</div>
                  <div className="text-[#6b7280] text-[10px]">SKU-7821 · 500 units</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section className="py-24 px-6 md:px-12 bg-white">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-[#4f6ef7] text-xs font-bold tracking-widest uppercase mb-3.5">Core Modules</div>
            <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight text-[#0a0d14] mb-4">
              Everything your enterprise needs,
              <br />
              in one place
            </h2>
            <p className="text-base text-[#6b7280] max-w-[480px] leading-relaxed">
              From procurement to invoicing, Inventra handles every corner of your business so your team can focus on growth.
            </p>

            <div className="grid md:grid-cols-3 gap-5 mt-14">
              {[
                { icon: "📊", title: "Inventory Management", desc: "Real-time stock tracking across all warehouses, automated reorder alerts, and batch management.", accent: "#4f6ef7" },
                { icon: "💰", title: "Financials & Accounting", desc: "Automate AR/AP, generate P&L reports, and close books faster with AI-powered reconciliation.", accent: "#0ec4a8" },
                { icon: "🛒", title: "Order Management", desc: "Process thousands of orders per second with smart routing, fulfillment tracking, and customer notifications.", accent: "#f59e0b" },
                { icon: "👥", title: "CRM & Sales Pipeline", desc: "Manage leads, deals, and customers from one unified view. Built-in forecasting and team collaboration.", accent: "#f43f5e" },
                { icon: "📈", title: "Analytics & Reports", desc: "Custom dashboards, drill-down reports, and AI-generated insights that surface opportunities instantly.", accent: "#8b5cf6" },
                { icon: "🔗", title: "API & Integrations", desc: "Connect Stripe, Shopify, HubSpot, QuickBooks, and 180+ apps out of the box with zero-code setup.", accent: "#06b6d4" },
              ].map((feat, idx) => (
                <FeatureCard
                  key={idx}
                  icon={feat.icon}
                  title={feat.title}
                  description={feat.desc}
                  accent={feat.accent}
                />
              ))}
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="relative bg-[#0a0d14] py-20 px-6 md:px-12 overflow-hidden">
          <div className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-4 md:gap-6">
          <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(79,110,247,0.18)_0%,transparent_70%)] pointer-events-none" />
          {[
            { num: "5K+", label: "Enterprises worldwide" },
            { num: "$2.4B", label: "Revenue processed daily" },
            { num: "99.9%", label: "Platform uptime" },
            { num: "180+", label: "Native integrations" },
          ].map((stat, idx) => (
              <SectionStat key={idx} num={stat.num} label={stat.label} />
          ))}
          </div>
        </section>

        {/* INTEGRATIONS SECTION */}
        <section className="py-24 px-6 md:px-12 bg-[#f4f6fb] text-center">
          <div className="max-w-[800px] mx-auto">
            <div className="text-[#4f6ef7] text-xs font-bold tracking-widest uppercase mb-3.5">Integrations</div>
            <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] font-bold tracking-tight text-[#0a0d14] mb-4">
              Connects with your entire stack
            </h2>
            <p className="text-base text-[#6b7280] max-w-[480px] mx-auto leading-relaxed">
              Works seamlessly with the tools your team already loves.
            </p>
            <div className="flex flex-wrap gap-8 justify-center items-center mt-12">
              {["Stripe", "Shopify", "QuickBooks", "HubSpot", "Salesforce", "Slack", "Xero", "WooCommerce"].map((tool) => (
                <IntegrationChip key={tool}>{tool}</IntegrationChip>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="py-24 px-6 md:px-12 bg-white text-center">
          <div className="relative bg-gradient-to-br from-[#0a0d14] to-[#1a2060] rounded-3xl py-20 px-6 md:px-12 overflow-hidden">
            <div className="absolute -top-24 -right-24 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(79,110,247,0.3)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute -bottom-16 left-[10%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(14,196,168,0.15)_0%,transparent_70%)] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="font-sans text-[clamp(28px,4vw,52px)] font-bold text-white tracking-tight mb-4">
                Ready to transform
                <br />
                your operations?
              </h2>
              <p className="text-base text-white/55 mb-10">
                Join 5,000+ businesses running smarter with Inventra. Free 30-day trial, no credit card required.
              </p>
              <div className="flex gap-3 justify-center flex-wrap">
                <button className="cursor-pointer px-8 py-3.5 rounded-xl border-none bg-white text-[#0a0d14] font-bold text-sm hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(255,255,255,0.15)] transition-all">
                  Start Free Trial
                </button>
                <button className="cursor-pointer px-7 py-3.5 rounded-xl border border-white/20 bg-transparent text-white/80 font-medium text-sm hover:border-white/50 hover:text-white transition-all">
                  Talk to Sales →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#0a0d14] text-white/40 py-8 px-6 md:px-12 text-center text-xs">
          <p>
            © 2026 <span className="text-white/70 font-semibold">Inventra ERP</span> · All rights reserved · Built for Modern Enterprises
          </p>
        </footer>
      </div>
    );
  }