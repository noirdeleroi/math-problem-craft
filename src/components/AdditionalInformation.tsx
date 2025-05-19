
import React from 'react';
import { Card } from '@/components/ui/card';
import Field from './Field';
import { MathProblem, FieldKey } from '../types/mathProblem';

interface AdditionalInformationProps {
  currentProblem: MathProblem;
  onFieldClick: (field: FieldKey, value: string) => void;
}

const AdditionalInformation: React.FC<AdditionalInformationProps> = ({ currentProblem, onFieldClick }) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Additional Information</h2>
      {['code', 'difficulty', 'skills', 'solutiontextexpanded'].map((field) => (
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

export default AdditionalInformation;
