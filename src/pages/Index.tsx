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
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import MathRenderer from '../components/MathRenderer';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState<boolean>(false);

  useEffect(() => {
    // Check if Supabase is connected by making a simple query
    const checkSupabaseConnection = async () => {
      try {
        setIsCheckingConnection(true);
        const { data, error } = await supabase.from('PS1').select('question_id').limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setIsSupabaseConnected(false);
          return;
        }
        
        setIsSupabaseConnected(true);
      } catch (error) {
        console.error('Supabase connection check failed:', error);
        setIsSupabaseConnected(false);
      } finally {
        setIsCheckingConnection(false);
      }
    };
    
    if (dataSource === 'database') {
      checkSupabaseConnection();
    }
  }, [dataSource]);

  // Load problems from Supabase when database source is selected and connection is confirmed
  useEffect(() => {
    const fetchProblemsFromDatabase = async () => {
      if (dataSource === 'database' && isSupabaseConnected) {
        try {
          const { data, error } = await supabase
            .from('PS1')
            .select('*');
          
          if (error) {
            toast({
              title: "Error Loading Problems",
              description: error.message,
              variant: "destructive"
            });
            return;
          }
          
          if (data && data.length > 0) {
            setProblems(data);
            setSelectedProblemId(data[0].question_id);
          } else {
            toast({
              title: "No Problems Found",
              description: "No problems were found in the database."
            });
          }
        } catch (error) {
          console.error('Error fetching problems:', error);
          toast({
            title: "Error Loading Problems",
            description: "Failed to load problems from database",
            variant: "destructive"
          });
        }
      }
    };

    fetchProblemsFromDatabase();
  }, [dataSource, isSupabaseConnected, toast]);

  useEffect(() => {
    // Remove any existing MathJax script to avoid duplicates
    const existingScript = document.getElementById('MathJax-script');
    if (existingScript) {
      document.head.removeChild(existingScript);
    }

    // Add MathJax script with proper configuration for environments
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
    script.async = true;
    script.id = 'MathJax-script';
    
    // Set MathJax configuration
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEnvironments: true,
        processEscapes: true,
        packages: ['base', 'ams', 'newcommand', 'require', 'autoload', 'configmacros'],
        tags: 'ams'
      },
      options: {
        enableMathMenu: false,
        enableEnvironments: true,
        ignoreHtmlClass: 'tex2jax_ignore',
        processHtmlClass: 'tex2jax_process'
      },
      loader: {
        load: ['[tex]/ams', '[tex]/newcommand', '[tex]/configmacros']
      },
      startup: {
        typeset: false
      },
      svg: {
        fontCache: 'global'
      }
    };

    document.head.appendChild(script);

    // Once MathJax is loaded, typeset any existing math
    script.onload = () => {
      if (window.MathJax && window.MathJax.typeset) {
        window.MathJax.typeset();
      }
    };

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

  const handleSaveChanges = async () => {
    if (!currentProblem || !selectedField) return;

    const updatedProblem = {
      ...currentProblem,
      [selectedField]: editValue
    };

    // If data source is database, update in Supabase
    if (dataSource === 'database' && isSupabaseConnected) {
      try {
        const { error } = await supabase
          .from('PS1')
          .update({ [selectedField]: editValue })
          .eq('question_id', currentProblem.question_id);
          
        if (error) {
          toast({
            title: "Update Failed",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
      } catch (error) {
        console.error('Error updating problem:', error);
        toast({
          title: "Update Failed",
          description: "Could not save changes to the database",
          variant: "destructive"
        });
        return;
      }
    }
    
    // Update local state
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
          onClick={() => setDataSource('database')}
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
      
      {dataSource === 'database' && !isSupabaseConnected && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            Unable to connect to Supabase database. Please make sure your project is properly connected to Supabase.
            You can check your connection in the Supabase configuration file.
          </AlertDescription>
        </Alert>
      )}
      
      {dataSource === 'csv' && (
        <>
          <FileUploader 
            onCSVUpload={handleCSVUpload} 
            onImageUpload={handleImageUpload} 
          />
          
          {problems.length > 0 && (
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
                      <SelectContent>
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
                
                <Button onClick={handleExport}>
                  Download CSV
                </Button>
              </div>
            </div>
          )}
          
          {currentProblem ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <Card className="p-4">
                <h2 className="text-xl font-bold mb-4">Problem Details</h2>
                {['question_id', 'problem_image', 'problem_text', 'answer', 'solution_text'].map((field) => (
                  <Field
                    key={field}
                    label={field as FieldKey}
                    value={currentProblem[field as FieldKey] as string || ""}
                    onFieldClick={(value) => handleFieldClick(field as FieldKey, value)}
                  />
                ))}
              </Card>
              
              {/* Middle Column */}
              <Card className="p-4">
                <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                {['code', 'difficulty', 'solutiontextexpanded', 'skills_for_steps'].map((field) => (
                  <Field
                    key={field}
                    label={field as FieldKey}
                    value={currentProblem[field as FieldKey] as string || ""}
                    onFieldClick={(value) => handleFieldClick(field as FieldKey, value)}
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
      
      {dataSource === 'database' && isSupabaseConnected && (
        <>
          {problems.length > 0 && (
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
                      <SelectContent>
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
                
                <Button onClick={handleExport}>
                  Download CSV
                </Button>
              </div>
            </div>
          )}
          
          {currentProblem ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <Card className="p-4">
                <h2 className="text-xl font-bold mb-4">Problem Details</h2>
                {['question_id', 'problem_image', 'problem_text', 'answer', 'solution_text'].map((field) => (
                  <Field
                    key={field}
                    label={field as FieldKey}
                    value={currentProblem[field as FieldKey] as string || ""}
                    onFieldClick={(value) => handleFieldClick(field as FieldKey, value)}
                  />
                ))}
              </Card>
              
              {/* Middle Column */}
              <Card className="p-4">
                <h2 className="text-xl font-bold mb-4">Additional Information</h2>
                {['code', 'difficulty', 'solutiontextexpanded', 'skills_for_steps'].map((field) => (
                  <Field
                    key={field}
                    label={field as FieldKey}
                    value={currentProblem[field as FieldKey] as string || ""}
                    onFieldClick={(value) => handleFieldClick(field as FieldKey, value)}
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
      
      {problems.length === 0 && dataSource === 'database' && isSupabaseConnected && (
        <div className="text-center py-10">
          <p>No problems found in the database. You may need to add problems first.</p>
        </div>
      )}
      
      {isCheckingConnection && dataSource === 'database' && (
        <div className="text-center py-10">
          <p>Checking connection to database...</p>
        </div>
      )}
    </div>
  );
};

export default Index;
