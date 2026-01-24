import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-[var(--border)] rounded-full"></div>
        <div className="w-12 h-12 border-4 border-[var(--primary)] rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-[var(--text-muted)] animate-pulse">Carregando horários...</p>
    </div>
  );
};

export default LoadingSpinner;