
export interface MathProblem {
  question_id: string;
  problem_image?: string;
  problem_text: string;
  answer: string;
  solution_text: string;
  code?: string;
  difficulty?: string;
  solutiontextexpanded?: string;
  skills_for_steps?: string;
}

export type FieldKey = keyof MathProblem;
