"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

interface AccuracyTrendsChartProps {
  data: Array<{
    topic: string;
    data: Array<{ date: string; accuracy: number }>;
  }>;
}

export function AccuracyTrendsChart({ data }: AccuracyTrendsChartProps) {
  const allDates = new Set<string>();
  const formattedData: Record<
    string,
    { date: string } & Record<string, number>
  > = {};

  data.forEach((topicData) => {
    topicData.data.forEach((point) => {
      allDates.add(point.date);
      if (!formattedData[point.date]) {
        formattedData[point.date] = {
          date: point.date,
          [topicData.topic]: point.accuracy,
        } as { date: string } & Record<string, number>;
      } else {
        formattedData[point.date][topicData.topic] = point.accuracy;
      }
    });
  });

  const chartData = Object.values(formattedData).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.map((topicData, index) => (
          <Line
            key={topicData.topic}
            type="monotone"
            dataKey={topicData.topic}
            stroke={`hsl(${index * 30}, 70%, 50%)`}
            strokeWidth={2}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
