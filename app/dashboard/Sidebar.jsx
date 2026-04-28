import Link from "next/link";

const defaultNavigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { label: "POS", href: "#", icon: PosIcon },
  { label: "Inventory", href: "/dashboard/inventory", icon: InventoryIcon },
  { label: "Purchase", href: "#", icon: PurchaseIcon },
  { label: "Sales", href: "#", icon: SalesIcon },
  { label: "Accounts", href: "#", icon: AccountsIcon },
  { label: "Reports", href: "#", icon: ReportsIcon },
  { label: "Settings", href: "#", icon: SettingsIcon },
];

function DashboardIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M4 12.5L12 5l8 7.5V20a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-7.5Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function PosIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6 6h12l-1.2 8.5H7.1L6 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 19.25h.01M15 19.25h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

function InventoryIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M4 7.5 12 3l8 4.5v9L12 21l-8-4.5v-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 12v9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m4.5 7.75 7.5 4.25 7.5-4.25" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PurchaseIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M7 6h14l-1.5 7H8.2L7 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M7 6 6 3H3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="10" cy="19" r="1.4" fill="currentColor" />
      <circle cx="17" cy="19" r="1.4" fill="currentColor" />
    </svg>
  );
}

function SalesIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M5 19V5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5 19h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="m8 14 3-4 3 2 4-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AccountsIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6 7h12M6 12h12M6 17h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="17.5" cy="17" r="1.2" fill="currentColor" />
    </svg>
  );
}

function ReportsIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M7 4h10a1 1 0 0 1 1 1v14l-3-2-3 2-3-2-3 2V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 9h6M9 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function SettingsIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M10.5 4.5h3l.5 2a7.8 7.8 0 0 1 1.8 1l2-.7 1.5 2.6-1.5 1.4c.1.4.1.8.1 1.2s0 .8-.1 1.2l1.5 1.4-1.5 2.6-2-.7a7.8 7.8 0 0 1-1.8 1l-.5 2h-3l-.5-2a7.8 7.8 0 0 1-1.8-1l-2 .7-1.5-2.6 1.5-1.4A8.1 8.1 0 0 1 6 12c0-.4 0-.8.1-1.2L4.6 9.4 6.1 6.8l2 .7a7.8 7.8 0 0 1 1.8-1l.5-2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Sidebar({ items, activeLabel, brand = "Inventra", subtitle = "Enterprise dashboard" }) {
  const navigationItems = items ?? defaultNavigationItems;

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex lg:w-72 lg:flex-col bg-[#0b1020] text-white shadow-[0_20px_60px_rgba(10,13,20,0.28)]">
      <div className="relative overflow-hidden border-b border-white/10 px-6 py-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(79,110,247,0.22),transparent_55%)]" />
        <div className="relative flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#4f6ef7] text-sm font-extrabold shadow-[0_12px_30px_rgba(79,110,247,0.35)]">
            {brand.charAt(0)}
          </div>
          <div>
            <div className="font-['Syne',sans-serif] text-lg font-extrabold tracking-tight">{brand}</div>
            <div className="text-xs text-white/45">{subtitle}</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-5">
        <div className="mb-4 px-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/35">Main</div>
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = item.label === activeLabel;
            return (
              <Link
                key={item.label}
                href={item.href || "#"}
                className={`group relative flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border border-white/10 bg-gradient-to-r from-white/14 to-white/6 text-white shadow-[0_10px_30px_rgba(10,13,20,0.2)]"
                    : "text-white hover:bg-white/6 hover:text-white"
                }`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-xl border transition-colors ${isActive ? "border-white/15 bg-white/10 text-white" : "border-white/10 bg-white/5 text-white/80 group-hover:bg-white/10"}`}>
                  {item.icon ? <item.icon className="h-4 w-4" /> : <span className="h-2 w-2 rounded-full bg-current" />}
                </span>
                <span className="flex-1">{item.label}</span>
                {isActive && <span className="rounded-full bg-[#4f6ef7]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9fb4ff]">Active</span>}
                {!isActive && item.badge && <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">{item.badge}</span>}
                <span className={`absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-[#4f6ef7] transition-all ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="px-4 pb-5">
        <div className="rounded-3xl border border-white/10 bg-white/6 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-white">Need help?</div>
            <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">Live</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/55">Contact support or view the latest reporting guides.</p>
          <button className="mt-4 w-full cursor-pointer rounded-2xl bg-[#4f6ef7] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3d5ce6]">
            Open Support
          </button>
        </div>
      </div>
    </aside>
  );
}
