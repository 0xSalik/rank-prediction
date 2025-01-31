/* eslint-disable @typescript-eslint/no-explicit-any */
class PerformanceAnalyzer {
  private attempts: QuizAttempt[];
  private lastQuiz: Quiz | undefined;
  private lastQuizResponse: Quiz | null;
  constructor(
    attempts: QuizAttempt[],
    lastQuiz: Quiz | null,
    lastQuizResponse: Quiz | null
  ) {
    this.attempts = attempts;
    this.lastQuiz = lastQuiz?.quiz;
    this.lastQuizResponse = lastQuizResponse;
  }
  public getTopicAccuracy(): Record<string, number> {
    const topicAccuracy: Record<string, { correct: number; total: number }> =
      {};

    this.attempts.forEach((attempt) => {
      const topic = attempt.quiz.topic;
      const correct = attempt.correct_answers;
      const total = attempt.total_questions;

      if (!topicAccuracy[topic]) {
        topicAccuracy[topic] = { correct: 0, total: 0 };
      }

      topicAccuracy[topic].correct += correct;
      topicAccuracy[topic].total += total;
    });

    const result: Record<string, number> = {};
    for (const topic in topicAccuracy) {
      result[topic] =
        (topicAccuracy[topic].correct / topicAccuracy[topic].total) * 100;
    }

    return result;
  }

  public getWeakAreas(threshold: number = 60): string[] {
    const topicAccuracy = this.getTopicAccuracy();
    const weakAreas: string[] = [];

    for (const topic in topicAccuracy) {
      if (topicAccuracy[topic] < threshold) {
        weakAreas.push(topic);
      }
    }

    return weakAreas;
  }

  public getLastQuizAnalysis() {
    if (!this.lastQuiz) return null;
    const responseMap = this.lastQuizResponse?.response_map;

    const subtopicAccuracy = this.calculateSubtopicAccuracy(
      this.lastQuiz,
      responseMap
    );
    const weakSubtopic = Object.entries(subtopicAccuracy).reduce(
      (acc, [subtopic, accuracy]) =>
        accuracy < acc.accuracy ? { subtopic, accuracy } : acc,
      { subtopic: "", accuracy: 100 }
    );
    const hardestQuestion = this.lastQuiz.questions.reduce(
      (acc, question) =>
        question.difficulty_level === "Hard" ? question.description : acc,
      "No hard questions found"
    );

    return {
      topic: this.lastQuiz.topic,
      totalQuestions: this.lastQuiz.questions_count,
      accuracy: this.lastQuiz.accuracy
        ? parseFloat(this.lastQuiz.accuracy.replace("%", ""))
        : 0,
      weakSubtopic: weakSubtopic.subtopic,
      hardestQuestion,
    };
  }

  private calculateSubtopicAccuracy(
    fullQuizResponse: any,
    responseMap: any
  ): Record<string, number> {
    const subtopicAccuracy: Record<string, { correct: number; total: number }> =
      {};

    const quiz = fullQuizResponse;

    const questions = quiz?.questions?.flat() || [];

    if (questions.length === 0) {
      console.error("No questions found in the quiz");
      return {};
    }

    questions.forEach((question: any) => {
      const subtopic = question.topic;
      const isCorrect =
        responseMap[question.id.toString()] ===
        question.options.find((opt: any) => opt.is_correct)?.id;

      if (!subtopicAccuracy[subtopic]) {
        subtopicAccuracy[subtopic] = { correct: 0, total: 0 };
      }

      subtopicAccuracy[subtopic].total += 1;
      if (isCorrect) {
        subtopicAccuracy[subtopic].correct += 1;
      }
    });

    const result: Record<string, number> = {};
    for (const subtopic in subtopicAccuracy) {
      result[subtopic] =
        (subtopicAccuracy[subtopic].correct /
          subtopicAccuracy[subtopic].total) *
        100;
    }

    return result;
  }
  public getLastQuizIncorrectQuestions() {
    if (!this.lastQuiz?.questions) return [];

    const quiz = this.lastQuiz;

    return quiz.questions
      .flat()
      .filter((question: any) => {
        const correctId = question.options.find(
          (opt: any) => opt.is_correct
        )?.id;
        return (
          this.lastQuizResponse?.response_map[question.id.toString()] !==
          correctId
        );
      })
      .map((question: any) => ({
        question: question.description,
        difficulty: question.difficulty_level,
        subtopic: question.topic,
      }));
  }
  public getImprovementTrends(): Record<string, number[]> {
    const trends: Record<string, number[]> = {};

    this.attempts.forEach((attempt) => {
      const topic = attempt.quiz.topic;
      const accuracy =
        (attempt.correct_answers / attempt.total_questions) * 100;

      if (!trends[topic]) {
        trends[topic] = [];
      }

      trends[topic].push(accuracy);
    });

    return trends;
  }
  public getPerformanceGaps(
    cohortAverages: Record<string, number>
  ): Record<string, number> {
    const topicAccuracy = this.getTopicAccuracy();
    const gaps: Record<string, number> = {};

    for (const topic in topicAccuracy) {
      if (
        cohortAverages[topic] &&
        topicAccuracy[topic] < cohortAverages[topic]
      ) {
        gaps[topic] = cohortAverages[topic] - topicAccuracy[topic];
      }
    }

    return gaps;
  }
}

export default PerformanceAnalyzer;
