import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
      <p className="mt-4 text-gray-400">Carregando horários...</p>
    </div>
  );
};

export default LoadingSpinner;