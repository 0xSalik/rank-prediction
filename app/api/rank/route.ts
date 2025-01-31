import { NextResponse } from "next/server";

import { RankPredictor } from "../../../lib/predictionModel";
import CollegePredictor from "../../../lib/collegePredictor";
export async function GET() {
  try {
    const res1 = await fetch(
      process.env.NEXT_PUBLIC_PREVIOUS_QUIZ_ATTEMPTS || ""
    );
    const historicalTests = await res1.json();
    const res2 = await fetch(process.env.NEXT_PUBLIC_LAST_QUIZ_OVERVIEW || "");
    const currentTest = await res2.json();

    const rankPrediction = new RankPredictor({
      historicalTests: 0.4,
      currentTest: 0.25,
      consistency: 0.2,
      absoluteScore: 0.15,
    });
    historicalTests.forEach((attempt: QuizAttempt) => {
      rankPrediction.addHistoricalAttempt(attempt);
    });
    const data = rankPrediction.getPredictionDetails(currentTest);
    const collegePredictor = new CollegePredictor();
    const collegePrediction = collegePredictor.getColleges(
      data.predictedRank,
      "general"
    );
    return NextResponse.json({
      rankPrediction: data,
      collegePrediction: collegePrediction,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      error: err,
    });
  }
}
