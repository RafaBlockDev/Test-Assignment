"use client";

import Link from "next/link";
import { ConnectButton } from "@/components/wallet/connect-button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight text-zinc-100">
          Wallet App
        </Link>
        <ConnectButton />
      </div>
    </header>
  );
}
