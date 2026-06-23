import { NextResponse, type NextRequest } from "next/server";

import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

function redirectWithError(request: NextRequest, message: string, next: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  url.searchParams.set("next", next);
  url.searchParams.set("error", message);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/dashboard");

  if (!hasSupabaseEnv()) {
    return redirectWithError(request, "Supabase is not configured yet.", next);
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return redirectWithError(request, error.message, next);
  }

  return NextResponse.redirect(new URL(next, request.url), { status: 303 });
}
