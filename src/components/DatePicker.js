import React from 'react';

const DatePicker = ({ data, onDataChange }) => {
  return (
    <div>
      <label htmlFor="data-consulta" className="block text-sm font-medium text-gray-300 mb-2">
        Data da Consulta
      </label>
      <input
        id="data-consulta"
        type="date"
        value={data}
        onChange={(e) => onDataChange(e.target.value)}
        className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
      />
    </div>
  );
};

export default DatePicker;