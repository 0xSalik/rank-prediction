import { NextResponse } from "next/server";
import TrendAnalysis from "../../../lib/performanceTrends";
export async function GET() {
  const resp = await fetch(
    process.env.NEXT_PUBLIC_PREVIOUS_QUIZ_ATTEMPTS || ""
  );
  const attempts = await resp.json();
  const res2 = await fetch(process.env.NEXT_PUBLIC_LAST_QUIZ_OVERVIEW || "");
  const lastquiz = await res2.json();
  const trendAnalysis = new TrendAnalysis(attempts, lastquiz);
  const cohortAverages = {
    "Body Fluids and Circulation": 75,
    "Human Physiology": 80,
  };

  return NextResponse.json({
    accuracyTrends: trendAnalysis.getAccuracyTrends(),
    difficultyAccuracyDistribution:
      trendAnalysis.getDifficultyAccuracyDistribution(),
    subtopicAccuracy: trendAnalysis.getSubtopicAccuracyDistribution(),
    questionTypeDistribution: trendAnalysis.getQuestionTypeDistribution(),
    cohortComparison: trendAnalysis.getCohortComparison(cohortAverages),
  });
}
