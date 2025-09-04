
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { MathProblem } from '../types/mathProblem';

interface ProblemNavigationProps {
  problems: MathProblem[];
  selectedProblemId: string;
  setSelectedProblemId: (id: string) => void;
  handleExport: () => void;
  currentProblem: MathProblem | null;
  handleToggleChecked: () => void;
  selectedTable: string;
}

const ProblemNavigation: React.FC<ProblemNavigationProps> = ({
  problems,
  selectedProblemId,
  setSelectedProblemId,
  handleExport,
  currentProblem,
  handleToggleChecked,
  selectedTable
}) => {
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  const handlePasswordSubmit = () => {
    if (password === 'sky1789') {
      setIsPasswordDialogOpen(false);
      setPassword('');
      setPasswordError('');
      handleExport();
    } else {
      setPasswordError('Incorrect password');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  const openPasswordDialog = () => {
    setIsPasswordDialogOpen(true);
    setPassword('');
    setPasswordError('');
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
                  {problems.map((problem) => {
                    // For math_skills_questions table, show number_id instead of question_id
                    const displayValue = selectedTable === 'math_skills_questions' ? problem.number_id : problem.question_id;
                    const keyValue = problem.question_id; // Always use question_id as the key for consistency
                    
                    return displayValue && displayValue.trim() !== "" ? (
                      <SelectItem 
                        key={keyValue} 
                        value={keyValue}
                      >
                        {displayValue}
                      </SelectItem>
                    ) : null;
                  })}
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
          
          <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openPasswordDialog}>
                Download CSV
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Enter Password</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="password" className="text-right">
                    Password:
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                    className="col-span-3"
                    placeholder="Enter password"
                  />
                </div>
                {passwordError && (
                  <div className="text-red-500 text-sm text-center">
                    {passwordError}
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handlePasswordSubmit}>
                  Download
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ProblemNavigation;
