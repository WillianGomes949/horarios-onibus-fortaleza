import React, { useState, useEffect } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiWheelchairFill,
  RiTimeLine,
  RiTimerFlashLine,
} from "@remixicon/react";

const HorariosTable = ({ dados, linhaSelecionada }) => {
  const [tabelasVisiveis, setTabelasVisiveis] = useState({});
  const [proximosHorarios, setProximosHorarios] = useState([]);

  useEffect(() => {
    if (!dados || dados.length === 0) return;

    const agora = new Date();
    const horaAtual =
      agora.getHours().toString().padStart(2, "0") +
      ":" +
      agora.getMinutes().toString().padStart(2, "0");

    const todosHorarios = [];

    dados.forEach((posto) => {
      posto.horarios.forEach((horarioObj) => {
        todosHorarios.push({
          posto: posto.postoControle,
          horario: horarioObj.horario,
          tabela: horarioObj.tabela,
          acessivel: horarioObj.acessivel === "sim",
          timestamp: new Date(`2000-01-01T${horarioObj.horario}`).getTime(),
        });
      });
    });

    const horariosFuturos = todosHorarios
      .filter((h) => h.timestamp >= new Date(`2000-01-01T${horaAtual}`).getTime())
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(0, 4); 

    setProximosHorarios(horariosFuturos);
    
    // Auto-expandir a primeira tabela se houver dados
    if (dados.length > 0) {
        setTabelasVisiveis({ 0: true });
    }
  }, [dados]);

  const toggleTabela = (postoIndex) => {
    setTabelasVisiveis((prev) => ({
      ...prev,
      [postoIndex]: !prev[postoIndex],
    }));
  };

  if (!dados || dados.length === 0) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Cabeçalho da Linha */}
      <div className="text-center bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">
          {linhaSelecionada.numero}
        </h2>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase">
          {linhaSelecionada.nome}
        </p>
        <span className="inline-block mt-2 px-3 py-1 bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-400 text-xs font-bold rounded-full">
          {linhaSelecionada.tipoLinha}
        </span>
      </div>

      {/* Próximos Horários (Cards de Destaque) */}
      {proximosHorarios.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <RiTimerFlashLine className="text-orange-500" size={24} />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">
              Próximas Saídas
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {proximosHorarios.map((horario, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={index}
                  className={`relative p-3 rounded-xl border flex flex-col justify-between min-h-[110px] ${
                    isFirst
                      ? "bg-lime-600 text-white border-lime-600 shadow-lg shadow-lime-600/20"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700"
                  }`}
                >
                  {isFirst && (
                    <span className="absolute -top-2 -right-2 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-400 border-2 border-white"></span>
                    </span>
                  )}
                  
                  <div className="text-xs font-medium opacity-90 truncate pr-2">
                    {horario.posto}
                  </div>
                  
                  <div className={`text-3xl font-bold tracking-tighter my-1 ${isFirst ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                    {horario.horario}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs opacity-80">
                    <span>Tab: {horario.tabela}</span>
                    {horario.acessivel && <RiWheelchairFill size={16} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabelas Completas (Acordeão) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1 mb-2">
           <RiTimeLine className="text-slate-400" size={20} />
           <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300">
             Quadro Completo
           </h3>
        </div>

        {dados.map((posto, index) => (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <button
              onClick={() => toggleTabela(index)}
              className="w-full p-4 flex items-center justify-between bg-slate-50 dark:bg-slate-800/80 active:bg-slate-100 dark:active:bg-slate-700 transition-colors"
            >
              <div className="text-left overflow-hidden">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider">Saída de</span>
                <h4 className="font-semibold text-slate-700 dark:text-slate-200 truncate pr-4">
                  {posto.postoControle}
                </h4>
              </div>
              <div className="text-slate-400">
                {tabelasVisiveis[index] ? <RiArrowUpSLine size={24} /> : <RiArrowDownSLine size={24} />}
              </div>
            </button>

            {/* Conteúdo da Tabela com Animação simples de height seria ideal, mas aqui usamos render condicional */}
            {tabelasVisiveis[index] && (
              <div className="max-h-96 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 sticky top-0 z-10 shadow-sm">
                    <tr>
                      <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">Horário</th>
                      <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Acessível</th>
                      <th className="p-3 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Tabela</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {posto.horarios.map((horario, hIndex) => (
                      <tr 
                        key={hIndex} 
                        className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <td className="p-3 font-bold text-slate-700 dark:text-slate-300 font-mono text-base">
                          {horario.horario}
                        </td>
                        <td className="p-3 text-center">
                          {horario.acessivel === "sim" && (
                            <RiWheelchairFill size={18} className="inline text-blue-500" />
                          )}
                        </td>
                        <td className="p-3 text-right text-slate-500 dark:text-slate-400 font-mono">
                          {horario.tabela}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorariosTable;