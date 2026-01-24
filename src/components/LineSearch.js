import { RiSearchLine, RiLoader5Fill, RiBusLine } from "@remixicon/react";
import React, { useRef } from "react";

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
  // 1. Cria a referência para manipular o input diretamente
  const inputRef = useRef(null);

  const handleSelection = (linhaItem) => {
    // Chama a função original de seleção
    onSelecionarLinha(linhaItem);
    
    // Remove o foco do input, fechando o teclado virtual em mobile
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className="relative w-full">
      <label
        htmlFor="linha-onibus"
        className="text-xs font-bold text-[var(--text-muted)] tracking-wider mb-2 ml-1 flex items-center gap-1"
      >
        <RiBusLine size={14} />
        Escolha sua linha
      </label>
      
      <div className="relative">
        <input
          ref={inputRef} // 2. Conecta a referência ao elemento DOM
          id="linha-onibus"
          type="text"
          value={linha}
          onChange={(e) => onLinhaChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={loadingLinhas}
          placeholder={loadingLinhas ? "Carregando linhas..." : "Ex: 026, Antônio Bezerra..."}
          className="w-full h-14 pl-4 pr-10 bg-[var(--bg-input)] text-[var(--text-main)] rounded-[var(--radius)] border border-[var(--border)] focus:outline-none focus:border-[var(--primary)] transition-all duration-300 text-lg shadow-sm placeholder-[var(--text-muted)]/50"
        />
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            {loadingLinhas ? (
                <RiLoader5Fill className="animate-spin text-[var(--primary)]" size={24} />
            ) : (
                <RiSearchLine size={24} />
            )}
        </div>
      </div>

      {/* Sugestões de Linhas (Dropdown) */}
      {mostrarSugestoes && linhasFiltradas.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-[#1E1E23] border border-[var(--border)] rounded-[var(--radius)] shadow-2xl max-h-[60vh] overflow-y-auto custom-scrollbar backdrop-blur-md">
          {linhasFiltradas.map((linhaItem) => (
            <div
              key={linhaItem.numero}
              className="p-4 hover:bg-[var(--text-main)]/5 cursor-pointer border-b border-[var(--border)] last:border-b-0 transition-colors duration-150 active:bg-[var(--text-main)]/10"
              // 3. Usa o handler que seleciona E remove o foco
              onMouseDown={() => handleSelection(linhaItem)} 
            >
              <div className="flex items-center gap-3">
                <span className="bg-[var(--primary)]/20 text-[var(--primary)] font-bold px-2 py-1 rounded text-sm min-w-14 text-center border border-[var(--primary)]/20">
                    {linhaItem.numero}
                </span>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[var(--text-main)] truncate">
                        {linhaItem.nome}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">
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