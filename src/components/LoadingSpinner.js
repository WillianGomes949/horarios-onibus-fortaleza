import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
        <div className="w-12 h-12 border-4 border-lime-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-slate-500 animate-pulse">Carregando horários...</p>
    </div>
  );
};

export default LoadingSpinner;