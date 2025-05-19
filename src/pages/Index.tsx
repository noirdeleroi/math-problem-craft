
import { useState } from 'react';
import { MathProblem } from '../types/mathProblem';
import { exportCSV } from '../utils/csvUtils';
import ProblemNavigation from '../components/ProblemNavigation';
import ProblemViewer from '../components/ProblemViewer';
import ConnectionStatus from '../components/ConnectionStatus';
import DataSourceSelector from '../components/DataSourceSelector';
import { useMathJaxInitializer } from '../hooks/useMathJaxInitializer';
import { useProblemManager } from '../hooks/useProblemManager';
import { useSupabaseConnection } from '../hooks/useSupabaseConnection';

const Index = () => {
  // Initialize KaTeX (using the same hook for backward compatibility)
  useMathJaxInitializer();
  
  // Handle Supabase connection and data fetching - directly connect to problems table
  const {
    isSupabaseConnected,
    isCheckingConnection,
    problems,
    setProblems,
  } = useSupabaseConnection();

  // Handle problem management
  const {
    selectedProblemId,
    setSelectedProblemId,
    currentProblem,
    selectedField,
    editValue,
    setEditValue,
    handleFieldClick,
    handleSaveChanges,
    handleToggleChecked,
    handleImageUpload,
  } = useProblemManager(problems);

  // Handle export
  const handleExport = () => {
    exportCSV(problems);
  };

  // If still checking connection or not connected, show status
  if (isCheckingConnection || !isSupabaseConnected) {
    return (
      <ConnectionStatus 
        isCheckingConnection={isCheckingConnection} 
        isSupabaseConnected={isSupabaseConnected}
      />
    );
  }

  // Main UI
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Math Problem Reviewer</h1>
      
      <DataSourceSelector
        isSupabaseConnected={isSupabaseConnected}
        isCheckingConnection={isCheckingConnection}
        problems={problems}
      />
      
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
