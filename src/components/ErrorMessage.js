import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg text-center">
      <p className="font-semibold">Ocorreu um erro</p>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;