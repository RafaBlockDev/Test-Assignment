import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/context/web3-provider";
import { WalletContextProvider } from "@/context/wallet-context";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wallet App",
  description: "Web3 Wallet Integration Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        <Web3Provider>
          <WalletContextProvider>
            <Header />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
            <Toaster />
          </WalletContextProvider>
        </Web3Provider>
      </body>
    </html>
  );
}
