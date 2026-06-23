import { NextResponse, type NextRequest } from "next/server";

import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.clone();
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") || "/dashboard";

  if (!hasSupabaseEnv()) {
    url.pathname = "/login";
    url.searchParams.set("error", "Supabase is not configured yet.");
    return NextResponse.redirect(url);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      url.pathname = "/login";
      url.searchParams.set("error", error.message);
      return NextResponse.redirect(url);
    }
  }

  url.pathname = next;
  url.search = "";
  return NextResponse.redirect(url);
}
