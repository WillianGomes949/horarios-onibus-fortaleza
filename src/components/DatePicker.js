import { RiCalendarEventLine } from "@remixicon/react";
import React from "react";

const DatePicker = ({ data, onDataChange }) => {
  return (
    <div className="w-full">
      <label
        htmlFor="data-consulta"
        className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1 flex items-center gap-1"
      >
        <RiCalendarEventLine size={14} />
        Para quando?
      </label>
      <input
        id="data-consulta"
        type="date"
        value={data}
        onChange={(e) => onDataChange(e.target.value)}
        className="w-full h-14 px-4 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200 text-lg shadow-sm cursor-pointer"
      />
    </div>
  );
};

export default DatePicker;