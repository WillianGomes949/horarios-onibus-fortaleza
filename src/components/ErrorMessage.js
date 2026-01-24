import { RiSpam2Line } from "@remixicon/react";
import React from "react";

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex justify-center gap-4 items-center bg-red-500/10 border border-red-500/20 text-[var(--text-main)] p-4 rounded-[var(--radius)] text-center backdrop-blur-sm">
      <div className="font-semibold text-center text-red-500">
        <RiSpam2Line size={30}/>
      </div>

      <div className="text-left">
        <p className="font-bold text-red-500 text-sm uppercase tracking-wide">Ocorreu um erro</p>
        <p className="text-[var(--text-muted)] text-sm">{message}</p>
      </div>
    </div>
  );
};

export default ErrorMessage;