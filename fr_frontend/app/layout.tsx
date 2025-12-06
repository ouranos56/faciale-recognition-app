import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Ubuntu } from 'next/font/google';
import { Ms_Madi } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next"

// Configuration de la police Ubuntu
const ubuntu = Ubuntu({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['300', '400', '500', '700'], // Light, Regular, Medium, Bold
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-ubuntu',
  preload: true,
});

const msMadi = Ms_Madi({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  display: 'swap',
  variable: '--font-ms-madi',
  preload: true,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EDIYA - Facial Recognition",
  description: "Plateforme de reconnaissance faciale avec IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <html lang="fr" data-theme="silk" className={ubuntu.variable}>

      <body
        className={`${ubuntu.className} antialiased  background-gri grid-lines`}
        style={{ fontFamily: '"Ubuntu", sans-serif' }}
      >
        <SpeedInsights />
        <Header />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />

        <div className="flex flex-col justify-center items-center min-h-screen p-3 bg-base-100/10">
          {children}
        </div>

        <Footer />
      </body>
    </html >
  );
}
