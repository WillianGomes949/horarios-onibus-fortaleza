
export async function GET() {
  try {
    const response = await fetch('http://gistapis.etufor.ce.gov.br:8081/api/linhas/');
    
    if (!response.ok) {
      return Response.json({ error: 'Erro ao buscar linhas' }, { status: response.status });
    }
    
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
