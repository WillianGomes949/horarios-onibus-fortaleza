import React, { useState, useEffect } from "react";
import LineSearch from "./LineSearch";
import DatePicker from "./DatePicker";
import { RiSearchLine } from "@remixicon/react";

const SearchForm = ({
  linha,
  data,
  linhas,
  loading,
  loadingLinhas,
  onLinhaChange,
  onDataChange,
  onBuscarHorarios,
  onSelecionarLinha,
}) => {
  const [linhasFiltradas, setLinhasFiltradas] = useState([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);

  useEffect(() => {
    if (linha.trim() === "") {
      setLinhasFiltradas([]);
      setMostrarSugestoes(false);
      return;
    }

    const filtradas = linhas
      .filter(
        (linhaItem) =>
          linhaItem.numero.toString().includes(linha) ||
          linhaItem.nome.toLowerCase().includes(linha.toLowerCase()) ||
          linhaItem.numeroNome.toLowerCase().includes(linha.toLowerCase())
      )
      .slice(0, 10);

    setLinhasFiltradas(filtradas);
    setMostrarSugestoes(filtradas.length > 0);
  }, [linha, linhas]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const linhaInfo = linhas.find((l) => l.numero.toString() === linha);
    onBuscarHorarios(linha, data, linhaInfo);
  };

  const handleSelecionarLinha = (linhaItem) => {
    onSelecionarLinha(linhaItem);
    setMostrarSugestoes(false);
  };

  return (
    <form onSubmit={handleSubmit} className="relative z-10">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Wrapper para garantir que o LineSearch ocupe espaço correto */}
        <div className="w-full md:flex-1">
           <LineSearch
            linha={linha}
            linhasFiltradas={linhasFiltradas}
            mostrarSugestoes={mostrarSugestoes}
            loadingLinhas={loadingLinhas}
            onLinhaChange={onLinhaChange}
            onSelecionarLinha={handleSelecionarLinha}
            onFocus={() => setMostrarSugestoes(linhasFiltradas.length > 0)}
            onBlur={() => setTimeout(() => setMostrarSugestoes(false), 200)}
          />
        </div>
        
        <div className="w-full md:w-auto md:min-w-[180px]">
          <DatePicker data={data} onDataChange={onDataChange} />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !linha}
        className="w-full h-14 flex items-center justify-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold text-lg rounded-[var(--radius)]
             disabled:bg-[var(--bg-input)] disabled:text-[var(--text-muted)]
             disabled:cursor-not-allowed transition-all duration-200 transform active:scale-[0.98] shadow-lg shadow-[var(--primary)]/20"
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            Buscando...
          </div>
        ) : (
          <>
            <RiSearchLine size={22} />
            Buscar Horários
          </>
        )}
      </button>
    </form>
  );
};

export default SearchForm;