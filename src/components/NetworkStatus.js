'use client';

import { useState, useEffect } from 'react';
import { RiWifiOffLine } from "@remixicon/react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Verifica estado inicial
    if (typeof window !== 'undefined') {
      setIsOnline(navigator.onLine);
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-bounce">
      <div className="bg-red-600/90 backdrop-blur-md text-white px-4 py-3 rounded-[var(--radius)] shadow-lg flex items-center justify-center gap-3 border border-red-500/50">
        <RiWifiOffLine size={20} />
        <span className="font-medium text-sm">Você está offline. Verifique sua conexão.</span>
      </div>
    </div>
  );
};

export default NetworkStatus;