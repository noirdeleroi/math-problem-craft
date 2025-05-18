
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MathProblem } from '../types/mathProblem';

interface DataSourceSelectorProps {
  dataSource: 'csv' | 'database' | null;
  setDataSource: (source: 'csv' | 'database' | null) => void;
  isSupabaseConnected: boolean;
  isCheckingConnection: boolean;
  problems: MathProblem[];
}

const DataSourceSelector: React.FC<DataSourceSelectorProps> = ({
  dataSource,
  setDataSource,
  isSupabaseConnected,
  isCheckingConnection,
  problems
}) => {
  return (
    <>
      {!dataSource && (
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
      )}
      
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

      {isCheckingConnection && dataSource === 'database' && (
        <div className="text-center py-10">
          <p>Checking connection to database...</p>
        </div>
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
    </>
  );
};

export default DataSourceSelector;
