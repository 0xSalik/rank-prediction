"use client";

import {
  Scatter,
  ScatterChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface DifficultyAccuracyChartProps {
  data: Array<{ difficulty: number; accuracy: number }>;
}

export function DifficultyAccuracyChart({
  data,
}: DifficultyAccuracyChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ScatterChart>
        <XAxis type="number" dataKey="difficulty" name="Difficulty" />
        <YAxis type="number" dataKey="accuracy" name="Accuracy" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Difficulty vs Accuracy" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
}
