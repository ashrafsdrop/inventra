export default function StatusBadge({ status }) {
  const tone =
    status === "Paid"
      ? "bg-[#0ec4a8]/10 text-[#0ec4a8]"
      : status === "Due"
      ? "bg-[#f59e0b]/10 text-[#f59e0b]"
      : "bg-[#f43f5e]/10 text-[#f43f5e]";

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
}
