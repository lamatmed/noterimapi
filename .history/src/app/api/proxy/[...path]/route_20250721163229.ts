import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_MON_API!;

export async function POST(
  req: NextRequest,
  context: { params: { path?: string[] } }
) {
  // Workaround pour calmer l'erreur de Next.js
  const params = context.params ?? { path: [] };
  const path = (params.path ?? []).join("/");
  const url = `${API_URL}/${path}`;
  const body = await req.text();

  const headers = {
    "Content-Type": req.headers.get("content-type") || "application/json",
  };

  const apiRes = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  const data = await apiRes.text();

  return new NextResponse(data, {
    status: apiRes.status,
    headers: {
      "content-type": apiRes.headers.get("content-type") || "application/json",
    },
  });
}
