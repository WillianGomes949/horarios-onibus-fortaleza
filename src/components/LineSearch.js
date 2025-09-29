import React from 'react';

const LineSearch = ({
  linha,
  linhasFiltradas,
  mostrarSugestoes,
  loadingLinhas,
  onLinhaChange,
  onSelecionarLinha,
  onFocus,
  onBlur
}) => {
  return (
    <div className="relative">
      <label htmlFor="linha-onibus" className="block text-sm font-medium text-gray-300 mb-2">
        Número da Linha
        {loadingLinhas && (
          <span className="text-xs text-gray-400 ml-2">(Carregando...)</span>
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
        className="w-full p-3 bg-gray-700 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition duration-200"
      />
      
      {/* Sugestões de Linhas */}
      {mostrarSugestoes && (
        <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {linhasFiltradas.map((linhaItem) => (
            <div
              key={linhaItem.numero}
              className="p-3 hover:bg-gray-600 cursor-pointer border-b border-gray-600 last:border-b-0"
              onClick={() => onSelecionarLinha(linhaItem)}
            >
              <div className="font-bold text-cyan-400">
                {linhaItem.numero} - {linhaItem.nome}
              </div>
              <div className="text-sm text-gray-400">
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