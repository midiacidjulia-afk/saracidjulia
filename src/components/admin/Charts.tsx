"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";

const ACCENT = "#c9a24a";
const ACCENT_LIGHT = "#e4c579";
const SUCCESS = "#34d399";
const WARNING = "#fbbf24";
const DANGER = "#f87171";
const GRID = "#38383e";

const tooltipStyle = {
  background: "#2c2c31",
  border: "1px solid #38383e",
  borderRadius: 8,
  color: "#f3f1ec",
  fontSize: 12,
};

export function ChurchCotasChart({ data }: { data: { name: string; cotas: number }[] }) {
  return (
    <Card>
      <p className="mb-4 text-sm font-medium text-foreground">Cotas por igreja</p>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
          <XAxis dataKey="name" tick={{ fill: "#98979e", fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={60} />
          <YAxis tick={{ fill: "#98979e", fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(201,162,74,0.1)" }} />
          <Bar dataKey="cotas" fill={ACCENT} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function CumulativeChart({ data }: { data: { date: string; cotas: number }[] }) {
  return (
    <Card>
      <p className="mb-4 text-sm font-medium text-foreground">Evolução das cotas</p>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data} margin={{ left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={GRID} vertical={false} />
          <XAxis dataKey="date" tick={{ fill: "#98979e", fontSize: 11 }} />
          <YAxis tick={{ fill: "#98979e", fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Line type="monotone" dataKey="cotas" stroke={ACCENT_LIGHT} strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function StatusPieChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  const colors = [SUCCESS, WARNING, DANGER];
  return (
    <Card>
      <p className="mb-4 text-sm font-medium text-foreground">Status dos comprovantes</p>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={95} paddingAngle={3}>
            {data.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} stroke="none" />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs text-foreground-muted">
        {data.map((d, i) => (
          <span key={d.name} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: colors[i % colors.length] }} />
            {d.name} ({d.value})
          </span>
        ))}
      </div>
    </Card>
  );
}
