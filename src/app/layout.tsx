import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./Provider";
import { color } from "@/src/styles/color";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flume.vercel.app"), // ajuste para seu domínio real

  title: {
    default: "Flume | Antecipe, Organize e Controle suas Finanças",
    template: "%s | Flume",
  },

  description:
    "Flume é uma plataforma de controle financeiro pessoal que ajuda você a antecipar despesas, organizar seus gastos e manter o controle total do seu dinheiro.",

  applicationName: "Flume",

  authors: [
    {
      name: "Flume",
      url: "https://flume.app",
    },
  ],

  generator: "Next.js",
  keywords: [
    "controle financeiro",
    "finanças pessoais",
    "gestão de despesas",
    "controle de gastos",
    "organização financeira",
    "parcelas",
    "despesas mensais",
    "planejamento financeiro",
  ],

  referrer: "origin-when-cross-origin",

  creator: "Flume",
  publisher: "Flume",

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://flume.app",
    siteName: "Flume",
    title: "Flume | Antecipe, Organize e Controle suas Finanças",
    description:
      "Controle suas despesas, acompanhe parcelas e organize sua vida financeira com o Flume.",
    images: [
      {
        url: "/og-image.png", // coloque esse arquivo em /public
        width: 1200,
        height: 630,
        alt: "Flume - Controle financeiro inteligente",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Flume | Controle financeiro inteligente",
    description:
      "Organize suas despesas, acompanhe parcelas e tenha controle total do seu dinheiro.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        //style={{ backgroundColor: color.fundo }}
        className={`
            ${geistSans.variable} 
            ${geistMono.variable} 
            ${color.background}
            antialiased 
            w-full 
            font-sans
            min-h-screen 
          `}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
