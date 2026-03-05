import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6">
      <div className="max-w-lg text-center space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50">
          Wallet Integration
        </h1>
        <p className="text-lg text-zinc-400 leading-relaxed">
          Connect your wallet, verify ownership via signature, and securely register on-chain identity.
        </p>
        <Link href="/connect">
          <Button
            size="lg"
            className="mt-4 bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
