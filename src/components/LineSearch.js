import { RiGitCommitFill, RiLoader5Fill } from "@remixicon/react";
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
    <div className="relative">
      <label
        htmlFor="linha-onibus"
        className=" text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 flex"
      >
     
        {loadingLinhas ? (
          <div className="flex justify-start items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
              <RiLoader5Fill
                size={30}
                className="animate-spin text-orange-500 dark:text-orange-400"
              />
            </span>
            <p>Carregando</p>
          </div>
        ) : (
          <div className="flex justify-start items-center gap-2">
            <span className="text-xs text-slate-500 dark:text-slate-400 ml-2">
              <RiGitCommitFill
                size={30}
                className=" text-lime-500 dark:text-lime-400"
              />
            </span>
            <p>Linha</p>
          </div>
        )}
      </label>
      <input
        id="linha-onibus"
        type="text"
        value={linha}
        onChange={(e) => onLinhaChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Digite o número ou nome da linha..."
        className="w-full p-2 bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg border border-slate-300 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
      />

      {/* Sugestões de Linhas */}
      {mostrarSugestoes && (
        <div className="absolute z-10 w-full mt-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {linhasFiltradas.map((linhaItem) => (
            <div
              key={linhaItem.numero}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer border-b border-slate-200 dark:border-slate-600 last:border-b-0 transition-colors duration-150"
              onClick={() => onSelecionarLinha(linhaItem)}
            >
              <div className="font-bold text-lime-600 dark:text-lime-400">
                {linhaItem.numero} - {linhaItem.nome}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {linhaItem.tipoLinha}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LineSearch;
