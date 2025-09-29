import React from 'react';
import { RiSpam2Line, RiPenNibLine } from '@remixicon/react';

const EmptyState = ({ type = 'initial' }) => {
  const messages = {
    initial: {
      icon: RiPenNibLine,
      title: "Busque os horários acima",
      description: "Selecione uma linha e uma data para consultar os horários"
    },
    noResults: {
      icon: RiSpam2Line,
      title: "Nenhum horário encontrado",
      description: "Não foram encontrados horários para esta linha na data selecionada"
    }
  };

  const { icon: Icon, title, description } = messages[type];

  return (
    <div className="bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 p-8 rounded-lg text-center">
      <div className="flex justify-center mb-4">
        <Icon className="w-12 h-12 text-gray-400 dark:text-gray-500" />
      </div>
      {title && <p className="text-lg font-medium mb-2">{title}</p>}
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default EmptyState;