
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { MathProblem } from '../types/mathProblem';

interface DataSourceSelectorProps {
  isSupabaseConnected: boolean;
  isCheckingConnection: boolean;
  problems: MathProblem[];
}

const DataSourceSelector: React.FC<DataSourceSelectorProps> = ({
  isSupabaseConnected,
  isCheckingConnection,
  problems
}) => {
  return (
    <>
      {!isSupabaseConnected && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            Unable to connect to Supabase database. Please make sure your project is properly connected to Supabase.
            You can check your connection in the Supabase configuration file.
          </AlertDescription>
        </Alert>
      )}

      {isCheckingConnection && (
        <div className="text-center py-10">
          <p>Checking connection to database...</p>
        </div>
      )}
      
      {problems.length === 0 && isSupabaseConnected && (
        <div className="text-center py-10">
          <p>No problems found in the database.</p>
        </div>
      )}
    </>
  );
};

export default DataSourceSelector;
