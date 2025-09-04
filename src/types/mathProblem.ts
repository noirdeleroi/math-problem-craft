
export interface MathProblem {
  question_id: string;
  number_id?: string;
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
  problem_number_type?: string;
  problem_link?: string;
  comments?: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
}

export type FieldKey = keyof MathProblem;
