export default function MiniSparkline({ values, stroke = "#4f6ef7" }) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const points = values
    .map((value, index) => {
      const x = 10 + (index / (values.length - 1)) * 80;
      const normalized = max === min ? 50 : ((value - min) / (max - min)) * 100;
      const y = 86 - normalized * 0.62;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox="0 0 100 100" className="h-10 w-full overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
