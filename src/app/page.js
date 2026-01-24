"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; // Importando o componente Image
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
        // Correção para aceitar "026" e "26" na busca
        const linhaEncontrada = linhas.find(
          (l) => l.numero.toString() === linhaNumero || parseInt(l.numero) === parseInt(linhaNumero)
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

  const currentYear = new Date().getFullYear();

  return (
    <main className="flex justify-center items-center min-h-screen font-sans p-2 relative">
      
      {/* Background com Next/Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/fortalezaMap.webp"
          alt="Mapa de Fortaleza Background"
          fill
          priority
          quality={100}
          className="object-cover opacity-60"
        />
        {/* Overlay Escuro para legibilidade */}
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <NetworkStatus />

      {/* Card Principal com o tema Dark Premium */}
      <div className="w-full max-w-4xl bg-[var(--bg-card)] border border-[var(--border)]  rounded-[var(--radius)] shadow-2xl p-4 lg:p-8 space-y-6">

        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-xl md:text-3xl font-bold text-[var(--primary)] flex gap-2 items-center justify-center">
            <RiBusFill size={40} />
            Horários de Ônibus Fortaleza
          </h1>
          <p className="text-[var(--text-muted)] mt-2">
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

        {/* Clima */}
        <section>
          <Clima />
        </section>

        <section>
          <MarqueeComponent />
        </section>

        <div className="text-center text-sm text-[var(--text-muted)] mt-4">
          <a href="https://www.williangomesdev.com/" target="_blank" className="hover:text-[var(--primary)] transition-colors">Willian Gomes</a> &copy; {currentYear}
        </div>
      </div>
    </main>
  );
}