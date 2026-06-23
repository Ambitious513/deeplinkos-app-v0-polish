import { NextResponse, type NextRequest } from "next/server";

import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

function redirectWithError(request: NextRequest, message: string) {
  const url = request.nextUrl.clone();
  url.pathname = "/onboarding";
  url.search = "";
  url.searchParams.set("error", message);
  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const firstName = String(formData.get("first_name") || "").trim();
  const lastName = String(formData.get("last_name") || "").trim();
  const workspaceName = String(formData.get("workspace_name") || "").trim();
  const next = String(formData.get("next") || "/dashboard");

  if (!hasSupabaseEnv()) {
    return redirectWithError(request, "Supabase is not configured yet.");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent("/onboarding")}`, request.url), { status: 303 });
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email || "",
    first_name: firstName,
    last_name: lastName,
    workspace_name: workspaceName,
    onboarding_completed_at: new Date().toISOString(),
  });

  if (error) {
    return redirectWithError(request, error.message);
  }

  await supabase.auth.updateUser({
    data: {
      first_name: firstName,
      last_name: lastName,
      workspace_name: workspaceName,
    },
  });

  return NextResponse.redirect(new URL(next, request.url), { status: 303 });
}
