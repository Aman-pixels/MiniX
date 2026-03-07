import React from "react";

export default function AuthButton({ icon: Icon, text, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full flex items-center justify-center gap-3 
        rounded-2xl border border-white/10 bg-white/5 
        py-3 px-4 text-sm font-medium text-white/90
        backdrop-blur-xl shadow-[0_4px_14px_0_rgba(0,0,0,0.1)]
        transition-all duration-300 ease-out
        hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(255,255,255,0.05)]
        active:translate-y-0 active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {Icon && <Icon size={20} className="shrink-0" />}
      <span className="tracking-wide">{text}</span>
    </button>
  );
}
