import React from "react";
import { RiBusLine, RiSearchEyeLine } from "@remixicon/react";

const EmptyState = ({ type = "initial" }) => {
  const isInitial = type === "initial";
  
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[200px]">
      <div className="bg-[var(--bg-input)] p-4 rounded-full mb-4 border border-[var(--border)]">
        {isInitial ? (
            <RiBusLine size={40} className="text-[var(--primary)]" />
        ) : (
            <RiSearchEyeLine size={40} className="text-[var(--primary)]" />
        )}
      </div>
      <h3 className="text-lg font-bold text-[var(--text-main)] mb-2">
        {isInitial ? "Vamos encontrar seu ônibus" : "Nada encontrado"}
      </h3>
      <p className="text-sm max-w-xs mx-auto text-[var(--text-muted)]">
        {isInitial 
            ? "Digite o número ou nome da linha acima para ver os horários."
            : "Não encontramos horários para esta combinação de linha e data."}
      </p>
    </div>
  );
};

export default EmptyState;