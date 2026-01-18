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
    <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 h-32 animate-pulse flex items-center justify-center border border-slate-200 dark:border-slate-700">
        <span className="text-slate-400 text-sm">Carregando clima...</span>
    </div>
  );

  if (error) return null; 
  if (!clima) return null;

  return (
    <div className="bg-linear-to-br from-blue-500 to-blue-600 dark:from-slate-800 dark:to-slate-900 rounded-xl p-4 text-white shadow-lg relative overflow-hidden">
        {/* Decoração de fundo */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>

        <div className="relative z-10 flex justify-between items-center">
            <div>
                <div className="flex items-center gap-1 text-blue-100 text-xs font-medium mb-1">
                    <RiMapPinLine size={14} />
                    {clima.name}
                </div>
                <div className="text-4xl font-bold tracking-tighter">
                    {Math.round(clima.main.temp)}°
                </div>
                <div className="text-sm text-blue-100">
                    Sensação {Math.round(clima.main.feels_like)}°
                </div>
            </div>

            <div className="flex flex-col items-center">
                <Image
                    src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
                    alt={clima.weather[0].description}
                    width={60}
                    height={60}
                    className="drop-shadow-md"
                />
                <span className="text-xs capitalize font-medium text-center max-w-20 leading-tight">
                    {clima.weather[0].description}
                </span>
            </div>
        </div>

        {/* Footer do Widget com dados extras */}
        <div className="mt-4 pt-3 border-t border-white/20 flex flex-wrap gap-3 items-center">
             <div className="flex items-center gap-1 text-xs font-medium">
                <RiWindyLine size={14} className="opacity-70"/>
                {clima.wind.speed} m/s
             </div>
             {/* Componente Tempo injetado aqui */}
             <Tempo /> 
        </div>
    </div>
  );
};

export default Clima;