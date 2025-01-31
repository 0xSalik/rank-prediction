"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface SubtopicAccuracyChartProps {
  data: Array<{ subtopic: string; accuracy: number }>;
}

export function SubtopicAccuracyChart({ data }: SubtopicAccuracyChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="subtopic" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="accuracy" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
