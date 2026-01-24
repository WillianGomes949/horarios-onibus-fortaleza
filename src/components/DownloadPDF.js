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

    // Cores do tema (Hardcoded para o PDF pois ele não lê CSS Var)
    const colorPrimary = [255, 107, 0]; // #ff6b00
    const colorDark = [15, 15, 17];     // #0f0f11

    // Cabeçalho
    doc.setFontSize(16);
    doc.setTextColor(colorPrimary[0], colorPrimary[1], colorPrimary[2]);
    doc.text("Horários de Ônibus", 105, 15, { align: "center" });

    // Informações
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0); // Preto para o texto base do PDF (melhor impressão)
    doc.text(
      `Linha: ${linhaSelecionada.numero} - ${linhaSelecionada.nome}`,
      14,
      25
    );
    doc.text(`Data: ${dataConsulta} | Gerado: ${dataAtual}`, 14, 32);

    let yPosition = 45;

    // Para cada posto
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
      yPosition += 8;

      // Dados da tabela
      const tableData = posto.horarios.map((horario) => [
        horario.horario,
        horario.tabela,
        horario.acessivel,
      ]);

      autoTable(doc, {
        startY: yPosition,
        head: [["Horário", "Tabela", "Acessível"]],
        body: tableData,
        headStyles: {
          fillColor: colorPrimary, // Fundo Laranja
          textColor: 255,
          fontStyle: "bold",
        },
        bodyStyles: {
          textColor: [50, 50, 50],
        },
        styles: {
          fontSize: 12,
          cellPadding: 3,
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
  className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-900 bg-lime-500 border border-lime-500 hover:bg-lime-400 rounded-[var(--radius)] transition-all shadow-sm group"
>
  <RiFileDownloadLine size={18} className="text-slate-900 group-hover:scale-110 transition-transform" />
  <span>Salvar PDF</span>
</button>
  );
};

export default DownloadPDF;