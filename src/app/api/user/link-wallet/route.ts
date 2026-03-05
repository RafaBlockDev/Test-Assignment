import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { LinkWalletRequest } from "@/types/wallet";

export async function PUT(request: NextRequest) {
  let body: LinkWalletRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { address, userId } = body;

  if (!address || !userId) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const wallet = await prisma.wallet.findUnique({
    where: { address: address.toLowerCase() },
  });

  if (!wallet) {
    return NextResponse.json({ error: "Wallet not found" }, { status: 404 });
  }

  if (wallet.userId && wallet.userId !== userId) {
    return NextResponse.json({ error: "Wallet already linked to another user" }, { status: 409 });
  }

  // Ensure user exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updatedWallet = await prisma.wallet.update({
    where: { address: address.toLowerCase() },
    data: { userId },
  });

  return NextResponse.json(updatedWallet);
}
