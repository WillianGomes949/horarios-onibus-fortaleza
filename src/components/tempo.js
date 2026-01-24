"use client";
import React, { useState, useEffect } from "react";
import { RiSunLine, RiUmbrellaLine } from "@remixicon/react";

const Tempo = ({ latitude = -3.7172, longitude = -38.5431 }) => {
  const [tempoData, setTempoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
          throw new Error("Erro na rede.");
        }
        const data = await response.json();

        const now = new Date();
        const currentIndex = data.hourly.time.findIndex(
          (time) => new Date(time) >= now
        );

        // Se currentIndex for -1 (não encontrado), usa o índice 0 como fallback
        const index = currentIndex !== -1 ? currentIndex : 0;

        setTempoData({
          temperature: data.hourly.temperature_2m[index],
          precipitation: data.hourly.precipitation_probability[index],
          uvIndex: Math.round(data.hourly.uv_index[index]),
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTempoData();
  }, [latitude, longitude]);

  const getUvColor = (uv) => {
      // Cores de alerta mantidas, mas garantindo contraste
      if (uv <= 2) return "bg-green-500 text-white"; // Baixo
      if (uv <= 5) return "bg-yellow-500 text-black"; // Moderado
      if (uv <= 7) return "bg-orange-500 text-white"; // Alto
      return "bg-red-500 text-white"; // Muito Alto/Extremo
  };

  if (loading || error || !tempoData) return null;

  return (
    <>
      {tempoData.precipitation > 0 && (
        <div className="flex items-center gap-1 text-xs font-medium text-[var(--text-muted)]" title="Chance de Chuva">
           <RiUmbrellaLine size={14} className="text-[var(--primary)]"/>
           {tempoData.precipitation}%
        </div>
      )}
      
      {tempoData.uvIndex > 0 && (
        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getUvColor(tempoData.uvIndex)}`} title={`Índice UV: ${tempoData.uvIndex}`}>
            <RiSunLine size={12} />
            UV {tempoData.uvIndex}
        </div>
      )}
    </>
  );
};

export default Tempo;