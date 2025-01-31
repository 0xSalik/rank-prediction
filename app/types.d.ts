interface Weightage {
  historicalTests: number;
  currentTest: number;
  consistency: number;
  absoluteScore: number;
}

interface QuizAttempt {
  id: number;
  quiz_id: number;
  user_id: string;
  submitted_at: string;
  created_at: string;
  updated_at: string;
  score: number;
  trophy_level: number;
  accuracy: string;
  speed: string;
  final_score: string;
  negative_score: string;
  correct_answers: number;
  incorrect_answers: number;
  source: string;
  type: string;
  started_at: string;
  ended_at: string;
  duration: string;
  better_than: number;
  total_questions: number;
  rank_text: string;
  mistakes_corrected: number;
  initial_mistake_count: number;
  response_map: Record<string, number>;
  quiz: Quiz;
}

interface Quiz {
  quiz: Quiz;
  id: number;
  name: string | null;
  title: string;
  description: string;
  difficulty_level: string | null;
  topic: string;
  time: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  duration: number;
  end_time: string;
  negative_marks: string;
  correct_answer_marks: string;
  shuffle: boolean;
  response_map: { [key: string]: number };
  show_answers: boolean;
  lock_solutions: boolean;
  is_form: boolean;
  show_mastery_option: boolean;
  quiz_type: string | null;
  is_custom: boolean;
  banner_id: number | null;
  exam_id: number | null;
  show_unanswered: boolean;
  ends_at: string;
  accuracy: string;
  lives: string | null;
  live_count: string;
  coin_count: number;
  questions_count: number;
  daily_date: string;
  max_mistake_count: number;
  questions: Array<{
    id: number;
    description: string;
    difficulty_level: string | null;
    topic: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    detailed_solution: string;
    type: string;
    is_mandatory: boolean;
    show_in_feed: boolean;
    pyq_label: string | null;
    topic_id: number;
    reading_material_id: number;
    fixed_at: string | null;
    fix_summary: string | null;
    created_by: string | null;
    updated_by: string | null;
    quiz_level: string | null;
    question_from: string;
    language: string | null;
    photo_url: string | null;
    photo_solution_url: string | null;
    is_saved: boolean;
    tag: string;
    options: Array<{
      id: number;
      description: string;
      question_id: number;
      is_correct: boolean;
      created_at: string;
      updated_at: string;
      unanswered: boolean;
      photo_url: string | null;
    }>;
  }>;
}

interface ScoreRange {
  minScore: number;
  maxScore: number;
  minRank: number;
  maxRank: number;
  minPercentile: number;
  maxPercentile: number;
}

type CutoffCategory =
  | "general"
  | "obc"
  | "sc"
  | "st"
  | "ews"
  | "general pwd"
  | "obc pwd"
  | "sc pwd"
  | "st pwd"
  | "ews pwd"
  | "all";

interface CollegeCutoff {
  name: string;
  cutoffs: {
    general?: string;
    obc?: string;
    sc?: string;
    ews?: string;
    st?: string;
    "general pwd"?: string;
    "obc pwd"?: string;
    "ews pwd"?: string;
    "st pwd"?: string;
    "sc pwd"?: string;
  };
}
