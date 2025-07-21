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

  return new NextResponse(responseBody, {
    status: res.status,
    headers: {
      "content-type": res.headers.get("content-type") || "application/json",
    },
  });
}

export async function GET(req: NextRequest, context: { params: { path?: string[] } }) {
  return proxyRequest(req, context, "GET");
}

export async function POST(req: NextRequest, context: { params: { path?: string[] } }) {
  return proxyRequest(req, context, "POST");
}

export async function PUT(req: NextRequest, context: { params: { path?: string[] } }) {
  return proxyRequest(req, context, "PUT");
}

export async function DELETE(req: NextRequest, context: { params: { path?: string[] } }) {
  return proxyRequest(req, context, "DELETE");
}

export async function PATCH(req: NextRequest, context: { params: { path?: string[] } }) {
  return proxyRequest(req, context, "PATCH");
}
