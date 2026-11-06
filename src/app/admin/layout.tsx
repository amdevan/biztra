"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  FileText,
  Briefcase,
  Factory,
  Scale,
  Target,
  ListOrdered,
  Users,
  BookOpen,
  LogOut,
  ExternalLink,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import { LogoMark } from "@/components/biztra/logo";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Site Settings", href: "/admin/settings", icon: Settings },
  { label: "About Page", href: "/admin/about", icon: FileText },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Industries", href: "/admin/industries", icon: Factory },
  { label: "Core Values", href: "/admin/core-values", icon: Scale },
  { label: "Why Choose Us", href: "/admin/why-choose", icon: Target },
  { label: "Approach Steps", href: "/admin/approach-steps", icon: ListOrdered },
  { label: "Team Members", href: "/admin/team", icon: Users },
  { label: "Research Articles", href: "/admin/articles", icon: BookOpen },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authChecked, setAuthChecked] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Allow login page to render without auth check / sidebar
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      return;
    }
    let cancelled = false;
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.authenticated) {
          router.replace("/admin/login");
          return;
        }
        setAuthChecked(true);
      })
      .catch(() => {
        if (!cancelled) router.replace("/admin/login");
      });
    return () => {
      cancelled = true;
    };
  }, [router, isLoginPage]);

  // Track previous pathname to close mobile sidebar on change (lint-safe)
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    if (mobileSidebarOpen) setMobileSidebarOpen(false);
  }

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-6 w-6 animate-spin text-navy-deep" />
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-screen flex bg-mist" style={{ background: "oklch(0.97 0.005 250)" }}>
      {/* Sidebar — desktop */}
      <aside className="hidden lg:flex w-64 flex-none flex-col bg-white border-r border-border">
        <SidebarContent
          navItems={NAV_ITEMS}
          isActive={isActive}
          onLogout={handleLogout}
        />
      </aside>

      {/* Sidebar — mobile slide-out */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-navy-deep/40 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-white shadow-2xl lg:hidden flex flex-col">
            <SidebarContent
              navItems={NAV_ITEMS}
              isActive={isActive}
              onLogout={handleLogout}
              onClose={() => setMobileSidebarOpen(false)}
            />
          </aside>
        </>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        <header className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-border h-14 flex items-center justify-between px-4">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-navy-deep hover:bg-muted transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/admin" className="flex items-center gap-2">
            <LogoMark size={28} variant="default" />
            <span className="font-serif text-sm font-semibold text-navy-deep">Admin</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md text-navy-deep hover:bg-muted transition-colors"
            aria-label="View site"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({
  navItems,
  isActive,
  onLogout,
  onClose,
}: {
  navItems: NavItem[];
  isActive: (href: string) => boolean;
  onLogout: () => void;
  onClose?: () => void;
}) {
  return (
    <>
      {/* Brand header */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-border">
        <Link href="/admin" className="flex items-center gap-3">
          <LogoMark size={34} variant="default" />
          <div className="flex flex-col leading-none">
            <span className="font-serif text-base font-semibold text-navy-deep">Biztra</span>
            <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-gold mt-0.5">
              Admin
            </span>
          </div>
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md text-navy-deep hover:bg-muted transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto scrollbar-slim p-3" aria-label="Admin navigation">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-navy-deep text-white"
                      : "text-muted-foreground hover:text-navy-deep hover:bg-mist"
                  )}
                  style={
                    active
                      ? undefined
                      : { background: undefined }
                  }
                >
                  <Icon className="h-4 w-4 flex-none" />
                  <span className="truncate">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer actions */}
      <div className="p-3 border-t border-border space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-navy-deep hover:bg-mist transition-colors"
        >
          <ExternalLink className="h-4 w-4 flex-none" />
          View Live Site
        </Link>
        <button
          type="button"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-4 w-4 flex-none" />
          Sign Out
        </button>
      </div>
    </>
  );
}
