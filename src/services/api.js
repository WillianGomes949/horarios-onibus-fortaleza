export const buscarLinhas = async () => {
  const response = await fetch('http://gistapis.etufor.ce.gov.br:8081/api/linhas/');
  if (!response.ok) {
    throw new Error('Erro ao carregar lista de linhas');
  }
  return await response.json();
};

export const buscarHorarios = async (linha, data) => {
  const dateForApi = data.replace(/-/g, '');
  const response = await fetch(`http://gistapis.etufor.ce.gov.br:8081/api/horarios/${linha}?data=${dateForApi}`);
  
  if (!response.ok) {
    throw new Error('Linha não encontrada ou erro na API');
  }
  
  return await response.json();
};