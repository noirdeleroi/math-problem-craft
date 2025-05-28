
import React from 'react';
import { MathProblem, FieldKey } from '../types/mathProblem';
import ProblemDetails from './ProblemDetails';
import ProblemEditor from './ProblemEditor';

interface ProblemViewerProps {
  currentProblem: MathProblem | null;
  selectedField: FieldKey | null;
  editValue: string;
  setEditValue: (value: string) => void;
  handleFieldClick: (field: FieldKey, value: string) => void;
  handleSaveChanges: () => void;
  problems: MathProblem[];
}

const ProblemViewer: React.FC<ProblemViewerProps> = ({
  currentProblem,
  selectedField,
  editValue,
  setEditValue,
  handleFieldClick,
  handleSaveChanges,
  problems
}) => {
  if (!currentProblem) {
    return problems.length > 0 ? (
      <div className="text-center py-10">
        <p>Please select a problem to review</p>
      </div>
    ) : null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - 2/3 width */}
      <div className="lg:col-span-2">
        <ProblemDetails 
          currentProblem={currentProblem} 
          onFieldClick={handleFieldClick} 
        />
      </div>
      
      {/* Right Column - Editor */}
      <ProblemEditor
        selectedField={selectedField}
        editValue={editValue}
        setEditValue={setEditValue}
        handleSaveChanges={handleSaveChanges}
      />
    </div>
  );
};

export default ProblemViewer;
