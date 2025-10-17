"use client";
// tempo.js
import React, { useState, useEffect } from "react";

const Tempo = ({ latitude = -3.7172, longitude = -38.5431 }) => {
  const [tempoData, setTempoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NOVO: Função para determinar o estilo do Índice UV
  const getUvIndexStyle = (uvIndex) => {
    const style = {
      fontWeight: "bold",
      padding: "0px 10px",
      borderRadius: "3px",
    };

    if (uvIndex <= 2) {
      return { ...style, color: "#fff", backgroundColor: "#28a745" }; // Baixo (Verde)
    }
    if (uvIndex <= 5) {
      return { ...style, color: "#000", backgroundColor: "#ffc107" }; // Moderado (Amarelo)
    }
    if (uvIndex <= 7) {
      return { ...style, color: "#fff", backgroundColor: "#fd7e14" }; // Alto (Laranja)
    }
    if (uvIndex <= 10) {
      return { ...style, color: "#fff", backgroundColor: "#dc3545" }; // Muito Alto (Vermelho)
    }
    // Acima de 10
    return { ...style, color: "#fff", backgroundColor: "#800080" }; // Extremo (Roxo)
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
}



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

      {/* MUDANÇA 1: Só mostra a chance de chuva se for maior que 0 */}
      {tempoData.precipitation > 0 && (
        <p>
          <strong>Chance de Chuva:</strong> {tempoData.precipitation}%
        </p>
      )}

      {/* MUDANÇA 2: Aplica o estilo dinâmico no Índice UV */}
      {tempoData.uvIndex > 0 && (
        <p className="flex gap-2">
          <strong>Índice UV:</strong>
          <span style={getUvIndexStyle(tempoData.uvIndex)} className="flex gap-4">
            {tempoData.uvIndex}
            <p>{infoUvIndex(tempoData.uvIndex)}</p>
          </span>
          
        </p>
      )}
    </div>
  );
};

export default Tempo;