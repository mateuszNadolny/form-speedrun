import { CircleAlert } from 'lucide-react';
import React from 'react';

const ProvidersError = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <div className="w-full flex items-center gap-3 text-center bg-red-500/20 p-3 rounded-md text-destructive text-xs mb-2">
      <CircleAlert />
      {message}
    </div>
  );
};

export default ProvidersError;
