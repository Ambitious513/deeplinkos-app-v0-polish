import { redirect } from "next/navigation";

import { OnboardingForm } from "@/components/auth/onboarding-form";
import { getAuthState, isProfileComplete } from "@/lib/auth/session";

export default async function OnboardingPage({ searchParams }: { searchParams: Promise<{ next?: string; error?: string }> }) {
  const { next = "/dashboard", error } = await searchParams;
  const state = await getAuthState();

  if (state.configured && !state.user) {
    redirect(`/login?next=${encodeURIComponent("/onboarding")}`);
  }

  if (state.configured && state.user && isProfileComplete(state.profile)) {
    redirect(next);
  }

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <div className="eyebrow">Workspace setup</div>
        <h1 className="auth-title">Finish your profile</h1>
        <p className="auth-copy">We use this to personalize your dashboard and keep billing, domains, and API access tied to the right workspace.</p>
        {!state.configured ? <p className="form-alert">Supabase env vars are not configured yet. This onboarding screen is ready for the deployed app.</p> : null}
        {error ? <p className="form-alert form-alert--error">{error}</p> : null}
        <OnboardingForm
          firstName={state.profile?.first_name}
          lastName={state.profile?.last_name}
          workspaceName={state.profile?.workspace_name}
          next={next}
        />
      </div>
    </section>
  );
}
