import React, { useState, useEffect } from "react";
import LineSearch from "./LineSearch";
import DatePicker from "./DatePicker";

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

  // Filtrar linhas baseado no input
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
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

        <DatePicker data={data} onDataChange={onDataChange} />
      </div>

      <button
        type="submit"
        disabled={loading || !linha}
        className="w-full px-6 py-3 bg-lime-600 hover:bg-lime-700 text-white font-bold rounded-lg 
             disabled:bg-slate-400 disabled:text-slate-200 dark:disabled:bg-slate-600 
             disabled:cursor-not-allowed transition-all duration-200 
             focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        {loading ? "Buscando..." : "Buscar Horários"}
      </button>
    </form>
  );
};

export default SearchForm;
