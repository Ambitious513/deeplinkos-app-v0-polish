"use client";

type OnboardingFormProps = {
  firstName?: string | null;
  lastName?: string | null;
  workspaceName?: string | null;
  next?: string;
};

export function OnboardingForm({ firstName, lastName, workspaceName, next = "/dashboard" }: OnboardingFormProps) {
  return (
    <form className="auth-form" action="/api/onboarding" method="POST">
      <input type="hidden" name="next" value={next} />

      <div className="auth-form__row">
        <label>
          First name
          <input name="first_name" autoComplete="given-name" defaultValue={firstName ?? ""} required />
        </label>
        <label>
          Last name
          <input name="last_name" autoComplete="family-name" defaultValue={lastName ?? ""} required />
        </label>
      </div>

      <label>
        Workspace name
        <input name="workspace_name" autoComplete="organization" defaultValue={workspaceName ?? "DeepLinkOS workspace"} required />
      </label>

      <button className="btn btn-primary" type="submit">
        Continue to dashboard
      </button>
    </form>
  );
}
