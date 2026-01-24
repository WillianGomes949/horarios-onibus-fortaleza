'use client';

import { useMemo, useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { RiUserLocationFill } from '@remixicon/react';


// --- Configuração do Ícone "Blue Dot" Estilo Google ---
const createBlueDotIcon = () => {
  return L.divIcon({
    className: 'custom-user-marker', // Classe para referência (se precisar)
    html: `
      <div class="relative flex items-center justify-center w-[40px] h-[40px]">
        <div class="absolute w-[16px] h-[16px] bg-[#4285F4] rounded-full border-2 border-white shadow-md z-10"></div>
        <div class="absolute w-full h-full bg-[#4285F4] rounded-full opacity-30 animate-ping"></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20], // Metade do tamanho para centralizar
    popupAnchor: [0, -10]
  });
};

const CENTRO_FORTALEZA = [-3.7319, -38.5267];

// --- Sub-componente: Botão "Onde estou?" ---
function BotaoLocalizacao({ posicaoUsuario }) {
  const map = useMap();

  const handleLocalizar = () => {
    if (posicaoUsuario) {
      map.flyTo(posicaoUsuario, 16, {
        animate: true,
        duration: 1.5 // Animação suave
      });
    } else {
      alert("Localização ainda não detectada ou permissão negada.");
    }
  };

  return (
    <div className="leaflet-bottom leaflet-right m-4 z-[1000]">
      <div className="leaflet-control">
        <button
          onClick={handleLocalizar}
          className="bg-white text-gray-700 p-3 rounded-full shadow-lg hover:bg-gray-50 focus:outline-none transition-transform active:scale-95 border border-gray-200 flex items-center justify-center"
          title="Onde estou?"
          type="button"
        >
          {/* Ícone de seta/mira */}
          <RiUserLocationFill className={`${posicaoUsuario ? 'text-blue-600' : 'text-gray-400'}`} size={18} />
        </button>
      </div>
    </div>
  );
}

// --- Componente de Ajuste de Zoom da Rota ---
function AjustarZoom({ bounds }) {
  const map = useMap();
  useEffect(() => {
    if (bounds && Object.keys(bounds).length > 0) {
      map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1.5 });
    }
  }, [bounds, map]);
  return null;
}

export default function MapaOnibus({ dadosGeoJSON, numeroLinha, sentido }) {
  const [posicaoUsuario, setPosicaoUsuario] = useState(null);

  // Hook para capturar localização
  useEffect(() => {
    if ('geolocation' in navigator) {
      const geoId = navigator.geolocation.watchPosition(
        (position) => {
          setPosicaoUsuario([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.error("Erro GPS:", error),
        { enableHighAccuracy: true } // Melhora precisão para "ponto azul"
      );
      return () => navigator.geolocation.clearWatch(geoId);
    }
  }, []);

  const rotaFiltrada = useMemo(() => {
    if (!dadosGeoJSON || !dadosGeoJSON.features) return null;
    const numeroFormatado = numeroLinha.toString().padStart(3, '0');
    return dadosGeoJSON.features.find(feature => {
      const nome = feature.properties.Name || "";
      return nome.startsWith(`${numeroFormatado} -`) &&
        nome.toLowerCase().includes(sentido.toLowerCase());
    });
  }, [dadosGeoJSON, numeroLinha, sentido]);

  const corLinha = sentido === 'Ida' ? '#3b82f6' : '#ff6b00';

  return (
    <div className="w-full h-full relative group">
      <MapContainer
        center={CENTRO_FORTALEZA}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png" />

        {/* Rota do Ônibus */}
        {rotaFiltrada && (
          <>
            <GeoJSON
              key={rotaFiltrada.properties.Name}
              data={rotaFiltrada}
              style={{ color: corLinha, weight: 6, opacity: 0.85, lineCap: 'round' }}
            />
            <AjustarZoom bounds={L.geoJSON(rotaFiltrada).getBounds()} />
          </>
        )}

        {/* Marcador do Usuário (Blue Dot) */}
        {posicaoUsuario && (
          <Marker position={posicaoUsuario} icon={createBlueDotIcon()}>
             <Popup>Você está aqui</Popup>
          </Marker>
        )}

        {/* Botão Flutuante */}
        <BotaoLocalizacao posicaoUsuario={posicaoUsuario} />

      </MapContainer>
    </div>
  );
}