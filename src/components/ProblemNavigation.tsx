
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { MathProblem } from '../types/mathProblem';

interface ProblemNavigationProps {
  problems: MathProblem[];
  selectedProblemId: string;
  setSelectedProblemId: (id: string) => void;
  handleExport: () => void;
  currentProblem: MathProblem | null;
  handleToggleChecked: () => void;
}

const ProblemNavigation: React.FC<ProblemNavigationProps> = ({
  problems,
  selectedProblemId,
  setSelectedProblemId,
  handleExport,
  currentProblem,
  handleToggleChecked
}) => {
  const navigateToNextProblem = () => {
    if (!problems.length) return;
    
    const currentIndex = problems.findIndex(p => p.question_id === selectedProblemId);
    if (currentIndex < problems.length - 1) {
      setSelectedProblemId(problems[currentIndex + 1].question_id);
    }
  };

  const navigateToPreviousProblem = () => {
    if (!problems.length) return;
    
    const currentIndex = problems.findIndex(p => p.question_id === selectedProblemId);
    if (currentIndex > 0) {
      setSelectedProblemId(problems[currentIndex - 1].question_id);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div className="flex items-center space-x-2 mb-4 sm:mb-0">
          <Button 
            onClick={navigateToPreviousProblem}
            variant="outline"
            disabled={problems.findIndex(p => p.question_id === selectedProblemId) === 0}
            size="sm"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          
          <div className="w-48 sm:w-64">
            <Select
              value={selectedProblemId}
              onValueChange={setSelectedProblemId}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a problem" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                <ScrollArea className="h-[400px] [&>div>div[style]]:!bg-black">
                  {problems.map((problem) => (
                    problem.question_id && problem.question_id.trim() !== "" ? (
                      <SelectItem 
                        key={problem.question_id} 
                        value={problem.question_id}
                      >
                        {problem.question_id}
                      </SelectItem>
                    ) : null
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            onClick={navigateToNextProblem}
            variant="outline"
            disabled={problems.findIndex(p => p.question_id === selectedProblemId) === problems.length - 1}
            size="sm"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={handleToggleChecked}
            variant={currentProblem?.checked ? "default" : "outline"}
            className={currentProblem?.checked ? "bg-green-500 hover:bg-green-600" : ""}
          >
            <Check className="h-4 w-4 mr-1" /> {currentProblem?.checked ? "Checked" : "Mark as Checked"}
          </Button>
          
          <Button onClick={handleExport}>
            Download CSV
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProblemNavigation;
