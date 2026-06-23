import { NextResponse, type NextRequest } from "next/server";

import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

function redirectWithError(request: NextRequest, message: string, next: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/signup";
  url.search = "";
  url.searchParams.set("next", next);
  url.searchParams.set("error", message);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const next = String(formData.get("next") || "/onboarding");

  if (!hasSupabaseEnv()) {
    return redirectWithError(request, "Supabase is not configured yet.", next);
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin.replace(/\/+$/, "")}/auth/callback?next=${encodeURIComponent(next)}`,
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    },
  });

  if (error) {
    return redirectWithError(request, error.message, next);
  }

  const redirectTo = new URL(data.session ? next : "/login", request.url);
  if (!data.session) {
    redirectTo.searchParams.set("check_email", "1");
    redirectTo.searchParams.set("next", next);
  }

  return NextResponse.redirect(redirectTo, { status: 303 });
}
