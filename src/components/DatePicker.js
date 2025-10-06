import { RiGitCommitFill } from "@remixicon/react";
import React from "react";

const DatePicker = ({ data, onDataChange }) => {
  return (
    <div>
      <label
        htmlFor="data-consulta"
        className="flex justify-start items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 mb-2"
      >
        
        <p>Data</p>
      </label>
      <input
        id="data-consulta"
        type="date"
        value={data}
        onChange={(e) => onDataChange(e.target.value)}
        className="w-full p-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  );
};

export default DatePicker;
