"use client";

import Link from "next/link";

type AuthFormProps = {
  mode: "login" | "signup";
  next: string;
  error?: string;
  checkEmail?: boolean;
};

export function AuthForm({ mode, next, error, checkEmail }: AuthFormProps) {
  const action = mode === "login" ? "/api/auth/login" : "/api/auth/signup";
  const isSignup = mode === "signup";

  return (
    <form className="auth-form" action={action} method="POST">
      <input type="hidden" name="next" value={next} />

      {isSignup ? (
        <div className="auth-form__row">
          <label>
            First name
            <input name="first_name" autoComplete="given-name" placeholder="Dana" required />
          </label>
          <label>
            Last name
            <input name="last_name" autoComplete="family-name" placeholder="Lee" required />
          </label>
        </div>
      ) : null}

      <label>
        Email
        <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
      </label>

      <label>
        Password
        <input name="password" type="password" autoComplete={isSignup ? "new-password" : "current-password"} minLength={8} required />
      </label>

      {error ? <p className="form-alert form-alert--error">{error}</p> : null}
      {checkEmail ? <p className="form-alert">Check your email to finish creating your account.</p> : null}

      <button className="btn btn-primary" type="submit">
        {isSignup ? "Create account" : "Sign in"}
      </button>

      <p className="auth-form__switch">
        {isSignup ? "Already have an account?" : "New to DeepLinkOS?"}{" "}
        <Link href={`${isSignup ? "/login" : "/signup"}?next=${encodeURIComponent(next)}`}>
          {isSignup ? "Sign in" : "Create an account"}
        </Link>
      </p>
    </form>
  );
}
