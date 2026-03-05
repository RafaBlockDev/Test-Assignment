import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyWalletSignature } from "@/lib/verify-signature";
import type { RegisterRequest } from "@/types/wallet";

export async function POST(request: NextRequest) {
  let body: RegisterRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { address, chainId, signature, message } = body;

  if (!address || !chainId || !signature || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Extract nonce from message
  const nonceMatch = message.match(/nonce: ([a-f0-9-]+)/);
  if (!nonceMatch) {
    return NextResponse.json({ error: "Invalid message format" }, { status: 400 });
  }
  const nonceValue = nonceMatch[1];

  // Validate nonce in DB
  const nonceRecord = await prisma.nonce.findUnique({
    where: { nonce: nonceValue },
  });

  if (!nonceRecord) {
    return NextResponse.json({ error: "Nonce not found" }, { status: 401 });
  }

  if (nonceRecord.used) {
    return NextResponse.json({ error: "Nonce already used" }, { status: 401 });
  }

  if (nonceRecord.expiresAt < new Date()) {
    return NextResponse.json({ error: "Nonce expired" }, { status: 401 });
  }

  // Verify signature
  const isValid = await verifyWalletSignature(address, message, signature);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Mark nonce as used
  await prisma.nonce.update({
    where: { nonce: nonceValue },
    data: { used: true },
  });

  // Check if wallet already registered
  const existingWallet = await prisma.wallet.findUnique({
    where: { address: address.toLowerCase() },
  });

  if (existingWallet) {
    return NextResponse.json({ error: "Wallet already registered" }, { status: 409 });
  }

  // Register wallet
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
  const wallet = await prisma.wallet.create({
    data: {
      address: address.toLowerCase(),
      chainId,
      isVerified: true,
      registeredIp: ip,
    },
  });

  return NextResponse.json(wallet, { status: 201 });
}
