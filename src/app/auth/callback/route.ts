import { NextResponse } from "next/server";
import { supabaseServer } from "@/src/lib/supabase/server";

export async function GET(request: Request) {
  console.log("CALLBACK EXECUTADO");

  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  console.log("CODE:", code);

  if (!code) {
    console.log("SEM CODE, REDIRECIONANDO");
    return NextResponse.redirect(`${origin}/`);
  }

  const supabase = await supabaseServer();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  console.log("EXCHANGE RESULT:", error);

  return NextResponse.redirect(`${origin}/dashboard`);
}
