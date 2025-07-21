import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_MON_API!;

async function proxyRequest(
  req: NextRequest,
  context: { params: { path?: string[] } },
  method: string
) {
  const path = context.params?.path?.join("/") ?? "";
  const url = `${API_URL}/${path}`;

  const headers = {
    "Content-Type": req.headers.get("content-type") || "application/json",
  };

  const body = ["POST", "PUT", "PATCH"].includes(method)
    ? await req.text()
    : undefined;

  const res = await fetch(url, {
    method,
    headers,
    body,
  });

  const responseBody = await res.text();

  if (!res.ok) {
    console.error("Erreur proxy:", res.status, responseBody);
  }

  if (res.status === 204) {
    return new NextResponse(null, {
      status: 204,
      headers: {},
    });
  }

  return new NextResponse(responseBody, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json",
    },
  });
}

export async function GET(req: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params;
  return proxyRequest(req, { ...context, params }, "GET");
}

export async function POST(req: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params;
  return proxyRequest(req, { ...context, params }, "POST");
}

export async function PUT(req: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params;
  return proxyRequest(req, { ...context, params }, "PUT");
}

export async function DELETE(req: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params;
  return proxyRequest(req, { ...context, params }, "DELETE");
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ path?: string[] }> }) {
  const params = await context.params;
  return proxyRequest(req, { ...context, params }, "PATCH");
}
