"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./data";
import { Logo, LogoCompact } from "./logo";
import type { SiteSettings } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header({ settings }: { settings?: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  // On home: transparent over hero until scrolled. On inner pages: always solid.
  const transparentHeader = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Track previous path to close mobile menu on route change
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    if (mobileOpen) setMobileOpen(false);
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          transparentHeader
            ? "bg-transparent"
            : "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(15,39,71,0.08),0_8px_30px_-12px_rgba(15,39,71,0.10)]"
        )}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group inline-flex items-center transition-opacity hover:opacity-90"
              aria-label="Biztra Business Advisory home"
            >
              <span className="hidden sm:inline-flex">
                <Logo
                  variant={transparentHeader ? "light" : "default"}
                  showTagline
                  markSize={transparentHeader ? 40 : 38}
                />
              </span>
              <span className="sm:hidden">
                <LogoCompact
                  variant={transparentHeader ? "light" : "default"}
                  markSize={34}
                />
              </span>
            </Link>

            {/* Desktop nav */}
            <nav
              className="hidden lg:flex items-center gap-1"
              aria-label="Primary navigation"
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-md",
                    transparentHeader
                      ? isActive(item.href)
                        ? "text-white"
                        : "text-white/80 hover:text-white"
                      : isActive(item.href)
                        ? "text-navy-deep"
                        : "text-muted-foreground hover:text-navy-deep"
                  )}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute left-4 right-4 -bottom-0.5 h-px bg-gold"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/contact"
                className={cn(
                  "group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                  transparentHeader
                    ? "bg-white text-navy-deep hover:bg-gold hover:text-white"
                    : "bg-navy-deep text-white hover:bg-navy"
                )}
              >
                {settings?.heroPrimaryCta || "Book a Consultation"}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={cn(
                "lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md transition-colors",
                transparentHeader
                  ? "text-white hover:bg-white/10"
                  : "text-navy-deep hover:bg-muted"
              )}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide-out menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-navy-deep/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
              aria-label="Mobile navigation"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between h-16 px-5 border-b border-border">
                <Logo variant="default" showTagline markSize={36} />
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md text-navy-deep hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto scrollbar-slim px-5 py-6">
                <ul className="space-y-1">
                  {NAV_ITEMS.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors",
                          isActive(item.href)
                            ? "bg-muted text-navy-deep"
                            : "text-muted-foreground hover:text-navy-deep hover:bg-muted/60"
                        )}
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 opacity-40" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="p-5 border-t border-border">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-navy-deep px-5 py-3.5 text-sm font-semibold text-white hover:bg-navy transition-colors"
                >
                  {settings?.heroPrimaryCta || "Book a Consultation"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <p className="mt-4 text-center text-xs text-muted-foreground">
                  Kathmandu, Nepal
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
