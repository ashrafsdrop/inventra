import SectionHeader from "./SectionHeader";

export default function DataTableCard({ title, description, badge, columns, rows, rowKey, renderRow }) {
  return (
    <article className="rounded-3xl border border-[rgba(0,0,0,0.07)] bg-white p-6 shadow-[0_12px_40px_rgba(10,13,20,0.05)]">
      <SectionHeader title={title} description={description} badge={badge} />

      <div className="mt-6 overflow-hidden rounded-2xl border border-[rgba(0,0,0,0.07)]">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#f4f6fb] text-xs uppercase tracking-[0.16em] text-[#6b7280]">
            <tr>
              {columns.map((column) => (
                <th key={column.label} className={`px-4 py-3 font-semibold ${column.align === "right" ? "text-right" : ""}`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => renderRow(row, rowKey(row)))}
          </tbody>
        </table>
      </div>
    </article>
  );
}
