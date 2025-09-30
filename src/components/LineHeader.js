import React from "react";

const LineHeader = ({ linhaSelecionada, dados }) => {
  // Função para extrair primeiro e último horário de cada posto
  const getHorariosExtremos = () => {
    if (!dados || !Array.isArray(dados)) return [];

    return dados.map((posto) => {
      if (!posto.horarios || posto.horarios.length === 0) {
        return {
          posto: posto.postoControle,
          primeiroHorario: "N/A",
          ultimoHorario: "N/A",
        };
      }

      const horariosOrdenados = [...posto.horarios].sort((a, b) =>
        a.horario.localeCompare(b.horario)
      );

      return {
        posto: posto.postoControle,
        primeiroHorario: horariosOrdenados[0].horario,
        ultimoHorario: horariosOrdenados[horariosOrdenados.length - 1].horario,
      };
    });
  };

  const horariosExtremos = getHorariosExtremos();

  return (
    <div className="border border-slate-200 dark:border-slate-600 rounded-lg p-2">
      {/* Informações da Linha */}
      <div className="text-center mb-4">
        <h1 className=" text-sm md:text-xl font-bold text-lime-600 dark:text-lime-400">
          Linha {linhaSelecionada.numero} - {linhaSelecionada.nome}
        </h1>
        <p className="text-xs md:text-sm lime-500 dark:text-lime-300 mt-1">
          {linhaSelecionada.tipoLinha}
        </p>
      </div>

      {/* Primeiro e Último Horário por Posto */}
      {horariosExtremos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 items-center">
          {horariosExtremos.map((extremo, index) => (
            <div
              key={index}
              className="bg-lime-50 dark:bg-slate-600/50 rounded-lg p-2 border border-lime-200 dark:border-slate-500"
            >
              <h3 className="font-semibold text-lime-700 dark:text-lime-300 text-sm mb-2 truncate">
                {extremo.posto}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center">
                  <div className=" text-xs md:text-sm font-bold text-lime-600 dark:text-lime-400">
                    Primeiro
                  </div>
                  <div className="font-bold text-lime-700 dark:text-slate-300 text-2xl">
                    {extremo.primeiroHorario}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs md:text-sm font-bold text-lime-600 dark:text-lime-400">
                    Último
                  </div>
                  <div className="font-bold text-lime-700 dark:text-slate-300 text-2xl">
                    {extremo.ultimoHorario}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LineHeader;
