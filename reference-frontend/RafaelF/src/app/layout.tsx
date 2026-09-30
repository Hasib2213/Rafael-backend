import type { Metadata, Viewport } from "next";
import { Lato, Manrope } from "next/font/google";
import "./globals.css";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Curio - Turn YouTube Videos into Smart Audio Briefings",
  description: "Save hours every week. Get AI-generated summaries of your favorite YouTube videos, delivered as audio briefings you can listen to anywhere.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${manrope.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#0F172A] text-white font-sans antialiased selection:bg-[#7A3BED] selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
