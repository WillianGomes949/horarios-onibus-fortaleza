import React, { useState, useEffect } from "react";
import Image from "next/image";
import { buscarClima } from "@/services/api";
import { RiAlertLine, RiLoader3Line } from "@remixicon/react";
import Tempo from "./tempo";

const Clima = () => {
  // Estados para armazenar os dados do clima, o status de carregamento e possíveis erros
  const [clima, setClima] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Função assíncrona para buscar os dados do clima
    const fetchClima = async () => {
      try {
        // Chama a função da sua api.js
        const data = await buscarClima();
        setClima(data);
      } catch (err) {
        // Em caso de erro, atualiza o estado de erro
        setError(err.message);
      } finally {
        // Ao final (sucesso ou erro), define o carregamento como falso
        setLoading(false);
      }
    };

    fetchClima();
  }, []); // O array vazio [] garante que o useEffect rode apenas uma vez, quando o componente é montado

  // Renderização condicional baseada nos estados
  if (loading) {
    return (
      <div className="flex gap-4 py-8">
        <RiLoader3Line className="animate-spin text-orange-400" />
        <p>Carregando clima...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex gap-4 py-8">
        <RiAlertLine className=" text-red-400" />
        <p>Erro ao buscar o clima: {error}</p>
      </div>
    );
  }

  // Se não houver dados, não renderiza nada
  if (!clima) {
    return null;
  }

  // Renderização principal do componente com os dados do clima
  return (
      <div className=" flex justify-between align-middle border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 p-8 rounded-lg shadow-md bg-gray-300 dark:bg-slate-700/50 gap-2">
        <div className="flex flex-col justify-between">
          <h2 className="dark:text-lime-500 font-bold">
            Clima em {clima.name}
          </h2>

          <p className="font-bold text-4xl">{Math.round(clima.main.temp)}°C</p>
          <div>
            <p>
              <strong>Sensação Térmica:</strong>{" "}
              {Math.round(clima.main.feels_like)}
              °C
            </p>
            <p>
              <strong>Umidade:</strong> {clima.main.humidity}%
            </p>
            <p>
              <strong>Vento:</strong> {clima.wind.speed} m/s
            </p>
            <Tempo />
          </div>
        </div>
        <div className="flex flex-col justify-center align-middle">
          <Image
            className="drop-shadow-xl/20"
            width={150}
            height={150}
            src={`https://openweathermap.org/img/wn/${clima.weather[0].icon}@2x.png`}
            alt={clima.weather[0].description}
          />
          <p className="text-center capitalize">
            {clima.weather[0].description}
          </p>
          
        </div>
      </div>
  );
};

export default Clima;
