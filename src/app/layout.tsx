import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const opensans = Open_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wiki Buddy",
  description:
    "A Site where you can explore wikipedia's pages, based on your search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${opensans.className} antialiased`}>
        <div className="absolute inset-0 bg-grid-pattern mask-gradient" />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
