
import { useState, useEffect } from 'react';
import { MathProblem, FieldKey } from '../types/mathProblem';
import FileUploader from '../components/FileUploader';
import Field from '../components/Field';
import { exportCSV } from '../utils/csvUtils';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Add MathJax type definition
declare global {
  interface Window {
    MathJax: any;
  }
}

const Index = () => {
  const { toast } = useToast();
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [selectedProblemId, setSelectedProblemId] = useState<string>("");
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [selectedField, setSelectedField] = useState<FieldKey | null>(null);
  const [editValue, setEditValue] = useState<string>("");
  const [imageMap, setImageMap] = useState<Record<string, string>>({});
  const [dataSource, setDataSource] = useState<'csv' | 'database' | null>(null);

  useEffect(() => {
    // Remove any existing MathJax script to avoid duplicates
    const existingScript = document.getElementById('MathJax-script');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    // Add MathJax script with enhanced configuration
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    script.id = 'MathJax-script';
    
    // Enhanced configuration for better LaTeX support including environments
    script.setAttribute('config', `
      MathJax = {
        tex: {
          inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
          displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
          processEscapes: true,
          packages: ['base', 'ams', 'require'],
          tags: 'ams'
        },
        options: {
          enableEnvironments: true
        },
        loader: {
          load: ['[tex]/ams']
        },
        svg: {
          fontCache: 'global'
        }
      };
    `);
    document.head.appendChild(script);

    return () => {
      // Remove the script when component unmounts
      const mathJaxScript = document.getElementById('MathJax-script');
      if (mathJaxScript) {
        document.head.removeChild(mathJaxScript);
      }
    };
  }, []);

  useEffect(() => {
    if (selectedProblemId) {
      const problem = problems.find(p => p.question_id === selectedProblemId);
      if (problem) {
        // If there's a problem_image, check if it exists in our imageMap
        if (problem.problem_image && imageMap[problem.problem_image]) {
          setCurrentProblem({
            ...problem,
            problem_image: imageMap[problem.problem_image]
          });
        } else {
          setCurrentProblem(problem);
        }
        setSelectedField(null);
        setEditValue("");
      }
    }
  }, [selectedProblemId, problems, imageMap]);

  const handleFieldClick = (field: FieldKey, value: string) => {
    setSelectedField(field);
    setEditValue(value || "");
  };

  const handleSaveChanges = () => {
    if (!currentProblem || !selectedField) return;

    const updatedProblem = {
      ...currentProblem,
      [selectedField]: editValue
    };

    const updatedProblems = problems.map(p => 
      p.question_id === currentProblem.question_id ? updatedProblem : p
    );

    setProblems(updatedProblems);
    setCurrentProblem(updatedProblem);
    
    toast({
      title: "Changes Saved",
      description: `Updated ${selectedField} for problem ${currentProblem.question_id}`
    });
  };

  const handleExport = () => {
    exportCSV(problems);
    toast({
      title: "Export Successful",
      description: "CSV file has been downloaded"
    });
  };

  const handleCSVUpload = (data: MathProblem[]) => {
    // Filter out any problems with empty question_ids to prevent Select.Item errors
    const validProblems = data.filter(problem => problem.question_id && problem.question_id.trim() !== "");
    
    setProblems(validProblems);
    if (validProblems.length > 0) {
      setSelectedProblemId(validProblems[0].question_id);
    }
    setDataSource('csv');
  };

  const handleImageUpload = (images: Record<string, string>) => {
    setImageMap(images);
  };

  // Add navigation functions for Next and Previous problems
  const navigateToNextProblem = () => {
    if (!problems.length || !currentProblem) return;
    
    const currentIndex = problems.findIndex(p => p.question_id === selectedProblemId);
    if (currentIndex < problems.length - 1) {
      setSelectedProblemId(problems[currentIndex + 1].question_id);
    }
  };

  const navigateToPreviousProblem = () => {
    if (!problems.length || !currentProblem) return;
    
    const currentIndex = problems.findIndex(p => p.question_id === selectedProblemId);
    if (currentIndex > 0) {
      setSelectedProblemId(problems[currentIndex - 1].question_id);
    }
  };

  const leftColumnFields: FieldKey[] = ['question_id', 'problem_image', 'problem_text', 'answer', 'solution_text'];
  const middleColumnFields: FieldKey[] = ['code', 'difficulty', 'solutiontextexpanded', 'skills_for_steps'];

  const renderSourceSelection = () => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4">Choose Data Source</h2>
      <div className="flex gap-4">
        <Button 
          variant={dataSource === 'csv' ? 'default' : 'outline'}
          onClick={() => setDataSource('csv')}
        >
          Upload CSV
        </Button>
        <Button 
          variant={dataSource === 'database' ? 'default' : 'outline'} 
          onClick={() => {
            toast({
              title: "Supabase Connection",
              description: "This feature will be available after connecting to Supabase."
            });
          }}
        >
          Connect to Database
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Math Problem Reviewer</h1>
      
      {!dataSource && renderSourceSelection()}
      
      {dataSource === 'csv' && (
        <>
          <FileUploader 
            onCSVUpload={handleCSVUpload} 
            onImageUpload={handleImageUpload} 
          />
          
          {problems.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="w-64">
                  <Select
                    value={selectedProblemId}
                    onValueChange={setSelectedProblemId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a problem" />
                    </SelectTrigger>
                    <SelectContent>
                      {problems.map((problem) => (
                        // Ensure question_id is not empty and is a string
                        problem.question_id && problem.question_id.trim() !== "" ? (
                          <SelectItem 
                            key={problem.question_id} 
                            value={problem.question_id}
                          >
                            {problem.question_id}
                          </SelectItem>
                        ) : null
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button onClick={handleExport}>
                  Download CSV
                </Button>
              </div>
              
              {currentProblem && (
                <div className="flex justify-center space-x-4 mb-4">
                  <Button 
                    onClick={navigateToPreviousProblem}
                    variant="outline"
                    disabled={problems.findIndex(p => p.question_id === selectedProblemId) === 0}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous Problem
                  </Button>
                  <Button 
                    onClick={navigateToNextProblem}
                    variant="outline"
                    disabled={problems.findIndex(p => p.question_id === selectedProblemId) === problems.length - 1}
                  >
                    Next Problem <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {currentProblem ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <Card className="p-4">
                <h2 className="text-xl font-bold mb-4">Problem Details</h2>
                {leftColumnFields.map((field) => (
                  <Field
                    key={field}
                    label={field}
                    value={currentProblem[field] as string || ""}
                    onFieldClick={(value) => handleFieldClick(field, value)}
                  />
                ))}
              </Card>
              
              {/* Middle Column */}
              <Card className="p-4">
                <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                {middleColumnFields.map((field) => (
                  <Field
                    key={field}
                    label={field}
                    value={currentProblem[field] as string || ""}
                    onFieldClick={(value) => handleFieldClick(field, value)}
                  />
                ))}
              </Card>
              
              {/* Right Column - Editor */}
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
            </div>
          ) : (
            problems.length > 0 && (
              <div className="text-center py-10">
                <p>Please select a problem to review</p>
              </div>
            )
          )}
        </>
      )}
      
      {problems.length === 0 && dataSource === 'csv' && (
        <div className="text-center py-10">
          <p>Please upload a CSV file to get started</p>
        </div>
      )}
    </div>
  );
};

export default Index;
