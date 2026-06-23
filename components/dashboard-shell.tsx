"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const sidebarGroups = [
  {
    label: "Dashboard",
    items: [
      { href: "/dashboard", label: "Overview" },
      { href: "/dashboard/links", label: "Links" },
      { href: "/dashboard/analytics", label: "Analytics" },
      { href: "/dashboard/qr", label: "QR Designer" },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/dashboard/profile", label: "Profile" },
      { href: "/dashboard/billing", label: "Billing" },
    ],
  },
  {
    label: "Features",
    items: [
      { href: "/dashboard/domains", label: "Custom Domains" },
      { href: "/dashboard/pixels", label: "Pixels" },
    ],
  },
];

const bottomNav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/links", label: "Links" },
  { href: "/dashboard/analytics", label: "Analytics" },
  { href: "/dashboard/qr", label: "QR" },
];

const moreItems = [
  { href: "/dashboard/profile", label: "Profile" },
  { href: "/dashboard/billing", label: "Billing" },
  { href: "/dashboard/domains", label: "Domains" },
  { href: "/dashboard/pixels", label: "Pixels" },
];

function ThemeIcon({ dark }: { dark: boolean }) {
  return dark ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("dlos-theme");
    const next = stored === "dark" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMoreOpen || sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMoreOpen, sidebarOpen]);

  const currentTitle = useMemo(() => {
    if (pathname.startsWith("/dashboard/links")) return "Links";
    if (pathname.startsWith("/dashboard/analytics")) return "Analytics";
    if (pathname.startsWith("/dashboard/qr")) return "QR Designer";
    if (pathname.startsWith("/dashboard/profile")) return "Profile";
    if (pathname.startsWith("/dashboard/billing")) return "Billing";
    if (pathname.startsWith("/dashboard/domains")) return "Custom Domains";
    if (pathname.startsWith("/dashboard/pixels")) return "Pixels";
    return "Overview";
  }, [pathname]);

  const setThemeMode = (next: "light" | "dark") => {
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    window.localStorage.setItem("dlos-theme", next);
  };

  const navLink = (href: string, label: string) => (
    <Link
      key={href}
      className={`sidebar-link${isActive(pathname, href) ? " is-active" : ""}`}
      href={href}
      onClick={() => setSidebarOpen(false)}
    >
      <span className="sidebar-link__icon">
        <PlusIcon />
      </span>
      <span>{label}</span>
    </Link>
  );

  return (
    <div className={`dashboard-shell${sidebarOpen ? " is-sidebar-open" : ""}`}>
      <aside className="dashboard-sidebar">
        <Link href="/dashboard" className="dashboard-sidebar__brand" onClick={() => setSidebarOpen(false)}>
          <span className="dashboard-sidebar__mark">D</span>
          <span>DeepLinkOS</span>
        </Link>

        {sidebarGroups.map((group) => (
          <div key={group.label} className="sidebar-group">
            <div className="sidebar-group__label">{group.label}</div>
            {group.items.map((item) => navLink(item.href, item.label))}
          </div>
        ))}

        <div style={{ marginTop: "auto", display: "grid", gap: 10 }}>
          <button className="btn btn-primary" type="button">
            <PlusIcon />
            Create link
          </button>
          <button className="btn btn-ghost" type="button" onClick={() => setThemeMode(theme === "light" ? "dark" : "light")}>
            <ThemeIcon dark={theme === "dark"} />
            Theme
          </button>
        </div>
      </aside>

      <div className="dashboard-shell__body">
        <header className="shell-topbar">
          <div className="topbar-left">
            <button className="btn btn-ghost" type="button" onClick={() => setSidebarOpen((value) => !value)}>
              <MenuIcon />
              Menu
            </button>
            <div>
              <div className="eyebrow">Dashboard / {currentTitle}</div>
              <h1 style={{ margin: "6px 0 0", fontFamily: "var(--font-display)", letterSpacing: "-0.04em" }}>{currentTitle}</h1>
            </div>
          </div>

          <div className="topbar-right">
            <div className="topbar-search">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
              <input placeholder="Search links, campaigns, referrers..." />
            </div>
            <button className="btn btn-ghost" type="button" onClick={() => setThemeMode(theme === "light" ? "dark" : "light")}>
              <ThemeIcon dark={theme === "dark"} />
            </button>
            <button className="btn btn-primary" type="button">
              <PlusIcon />
              Create link
            </button>
          </div>
        </header>

        <main className="dashboard-content">{children}</main>
      </div>

      <nav className="mobile-bottom-nav" aria-label="Dashboard sections">
        {bottomNav.map((item) => (
          <Link key={item.href} className={`mobile-bottom-nav__item${isActive(pathname, item.href) ? " is-active" : ""}`} href={item.href}>
            {item.label}
          </Link>
        ))}
        <button className="mobile-bottom-nav__item" type="button" onClick={() => setMobileMoreOpen(true)}>
          More
        </button>
      </nav>

      <button className="btn btn-primary dashboard-mobile-create" type="button">
        <PlusIcon />
        Create
      </button>

      {mobileMoreOpen ? (
        <div className="drawer-backdrop" onClick={() => setMobileMoreOpen(false)} aria-hidden="true">
          <div className="drawer" onClick={(event) => event.stopPropagation()}>
            <div className="eyebrow" style={{ marginBottom: 10 }}>More</div>
            <div className="drawer-grid">
              {moreItems.map((item) => (
                <Link key={item.href} href={item.href} className="drawer-link" onClick={() => setMobileMoreOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

