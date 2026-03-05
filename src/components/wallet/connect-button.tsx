"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWalletContext } from "@/context/wallet-context";

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function ConnectButton() {
  const { open } = useAppKit();
  const { address, isConnecting, isConnected, chain } = useAccount();
  const { disconnect } = useDisconnect();
  const { reset } = useWalletContext();

  if (isConnecting) {
    return (
      <Button variant="outline" disabled className="border-zinc-700 text-zinc-400">
        <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Connecting...
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="gap-2 border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100">
            <span className="font-mono text-sm">{truncateAddress(address)}</span>
            {chain && (
              <Badge variant="secondary" className="bg-zinc-800 text-zinc-400 text-xs">
                {chain.name}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-900">
          <DropdownMenuItem
            onClick={() => {
              disconnect();
              reset();
            }}
            className="text-zinc-300 focus:bg-zinc-800 focus:text-zinc-100 cursor-pointer"
          >
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button
      variant="outline"
      onClick={() => open()}
      className="border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:text-zinc-100"
    >
      Connect Wallet
    </Button>
  );
}
