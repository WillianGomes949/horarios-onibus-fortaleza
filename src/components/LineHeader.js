import { RiMapPinTimeLine } from "@remixicon/react";
import React from "react";

const LineHeader = ({ linhaSelecionada, dados }) => {
  const horaParaMinutos = (hora) => {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  };

  const getHorariosExtremos = () => {
    if (!dados || !Array.isArray(dados)) return [];

    return dados.map((posto) => {
      if (!posto.horarios || posto.horarios.length === 0) {
        return {
          posto: posto.postoControle,
          primeiroHorario: "--:--",
          ultimoHorario: "--:--",
        };
      }

      let horariosOrdenados;

      if (linhaSelecionada.tipoLinha === "Corujão") {
        horariosOrdenados = [...posto.horarios].sort(
          (a, b) => horaParaMinutos(a.horario) - horaParaMinutos(b.horario)
        );
      } else {
        horariosOrdenados = [...posto.horarios].sort((a, b) => {
          const minA = horaParaMinutos(a.horario);
          const minB = horaParaMinutos(b.horario);
          const ajustadoA = minA < 240 ? minA + 24 * 60 : minA;
          const ajustadoB = minB < 240 ? minB + 24 * 60 : minB;
          return ajustadoA - ajustadoB;
        });
      }

      return {
        posto: posto.postoControle,
        primeiroHorario: horariosOrdenados[0].horario,
        ultimoHorario: horariosOrdenados[horariosOrdenados.length - 1].horario,
      };
    });
  };

  const horariosExtremos = getHorariosExtremos();

  if (horariosExtremos.length === 0) return null;

  return (
    <section>
      <div className="flex items-center gap-2 py-6">
        <RiMapPinTimeLine className="text-[var(--text-muted)]" size={24} />
        <h3 className="text-lg font-bold text-[var(--text-main)]">
          Funcionamento da Linha
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {horariosExtremos.map((extremo, index) => (
          <div
            key={index}
            className="bg-[var(--bg-input)] rounded-[var(--radius)] p-4 border-l-4 border-[var(--primary)] hover:brightness-110 transition-all"
          >
            <h3 className="font-semibold text-[var(--text-main)] text-sm mb-3 uppercase tracking-wide truncate" title={extremo.posto}>
              {extremo.posto}
            </h3>

            <div className="flex justify-between items-center px-2">
              <div className="text-center">
                <span className="block text-xs text-[var(--text-muted)] uppercase font-medium mb-1">Início</span>
                <span className="block text-3xl font-bold text-[var(--text-main)] tracking-tight">
                  {extremo.primeiroHorario}
                </span>
              </div>

              <div className="h-8 w-px bg-[var(--border)]"></div>

              <div className="text-center">
                <span className="block text-xs text-[var(--text-muted)] uppercase font-medium mb-1">Fim</span>
                <span className="block text-3xl font-bold text-[var(--text-main)] tracking-tight">
                  {extremo.ultimoHorario}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LineHeader;