import { RiSpam2Line } from "@remixicon/react";
import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center gap-4 items-center bg-slate-800 border border-red-400/30 text-slate-200 p-2 rounded-lg text-center">
      <div className="font-semibold text-center text-red-400">
        <RiSpam2Line size={30}/>
      </div>

      <div>
        <p className="font-semibold text-red-400">Ocorreu um erro</p>
        <p className="text-slate-300">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;
