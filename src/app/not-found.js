import Link from "next/link";
import { RiBusWifiLine, RiHome4Line, RiSearchLine } from "@remixicon/react";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">

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
      
      {/* Card Centralizado com efeito Glass */}
      <div>
        
        {/* Ícone de Alerta Animado */}
        <div className="relative mb-8 inline-block">
          <div className="absolute inset-0 bg-[var(--primary)] rounded-full animate-ping opacity-20"></div>
          <div className="relative bg-[var(--bg-input)] p-6 rounded-full border border-[var(--primary)]/30">
            <RiBusWifiLine size={64} className="text-[var(--primary)]" />
          </div>
        </div>

        {/* Título Impactante */}
        <h1 className="text-6xl md:text-8xl font-bold text-[var(--text-main)] mb-2 tracking-tighter">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-[var(--text-main)] mb-4">
          Você desceu no ponto errado!
        </h2>

        {/* Texto Contextualizado */}
        <p className="text-[var(--text-muted)] max-w-md mx-auto mb-10 text-lg leading-relaxed">
          Essa rota não existe ou foi desativada. Parece que você tentou pegar um atalho que não está no nosso itinerário.
        </p>

        {/* Ações */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link 
            href="/" 
            className="w-full sm:w-auto px-8 py-3 rounded-[var(--radius)] bg-[var(--primary)] text-white font-bold shadow-lg shadow-[var(--primary)]/20 hover:bg-[var(--primary-hover)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RiHome4Line size={20} />
            Voltar ao Início
          </Link>

          <Link 
            href="/" 
            className="w-full sm:w-auto px-8 py-3 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--bg-input)] text-[var(--text-muted)] font-semibold hover:text-[var(--text-main)] hover:border-[var(--primary)] transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RiSearchLine size={20} />
            Buscar outra Linha
          </Link>
        </div>

        {/* Detalhe de Rodapé Visual */}
        <div className="mt-12 text-xs text-[var(--text-muted)] font-mono uppercase tracking-widest opacity-50">
          Erro: ROUTE_NOT_FOUND_EXCEPTION
        </div>
      </div>
    </div>
  );
}