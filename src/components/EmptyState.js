import React from "react";
import { RiBusLine, RiSearchEyeLine } from "@remixicon/react";

const EmptyState = ({ type = "initial" }) => {
  const isInitial = type === "initial";
  
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[200px] text-slate-400">
      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-full mb-4">
        {isInitial ? <RiBusLine size={40} /> : <RiSearchEyeLine size={40} />}
      </div>
      <h3 className="text-lg font-semibold text-slate-600 dark:text-slate-200 mb-1">
        {isInitial ? "Vamos encontrar seu ônibus" : "Nada encontrado"}
      </h3>
      <p className="text-sm max-w-xs mx-auto text-slate-500">
        {isInitial 
            ? "Digite o número ou nome da linha acima para ver os horários."
            : "Não encontramos horários para esta combinação de linha e data."}
      </p>
    </div>
  );
};

export default EmptyState;