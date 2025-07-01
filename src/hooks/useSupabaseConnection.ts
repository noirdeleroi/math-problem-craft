
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { MathProblem } from '../types/mathProblem';

type TableName = 'problems' | 'problems_oge_100' | 'problems_pandoc' | 'pandoc' | 'latex_for_mathjax_by_python' | 'OGE_SHFIPI_problems_1_25' | 'new_problems_by_skills_1';

export function useSupabaseConnection() {
  const { toast } = useToast();
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState<boolean>(true);
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [availableTables, setAvailableTables] = useState<string[]>(['problems', 'problems_oge_100', 'problems_pandoc', 'pandoc', 'latex_for_mathjax_by_python', 'OGE_SHFIPI_problems_1_25', 'new_problems_by_skills_1']);
  const [selectedTable, setSelectedTable] = useState<string>('problems_oge_100');

  // Function to fetch problems from a specific table
  const fetchProblemsFromDatabase = async (tableName: string) => {
    try {
      setIsCheckingConnection(true);
      
      // Query the selected table with proper typing
      const { data, error } = await supabase
        .from(tableName as TableName)
        .select('*')
        .order('question_id', { ascending: true });
      
      if (error) {
        console.error(`Error fetching from ${tableName}:`, error);
        toast({
          title: "Fetch Error",
          description: `Could not fetch data from ${tableName}.`,
          variant: "destructive"
        });
        return;
      }
      
      console.log(`Data fetched from ${tableName}:`, data);
      
      // Format and set problems data
      if (data && data.length > 0) {
        // Convert numeric fields to strings to match MathProblem type
        const formattedData: MathProblem[] = data.map(item => ({
          question_id: item.question_id || "",
          problem_text: item.problem_text || "",
          answer: item.answer || "",
          solution_text: item.solution_text || "",
          problem_image: item.problem_image,
          solutiontextexpanded: item.solutiontextexpanded,
          skills: typeof item.skills === 'number' ? item.skills.toString() : (item.skills || ""),
          code: item.code?.toString() || "",
          difficulty: item.difficulty?.toString() || "",
          checked: Boolean(item.checked),
          corrected: Boolean(item.corrected)
        }));
        
        console.log('Formatted data:', formattedData);
        setProblems(formattedData);
        setIsSupabaseConnected(true);
      } else {
        console.log(`No problems found in ${tableName}`);
        setProblems([]);
        toast({
          title: "No Problems Found",
          description: `No problems were found in the ${tableName} table.`
        });
      }
    } catch (error) {
      console.error('Data fetch failed:', error);
      toast({
        title: "Fetch Error",
        description: "Could not fetch data from the database.",
        variant: "destructive"
      });
    } finally {
      setIsCheckingConnection(false);
    }
  };

  // Automatically check Supabase connection on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Simple query to check connection
        const { error } = await supabase
          .from('problems_oge_100')
          .select('question_id')
          .limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setIsSupabaseConnected(false);
          toast({
            title: "Connection Error",
            description: "Could not connect to the database.",
            variant: "destructive"
          });
        } else {
          console.log('Supabase connection successful');
          setIsSupabaseConnected(true);
          // Fetch problems from the initial selected table
          fetchProblemsFromDatabase(selectedTable);
        }
      } catch (error) {
        console.error('Supabase connection check failed:', error);
        setIsSupabaseConnected(false);
        toast({
          title: "Connection Error",
          description: "Could not connect to the database.",
          variant: "destructive"
        });
      }
    };
    
    checkConnection();
  }, [toast]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    isSupabaseConnected,
    isCheckingConnection,
    problems,
    setProblems,
    availableTables,
    selectedTable,
    setSelectedTable,
    fetchProblemsFromDatabase
  };
}
