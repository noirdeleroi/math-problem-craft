
import { useState } from 'react';
import { MathProblem } from '../types/mathProblem';
import FileUploader from '../components/FileUploader';
import { exportCSV } from '../utils/csvUtils';
import ProblemNavigation from '../components/ProblemNavigation';
import ProblemViewer from '../components/ProblemViewer';
import ConnectionStatus from '../components/ConnectionStatus';
import TableSelector from '../components/TableSelector';
import { useSupabaseConnection } from '../hooks/useSupabaseConnection';
import { useMathJaxInitializer } from '../hooks/useMathJaxInitializer';
import { useProblemManager } from '../hooks/useProblemManager';

const Index = () => {
  // Initialize MathJax
  useMathJaxInitializer();
  
  // Handle Supabase connection and data fetching
  const {
    isSupabaseConnected,
    isCheckingConnection,
    availableTables,
    selectedTable,
    setSelectedTable,
    problems,
    setProblems,
    fetchProblemsFromDatabase
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

  // Handle file upload
  const handleCSVUpload = (data: MathProblem[]) => {
    setProblems(data);
    if (data.length > 0 && data[0].question_id) {
      setSelectedProblemId(data[0].question_id);
    }
  };

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
      
      <TableSelector
        availableTables={availableTables}
        selectedTable={selectedTable}
        setSelectedTable={setSelectedTable}
        fetchProblemsFromDatabase={fetchProblemsFromDatabase}
      />
      
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
