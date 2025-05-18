
import React from 'react';
import { Card } from '@/components/ui/card';
import Field from './Field';
import { MathProblem, FieldKey } from '../types/mathProblem';

interface ProblemDetailsProps {
  currentProblem: MathProblem;
  onFieldClick: (field: FieldKey, value: string) => void;
}

const ProblemDetails: React.FC<ProblemDetailsProps> = ({ currentProblem, onFieldClick }) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Problem Details</h2>
      {['question_id', 'problem_image', 'problem_text', 'answer', 'solution_text'].map((field) => (
        <Field
          key={field}
          label={field as FieldKey}
          value={currentProblem[field as FieldKey] as string || ""}
          onFieldClick={(value) => onFieldClick(field as FieldKey, value)}
        />
      ))}
    </Card>
  );
};

export default ProblemDetails;
