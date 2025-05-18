
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FieldKey } from '../types/mathProblem';

interface ProblemEditorProps {
  selectedField: FieldKey | null;
  editValue: string;
  setEditValue: (value: string) => void;
  handleSaveChanges: () => void;
}

const ProblemEditor: React.FC<ProblemEditorProps> = ({
  selectedField,
  editValue,
  setEditValue,
  handleSaveChanges
}) => {
  return (
    <Card className="p-4">
      <h2 className="text-xl font-bold mb-4">Edit Problem Text</h2>
      {selectedField ? (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Editing: {selectedField}
          </h3>
          <Textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="min-h-[300px] font-mono"
          />
          <div className="mt-4">
            <Button onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">
          Click on any field from the left or middle panel to edit its content.
        </p>
      )}
    </Card>
  );
};

export default ProblemEditor;
