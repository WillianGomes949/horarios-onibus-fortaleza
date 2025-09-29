import React from 'react';

const EmptyState = ({ type = 'initial' }) => {
  const messages = {
    initial: {
      title: "👆 Busque os horários acima",
      description: "Selecione uma linha e uma data para consultar os horários"
    },
    noResults: {
      title: "Nenhum horário encontrado",
      description: "Não foram encontrados horários para esta linha na data selecionada"
    }
  };

  const { title, description } = messages[type];

  return (
    <div className="bg-gray-700/50 border border-gray-600 text-gray-300 p-8 rounded-lg text-center">
      <p className="text-lg mb-2">{title}</p>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default EmptyState;