import React from 'react';

const ErrorMessage = ({ message }) => {
  return (
  <div className="bg-slate-800 border border-red-400/30 text-slate-200 p-2 rounded-lg text-center">
    <p className="font-semibold text-red-400">Ocorreu um erro</p>
    <p className="text-slate-300">{message}</p>
  </div>
);
};

export default ErrorMessage;