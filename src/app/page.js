'use client';

import React, { useState, useEffect } from 'react';
import { buscarLinhas, buscarHorarios } from '@/services/api';
import { RiBusFill } from '@remixicon/react';
import ResultsSection from '@/components/ResultsSection';
import SearchForm from '@/components/SearchForm';


export default function BusScheduleApp() {
  const [linha, setLinha] = useState('');
  const [linhas, setLinhas] = useState([]);
  const [dados, setDados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingLinhas, setLoadingLinhas] = useState(false);
  const [error, setError] = useState(null);
  const [linhaSelecionada, setLinhaSelecionada] = useState(null);
  const [data, setData] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // Buscar lista de linhas ao carregar
  useEffect(() => {
    const carregarLinhas = async () => {
      setLoadingLinhas(true);
      try {
        const linhasData = await buscarLinhas();
        setLinhas(linhasData);
      } catch (err) {
        setError('Erro ao carregar lista de linhas');
      } finally {
        setLoadingLinhas(false);
      }
    };

    carregarLinhas();
  }, []);

  const handleBuscarHorarios = async (linhaNumero, dataSelecionada, linhaInfo = null) => {
    if (!linhaNumero) {
      setError('Por favor, selecione uma linha.');
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
        const linhaEncontrada = linhas.find(l => l.numero.toString() === linhaNumero);
        setLinhaSelecionada(linhaEncontrada);
      }

      if (!horarios || horarios.length === 0) {
        setError('Nenhum horário encontrado para esta linha na data selecionada.');
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
    <main className="flex justify-center min-h-screen bg-gray-900 text-white font-sans p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
        
        {/* Cabeçalho */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-cyan-400 flex items-center justify-center">
            <RiBusFill />
            Consulta de Horários
          </h1>
          <p className="text-gray-400 mt-2">Veja os horários da sua linha de ônibus em tempo real.</p>
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

        {/* Seção de Resultados */}
        <ResultsSection
          dados={dados}
          loading={loading}
          error={error}
          linhaSelecionada={linhaSelecionada}
        />
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #1f2937; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6b7280; }
      `}</style>
    </main>
  );
}