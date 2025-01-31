"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface CohortComparisonChartProps {
  data: Array<{
    topic: string;
    studentAccuracy: number;
    cohortAccuracy: number;
  }>;
}

export function CohortComparisonChart({ data }: CohortComparisonChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis dataKey="topic" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="studentAccuracy" fill="#8884d8" name="Your Accuracy" />
        <Bar dataKey="cohortAccuracy" fill="#82ca9d" name="Cohort Accuracy" />
      </BarChart>
    </ResponsiveContainer>
  );
}
