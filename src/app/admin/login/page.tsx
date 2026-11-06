"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, AlertCircle, ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/biztra/logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setSubmitting(false);
        return;
      }

      // Redirect to admin dashboard on success
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-gradient noise-overlay text-white">
      {/* Top bar */}
      <header className="relative z-10">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <LogoMark size={36} variant="light" />
            <span className="font-serif text-lg font-semibold tracking-executive">
              Biztra
            </span>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
        </div>
      </header>

      {/* Centered card */}
      <main className="flex-1 flex items-center justify-center px-5 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-8 shadow-2xl">
            {/* Header */}
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/30 bg-gold/5 text-gold">
                <Lock className="h-6 w-6" />
              </div>
              <h1 className="mt-5 font-serif text-2xl font-semibold tracking-executive">
                Admin Sign In
              </h1>
              <p className="mt-2 text-sm text-white/60">
                Access the Biztra content management dashboard
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70"
                >
                  Email
                </label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    id="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    placeholder="admin@biztra.com.np"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-white/70"
                >
                  Password
                </label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                  <input
                    id="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/[0.03] pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold focus:ring-2 focus:ring-gold/20"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                >
                  <AlertCircle className="h-4 w-4 flex-none" />
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-navy-deep hover:bg-white transition-all disabled:opacity-60 disabled:cursor-wait"
              >
                {submitting ? "Signing in…" : "Sign In"}
                {submitting ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-navy-deep/30 border-t-navy-deep" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                )}
              </button>
            </form>

            {/* Demo credentials hint */}
            <div className="mt-6 rounded-lg border border-white/8 bg-white/[0.02] p-4 text-[12px] text-white/50">
              <p className="font-semibold text-white/70 mb-1">Default credentials:</p>
              <p className="font-mono">admin@biztra.com.np</p>
              <p className="font-mono">biztra-admin-2026</p>
              <p className="mt-2 text-white/40">Change this password after first login.</p>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-white/40">
            Biztra Business Advisory · Content Management System
          </p>
        </motion.div>
      </main>
    </div>
  );
}
