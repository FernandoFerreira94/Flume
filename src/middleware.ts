import { NextRequest, NextResponse } from "next/server";
import { createMiddlewareClient } from "@/src/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { supabase, response } = createMiddlewareClient(request);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const isPrivateRoute = request.nextUrl.pathname.startsWith("/dashboard");

  if (isPrivateRoute && !session) {
    const loginUrl = new URL("/", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
