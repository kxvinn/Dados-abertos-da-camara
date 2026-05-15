"use client";

import { useTheme } from "./ThemeProvider";
import { PhIcon } from "./FramerIcons";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center">
      <div className="w-[1px] h-8 bg-white/10 mx-2" />
      <motion.button
        onClick={toggleTheme}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        className="relative group flex items-center justify-center w-10 h-10 rounded-xl glass text-slate-400 hover:text-white transition-all overflow-visible"
      >
        <PhIcon 
          icon={theme === "dark" ? "sun-bold" : "moon-bold"} 
          className={theme === "dark" ? "text-yellow-400" : "text-blue-400"}
        />
        <span className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md text-white text-[11px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-xl border border-white/10 whitespace-nowrap pointer-events-none">
          {theme === "dark" ? "Modo Claro" : "Modo Escuro"}
        </span>
      </motion.button>
    </div>
  );
}
