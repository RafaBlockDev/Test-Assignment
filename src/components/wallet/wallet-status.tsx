"use client";

import { useAccount } from "wagmi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useWalletContext } from "@/context/wallet-context";

export function WalletStatus() {
  const { address, chain } = useAccount();
  const { isVerified, walletRegistered } = useWalletContext();

  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-zinc-100">Wallet Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Address</p>
          <p className="font-mono text-sm text-zinc-300 break-all">{address}</p>
        </div>
        <Separator className="bg-zinc-800" />
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Network</p>
          <p className="text-sm text-zinc-300">{chain?.name ?? "Unknown"} (ID: {chain?.id})</p>
        </div>
        <Separator className="bg-zinc-800" />
        <div className="flex items-center gap-3">
          <Badge
            variant={isVerified ? "default" : "secondary"}
            className={isVerified ? "bg-emerald-900 text-emerald-300" : "bg-zinc-800 text-zinc-400"}
          >
            {isVerified ? "Verified" : "Not Verified"}
          </Badge>
          <Badge
            variant={walletRegistered ? "default" : "secondary"}
            className={walletRegistered ? "bg-emerald-900 text-emerald-300" : "bg-zinc-800 text-zinc-400"}
          >
            {walletRegistered ? "Registered" : "Not Registered"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
