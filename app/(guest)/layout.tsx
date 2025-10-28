import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


// Import komponen global
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmarTik - Dashboard",
  description: "Platform AI untuk eksplorasi dan generasi motif batik.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {/* Navbar Global */}
        <Navbar />

        {/* Konten Halaman */}
        <main>{children}</main>

        {/* Footer Global */}
        <Footer />
      </body>
    </html>
  );
}
