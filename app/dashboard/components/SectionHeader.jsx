export default function SectionHeader({ title, description, badge }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="font-['Syne',sans-serif] text-lg font-bold text-[#0a0d14]">{title}</h2>
        <p className="text-sm text-[#6b7280]">{description}</p>
      </div>
      <span className="rounded-2xl bg-[#f4f6fb] px-3 py-2 text-xs font-medium text-[#2e3347]">{badge}</span>
    </div>
  );
}
