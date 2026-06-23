import { AuthForm } from "@/components/auth/auth-form";
import { getAuthState } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next = "/onboarding", error } = await searchParams;
  const state = await getAuthState();

  if (state.configured && state.user) {
    redirect(next);
  }

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <div className="eyebrow">Start free</div>
        <h1 className="auth-title">Create your DeepLinkOS workspace</h1>
        <p className="auth-copy">Ship trackable smart links for social, commerce, affiliate, QR, and custom-domain campaigns.</p>
        {!state.configured ? <p className="form-alert">Supabase env vars are not configured yet. The form is ready for deployment once credentials are added.</p> : null}
        <AuthForm mode="signup" next={next} error={error} />
      </div>
    </section>
  );
}
