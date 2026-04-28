'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RevenueTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 8, left: 0 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="#e9edf5" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={{ stroke: "#dbe2ec" }} tickLine={false} />
        <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
        <Tooltip
          contentStyle={{
            borderRadius: "16px",
            border: "1px solid rgba(0,0,0,0.08)",
            boxShadow: "0 16px 50px rgba(10,13,20,0.12)",
          }}
          labelStyle={{ color: "#0a0d14", fontWeight: 600 }}
          formatter={(value, name) => [`${value} units`, name === "revenue" ? "Revenue" : "Purchase"]}
        />
        <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: 12 }} />
        <Line
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="#4f6ef7"
          strokeWidth={3}
          dot={{ r: 4, fill: "#4f6ef7", strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="purchase"
          name="Purchase"
          stroke="#0ec4a8"
          strokeWidth={3}
          dot={{ r: 4, fill: "#0ec4a8", strokeWidth: 0 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
