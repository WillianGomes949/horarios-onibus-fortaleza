"use client";
// tempo.js
import React, { useState, useEffect } from "react";

const Tempo = ({ latitude = -3.7172, longitude = -38.5431 }) => {
  const [tempoData, setTempoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para determinar o estilo do Índice UV
  const getUvIndexClasses = (uvIndex) => {
    // Classes base para todos
    if (uvIndex <= 2) {
      return `text-white bg-lime-500`; // Baixo
    }
    if (uvIndex <= 5) {
      return `text-black bg-yellow-400`; // Moderado
    }
    if (uvIndex <= 7) {
      return `text-white bg-orange-500`; // Alto
    }
    if (uvIndex <= 10) {
      return `text-white bg-red-500`; // Muito Alto
    }
    return `text-white bg-purple-700`; // Extremo
  };
  const infoUvIndex = (uvIndex) => {
    if (uvIndex <= 2) {
      return "Baixo";
    }
    if (uvIndex <= 5) {
      return "Moderado";
    }
    if (uvIndex <= 7) {
      return "Alto";
    }
    if (uvIndex <= 10) {
      return "Muito Alto";
    }
  };

  useEffect(() => {
    const fetchTempoData = async () => {
      setLoading(true);
      setError(null);

      const params = {
        hourly: [
          "temperature_2m",
          "precipitation_probability",
          "uv_index",
        ].join(","),
      };
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=${params.hourly}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("A resposta da rede não foi bem-sucedida.");
        }
        const data = await response.json();

        const now = new Date();
        const currentIndex = data.hourly.time.findIndex(
          (time) => new Date(time) >= now
        );

        setTempoData({
          temperature: data.hourly.temperature_2m[currentIndex],
          precipitation: data.hourly.precipitation_probability[currentIndex],
          uvIndex: Math.round(data.hourly.uv_index[currentIndex]), // Arredonda o UV para um inteiro
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTempoData();
  }, [latitude, longitude]);

  if (loading) {
    return <div>...</div>;
  }

  if (error) {
    return <div>Erro ao buscar dados: {error}</div>;
  }

  if (!tempoData) {
    return null;
  }

  return (
    <div>
      {/* <h3>Clima Atual</h3>
      <p><strong>Temperatura:</strong> {tempoData.temperature}°C</p> */}

      {tempoData.precipitation > 0 && (
        <p>
          <strong>Chance de Chuva:</strong> {tempoData.precipitation}%
        </p>
      )}
      {tempoData.uvIndex > 0 && (
        <div className="flex gap-1.5 md:gap-2 items-center justify-start">
          <div>
            <p className="font-bold">Índice UV:</p>
          </div>
          <div className={`${getUvIndexClasses(tempoData.uvIndex)} flex gap-1 px-2 rounded `}>
            <p>{tempoData.uvIndex}</p>
            <p>{infoUvIndex(tempoData.uvIndex)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tempo;
