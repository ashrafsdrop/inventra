'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Paid", value: 64, color: "#4f6ef7" },
  { name: "Due", value: 28, color: "#f59e0b" },
  { name: "Return", value: 8, color: "#f43f5e" },
];

export default function CashCollectionChart() {
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
        <div className="font-['Syne',sans-serif] text-4xl font-extrabold tracking-tight text-[#0a0d14]">92%</div>
        <div className="text-xs text-[#6b7280]">Collected</div>
      </div>
    </div>
  );
}
