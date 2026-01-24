import React, { useState, useEffect } from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiWheelchairFill,
  RiTimeLine,
  RiTimerFlashLine,
} from "@remixicon/react";
import LineHeader from "./LineHeader";

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
    // if (dados.length > 0) {
    //   setTabelasVisiveis({ 0: true });
    // }
  }, [dados]);

  const toggleTabela = (postoIndex) => {
    setTabelasVisiveis((prev) => ({
      ...prev,
      [postoIndex]: !prev[postoIndex],
    }));
  };

  if (!dados || dados.length === 0) return null;

  const linhaSafe = linhaSelecionada || {
    numero: '?',
    nome: 'Linha não identificada',
    tipoLinha: 'Urbano'
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Cabeçalho da Linha */}
      <div className="text-center bg-[var(--bg-card)] p-4 rounded-[var(--radius)] shadow-lg border border-[var(--border)]">
        <h2 className="text-2xl font-black text-[var(--primary)] tracking-tight">
          {/* Usa linhaSafe em vez de linhaSelecionada diretamente */}
          {linhaSafe.numero}
        </h2>
        <p className="text-sm font-medium text-[var(--text-main)] mt-1 uppercase">
          {linhaSafe.nome}
        </p>
        <span className="inline-block mt-3 px-3 py-1 bg-[var(--primary-glow)] text-[var(--primary)] text-xs font-bold rounded-full border border-[var(--primary)]/30">
          {linhaSafe.tipoLinha}
        </span>
      </div>

      {/* Próximos Horários (Cards de Destaque) */}
      {proximosHorarios.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <RiTimerFlashLine className="text-[var(--primary)]" size={24} />
            <h3 className="text-lg font-bold text-[var(--text-main)]">
              Próximas Saídas
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {proximosHorarios.map((horario, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={index}
                  className={`relative p-3 rounded-[var(--radius)] border flex flex-col justify-between min-h-[110px] transition-all duration-300 ${isFirst
                      ? "bg-[var(--primary)] text-white border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20"
                      : "bg-[var(--bg-input)] text-[var(--text-muted)] border-[var(--border)]"
                    }`}
                >
                  {isFirst && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-50"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
                    </span>
                  )}

                  <div className={`text-xs font-medium truncate pr-2 ${isFirst ? 'text-white/90' : 'text-[var(--text-muted)]'}`}>
                    {horario.posto}
                  </div>

                  <div className={`text-3xl font-bold tracking-tighter my-1 ${isFirst ? 'text-white' : 'text-[var(--text-main)]'}`}>
                    {horario.horario}
                  </div>

                  <div className={`flex items-center justify-between text-xs ${isFirst ? 'text-white/80' : 'text-[var(--text-muted)]'}`}>
                    <span>Tab: {horario.tabela}</span>
                    {horario.acessivel && <RiWheelchairFill size={16} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Passamos o linhaSafe também para o Header para evitar erro lá */}
      <LineHeader linhaSelecionada={linhaSafe} dados={dados} />

      {/* Tabelas Completas (Acordeão) */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 px-1 mb-2">
          <RiTimeLine className="text-[var(--text-muted)]" size={20} />
          <h3 className="text-lg font-bold text-[var(--text-main)]">
            Quadro Completo
          </h3>
        </div>

        {/* --- ALTERAÇÃO AQUI: Grid responsivo --- */}
        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 items-start">
          {dados.map((posto, index) => (
            <div
              key={index}
              className="bg-[var(--bg-card)] rounded-[var(--radius)] overflow-hidden border border-[var(--border)] shadow-sm"
            >
              <button
                onClick={() => toggleTabela(index)}
                className="w-full p-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <div className="text-left overflow-hidden">
                  <span className="text-xs text-[var(--text-muted)] uppercase font-bold tracking-wider">Saída de</span>
                  <h4 className="font-semibold text-[var(--text-main)] truncate pr-4">
                    {posto.postoControle}
                  </h4>
                </div>
                <div className="text-[var(--primary)]">
                  {tabelasVisiveis[index] ? <RiArrowUpSLine size={24} /> : <RiArrowDownSLine size={24} />}
                </div>
              </button>

              {/* Conteúdo da Tabela */}
              {tabelasVisiveis[index] && (
                <div className="max-h-96 overflow-y-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[var(--bg-input)] sticky top-0 z-10 shadow-sm backdrop-blur-md">
                      <tr>
                        <th className="p-3 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Horário</th>
                        <th className="p-3 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider text-center">Acessível</th>
                        <th className="p-3 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider text-right">Tabela</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border)]">
                      {posto.horarios.map((horario, hIndex) => (
                        <tr
                          key={hIndex}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="p-3 font-bold text-[var(--text-main)] font-mono text-base">
                            {horario.horario}
                          </td>
                          <td className="p-3 text-center">
                            {horario.acessivel === "sim" && (
                              <RiWheelchairFill size={18} className="inline text-[var(--primary)]" />
                            )}
                          </td>
                          <td className="p-3 text-right text-[var(--text-muted)] font-mono">
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
    </div>
  );
};

export default HorariosTable;