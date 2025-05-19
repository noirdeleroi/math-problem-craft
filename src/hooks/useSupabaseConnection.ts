
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { MathProblem } from '../types/mathProblem';

export function useSupabaseConnection() {
  const { toast } = useToast();
  const [isSupabaseConnected, setIsSupabaseConnected] = useState<boolean>(false);
  const [isCheckingConnection, setIsCheckingConnection] = useState<boolean>(true);
  const [problems, setProblems] = useState<MathProblem[]>([]);

  // Automatically check Supabase connection on mount and fetch problems
  useEffect(() => {
    const checkConnectionAndFetchProblems = async () => {
      try {
        setIsCheckingConnection(true);
        
        // Query the problems table to check connection
        const { data, error } = await supabase
          .from('problems')
          .select('*')
          .order('question_id', { ascending: true });
        
        if (error) {
          console.error('Supabase connection error:', error);
          setIsSupabaseConnected(false);
          toast({
            title: "Connection Error",
            description: "Could not connect to the database.",
            variant: "destructive"
          });
        } else {
          console.log('Supabase connection successful, got data:', data);
          setIsSupabaseConnected(true);
          
          // Format and set problems data
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
        }
      } catch (error) {
        console.error('Supabase connection check failed:', error);
        setIsSupabaseConnected(false);
        toast({
          title: "Connection Error",
          description: "Could not connect to the database.",
          variant: "destructive"
        });
      } finally {
        setIsCheckingConnection(false);
      }
    };
    
    checkConnectionAndFetchProblems();
  }, [toast]);

  return {
    isSupabaseConnected,
    isCheckingConnection,
    problems,
    setProblems
  };
}
