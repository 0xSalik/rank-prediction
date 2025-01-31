/* eslint-disable @typescript-eslint/no-explicit-any */
class VisualizationData {
  private attempts: QuizAttempt[];
  private lastQuiz: Quiz | null;

  constructor(attempts: QuizAttempt[], lastQuiz: Quiz | null) {
    this.attempts = attempts;
    this.lastQuiz = lastQuiz;
  }
  public getAccuracyTrends(): Array<{
    topic: string;
    data: Array<{ date: string; accuracy: number }>;
  }> {
    const trends: Record<
      string,
      Array<{ date: string; accuracy: number }>
    > = {};

    this.attempts.forEach((attempt) => {
      const topic = attempt.quiz.topic;
      const date = new Date(attempt.submitted_at).toLocaleDateString();
      const accuracy =
        (attempt.correct_answers / attempt.total_questions) * 100;

      if (!trends[topic]) {
        trends[topic] = [];
      }

      trends[topic].push({ date, accuracy });
    });

    return Object.entries(trends).map(([topic, data]) => ({ topic, data }));
  }
  public getDifficultyAccuracyDistribution(): Array<{
    difficulty: string;
    accuracy: number;
  }> {
    if (!this.lastQuiz?.quiz?.questions) return [];

    const difficultyAccuracy: Record<
      string,
      { correct: number; total: number }
    > = {};

    this.lastQuiz.quiz.questions.flat().forEach((question: any) => {
      const difficulty = question.difficulty_level || "Unknown";
      const isCorrect =
        this.lastQuiz?.quiz?.response_map[question.id.toString()] ===
        question.options.find((opt: any) => opt.is_correct)?.id;

      if (!difficultyAccuracy[difficulty]) {
        difficultyAccuracy[difficulty] = { correct: 0, total: 0 };
      }

      difficultyAccuracy[difficulty].total += 1;
      if (isCorrect) {
        difficultyAccuracy[difficulty].correct += 1;
      }
    });

    return Object.entries(difficultyAccuracy).map(
      ([difficulty, { correct, total }]) => ({
        difficulty,
        accuracy: (correct / total) * 100,
      })
    );
  }

  public getSubtopicAccuracyDistribution(): Array<{
    subtopic: string;
    accuracy: number;
  }> {
    if (!this.lastQuiz?.quiz?.questions) return [];

    const subtopicAccuracy: Record<string, { correct: number; total: number }> =
      {};

    this.lastQuiz.quiz.questions.flat().forEach((question: any) => {
      const subtopic = question.topic;
      const isCorrect =
        this.lastQuiz?.quiz?.response_map[question.id.toString()] ===
        question.options.find((opt: any) => opt.is_correct)?.id;

      if (!subtopicAccuracy[subtopic]) {
        subtopicAccuracy[subtopic] = { correct: 0, total: 0 };
      }

      subtopicAccuracy[subtopic].total += 1;
      if (isCorrect) {
        subtopicAccuracy[subtopic].correct += 1;
      }
    });

    return Object.entries(subtopicAccuracy).map(
      ([subtopic, { correct, total }]) => ({
        subtopic,
        accuracy: (correct / total) * 100,
      })
    );
  }

  public getCohortComparison(
    cohortAverages: Record<string, number>
  ): Array<{ topic: string; studentAccuracy: number; cohortAccuracy: number }> {
    const topicAccuracy = this.getTopicAccuracy();
    return Object.entries(topicAccuracy).map(([topic, accuracy]) => ({
      topic,
      studentAccuracy: accuracy,
      cohortAccuracy: cohortAverages[topic] || 0,
    }));
  }

  public getQuestionTypeDistribution(): Array<{ type: string; count: number }> {
    if (!this.lastQuiz?.quiz?.questions) return [];

    const questionTypes: Record<string, number> = {};

    this.lastQuiz.quiz.questions.flat().forEach((question: any) => {
      const type = question.type || "Unknown";
      questionTypes[type] = (questionTypes[type] || 0) + 1;
    });

    return Object.entries(questionTypes).map(([type, count]) => ({
      type,
      count,
    }));
  }

  private getTopicAccuracy(): Record<string, number> {
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
}

export default VisualizationData;
