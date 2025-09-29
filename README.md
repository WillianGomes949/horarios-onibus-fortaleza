# Consulta de Horários de Ônibus

Uma aplicação web moderna para consulta de horários de ônibus em tempo real, desenvolvida com Next.js e React.

## Funcionalidades

- Busca inteligente de linhas – Pesquise por número ou nome da linha  
- Seleção de data – Consulte horários para qualquer data  
- Horários completos – Visualize todos os horários por posto de controle  
- Resumo de horários – Veja o primeiro e último horário de cada posto  
- Informações de acessibilidade – Identifique veículos adaptados  
- Design responsivo – Funciona perfeitamente em desktop e mobile  

## Tecnologias Utilizadas

- **Frontend:** Next.js, React, Tailwind CSS  
- **API:** ETUFOR (Empresa de Transporte Urbano de Fortaleza)  
- **Ícones:** SVG customizados  
- **Deploy:** Vercel (recomendado)  

## Como Executar

### Pré-requisitos
- Node.js 16+  
- npm ou yarn  

### Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/consulta-horarios-onibus.git
cd consulta-horarios-onibus


Instale as dependências:

```bash
npm install
# ou
yarn install
```

Execute o projeto:

```bash
npm run dev
# ou
yarn dev
```

Acesse a aplicação:

```
http://localhost:3000
```

## Estrutura do Projeto

```
src/
├── components/           
│   ├── SearchForm.js     # Formulário de busca
│   ├── LineSearch.js     # Campo de busca de linhas
│   ├── DatePicker.js     # Seletor de data
│   ├── ResultsSection.js # Seção de resultados
│   ├── LineHeader.js     # Cabeçalho com info da linha
│   ├── HorariosTable.js  # Tabela de horários
│   ├── LoadingSpinner.js # Spinner de carregamento
│   ├── ErrorMessage.js   # Mensagens de erro
│   ├── EmptyState.js     # Estados vazios
│   └── Icons.js          # Ícones SVG
├── services/
│   └── api.js            # Serviços de API
└── BusScheduleApp.js     # Componente principal
```

## API

A aplicação consome a API pública da ETUFOR:

### Endpoints Utilizados

* `GET /api/linhas/` – Lista todas as linhas de ônibus
* `GET /api/horarios/{linha}?data={YYYYMMDD}` – Horários por linha e data

### Exemplo de Resposta da API

```json
{
  "numero": 617,
  "nome": "Abreulândia/Lagoa Redonda/Direita/Messejana",
  "numeroNome": "617-Abreulândia/Lagoa Redonda/Direita/Messejana",
  "tipoLinha": "Alimentadora"
}
```

## Personalização

### Cores (Tailwind CSS)

* Primária: cyan-400 a cyan-700
* Fundo: gray-800 a gray-900
* Texto: gray-100 a gray-400

### Componentes Principais

* **SearchForm**

  * Busca inteligente com autocomplete
  * Validação de campos obrigatórios
  * Estados de loading
* **HorariosTable**

  * Scroll personalizado
  * Destaque para horários extras
  * Informações de acessibilidade

## Responsividade

A aplicação é totalmente responsiva com breakpoints:

* Mobile: `< 768px`
* Tablet: `768px - 1024px`
* Desktop: `> 1024px`

## Deploy

### Vercel (Recomendado)

* Conecte seu repositório no Vercel
* Configure as variáveis de ambiente (se necessário)
* Deploy automático a cada push

```bash
npm run build
```

### Outras Opções

* Netlify
* Railway
* AWS Amplify

## Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## Problemas Conhecidos

* A API pode retornar erro para algumas linhas específicas
* Horários extras são identificados quando `tabela > 100`

## Próximas Funcionalidades

* Favoritar linhas
* Notificações para horários próximos
* Integração com GPS em tempo real
* Modo offline
* Compartilhamento de horários

## Suporte

Encontrou um problema? Abra uma issue.

```

Quer que eu já te entregue esse arquivo em formato **pronto para download (`README.md`)** ou só o conteúdo aqui já resolve?
```
