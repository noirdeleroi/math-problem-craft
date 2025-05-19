
import React from 'react';

interface TableSelectorProps {
  availableTables: string[];
  selectedTable: string;
  setSelectedTable: (table: string) => void;
  fetchProblemsFromDatabase: (table: string) => void;
}

const TableSelector: React.FC<TableSelectorProps> = ({ 
  availableTables,
  selectedTable,
  setSelectedTable,
  fetchProblemsFromDatabase
}) => {
  if (!availableTables.length) return null;
  
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium mb-2">Select Table:</label>
      <select 
        value={selectedTable} 
        onChange={(e) => {
          setSelectedTable(e.target.value);
          fetchProblemsFromDatabase(e.target.value);
        }}
        className="border rounded-md py-2 px-4 w-full sm:w-auto"
      >
        {availableTables.map(table => (
          <option key={table} value={table}>{table}</option>
        ))}
      </select>
    </div>
  );
};

export default TableSelector;
