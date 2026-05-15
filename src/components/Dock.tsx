"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  PhIcon,
  MoonSleepIcon 
} from "./FramerIcons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeProvider";

const DOCK_ITEMS = [
  { icon: (props: any) => <PhIcon icon="user-bold" {...props} />, label: "Deputados", href: "/" },
  { icon: (props: any) => <PhIcon icon="file-text-bold" {...props} />, label: "Proposições", href: "/proposicoes" },
  { icon: (props: any) => <PhIcon icon="check-circle-bold" {...props} />, label: "Votações", href: "/votacoes" },
  { icon: (props: any) => <PhIcon icon="buildings-bold" {...props} />, label: "Órgãos", href: "/orgaos" },
  { icon: (props: any) => <PhIcon icon="flag-pennant-bold" {...props} />, label: "Partidos", href: "/partidos" },
  { icon: (props: any) => <PhIcon icon="hourglass-bold" {...props} />, label: "Legislaturas", href: "/legislaturas" },
  { icon: (props: any) => <PhIcon icon="stack-bold" {...props} />, label: "Blocos", href: "/blocos" },
  { icon: (props: any) => <PhIcon icon="users-four-bold" {...props} />, label: "Frentes", href: "/frentes" },
  { icon: (props: any) => <PhIcon icon="calendar-bold" {...props} />, label: "Eventos", href: "/eventos" },
];

function DockIcon({ mouseX, icon: Icon, label, href, active }: any) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useMotionValue(Infinity);

  const scaleTransform = useTransform(distance, [-150, 0, 150], [1, 1.6, 1]);
  const yTransform = useTransform(distance, [-150, 0, 150], [0, -10, 0]);
  
  const scale = useSpring(scaleTransform, {
    mass: 0.1,
    stiffness: 400,
    damping: 30,
  });

  const y = useSpring(yTransform, {
    mass: 0.1,
    stiffness: 400,
    damping: 30,
  });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const rect = ref.current?.getBoundingClientRect();
          if (rect) {
            distance.set(e.clientX - (rect.left + rect.width / 2));
          }
        }}
        onMouseLeave={() => distance.set(Infinity)}
        animate={{ 
          backgroundColor: active ? 'var(--dock-active)' : 'var(--dock-item-bg)',
          color: active ? 'white' : 'var(--foreground)',
        }}
        transition={{ duration: 0.1 }}
        style={{ 
          scale, 
          y,
          boxShadow: active ? '0 10px 15px -3px var(--dock-active-glow)' : undefined
        }}
        className="group relative flex items-center justify-center w-10 h-10 rounded-xl z-10 hover:z-20"
      >
        <Icon className="w-6 h-6" />
        <span className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 backdrop-blur-md text-primary text-[11px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 shadow-xl border border-primary whitespace-nowrap pointer-events-none"
          style={{ backgroundColor: 'var(--dock-tooltip)' }}
        >
          {label}
        </span>
        {active && (
            <motion.div 
                layoutId="active-indicator"
                className="absolute -bottom-1.5 w-1 h-1 rounded-full"
                style={{ backgroundColor: 'var(--foreground)' }}
            />
        )}
      </motion.div>
    </Link>
  );
}

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
        className="fixed bottom-0 left-0 right-0 h-24 z-50 flex justify-center items-end pb-4 md:pb-6 pointer-events-none"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
    >
      <div className="pointer-events-auto max-w-[95vw]">
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ 
                y: isVisible ? 0 : 100, 
                opacity: isVisible ? 1 : 0 
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onMouseMove={(e) => mouseX.set(e.clientX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="dock-glass px-4 md:px-6 py-3 md:py-4 rounded-[2.5rem] flex items-end gap-3 md:gap-5 border border-white/10 shadow-2xl overflow-x-auto md:overflow-visible no-scrollbar scroll-smooth snap-x touch-pan-x"
        >
            {DOCK_ITEMS.map((item) => (
            <DockIcon 
                key={item.href} 
                mouseX={mouseX} 
                {...item} 
                active={pathname === item.href}
            />
            ))}
            <ThemeToggle />
        </motion.div>
      </div>
    </div>
  );
}
