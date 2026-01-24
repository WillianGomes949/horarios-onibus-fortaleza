import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'; // Importação do dynamic para o Mapa
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiWheelchairFill,
  RiTimeLine,
  RiTimerFlashLine,
  RiMapPin2Line, // Ícone para o mapa
  RiExchangeLine // Ícone para troca de sentido
} from "@remixicon/react";
import LineHeader from "./LineHeader";

// --- IMPORTAÇÃO DINÂMICA DO MAPA (Vindo da page.js) ---
const MapaOnibus = dynamic(() => import('./MapaOnibus'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-[var(--bg-input)] animate-pulse rounded-2xl flex flex-col items-center justify-center text-[var(--text-muted)] gap-3 border border-dashed border-[var(--border)]">
      <div className="w-10 h-10 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
      <span className="text-sm font-medium">Carregando mapa...</span>
    </div>
  )
});

const HorariosTable = ({ dados, linhaSelecionada }) => {
  // States da Tabela
  const [tabelasVisiveis, setTabelasVisiveis] = useState({});
  const [proximosHorarios, setProximosHorarios] = useState([]);

  // States do Mapa (Vindos da page.js)
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [sentidoMapa, setSentidoMapa] = useState("Ida");
  const [loadingMap, setLoadingMap] = useState(true);

  // 1. Lógica dos Horários (Existente)
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
  }, [dados]);

  // 2. Lógica de Carregamento do Mapa (Vinda da page.js)
  useEffect(() => {
    fetch('/mergedfile.geojson')
      .then(res => res.json())
      .then(data => {
        setGeoJsonData(data);
        setLoadingMap(false);
      })
      .catch(err => {
        console.error("Erro ao carregar rotas do mapa:", err);
        setLoadingMap(false);
      });
  }, []);

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
    <div className="space-y-8 animate-fade-in py-6">
      {/* Cabeçalho da Linha */}
      <div className="text-center bg-[var(--bg-card)] p-4 rounded-[var(--radius)] shadow-lg border border-[var(--border)]">
        <h2 className="text-2xl font-black text-[var(--primary)] tracking-tight">
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
        <div className="space-y-3 py-6">
          <div className="flex items-center gap-2 mb-6">
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
                    ? "bg-[var(--primary)] text-[var(--text-main)] border-[var(--primary)] shadow-lg shadow-[var(--primary)]/20"
                    : "bg-[var(--bg-input)] text-[var(--text-muted)] border-[var(--border)]"
                    }`}
                >
                  {isFirst && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--text-main)] opacity-50"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-[var(--text-main)]"></span>
                    </span>
                  )}
                  <div className={`text-xs font-medium truncate pr-2 ${isFirst ? 'text-[var(--text-main)]/90' : 'text-[var(--text-muted)]'}`}>
                    {horario.posto}
                  </div>
                  <div className={`text-3xl font-bold tracking-tighter my-1 ${isFirst ? 'text-[var(--text-main)]' : 'text-[var(--text-main)]'}`}>
                    {horario.horario}
                  </div>
                  <div className={`flex items-center justify-between text-xs ${isFirst ? 'text-[var(--text-main)]/80' : 'text-[var(--text-muted)]'}`}>
                    <span>Tab: {horario.tabela}</span>
                    {horario.acessivel && <RiWheelchairFill size={16} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Header Intermediário */}
      <LineHeader linhaSelecionada={linhaSafe} dados={dados} />

      {/* Tabelas Completas (Acordeão) */}
      <div className="space-y-4 py-6">
        <div className="flex items-center gap-2 px-1 mb-6">
          <RiTimeLine className="text-[var(--text-muted)]" size={24} />
          <h3 className="text-lg font-bold text-[var(--text-main)]">
            Quadro Completo
          </h3>
        </div>

        <div className="space-y-4 md:space-y-0 md:grid md:grid-cols-2 md:gap-4 items-start">
          {dados.map((posto, index) => (
            <div
              key={index}
              className="bg-[var(--bg-card)] rounded-[var(--radius)] overflow-hidden border border-[var(--border)] shadow-sm"
            >
              <button
                onClick={() => toggleTabela(index)}
                className="w-full p-4 flex items-center justify-between hover:bg-[var(--text-main)]/5 transition-colors"
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

              {tabelasVisiveis[index] && (
                <div className="p-4 bg-black/20 border-t border-[var(--border)] max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                    {posto.horarios.map((horario, hIndex) => (
                      <div
                        key={hIndex}
                        className="bg-[var(--bg-input)] text-[var(--text-main)] border border-[var(--border)] rounded py-2 text-center font-mono font-bold text-base hover:bg-[var(--primary)] hover:border-[var(--primary)] hover:text-[var(--text-main)] transition-all cursor-default"
                      >
                        {horario.horario}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* --- SEÇÃO DO MAPA (Integrada) --- */}
      <div className="space-y-4 pb-8">
        <div className="flex items-center justify-between px-1 mb-4">
          <div className="flex items-center gap-2">
            <RiMapPin2Line className="text-[var(--primary)]" size={24} />
            <h3 className="text-lg font-bold text-[var(--text-main)]">
              Mapa do Trajeto
            </h3>
          </div>
        </div>

        {/* Controles de Sentido (Adaptado da page.js para o estilo do HorariosTable) */}
        <div className="bg-[var(--bg-card)] p-2 rounded-[var(--radius)] border border-[var(--border)] mb-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 flex gap-2">
              <button
                onClick={() => setSentidoMapa("Ida")}
                className={`flex-1 py-3 px-4 rounded-[calc(var(--radius)-4px)] text-sm font-bold transition-all flex items-center justify-center gap-2 border ${
                  sentidoMapa === "Ida"
                    ? "bg-blue-600/10 border-blue-600 text-blue-500 shadow-sm"
                    : "bg-transparent border-transparent text-[var(--text-muted)] hover:bg-[var(--text-main)]/5"
                }`}
              >
                Ida <span className="text-lg">➝</span>
              </button>
              <button
                onClick={() => setSentidoMapa("Volta")}
                className={`flex-1 py-3 px-4 rounded-[calc(var(--radius)-4px)] text-sm font-bold transition-all flex items-center justify-center gap-2 border ${
                  sentidoMapa === "Volta"
                    ? "bg-orange-600/10 border-orange-600 text-orange-500 shadow-sm"
                    : "bg-transparent border-transparent text-[var(--text-muted)] hover:bg-[var(--text-main)]/5"
                }`}
              >
                <span className="text-lg">←</span> Volta
              </button>
            </div>
          </div>
        </div>

        {/* Componente do Mapa */}
        <div className="h-[450px] w-full relative rounded-[var(--radius)] overflow-hidden border border-[var(--border)] shadow-lg bg-[var(--bg-card)]">
          {loadingMap ? (
             <div className="absolute inset-0 flex items-center justify-center bg-[var(--bg-card)] text-[var(--text-muted)]">
                Carregando mapa...
             </div>
          ) : (
            <MapaOnibus
              dadosGeoJSON={geoJsonData}
              numeroLinha={linhaSafe.numero}
              sentido={sentidoMapa}
            />
          )}
        </div>
      </div>

    </div>
  );
};

export default HorariosTable;