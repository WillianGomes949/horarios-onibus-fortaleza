import React from "react";
import { RiDownloadLine } from "@remixicon/react";
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

    // Cabeçalho
    doc.setFontSize(16);
    doc.setTextColor(101, 163, 13); // lime-600
    doc.text("Horários de Ônibus", 105, 15, { align: "center" });

    // Informações
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(
      `Linha: ${linhaSelecionada.numero} - ${linhaSelecionada.nome}`,
      14,
      25
    );
    doc.text(`Data: ${dataConsulta} | Gerado: ${dataAtual}`, 14, 32);

    let yPosition = 45;

    // Para cada posto
    dados.forEach((posto, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      // Título do posto
      doc.setFontSize(12);
      doc.setTextColor(101, 163, 13);
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
          fillColor: [30, 41, 59],
          textColor: 255,
          fontStyle: "bold",
        },
        bodyStyles: {
          textColor: [51, 65, 85],
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
      className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <RiDownloadLine size={18} />
      Baixar PDF
    </button>
  );
};

export default DownloadPDF;
