import React from 'react';

const LineHeader = ({ linhaSelecionada, dados }) => {
  // Função para extrair primeiro e último horário de cada posto
  const getHorariosExtremos = () => {
    if (!dados || !Array.isArray(dados)) return [];

    return dados.map(posto => {
      if (!posto.horarios || posto.horarios.length === 0) {
        return {
          posto: posto.postoControle,
          primeiroHorario: 'N/A',
          ultimoHorario: 'N/A'
        };
      }

      const horariosOrdenados = [...posto.horarios].sort((a, b) => 
        a.horario.localeCompare(b.horario)
      );

      return {
        posto: posto.postoControle,
        primeiroHorario: horariosOrdenados[0].horario,
        ultimoHorario: horariosOrdenados[horariosOrdenados.length - 1].horario
      };
    });
  };

  const horariosExtremos = getHorariosExtremos();

  return (
    <div className="bg-gray-100 dark:bg-gray-700/50 p-5 rounded-lg">
      {/* Informações da Linha */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-cyan-300">
          Linha {linhaSelecionada.numero} - {linhaSelecionada.nome}
        </h1>
        <p className="text-cyan-200 mt-1">
          {linhaSelecionada.tipoLinha}
        </p>
      </div>

      {/* Primeiro e Último Horário por Posto */}
      {horariosExtremos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-4 items-center">
          {horariosExtremos.map((extremo, index) => (
            <div key={index} className="bg-cyan-800/30 rounded-lg p-3 border border-cyan-600/50">
              <h3 className="font-semibold text-cyan-200 text-sm mb-2 truncate">
                {extremo.posto}
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-700 dark:text-cyan-300">Primeiro</div>
                  <div className="font-bold text-cyan-600 dark:text-cyan-200 text-2xl">{extremo.primeiroHorario}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-cyan-700 dark:text-cyan-300">Último</div>
                  <div className=" font-bold text-cyan-600 dark:text-cyan-200 text-2xl">{extremo.ultimoHorario}</div>
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