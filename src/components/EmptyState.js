import React from "react";
import { RiSpam2Line, RiMenuSearchLine } from "@remixicon/react";

const EmptyState = ({ type = "initial" }) => {
  const messages = {
    initial: {
      icon: RiMenuSearchLine,
      title: "Busque os horários acima",
      description: "Selecione uma linha e uma data para consultar os horários",
    },
    noResults: {
      icon: RiSpam2Line,
      title: "Nenhum horário encontrado",
      description:
        "Não foram encontrados horários para esta linha na data selecionada",
    },
  };

  const { icon: Icon, title, description } = messages[type];

  return (
    <div className=" bg-slate-100 dark:bg-slate-700/50 border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 p-8 rounded-lg text-center">
      <div className="flex justify-center mb-4">
        <Icon className="w-12 h-12 text-slate-400 dark:text-slate-500" />
      </div>
      {title && <p className="text-lg font-medium mb-2">{title}</p>}
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default EmptyState;
