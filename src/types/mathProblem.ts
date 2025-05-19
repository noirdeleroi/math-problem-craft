
export interface MathProblem {
  question_id: string;
  problem_image?: string;
  problem_text: string;
  answer: string;
  solution_text: string;
  code?: string;
  difficulty?: string;
  solutiontextexpanded?: string;
  skills?: string;
  checked?: boolean;
  corrected?: boolean;
}

export type FieldKey = keyof MathProblem;
