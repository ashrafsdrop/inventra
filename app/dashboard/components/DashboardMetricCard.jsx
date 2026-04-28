import MiniSparkline from "./MiniSparkline";

export default function DashboardMetricCard({ label, value, change, tone, iconStroke = "#4f6ef7" }) {
  return (
    <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-5 shadow-[0_12px_40px_rgba(10,13,20,0.05)] overflow-hidden cursor-pointer transition hover:shadow-[0_16px_48px_rgba(10,13,20,0.1)]">
      <div className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#6b7280]">{label}</div>
      <div className="mt-3 flex items-end justify-between gap-3 min-w-0">
        <div>
          <div className="font-sans text-[clamp(24px,3vw,34px)] font-semibold leading-none tracking-tight text-[#0a0d14] break-words">{value}</div>
          <div className={`mt-1 text-sm font-medium ${tone}`}>{change} vs last month</div>
        </div>
        <div className="flex h-14 w-24 shrink-0 items-center justify-center overflow-visible rounded-2xl bg-[#f4f6fb] px-2 py-1.5">
          <MiniSparkline values={[12, 24, 18, 34, 26, 42]} stroke={iconStroke} />
        </div>
      </div>
    </article>
  );
}
