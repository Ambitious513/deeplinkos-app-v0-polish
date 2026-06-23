import { AuthForm } from "@/components/auth/auth-form";
import { getAuthState } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string; check_email?: string }> }) {
  const { next = "/dashboard", error, check_email: checkEmail } = await searchParams;
  const state = await getAuthState();

  if (state.configured && state.user) {
    redirect(next);
  }

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <div className="eyebrow">Welcome back</div>
        <h1 className="auth-title">Sign in to DeepLinkOS</h1>
        <p className="auth-copy">Manage smart links, QR codes, and campaign analytics from one workspace.</p>
        {!state.configured ? <p className="form-alert">Supabase env vars are not configured yet. The form is ready for deployment once credentials are added.</p> : null}
        <AuthForm mode="login" next={next} error={error} checkEmail={checkEmail === "1"} />
      </div>
    </section>
  );
}
