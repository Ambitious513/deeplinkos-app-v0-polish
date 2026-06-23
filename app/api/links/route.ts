import { NextResponse } from "next/server";

import { createLinkForUser, listLinksForUser } from "@/lib/links";
import { createClient } from "@/lib/supabase/server";

function shortUrlFor(request: Request, slug: string) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim() || "https";
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.split(",")[0]?.trim().replace(/\/+$/, "");
  const origin = configuredUrl || (forwardedHost ? `${forwardedProto}://${forwardedHost}` : new URL(request.url).origin);

  return `${origin}/r/${slug}`;
}

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const links = await listLinksForUser(user.id);
    return NextResponse.json({ links });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to list links." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const link = await createLinkForUser(body, user.id);

    return NextResponse.json({ link, shortUrl: shortUrlFor(request, link.slug) }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to create link." }, { status: 400 });
  }
}
