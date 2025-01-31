import scoreRange from "./neetScores";
export class RankPredictor {
  private readonly NEET_MAX_SCORE = 720;
  private readonly TOTAL_CANDIDATES = 2500000;
  private weightage: Weightage = {
    historicalTests: 0.3,
    currentTest: 0.2,
    consistency: 0.2,
    absoluteScore: 0.15,
  };

  constructor(weightage: Weightage) {
    this.weightage = weightage;
    if (
      weightage.historicalTests +
        weightage.currentTest +
        weightage.consistency +
        weightage.absoluteScore !==
      1
    ) {
      throw new Error("Weightage must sum to 1");
    }
  }

  private historicalAttempts: QuizAttempt[] = [];
  private readonly SCORE_RANGES = scoreRange;

  public addHistoricalAttempt(attempt: QuizAttempt) {
    this.historicalAttempts.push(attempt);
  }

  private getScoreRange(percentile: number): ScoreRange | undefined {
    return this.SCORE_RANGES.find(
      (r) => percentile >= r.minPercentile && percentile <= r.maxPercentile
    );
  }
  /* Quadratic Weighting */
  private calculateWeightedAccuracy(): number {
    const totalWeight =
      (this.historicalAttempts.length * (this.historicalAttempts.length + 1)) /
      2;

    const weightedAccuracy = this.historicalAttempts.reduce(
      (acc, attempt, index) => {
        const weight = (index + 1) / totalWeight;
        const correctScore = attempt.correct_answers * 4;
        const incorrectScore = attempt.incorrect_answers * -1;
        const actualScore = correctScore + incorrectScore;
        const maxPossibleScore = attempt.quiz.questions_count * 4;
        const accuracy = Math.max(
          0,
          Math.min(1, actualScore / maxPossibleScore)
        );

        return acc + accuracy * weight;
      },
      0
    );
    return weightedAccuracy;
  }
  /* Bayesian Inference */
  private calculateConsistencyScore(): number {
    const scores = this.historicalAttempts.map((attempt) =>
      parseFloat(attempt.final_score)
    );

    const mean = scores.reduce((a, b) => a + b, 0) / scores.length;
    const variance =
      scores.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      scores.length;
    const relativeStdDev = Math.sqrt(variance) / mean;

    const scalingFactor = mean > 600 ? 0.5 : 1.0;
    return 1 / (1 + relativeStdDev * scalingFactor);
  }
  private calculateAbsoluteScoreMetric(attempt: QuizAttempt): number {
    const score = parseFloat(attempt.final_score);

    if (score >= 700) return 1.0;
    if (score >= 650) return 0.9 + ((score - 650) / 50) * 0.1;
    return score / this.NEET_MAX_SCORE;
  }

  private interpolateScore(percentile: number, range: ScoreRange): number {
    const percentilePosition =
      (percentile - range.minPercentile) /
      (range.maxPercentile - range.minPercentile);

    const score =
      range.minScore + percentilePosition * (range.maxScore - range.minScore);

    return Math.round(score);
  }
  /* Sigmoid Transformation	 */
  public predictRankPercentile(currentAttempt: QuizAttempt): number {
    if (this.historicalAttempts.length < 3) {
      throw new Error("Insufficient historical data for prediction.");
    }
    const weightedAccuracy = this.calculateWeightedAccuracy();
    const consistencyScore = this.calculateConsistencyScore();
    const currentAccuracy =
      currentAttempt.correct_answers / currentAttempt.total_questions || 0;

    let predictionScore =
      weightedAccuracy * this.weightage.historicalTests +
      consistencyScore * this.weightage.consistency +
      currentAccuracy * this.weightage.currentTest +
      this.calculateAbsoluteScoreMetric(currentAttempt) *
        this.weightage.absoluteScore;

    if (consistencyScore > 0.7) predictionScore *= 1.1;
    if (consistencyScore > 0.8) predictionScore *= 1.15;

    if (predictionScore >= 0.85) {
      return 99 + ((predictionScore - 0.85) / 0.15) * 0.99;
    }

    return Math.min(99.99, predictionScore * 100);
  }

  public estimateNEETScore(percentile: number): number {
    if (percentile == null || percentile == undefined) return 0;
    const range = this.getScoreRange(percentile);
    if (!range) {
      if (percentile > 99.9997) return this.NEET_MAX_SCORE;
      if (percentile < 0.4763) return 0;
      return 0;
    }

    return this.interpolateScore(percentile, range);
  }
  public estimateRank(score: number): number {
    const range = this.SCORE_RANGES.find(
      (r) => score >= r.minScore && score <= r.maxScore
    );
    if (!range) {
      if (score >= this.NEET_MAX_SCORE) return 1;
      if (score <= 0) return this.TOTAL_CANDIDATES;
      return this.TOTAL_CANDIDATES;
    }
    const scorePosition =
      (score - range.minScore) / (range.maxScore - range.minScore);
    const rank =
      range.minRank + scorePosition * (range.maxRank - range.minRank);
    return Math.round(rank);
  }
  public getPredictionConfidence(predictedScore: number): {
    lower: number;
    upper: number;
  } {
    const range = this.SCORE_RANGES.find(
      (r) => predictedScore >= r.minScore && predictedScore <= r.maxScore
    );
    if (!range) return { lower: predictedScore, upper: predictedScore };

    const variance =
      predictedScore >= 650 ? 5 : predictedScore >= 500 ? 10 : 15;
    return {
      lower: Math.max(range.minScore, predictedScore - variance),
      upper: Math.min(range.maxScore, predictedScore + variance),
    };
  }

  public getPredictionDetails(currentAttempt: QuizAttempt) {
    const percentile = this.predictRankPercentile(currentAttempt);
    const predictedScore = this.estimateNEETScore(percentile);
    const predictedRank = this.estimateRank(predictedScore);
    const confidence = this.getPredictionConfidence(predictedScore);
    return {
      percentile,
      predictedScore,
      predictedRank,
      confidenceInterval: confidence,
      accuracy: parseFloat(currentAttempt.accuracy.replace("%", "")),
      consistencyScore: this.calculateConsistencyScore(),
      historicalAttempts: this.historicalAttempts.length,
    };
  }
}
