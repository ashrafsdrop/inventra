'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

export default function CashCollectionChart({ data = [], centerValue = "0%", centerLabel = "Collected" }) {
  return (
    <div className="relative h-[280px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip
            contentStyle={{
              borderRadius: "16px",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 16px 50px rgba(10,13,20,0.12)",
            }}
            formatter={(value, name) => [`${value}%`, name]}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={72}
            outerRadius={104}
            paddingAngle={4}
            stroke="none"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="font-['Syne',sans-serif] text-4xl font-extrabold tracking-tight text-[#0a0d14]">{centerValue}</div>
        <div className="text-xs text-[#6b7280]">{centerLabel}</div>
      </div>
    </div>
  );
}
