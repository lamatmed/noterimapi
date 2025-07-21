import { cookies } from "next/headers";

export async function getUser() {
  const userId = (await cookies()).get("userId")?.value;
  if (!userId) return null;

  const res = await fetch(`${process.env.NEXT_PUBLIC_MON_API}/users/users/${userId}`);
  if (!res.ok) return null;

  const user = await res.json();
  return user;
}