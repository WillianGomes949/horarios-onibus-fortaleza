
export async function GET(request, { params }) {
  const { linha } = params;
  const { searchParams } = new URL(request.url);
  const data = searchParams.get('data');

  try {
    const response = await fetch(`http://gistapis.etufor.ce.gov.br:8081/api/horarios/${linha}?data=${data}`);
    
    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Linha não encontrada' }), {
        status: response.status,
      });
    }
    
    const horarios = await response.json();
    return new Response(JSON.stringify(horarios), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erro interno do servidor' }), {
      status: 500,
    });
  }
}