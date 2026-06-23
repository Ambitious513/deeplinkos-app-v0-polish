"use client";

export function SignOutButton() {
  return (
    <form action="/api/auth/signout" method="POST">
      <button className="btn btn-ghost" type="submit">
        Sign out
      </button>
    </form>
  );
}
