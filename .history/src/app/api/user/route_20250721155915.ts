import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const userId = (await cookies()).get("userId")?.value;
  if (!userId) return NextResponse.json({ user: null });

  const res = await fetch(`${process.env.NEXT_PUBLIC_MON_API}/users/users/${userId}`);
  if (!res.ok) return NextResponse.json({ user: null });

  const user = await res.json();
  return NextResponse.json({ user });
} 