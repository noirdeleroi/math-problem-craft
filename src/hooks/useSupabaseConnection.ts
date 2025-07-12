
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { MathProblem } from '../types/mathProblem';

export function useSupabaseConnection() {
  const { toast } = useToast();
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState<boolean>(true);
  const [problems, setProblems] = useState<MathProblem[]>([]);
  const [availableTables, setAvailableTables] = useState<string[]>(['problems_oge_100', 'OGE_SHFIPI_problems_1_25', 'new_problems_by_skills_1', 'new_problems_by_skills_2', 'ogemath_fipi_bank']);
  const [selectedTable, setSelectedTable] = useState<string>('problems_oge_100');

  // Function to fetch problems from a specific table
  const fetchProblemsFromDatabase = async (tableName: string) => {
    try {
      setIsCheckingConnection(true);
      
      let data, error;
      
      // Query different tables with proper typing
      if (tableName === 'ogemath_fipi_bank') {
        const result = await supabase
          .from('ogemath_fipi_bank')
          .select('*')
          .order('problem_link', { ascending: true });
        data = result.data;
        error = result.error;
      } else if (tableName === 'problems_oge_100') {
        const result = await supabase
          .from('problems_oge_100')
          .select('*')
          .order('question_id', { ascending: true });
        data = result.data;
        error = result.error;
      } else if (tableName === 'OGE_SHFIPI_problems_1_25') {
        const result = await supabase
          .from('OGE_SHFIPI_problems_1_25')
          .select('*')
          .order('question_id', { ascending: true });
        data = result.data;
        error = result.error;
      } else if (tableName === 'new_problems_by_skills_1') {
        const result = await supabase
          .from('new_problems_by_skills_1')
          .select('*')
          .order('question_id', { ascending: true });
        data = result.data;
        error = result.error;
      } else if (tableName === 'new_problems_by_skills_2') {
        const result = await supabase
          .from('new_problems_by_skills_2')
          .select('*')
          .order('question_id', { ascending: true });
        data = result.data;
        error = result.error;
      } else {
        console.error(`Unknown table: ${tableName}`);
        return;
      }
      
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
        // Convert data to match MathProblem type based on table schema
        const formattedData: MathProblem[] = data.map((item: any) => {
          if (tableName === 'ogemath_fipi_bank') {
            // Handle ogemath_fipi_bank table with different schema
            return {
              question_id: item.problem_link || "",
              problem_text: item.problem_text || "",
              answer: item.answer || "",
              solution_text: item.solution_text || "",
              problem_image: item.problem_image,
              solutiontextexpanded: item.solutiontextexpanded,
              skills: item.problem_number_type?.toString() || "",
              code: "",
              difficulty: "",
              checked: item.checked === 1 || item.checked === '1' || item.checked === true,
              corrected: item.corrected === 1 || item.corrected === '1' || item.corrected === true,
              problem_number_type: item.problem_number_type?.toString() || "",
              problem_link: item.problem_link || "",
              comments: item.comments || ""
            };
          } else {
            // Handle other tables with standard schema
            return {
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
              corrected: Boolean(item.corrected),
              problem_number_type: "",
              problem_link: "",
              comments: ""
            };
          }
        });
        
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
