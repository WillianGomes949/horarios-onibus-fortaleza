import React from "react";
import LineHeader from "./LineHeader";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import HorariosTable from "./HorariosTable";
import EmptyState from "./EmptyState";

const ResultsSection = ({ dados, loading, error, linhaSelecionada }) => {
  return (
    <div>
      {/* Resto do código permanece igual */}
      {!dados && !loading && !error && <EmptyState type="initial" />}

      {error && <ErrorMessage message={error} />}

      {loading && <LoadingSpinner />}

      {dados && dados.length > 0 && <HorariosTable dados={dados} linhaSelecionada={linhaSelecionada}/>}

      {dados && dados.length === 0 && !loading && (
        <EmptyState type="noResults" />
      )}
      {/* Cabeçalho com informações da linha E horários extremos */}
      {linhaSelecionada && dados && (
        <LineHeader linhaSelecionada={linhaSelecionada} dados={dados} />
      )}
    </div>
  );
};

export default ResultsSection;
