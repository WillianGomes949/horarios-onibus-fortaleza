
// Mantenha a função existente
export async function buscarLinhas() {
  const response = await fetch('/api/linhas');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao buscar linhas');
  }

  return response.json();
}

export const buscarHorarios = async (linha, data) => {
  const dateForApi = data.replace(/-/g, '');
  const response = await fetch(`/api/horarios/${linha}?data=${dateForApi}`);

  if (!response.ok) {
    throw new Error('Linha não encontrada ou erro na API');
  }

  return await response.json();
};

export const buscarClima = async () => {
  const response = await fetch('/api/clima');
  if (!response.ok) {
    throw new Error('Erro ao carregar clima');
  }
  return await response.json();
};
// Adicione esta função
export async function buscarItinerario(numeroLinha) {
  const response = await fetch(`/api/itinerario/${numeroLinha}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro ao buscar itinerário');
  }

  return response.json();
}



// Função auxiliar para converter logId em coordenadas
// Você pode expandir este mapeamento com dados reais
export async function buscarCoordenadasPorLogId(logId) {
  // Exemplo de mapeamento (substituir com dados reais)
  const coordenadas = {
    '786': [-3.7350, -38.5300],
    '3292': [-3.7380, -38.5280],
    '832': [-3.7400, -38.5250],
    // ... adicione mais mapeamentos
  };

  return coordenadas[logId] || null;
}