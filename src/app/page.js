"use client";

import React, { useState, useEffect } from "react";
import { buscarLinhas, buscarHorarios } from "@/services/api";
import { RiBusFill } from "@remixicon/react";
import ResultsSection from "@/components/ResultsSection";
import SearchForm from "@/components/SearchForm";
import NetworkStatus from "@/components/NetworkStatus";
import DownloadPDF from "@/components/DownloadPDF";
import Clima from "@/components/Weather";
import { MarqueeComponent } from "@/components/fast";

export default function BusScheduleApp() {
  const [linha, setLinha] = useState("");
  const [linhas, setLinhas] = useState([]);
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingLinhas, setLoadingLinhas] = useState(false);
  const [error, setError] = useState(null);
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);
  const [data, setData] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });

  // Buscar lista de linhas ao carregar
  useEffect(() => {
    const carregarLinhas = async () => {
      setLoadingLinhas(true);
      try {
        const linhasData = await buscarLinhas();
        setLinhas(linhasData);
      } catch (err) {
        setError("Erro ao carregar lista de linhas");
      } finally {
        setLoadingLinhas(false);
      }
    };

    carregarLinhas();
  }, []);

  const handleBuscarHorarios = async (
    linhaNumero,
    dataSelecionada,
    linhaInfo = null
  ) => {
    if (!linhaNumero) {
      setError("Por favor, selecione uma linha.");
      return;
    }

    setLoading(true);
    setError(null);
    setDados(null);

    try {
      const horarios = await buscarHorarios(linhaNumero, dataSelecionada);
      setDados(horarios);

      if (linhaInfo) {
        setLinhaSelecionada(linhaInfo);
      } else {
        // Encontra a linha selecionada para mostrar o nome
        const linhaEncontrada = linhas.find(
          (l) => l.numero.toString() === linhaNumero
        );
        setLinhaSelecionada(linhaEncontrada);
      }

      if (!horarios || horarios.length === 0) {
        setError(
          "Nenhum horário encontrado para esta linha na data selecionada."
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelecionarLinha = (linhaItem) => {
    setLinha(linhaItem.numero.toString());
    setLinhaSelecionada(linhaItem);
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-sans p-2">
      <NetworkStatus />
      <div className="w-full max-w-4xl  bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-2 lg:p-8 space-y-6">
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-xl flex gap-2 md:text-3xl font-bold text-lime-600 dark:text-lime-400 items-center justify-center">
            <RiBusFill size={40} />
            Horários de Ônibus Fortaleza
          </h1>
          <p className=" text-slate-500 dark:text-slate-400 mt-2">
            Veja os horários atualizados das linhas de ônibus.
          </p>
        </div>
        {/* Formulário de Busca */}
        <SearchForm
          linha={linha}
          data={data}
          linhas={linhas}
          loading={loading}
          loadingLinhas={loadingLinhas}
          onLinhaChange={setLinha}
          onDataChange={setData}
          onBuscarHorarios={handleBuscarHorarios}
          onSelecionarLinha={handleSelecionarLinha}
        />
        <div className="flex justify-between items-center">
          <DownloadPDF
            dados={dados}
            linhaSelecionada={linhaSelecionada}
            data={data}
          />
        </div>
        {/* Seção de Resultados */}
        <ResultsSection
          dados={dados}
          loading={loading}
          error={error}
          linhaSelecionada={linhaSelecionada}
        />
        <section>
          <MarqueeComponent/>
        </section>
        {/* Clima */}
        <section>
          <Clima />
        </section>
        <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
          Willian Gomes © 2025
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent; /* slate-50 */
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: none; /* slate-800 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1; /* slate-300 */
          border-radius: 4px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #475569; /* slate-600 */
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; /* slate-400 */
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #64748b; /* slate-500 */
        }
      `}</style>
    </main>
  );
}
