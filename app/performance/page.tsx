/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { AccuracyTrendsChart } from "@/components/AccuracyTrendsChart";
import { CohortComparisonChart } from "@/components/CohortComparisonChart";
import { getPerformanceData, getTrendsData } from "@/lib/api";

export default function PerformancePage() {
  const [performanceData, setPerformanceData] = useState<any>(null);
  const [trendsData, setTrendsData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [performance, trends] = await Promise.all([
          getPerformanceData(),
          getTrendsData(),
        ]);
        setPerformanceData(performance);
        setTrendsData(trends);
        setIsLoading(false);
      } catch {
        setError("Failed to load data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!performanceData || !trendsData) return <div>No data available</div>;

  return (
    <div className="space-y-8 p-5">
      <Card>
        <CardHeader>
          <CardTitle>Latest Test Performance</CardTitle>
          <CardDescription>
            Test Date: {performanceData.lastQuizAnalysis.date || "N/A"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm font-medium">Topic</p>
              <p className="text-2xl font-bold">
                {performanceData.lastQuizAnalysis.topic}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Total Questions</p>
              <p className="text-2xl font-bold">
                {performanceData.lastQuizAnalysis.totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Accuracy</p>
              <p className="text-2xl font-bold">
                {performanceData.lastQuizAnalysis.accuracy}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Accuracy Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <AccuracyTrendsChart data={trendsData.accuracyTrends} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Cohort Comparison</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <CohortComparisonChart data={trendsData.cohortComparison} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weak Areas</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {performanceData.weakAreas.map((area: string, index: number) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Weaknesses</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {performanceData.weaknesses
              .slice(0, 5)
              .map((weakness: any, index: number) => (
                <li key={index}>
                  <p>
                    <strong>Question:</strong> {weakness.question}
                  </p>
                  <p>
                    <strong>Subtopic:</strong> {weakness.subtopic}
                  </p>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Gaps</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {Object.entries(performanceData.performanceGaps).map(
              ([topic, gap]: [string, any], index: number) => (
                <li key={index}>
                  <strong>{topic}:</strong> {gap.toFixed(2)}% below cohort
                  average
                </li>
              )
            )}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <div className="p-6 border rounded-2xl shadow-sm bg-white">
          <h2 className="text-xl font-semibold text-gray-900">
            Performance Analytics & Insights
          </h2>
          <p className="mt-2 text-gray-700 text-sm">
            This module employs advanced computational models to quantify
            learning efficacy, identify performance bottlenecks, and derive
            actionable intelligence from assessment data.
          </p>

          <div className="mt-4 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-800">
                Topic-Wise Accuracy Mapping
              </h3>
              <p className="text-xs text-gray-600">
                Utilizes historical assessment data to compute topic-wise
                accuracy, enabling precise identification of proficiency gaps.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-800">
                Weakness Identification & Remediation
              </h3>
              <p className="text-xs text-gray-600">
                Deploys threshold-based analytics to flag underperforming areas,
                supporting targeted intervention strategies.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-800">
                Cohort Benchmarking & Comparative Metrics
              </h3>
              <p className="text-xs text-gray-600">
                Aligns individual performance trends with cohort-wide benchmarks
                to provide a contextualized performance outlook.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-800">
                Granular Response Pattern Analysis
              </h3>
              <p className="text-xs text-gray-600">
                Extracts insights from past assessments, evaluating response
                patterns to isolate frequently misjudged concepts.
              </p>
            </div>
          </div>
        </div>
      </Card>
      <div className="flex justify-center">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Prediction
          </Link>
        </Button>
      </div>
    </div>
  );
}
