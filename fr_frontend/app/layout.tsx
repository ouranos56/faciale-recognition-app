import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Ubuntu } from 'next/font/google';
// import { SpeedInsights } from "@vercel/speed-insights/next"
import GoogleAnalytics from "@/app/components/GoogleAnalytics"
// import AnalyticsTracker from "@/app/hookq/AnalyticsTracker"

// Configuration de la police Ubuntu
const ubuntu = Ubuntu({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['300', '400', '500', '700'], // Light, Regular, Medium, Bold
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-ubuntu',
  preload: true,
});

export const metadata: Metadata = {
  title: "EDIYA - Facial Recognition",
  description: "Plateforme de reconnaissance faciale basée sur une IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <html lang="fr" data-theme="silk" className={ubuntu.variable}>

      <body
        className={`${ubuntu.className} antialiased grid-lines`}
        style={{ fontFamily: '"Ubuntu", sans-serif' }}
      >
        <GoogleAnalytics />
        {/* <AnalyticsTracker /> */}
        
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
