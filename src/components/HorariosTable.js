import React, { useState, useEffect } from "react";
import {
  RiShakeHandsFill,
  RiTableView,
  RiTimeFill,
  RiEyeLine,
  RiEyeOffLine,
  RiPushpinFill,
  RiBus2Fill,
} from "@remixicon/react";

const HorariosTable = ({ dados }) => {
  const [tabelasVisiveis, setTabelasVisiveis] = useState({});
  const [proximosHorarios, setProximosHorarios] = useState([]);

  // Calcular próximos horários baseado na hora atual
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
          acessivel: horarioObj.acessivel,
          timestamp: new Date(`2000-01-01T${horarioObj.horario}`).getTime(),
        });
      });
    });

    // Filtrar horários futuros (incluindo o atual) e ordenar
    const horariosFuturos = todosHorarios
      .filter(
        (h) => h.timestamp >= new Date(`2000-01-01T${horaAtual}`).getTime()
      )
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(0, 4); // Pegar os 4 próximos horários

    setProximosHorarios(horariosFuturos);
  }, [dados]);

  // Toggle para mostrar/ocultar tabela
  const toggleTabela = (postoIndex) => {
    setTabelasVisiveis((prev) => ({
      ...prev,
      [postoIndex]: !prev[postoIndex],
    }));
  };

  if (!dados || dados.length === 0) return null;

  return (
    <div className="space-y-6 mt-4">
      {/* Próximos Horários */}
      {proximosHorarios.length > 0 && (
        <div className=" bg-lime-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg p-2">
          <h3 className="text-lg font-bold text-lime-700 dark:text-lime-400 mb-3 flex items-center gap-2">
            <RiTimeFill size={20} />
            Próximos Horários
          </h3>

          <div className="flex flex-col md:flex-row items-baseline gap-2">
            {dados.map((posto, postoIndex) => {
              // Filtrar próximos horários apenas para este posto
              const proximosDestePosto = proximosHorarios
                .filter((horario) => horario.posto === posto.postoControle)
                .slice(0, 2); // Pegar apenas os 2 próximos deste posto

              if (proximosDestePosto.length === 0) return null;

              return (
                <div
                  key={postoIndex}
                  className=" w-full bg-lime-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg p-2"
                >
                  <div
                    className={`grid gap-2 ${
                      postoIndex > 2 || postoIndex < 4 ? "md:grid-cols-1" : "md:grid-cols-2"
                    }`}
                  >
                    {proximosDestePosto.map((horario, index) => {
                      const isProximoGeral =
                        proximosHorarios[0]?.posto === horario.posto &&
                        proximosHorarios[0]?.horario === horario.horario;

                      return (
                        <div
                          key={index}
                          className={`flex flex-col justify-between md:h-40 bg-white dark:bg-slate-600 rounded-lg p-2 border ${
                            isProximoGeral
                              ? "border-slate-400 dark:border-lime-500 shadow-lg"
                              : "border-slate-100 dark:border-slate-500"
                          }`}
                        >
                          <div>
                            <div className="font-bold text-lime-600 dark:text-lime-400 lg:text-sm text-xs">
                              {horario.posto}
                            </div>
                            <div className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">
                              {horario.horario}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              Tabela: {horario.tabela} • Adaptado:{" "}
                              {horario.acessivel}
                            </div>
                          </div>

                          <div>
                            <div className="">
                              {isProximoGeral && (
                                <div className="flex items-center gap-2 text-xs text-orange-500 dark:text-orange-400 mt-1">
                                  <span>
                                    <RiPushpinFill size={12} />
                                  </span>
                                  <p>Saída Prevista</p>
                                </div>
                              )}
                              {!isProximoGeral && index === 0 && (
                                <div className="flex items-center gap-2  text-xs text-orange-500 dark:text-orange-400 mt-1">
                                  <span>
                                    <RiPushpinFill size={12} />
                                  </span>
                                  <p>Próximo deste posto</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabelas de Horários */}
      <div className="space-y-4 div bg-lime-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg p-2">
        <div className="text-lg font-bold text-lime-700 dark:text-lime-400 mb-3 flex items-center gap-2">
          <RiBus2Fill size={20} />
          <h1>Todos os Horários</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {dados.map((posto, index) => (
            <div
              key={index}
              className="bg-lime-100 dark:bg-slate-700/50 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600"
            >
              {/* Cabeçalho da Tabela (sempre visível) */}
              <div
                className="p-2 cursor-pointer hover:bg-lime-200 dark:hover:bg-slate-600 transition-colors duration-200"
                onClick={() => toggleTabela(index)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <h3 className="text-xs md:text-lg font-semibold text-lime-600 dark:text-lime-400">
                      {posto.postoControle}
                    </h3>
                  </div>
                  <div className="flex md:flex-row items-center gap-2 text-slate-500 dark:text-slate-400">
                    {tabelasVisiveis[index] ? (
                      <>
                        <RiEyeOffLine size={18} />
                        <span className="text-sm">Ocultar</span>
                      </>
                    ) : (
                      <>
                        <RiEyeLine size={18} />
                        <span className="text-sm">Mostrar</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabela (visível apenas quando ativada) */}
              {tabelasVisiveis[index] && (
                <div className="max-h-80 overflow-y-auto custom-scrollbar pr-2">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-lime-50 dark:bg-slate200 dark:bg-slate-800 sticky top-0">
                      <tr>
                        <th className="p-2 text-lime-700 dark:text-slate-300">
                          <RiTimeFill size={16} /> Horário
                        </th>

                        <th className="p-2 text-lime-700 dark:text-slate-300">
                          <RiShakeHandsFill size={16} /> Acessível
                        </th>
                        <th className="p-2 text-lime-700 dark:text-slate-300">
                          <RiTableView size={16} /> Tabela
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {posto.horarios.map((horario, horarioIndex) => {
                        const isExtra = parseInt(horario.tabela, 10) > 100;
                        return (
                          <tr
                            key={horarioIndex}
                            className={`bg-lime-50 dark:bg-slate-700/50 border-b border-slate-300 dark:border-slate-600 ${
                              isExtra
                                ? "text-amber-500 dark:text-amber-400"
                                : "text-slate-700 dark:text-slate-300"
                            }`}
                            title={isExtra ? "Extra" : ""}
                          >
                            <td className="p-2 font-mono">{horario.horario}</td>

                            <td className="p-2 capitalize">
                              {horario.acessivel}
                            </td>
                            <td className="p-2 font-mono">{horario.tabela}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorariosTable;
