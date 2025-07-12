
import React from 'react';
import { Card } from '@/components/ui/card';
import Field from './Field';
import { MathProblem, FieldKey } from '../types/mathProblem';

interface ProblemDetailsProps {
  currentProblem: MathProblem;
  onFieldClick: (field: FieldKey, value: string) => void;
}

const ProblemDetails: React.FC<ProblemDetailsProps> = ({ currentProblem, onFieldClick }) => {
  // Define field order based on table type
  const getFieldsToDisplay = () => {
    const baseFields = ['question_id', 'problem_image', 'problem_text', 'answer', 'solution_text', 'solutiontextexpanded'];
    
    // Add additional fields for ogemath_fipi_bank table with problem_link right after question_id and comments after problem_link
    if (currentProblem.problem_link || currentProblem.problem_number_type || currentProblem.comments) {
      return ['question_id', 'problem_link', 'comments', 'problem_image', 'problem_text', 'answer', 'solution_text', 'solutiontextexpanded', 'problem_number_type', 'code', 'difficulty'];
    }
    
    // Standard fields for other tables
    return [...baseFields, 'code', 'difficulty', 'skills'];
  };

  const fieldsToDisplay = getFieldsToDisplay();

  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Problem Details</h2>
      {fieldsToDisplay.map((field) => {
        if (field === 'problem_image' && currentProblem.problem_image) {
          return (
            <div key={field} className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-1">problem_image</h3>
              <div 
                className="p-3 rounded-md bg-gray-100 hover:bg-orange-100 hover:bg-opacity-10 transition-colors cursor-pointer"
                onClick={() => onFieldClick('problem_image', currentProblem.problem_image || '')}
              >
                {currentProblem.problem_image.split(',').map((image, index) => (
                  <img 
                    key={index} 
                    src={image.trim()} 
                    alt={`Problem ${index + 1}`} 
                    className="max-w-full h-auto mb-2" 
                  />
                ))}
              </div>
            </div>
          );
        }
        
        const fieldValue = currentProblem[field as FieldKey];
        
        // Skip empty fields for cleaner display
        if (!fieldValue && fieldValue !== 0 && fieldValue !== false) {
          return null;
        }
        
        return (
          <Field
            key={field}
            label={field as FieldKey}
            value={String(fieldValue) || ""}
            onFieldClick={(value) => onFieldClick(field as FieldKey, value)}
          />
        );
      })}
    </Card>
  );
};

export default ProblemDetails;
