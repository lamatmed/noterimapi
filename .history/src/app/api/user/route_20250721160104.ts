import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const userId = (await cookies()).get("userId")?.value;
  console.log("[/api/user] userId from cookie:", userId);
  if (!userId) return NextResponse.json({ user: null });

  const res = await fetch(`${process.env.NEXT_PUBLIC_MON_API}/users/users/${userId}`);
  console.log("[/api/user] API response status:", res.status);
  if (!res.ok) return NextResponse.json({ user: null });

  const user = await res.json();
  console.log("[/api/user] user from API:", user);
  return NextResponse.json({ user });
} 