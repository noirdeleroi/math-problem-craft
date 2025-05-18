
import { useState, useEffect } from 'react';
import { MathProblem, FieldKey } from '../types/mathProblem';
import FileUploader from '../components/FileUploader';
import { exportCSV } from '../utils/csvUtils';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProblemNavigation from '../components/ProblemNavigation';
import ProblemViewer from '../components/ProblemViewer';
import DataSourceSelector from '../components/DataSourceSelector';

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
            // Convert numeric fields to strings to match MathProblem type
            const formattedData: MathProblem[] = data.map(item => ({
              ...item,
              code: item.code?.toString() || "",
              difficulty: item.difficulty?.toString() || ""
            }));
            
            setProblems(formattedData);
            setSelectedProblemId(formattedData[0].question_id);
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

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Math Problem Reviewer</h1>
      
      <DataSourceSelector 
        dataSource={dataSource}
        setDataSource={setDataSource}
        isSupabaseConnected={isSupabaseConnected}
        isCheckingConnection={isCheckingConnection}
        problems={problems}
      />
      
      {dataSource === 'csv' && (
        <>
          <FileUploader 
            onCSVUpload={handleCSVUpload} 
            onImageUpload={handleImageUpload} 
          />
          
          {problems.length > 0 && (
            <ProblemNavigation
              problems={problems}
              selectedProblemId={selectedProblemId}
              setSelectedProblemId={setSelectedProblemId}
              handleExport={handleExport}
            />
          )}
        </>
      )}
      
      {dataSource === 'database' && isSupabaseConnected && problems.length > 0 && (
        <ProblemNavigation
          problems={problems}
          selectedProblemId={selectedProblemId}
          setSelectedProblemId={setSelectedProblemId}
          handleExport={handleExport}
        />
      )}
      
      <ProblemViewer
        currentProblem={currentProblem}
        selectedField={selectedField}
        editValue={editValue}
        setEditValue={setEditValue}
        handleFieldClick={handleFieldClick}
        handleSaveChanges={handleSaveChanges}
        problems={problems}
      />
    </div>
  );
};

export default Index;
