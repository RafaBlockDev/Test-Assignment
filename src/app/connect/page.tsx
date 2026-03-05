"use client";

import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ConnectButton } from "@/components/wallet/connect-button";
import { SignMessage } from "@/components/wallet/sign-message";
import { Separator } from "@/components/ui/separator";
import { useWalletContext } from "@/context/wallet-context";

export default function ConnectPage() {
  const { isConnected } = useAccount();
  const { isVerified } = useWalletContext();
  const router = useRouter();

  useEffect(() => {
    if (isConnected && isVerified) {
      router.replace("/dashboard");
    }
  }, [isConnected, isVerified, router]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <Card className="w-full max-w-md border-zinc-800 bg-zinc-900">
        <CardHeader className="text-center">
          <CardTitle className="text-xl text-zinc-100">Connect Your Wallet</CardTitle>
          <CardDescription className="text-zinc-400">
            Connect and verify ownership to access the dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center gap-3">
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
              Step 1 — Connect
            </p>
            <ConnectButton />
          </div>

          {isConnected && (
            <>
              <Separator className="bg-zinc-800" />
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Step 2 — Verify
                </p>
                <SignMessage />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
