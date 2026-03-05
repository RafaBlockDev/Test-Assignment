"use client";

import { WalletGuard } from "@/components/guards/wallet-guard";
import { WalletStatus } from "@/components/wallet/wallet-status";

export default function DashboardPage() {
  return (
    <WalletGuard>
      <div className="mx-auto max-w-2xl px-6 py-16 space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-50">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-400">Your wallet information and verification status.</p>
        </div>
        <WalletStatus />
      </div>
    </WalletGuard>
  );
}
