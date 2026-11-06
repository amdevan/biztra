import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSessionCookie, validateSessionToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getSessionCookie())?.value;
  const email = validateSessionToken(token);

  if (!email) {
    return NextResponse.json({ authenticated: false });
  }

  return NextResponse.json({ authenticated: true, email });
}
