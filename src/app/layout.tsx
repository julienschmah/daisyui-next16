import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ServiceHub - Encontre profissionais confiáveis",
  description: "Plataforma para contratação de serviços profissionais. Encontre encanadores, eletricistas, pintores e muito mais.",
  keywords: ["serviços", "profissionais", "contratação", "reparos", "manutenção"],
  authors: [{ name: "ServiceHub Team" }],
  openGraph: {
    title: "ServiceHub - Encontre profissionais confiáveis",
    description: "Plataforma para contratação de serviços profissionais",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-primary bg-base-100`}
      >
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
