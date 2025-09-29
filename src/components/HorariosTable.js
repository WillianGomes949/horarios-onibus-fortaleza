import React from "react";
import {
  RiMapPin2Fill,
  RiShakeHandsFill,
  RiTableView,
  RiTimeFill,
} from "@remixicon/react";

const HorariosTable = ({ dados }) => {
  return (
    <div className="space-y-6 flex flex-col md:flex-row items-center gap-4">
      {dados.map((posto, index) => (
        <div key={index} className="bg-gray-700/50 p-5 rounded-lg w-full md:w-[50%] h-full m-0">
          <h3 className="flex gap-4 items-center text-xl font-bold text-cyan-300 mb-4 ">
            <div>
              <RiMapPin2Fill />
            </div>
            <div>{posto.postoControle}</div>
          </h3>
          <div className="max-h-80 overflow-y-auto custom-scrollbar pr-2">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-800 sticky top-0 items-center">
                <tr>
                  <th className="p-3">
                    <RiTimeFill /> Horário
                  </th>
                  <th className="p-3">
                    <RiTableView /> Tabela
                  </th>
                  <th className="p-3">
                    <RiShakeHandsFill /> Acessível
                  </th>
                </tr>
              </thead>
              <tbody>
                {posto.horarios.map((horario, horarioIndex) => {
                  const isExtra = parseInt(horario.tabela, 10) > 100;
                  return (
                    <tr
                      key={horarioIndex}
                      className={`border-b border-gray-700 ${
                        isExtra ? "text-yellow-400" : ""
                      }`}
                      title={isExtra ? "Extra" : ""}
                    >
                      <td className="p-3 font-mono">{horario.horario}</td>
                      <td className="p-3 font-mono">{horario.tabela}</td>
                      <td className="p-3 capitalize">{horario.acessivel}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorariosTable;
