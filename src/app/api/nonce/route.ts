import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  const nonce = uuidv4();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  const message = `Sign in to Wallet App -- nonce: ${nonce} -- ${new Date().toISOString()}`;

  await prisma.nonce.create({
    data: {
      nonce,
      address: address.toLowerCase(),
      expiresAt,
    },
  });

  return NextResponse.json({ nonce, message });
}
