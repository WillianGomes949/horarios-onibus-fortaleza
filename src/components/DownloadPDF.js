import React from "react";
import { RiFileDownloadLine } from "@remixicon/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DownloadPDF = ({ dados, linhaSelecionada, data }) => {
  const gerarPDF = () => {
    if (!dados || dados.length === 0) return;

    const doc = new jsPDF();
    const dataAtual = new Date().toLocaleDateString("pt-BR");
    const dataConsulta = data
      ? new Date(data).toLocaleDateString("pt-BR")
      : dataAtual;

    // Cores do tema
    const colorPrimary = [255, 107, 0]; // #ff6b00

    // Cabeçalho
    doc.setFontSize(16);
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text("Horários de Ônibus", 105, 15, { align: "center" });

    // Informações
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Preto para melhor contraste na impressão
    doc.text(
      `Linha: ${linhaSelecionada.numero} - ${linhaSelecionada.nome}`,
      14,
      25
    );
    doc.text(`Data: ${dataConsulta} | Gerado: ${dataAtual}`, 14, 32);

    let yPosition = 45;

    // Para cada posto de controle
    dados.forEach((posto) => {
      // Verifica se precisa de nova página
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      // Título do posto
      doc.setFontSize(12);
      doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
      doc.text(posto.postoControle, 14, yPosition);
      yPosition += 5;

      // 1. Transformar a lista linear de horários em uma Matriz (Linhas x Colunas)
      const times = posto.horarios.map((h) => h.horario);
      const columns = 5; // 5 horários por linha
      const rows = [];
      
      for (let i = 0; i < times.length; i += columns) {
        const row = times.slice(i, i + columns);
        // Preencher células vazias se a última linha não estiver completa
        while (row.length < columns) row.push(""); 
        rows.push(row);
      }

      // 2. Gerar a tabela simulando botões
      autoTable(doc, {
        startY: yPosition,
        body: rows,
        theme: 'plain', // Sem bordas padrão da tabela
        styles: {
          fontSize: 11,
          cellPadding: 3,
          halign: 'center',
          valign: 'middle',
          minCellHeight: 12,
        },
        // Hook para desenhar as "pílulas" manualmente
        didDrawCell: (data) => {
          if (data.section === 'body' && data.cell.raw !== "") {
            const { cell } = data;
            
            // Configurações do desenho
            doc.setDrawColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
            doc.setLineWidth(0.3);
            
            // Desenha retângulo com bordas arredondadas (x, y, w, h, rx, ry, style)
            // style 'S' = Stroke (apenas borda)
            doc.roundedRect(
              cell.x + 1, 
              cell.y + 1, 
              cell.width - 2, 
              cell.height - 2, 
              3, 
              3, 
              'S' 
            );
          }
        },
        margin: { left: 14, right: 14 },
      });

      yPosition = doc.lastAutoTable.finalY + 15;
    });

    // Salvar
    const fileName = `horarios-${linhaSelecionada.numero}-${dataAtual.replace(
      /\//g,
      "-"
    )}.pdf`;
    doc.save(fileName);
  };

  if (!dados || dados.length === 0) return null;

  return (
    <button
      onClick={gerarPDF}
      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-50 border-none bg-red-500 border hover:bg-lime-400 rounded-[var(--radius)] transition-all duration-400 shadow-sm group cursor-pointer hover:text-gray-700"
    >
      <RiFileDownloadLine size={18}/>
      <span>Salvar PDF</span>
    </button>
  );
};

export default DownloadPDF;