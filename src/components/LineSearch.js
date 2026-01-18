import { RiSearchLine, RiLoader5Fill, RiBusLine } from "@remixicon/react";
import React from "react";

const LineSearch = ({
  linha,
  linhasFiltradas,
  mostrarSugestoes,
  loadingLinhas,
  onLinhaChange,
  onSelecionarLinha,
  onFocus,
  onBlur,
}) => {
  return (
    <div className="relative w-full">
      <label
        htmlFor="linha-onibus"
        className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 ml-1 flex items-center gap-1"
      >
        <RiBusLine size={14} />
        Qual sua linha?
      </label>
      
      <div className="relative">
        <input
          id="linha-onibus"
          type="text"
          value={linha}
          onChange={(e) => onLinhaChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={loadingLinhas}
          placeholder={loadingLinhas ? "Carregando linhas..." : "Ex: 026, Antônio Bezerra..."}
          className="w-full h-14 pl-4 pr-10 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200 text-lg shadow-sm placeholder:text-slate-400"
        />
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
            {loadingLinhas ? (
                <RiLoader5Fill className="animate-spin text-lime-600" size={24} />
            ) : (
                <RiSearchLine size={24} />
            )}
        </div>
      </div>

      {/* Sugestões de Linhas (Dropdown) */}
      {mostrarSugestoes && linhasFiltradas.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-2xl max-h-[60vh] overflow-y-auto custom-scrollbar">
          {linhasFiltradas.map((linhaItem) => (
            <div
              key={linhaItem.numero}
              // Aumentado padding para p-4 para facilitar o toque no mobile
              className="p-4 hover:bg-lime-50 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-50 dark:border-slate-700 last:border-b-0 transition-colors duration-150 active:bg-lime-100"
              onMouseDown={() => onSelecionarLinha(linhaItem)} 
            >
              <div className="flex items-center gap-3">
                <span className="bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400 font-bold px-2 py-1 rounded text-sm min-w-14 text-center">
                    {linhaItem.numero}
                </span>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-700 dark:text-slate-200 truncate">
                        {linhaItem.nome}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {linhaItem.tipoLinha}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LineSearch;