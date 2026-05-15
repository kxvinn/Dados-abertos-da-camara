import { Inter, Outfit } from "next/font/google";
import { Metadata } from "next";
import "./globals.css";
import Dock from "@/components/Dock";
import Script from "next/script";
import { ThemeProvider } from "@/components/ThemeProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Dados Abertos da Câmara - Dashboard Premium",
  description: "Dashboard moderno para consulta de dados abertos da Câmara dos Deputados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-inter antialiased bg-[#0a0f1d] text-slate-200 transition-colors duration-300">
        <ThemeProvider>
          <Script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js" strategy="beforeInteractive" />
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" />
          <div className="pb-32">
            {children}
          </div>
          <Dock />
        </ThemeProvider>
      </body>
    </html>
  );
}
