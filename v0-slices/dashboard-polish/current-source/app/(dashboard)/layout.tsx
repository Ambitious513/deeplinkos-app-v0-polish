import { DashboardShell } from "@/components/dashboard-shell";
import { displayName, requireOnboarded } from "@/lib/auth/session";
import type { ReactNode } from "react";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const state = await requireOnboarded("/dashboard");
  const workspaceName = state.profile?.workspace_name || displayName(state.profile, state.user?.email);

  return (
    <DashboardShell workspaceName={workspaceName} userEmail={state.user?.email ?? null}>
      {children}
    </DashboardShell>
  );
}
