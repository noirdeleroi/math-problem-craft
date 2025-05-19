
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { MathProblem } from '../types/mathProblem';

export function useSupabaseConnection() {
  const { toast } = useToast();
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState<boolean>(true);
  const [availableTables, setAvailableTables] = useState<string[]>([]);
  const [selectedTable, setSelectedTable] = useState<string>("problems");
  const [problems, setProblems] = useState<MathProblem[]>([]);

  // Automatically check Supabase connection on mount
  useEffect(() => {
    const checkSupabaseConnection = async () => {
      try {
        setIsCheckingConnection(true);
        
        // Use a simpler approach to check connection - just query the problems table
        const { data, error } = await supabase
          .from('problems')
          .select('question_id')
          .limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setIsSupabaseConnected(false);
        } else {
          console.log('Supabase connection successful, got data:', data);
          setIsSupabaseConnected(true);
          // Fixed list of available tables
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
        console.log('Fetching problems from database...');
        const { data, error } = await supabase
          .from('problems')
          .select('*')
          .order('question_id', { ascending: true });
        
        if (error) {
          console.error('Error fetching problems:', error);
          toast({
            title: "Error Loading Problems",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        
        console.log('Got problems data:', data);
        if (data && data.length > 0) {
          // Convert numeric fields to strings to match MathProblem type
          const formattedData: MathProblem[] = data.map(item => ({
            ...item,
            code: item.code?.toString() || "",
            difficulty: item.difficulty?.toString() || "",
            checked: Boolean(item.checked),
            corrected: Boolean(item.corrected)
          }));
          
          console.log('Formatted data:', formattedData);
          setProblems(formattedData);
        } else {
          console.log('No problems found');
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

  return {
    isSupabaseConnected,
    isCheckingConnection,
    availableTables,
    selectedTable,
    setSelectedTable,
    problems,
    setProblems,
    fetchProblemsFromDatabase
  };
}
