"use client";

import { Button } from "@/components/ui/button";
import { useWalletRegister } from "@/hooks/use-wallet-register";
import { useWalletContext } from "@/context/wallet-context";

export function SignMessage() {
  const { isVerified } = useWalletContext();
  const { register, isLoading } = useWalletRegister();

  if (isVerified) {
    return (
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Ownership verified
      </div>
    );
  }

  return (
    <Button
      onClick={register}
      disabled={isLoading}
      className="bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
    >
      {isLoading ? (
        <>
          <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Verifying...
        </>
      ) : (
        "Verify Ownership"
      )}
    </Button>
  );
}
