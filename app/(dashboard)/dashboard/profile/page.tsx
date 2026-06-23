import { PageFrame } from "@/components/dashboard/page-frame";
import { SignOutButton } from "@/components/auth/signout-button";
import { displayName, requireOnboarded } from "@/lib/auth/session";

export default async function ProfilePage() {
  const state = await requireOnboarded("/dashboard/profile");
  const name = displayName(state.profile, state.user?.email);

  return (
    <PageFrame
      eyebrow="Settings"
      title="Profile"
      description="Identity, workspace, and session controls for the current DeepLinkOS account."
    >
      <div className="panel auth-profile-panel">
        <div>
          <div className="metric-label">Name</div>
          <div className="metric-value" style={{ fontSize: "1.8rem" }}>{name}</div>
        </div>
        <div>
          <div className="metric-label">Email</div>
          <p style={{ margin: "6px 0 0" }}>{state.user?.email || "Not connected"}</p>
        </div>
        <div>
          <div className="metric-label">Workspace</div>
          <p style={{ margin: "6px 0 0" }}>{state.profile?.workspace_name || "DeepLinkOS workspace"}</p>
        </div>
        <div>
          <div className="metric-label">Onboarding</div>
          <span className="chip is-active">{state.profile?.onboarding_completed_at ? "Complete" : "Pending"}</span>
        </div>
        <SignOutButton />
      </div>
    </PageFrame>
  );
}
