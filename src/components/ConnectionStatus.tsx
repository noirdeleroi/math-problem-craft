
import React from 'react';

interface ConnectionStatusProps {
  isCheckingConnection: boolean;
  isSupabaseConnected: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ 
  isCheckingConnection,
  isSupabaseConnected
}) => {
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

  return null;
};

export default ConnectionStatus;
