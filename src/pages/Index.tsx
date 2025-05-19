import { useState, useEffect } from 'react';
import { MathProblem, FieldKey } from '../types/mathProblem';
import FileUploader from '../components/FileUploader';
import { exportCSV } from '../utils/csvUtils';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ProblemNavigation from '../components/ProblemNavigation';
import ProblemViewer from '../components/ProblemViewer';

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
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState<boolean>(true);
  const [selectedTable, setSelectedTable] = useState<string>("problems");
  const [availableTables, setAvailableTables] = useState<string[]>([]);

  // Automatically check Supabase connection on mount
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        setIsCheckingConnection(true);
        
        // We'll use a simpler approach to check connection - just query the problems table
        const { data, error } = await supabase
          .from('problems')
          .select('question_id')
          .limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setIsSupabaseConnected(false);
        } else {
          setIsSupabaseConnected(true);
          // For now, we'll just use a fixed list of available tables
          // since we know 'problems' is the main table
          setAvailableTables(['problems']);
          setSelectedTable('problems');
          fetchProblemsFromDatabase('problems');
        }
      } catch (error) {
        console.error('Supabase connection check failed:', error);
        setIsSupabaseConnected(false);
      } finally {
        setIsCheckingConnection(false);
      }
    };
    
    checkSupabaseConnection();
  }, []);

  // Load problems from Supabase
  const fetchProblemsFromDatabase = async (tableName: string) => {
    if (isSupabaseConnected && tableName === 'problems') {
      try {
        const { data, error } = await supabase
          .from('problems')
          .select('*')
          .order('question_id', { ascending: true });
        
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
            difficulty: item.difficulty?.toString() || "",
            checked: Boolean(item.checked),
            corrected: Boolean(item.corrected)
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

    let updatedValue = editValue;
    // For boolean fields, convert string to boolean
    if (typeof currentProblem[selectedField] === 'boolean') {
      updatedValue = editValue.toLowerCase() === 'true' ? 'true' : 'false';
    }

    const updatedProblem = {
      ...currentProblem,
      [selectedField]: updatedValue,
      corrected: true // Mark as corrected when any field is changed
    };

    try {
      // Update in Supabase - only if the selected table is 'problems'
      if (selectedTable === 'problems') {
        const { error } = await supabase
          .from('problems')
          .update({ 
            [selectedField]: updatedValue,
            corrected: true 
          })
          .eq('question_id', currentProblem.question_id);
            
        if (error) {
          toast({
            title: "Update Failed",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
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

  const handleImageUpload = (images: Record<string, string>) => {
    setImageMap(images);
  };

  const handleToggleChecked = async () => {
    if (!currentProblem) return;
    
    const newCheckedValue = !currentProblem.checked;
    
    try {
      // Only update if the selected table is 'problems'
      if (selectedTable === 'problems') {
        const { error } = await supabase
          .from('problems')
          .update({ checked: newCheckedValue })
          .eq('question_id', currentProblem.question_id);
        
        if (error) {
          toast({
            title: "Update Failed",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
      }
      
      // Update local state
      const updatedProblem = {
        ...currentProblem,
        checked: newCheckedValue
      };
      
      const updatedProblems = problems.map(p => 
        p.question_id === currentProblem.question_id ? updatedProblem : p
      );
      
      setProblems(updatedProblems);
      setCurrentProblem(updatedProblem);
      
      toast({
        title: newCheckedValue ? "Problem Marked as Checked" : "Problem Marked as Unchecked",
        description: `Problem ${currentProblem.question_id} has been updated`
      });
    } catch (error) {
      console.error('Error updating checked status:', error);
      toast({
        title: "Update Failed",
        description: "Could not update checked status",
        variant: "destructive"
      });
    }
  };

  if (isCheckingConnection) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Math Problem Reviewer</h1>
        <div className="text-center py-10">
          <p>Connecting to database...</p>
        </div>
      </div>
    );
  }

  if (!isSupabaseConnected) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Math Problem Reviewer</h1>
        <div className="text-center py-10">
          <p>Unable to connect to database. Please check your Supabase configuration.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Math Problem Reviewer</h1>
      
      {availableTables.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Select Table:</label>
          <select 
            value={selectedTable} 
            onChange={(e) => setSelectedTable(e.target.value)}
            className="border rounded-md py-2 px-4 w-full sm:w-auto"
          >
            {availableTables.map(table => (
              <option key={table} value={table}>{table}</option>
            ))}
          </select>
        </div>
      )}
      
      {problems.length > 0 && (
        <ProblemNavigation
          problems={problems}
          selectedProblemId={selectedProblemId}
          setSelectedProblemId={setSelectedProblemId}
          handleExport={handleExport}
          currentProblem={currentProblem}
          handleToggleChecked={handleToggleChecked}
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
