import type { Metadata } from "next";
<<<<<<< HEAD
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "empowHer",
=======
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Didi Finance — Your Financial Big Sister",
>>>>>>> tanvi/main
  description: "A warm, wise financial advisor built for women",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body className={`${playfair.variable} ${jakarta.variable} font-sans antialiased`}>
=======
      <body className={`${inter.variable} antialiased`}>
>>>>>>> tanvi/main
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
