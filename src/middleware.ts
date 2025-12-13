import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("flume-token")?.value;

  // Lista de rotas públicas
  const publicPaths = ["/"];

  // Verifica se a rota atual é uma rota pública
  const isPublicPath = publicPaths.includes(req.nextUrl.pathname);

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
