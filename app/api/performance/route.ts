import { NextResponse } from "next/server";
import PerformanceAnalysis from "../../../lib/performanceAnalysis";

export async function GET() {
  const resp = await fetch(
    process.env.NEXT_PUBLIC_PREVIOUS_QUIZ_ATTEMPTS || ""
  );
  const attempts = await resp.json();
  const res2 = await fetch(process.env.NEXT_PUBLIC_LAST_QUIZ_DATA || "");
  const lastquiz = await res2.json();
  const res3 = await fetch(process.env.NEXT_PUBLIC_LAST_QUIZ_OVERVIEW || "");
  const lastquizresponse = await res3.json();
  const performanceAnalysis = new PerformanceAnalysis(
    attempts,
    lastquiz,
    lastquizresponse
  );
  const cohortAverages = {
    "Body Fluids and Circulation": 75,
    "Human Physiology": 80,
  };

  return NextResponse.json({
    topicAccuracy: performanceAnalysis.getTopicAccuracy(),
    weakAreas: performanceAnalysis.getWeakAreas(),
    lastQuizAnalysis: performanceAnalysis.getLastQuizAnalysis(),
    weaknesses: performanceAnalysis.getLastQuizIncorrectQuestions(),
    improvementTrends: performanceAnalysis.getImprovementTrends(),
    performanceGaps: performanceAnalysis.getPerformanceGaps(cohortAverages),
  });
}
