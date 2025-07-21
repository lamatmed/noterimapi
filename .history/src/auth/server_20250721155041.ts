import { cookies } from "next/headers";

export async function getUser() {
  const userId = (await cookies()).get("userId")?.value;
  console.log("[getUser] userId from cookie:", userId);
  if (!userId) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_MON_API}/users/users/${userId}`);
  console.log("[getUser] API response status:", res.status);
  if (!res.ok) return null;

  const user = await res.json();
  console.log("[getUser] user from API:", user);
  return user;
}