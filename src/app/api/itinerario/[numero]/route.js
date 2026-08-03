export async function GET(request, { params }) {
  try {
    // Aguarda a resolução da Promise params antes de acessar numero
    const { numero } = await params;
    const response = await fetch(`http://gistapis.etufor.ce.gov.br:8081/api/itinerario/${numero}`);
    
    if (!response.ok) {
      return Response.json({ error: 'Erro ao buscar itinerário' }, { status: response.status });
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Erro ao buscar itinerário:', error);
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}