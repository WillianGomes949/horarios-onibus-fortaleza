const API_KEY_WEATHER = process.env.NEXT_API_KEY_WEATHER;

export async function GET() {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Fortaleza&appid=${API_KEY_WEATHER}&units=metric&lang=pt_br`);
    
    if (!response.ok) {
      return Response.json({ error: 'Erro ao buscar Clima' }, { status: response.status });
    }
    
    const data = await response.json();
    console.log(data)
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

