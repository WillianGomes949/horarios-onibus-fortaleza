import React from "react";
import LineHeader from "./LineHeader";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";
import HorariosTable from "./HorariosTable";
import EmptyState from "./EmptyState";

const ResultsSection = ({ dados, loading, error, linhaSelecionada }) => {
  return (
    <div className="w-full transition-all duration-300 ease-in-out">
      {/* Estado Inicial */}
      {!dados && !loading && !error && (
        <div className="mt-8 animate-fade-in">
            <EmptyState type="initial" />
        </div>
      )}

      {/* Erro */}
      {error && (
         <div className="mt-6 animate-pulse">
            <ErrorMessage message={error} />
         </div>
      )}

      {/* Carregando */}
      {loading && (
        <div className="py-12 flex justify-center">
            <LoadingSpinner />
        </div>
      )}

      {/* Conteúdo Principal */}
      {dados && !loading && (
        <>
            {dados.length > 0 ? (
                <div className="animate-fade-in flex flex-col gap-6 mt-6">
                    <HorariosTable dados={dados} linhaSelecionada={linhaSelecionada} />
                </div>
            ) : (
                <EmptyState type="noResults" />
            )}
        </>
      )}
    </div>
  );
};

export default ResultsSection;