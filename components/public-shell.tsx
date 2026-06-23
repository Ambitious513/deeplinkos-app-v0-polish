"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const publicLinks = [
  { href: "/#features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/blog", label: "Blog" },
  { href: "/tools", label: "Tools" },
  { href: "/contact", label: "Contact" },
];

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function PublicShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("dlos-theme");
    const next = stored === "dark" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }, []);

  const setThemeMode = (next: "light" | "dark") => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("dlos-theme", next);
  };

  const navItems = useMemo(() => publicLinks, []);

  return (
    <div className="public-shell">
      <header className="public-header">
        <Link href="/" className="brand">
          <span className="brand__mark">D</span>
          <span>DeepLinkOS</span>
        </Link>

        <nav className="public-nav" aria-label="Primary">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="topbar-right">
          <button className="btn btn-ghost" type="button" onClick={() => setThemeMode(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
            Theme
          </button>
          <Link className="btn btn-ghost" href="/dashboard">
            Sign in
          </Link>
          <Link className="btn btn-primary" href="/dashboard">
            Start free
          </Link>
          <button className="btn btn-ghost" type="button" onClick={() => setMenuOpen((value) => !value)} aria-label="Toggle menu">
            Menu
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="drawer-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true">
          <div className="drawer" onClick={(event) => event.stopPropagation()}>
            <div className="drawer-grid">
              {navItems.map((item) => (
                <Link key={item.href} className="drawer-link" href={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <main className="public-main">{children}</main>
    </div>
  );
}

