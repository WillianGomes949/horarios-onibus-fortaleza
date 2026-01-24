import React, { useState, useEffect } from "react";
import Image from "next/image";
import { buscarClima } from "@/services/api";
import { RiMapPinLine, RiWindyLine } from "@remixicon/react";
import Tempo from "./tempo";

const Clima = () => {
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClima = async () => {
      try {
        const data = await buscarClima();
        setClima(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchClima();
  }, []);

  if (loading) return (
    <div className="bg-[var(--bg-input)] rounded-[var(--radius)] p-4 h-32 animate-pulse flex items-center justify-center border border-[var(--border)]">
        <span className="text-[var(--text-muted)] text-sm">Carregando clima...</span>
    </div>
  );

  if (error) return null; 
  if (!clima) return null;

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-[var(--radius)] p-4 shadow-lg relative overflow-hidden backdrop-blur-sm">
        {/* Decoração de fundo (Glow Laranja Sutil) */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>

        <div className="relative z-10 flex justify-between items-center text-[var(--text-main)]">
            <div>
                <div className="flex items-center gap-1 text-[var(--primary)] text-xs font-bold uppercase mb-1 tracking-wider">
                    <RiMapPinLine size={14} />
                    {clima.name}
                </div>
                <div className="text-4xl font-bold tracking-tighter">
                    {Math.round(clima.main.temp)}°
                </div>
                <div className="text-sm text-[var(--text-muted)]">
                    Sensação {Math.round(clima.main.feels_like)}°
                </div>
            </div>

            <div className="flex flex-col items-center">
                <Image
                    src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
                    alt={clima.weather[0].description}
                    width={60}
                    height={60}
                    className="drop-shadow-sm opacity-90"
                />
                <span className="text-xs capitalize font-medium text-center max-w-20 leading-tight text-[var(--text-muted)]">
                    {clima.weather[0].description}
                </span>
            </div>
        </div>

        {/* Footer do Widget com dados extras */}
        <div className="mt-4 pt-3 border-t border-[var(--border)] flex flex-wrap gap-3 items-center">
             <div className="flex items-center gap-1 text-xs font-medium text-[var(--text-muted)]">
                <RiWindyLine size={14} className="text-[var(--primary)]"/>
                {clima.wind.speed} m/s
             </div>
             {/* Componente Tempo injetado aqui */}
             <Tempo /> 
        </div>
    </div>
  );
};

export default Clima;