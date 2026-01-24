import { RiCalendarEventLine } from "@remixicon/react";
import React from "react";

const DatePicker = ({ data, onDataChange }) => {
  return (
    <div className="w-full">
      <label
        htmlFor="data-consulta"
        className="text-xs font-bold text-[var(--text-muted)] tracking-wider mb-2 ml-1 flex items-center gap-1"
      >
        <RiCalendarEventLine size={14} />
        Escolha a data...
      </label>
      <input
        id="data-consulta"
        type="date"
        value={data}
        onChange={(e) => onDataChange(e.target.value)}
        className="w-full h-14 px-4 bg-[var(--bg-input)] text-[var(--text-muted)] rounded-[var(--radius)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] transition-all duration-300 text-lg shadow-sm cursor-pointer placeholder-[var(--text-muted)] color-scheme-dark"
        style={{ colorScheme: "dark" }} // Força o ícone do calendário a ficar claro
      />
    </div>
  );
};

export default DatePicker;