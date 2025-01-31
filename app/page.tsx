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
import { ArrowRight, School, Trophy, Users } from "lucide-react";
import { getPredictionData } from "@/lib/api";

export default function Home() {
  const [predictionData, setPredictionData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPredictionData();
        setPredictionData(data);
        setIsLoading(false);
      } catch {
        setError("Failed to load prediction data");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!predictionData) return <div>No data available</div>;

  return (
    <div className="space-y-8 p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Score
            </CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {predictionData.rankPrediction.predictedScore}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Rank
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {predictionData.rankPrediction.predictedRank}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Predicted Percentile
            </CardTitle>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {predictionData.rankPrediction.percentile}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Predicted Colleges</CardTitle>
          <CardDescription>Based on your current performance</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            {predictionData.collegePrediction
              .slice(0, 5)
              .map((college: any, index: number) => (
                <li key={index}>{college.name}</li>
              ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold text-gray-900">
            How the Algorithm Works
          </h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 text-gray-700">
            <p className="text-lg">
              The NEET Rank Predictor is powered by a{" "}
              <span className="font-semibold">
                probabilistic prediction model
              </span>{" "}
              that combines historical test data, consistency metrics, and
              real-time assessment results to predict rank percentiles with high
              precision.
            </p>

            <h3 className="text-xl font-semibold">
              Dynamic Weighted Accuracy Model
            </h3>
            <p>
              A dynamically weighted scoring mechanism assigns{" "}
              <span className="font-semibold">
                exponentially decaying weights
              </span>{" "}
              to past test attempts, ensuring that recent performance has a
              stronger impact while still leveraging historical trends. This
              model uses:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <span className="font-medium">
                  Quadratic Weighting Functions
                </span>{" "}
                for balancing past performances.
              </li>
              <li>
                <span className="font-medium">Bayesian Inference</span> for
                adjusting accuracy fluctuations.
              </li>
              <li>
                <span className="font-medium">
                  Real-time Error Minimization
                </span>{" "}
                using standard deviation-based consistency scoring.
              </li>
            </ul>

            <h3 className="text-xl font-semibold">
              Consistency Calibration with Statistical Variance
            </h3>
            <p>A variance-based consistency model calculates:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <span className="font-medium">Mean and Standard Deviation</span>{" "}
                of historical scores.
              </li>
              <li>
                A dynamic <span className="font-medium">scaling factor</span>{" "}
                that adapts to different performance tiers.
              </li>
              <li>
                A{" "}
                <span className="font-medium">
                  sigmoid function transformation
                </span>{" "}
                to normalize score fluctuations.
              </li>
            </ul>

            <h3 className="text-xl font-semibold">
              Multi-Factor Rank Estimation
            </h3>
            <p>
              The final prediction score is derived from a{" "}
              <span className="font-semibold">
                multi-dimensional weighted sum
              </span>
              , incorporating:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <span className="font-medium">Absolute Score Metrics</span>
                —normalized values with a high-resolution mapping function.
              </li>
              <li>
                <span className="font-medium">Test Difficulty Adjustment</span>
                —weighted parameters ensuring fairness.
              </li>
              <li>
                <span className="font-medium">
                  Performance Gradient Analysis
                </span>
                —tracking improvement trends over time.
              </li>
            </ul>

            <h3 className="text-xl font-semibold">
              College Admission Prediction
            </h3>
            <p>
              Once the rank percentile is determined, the College Predictor
              matches the student with the most suitable medical colleges by
              analyzing:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <span className="font-medium">
                  Hierarchical Sorting Algorithms
                </span>{" "}
                that prioritize the best-fit institutions.
              </li>
              <li>
                <span className="font-medium">Multivariate Rank Analysis</span>{" "}
                to compare eligibility across categories.
              </li>
              <li>
                <span className="font-medium">
                  Optimized Selection Heuristics
                </span>{" "}
                to maximize admission probabilities.
              </li>
            </ul>

            <p className="text-lg font-semibold text-gray-900">
              A cutting-edge approach that transforms rank prediction into a
              science.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button asChild>
          <Link href="/performance">
            View Detailed Performance <School className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
