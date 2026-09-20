"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import BrandLogo from "@/components/shared/BrandLogo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success("Welcome back, Managing Partner.");
        router.push("/admin");
        router.refresh();
      } else {
        setErrorMsg(data.message || "Invalid credentials");
        toast.error(data.message || "Invalid credentials");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#061016] text-white flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* Top Brand Bar */}
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center group">
          <BrandLogo light />
        </Link>

        <div className="flex items-center gap-2 text-xs text-white/50 border border-white/10 px-3 py-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-red" />
          <span>Executive Portal</span>
        </div>
      </div>

      {/* Login Card */}
      <div className="max-w-md w-full mx-auto my-12 bg-white/5 border border-white/10 p-8 sm:p-10 backdrop-blur-md space-y-8 shadow-2xl">
        <div className="space-y-2 text-center">
          <span className="text-[10px] font-mono uppercase tracking-widest text-brand-red font-semibold block">
            AUTHENTICATION
          </span>
          <h1 className="font-editorial text-3xl text-white">
            Advisory Control Suite
          </h1>
          <p className="text-xs text-white/60">
            Sign in to manage practices, publications, and client inquiries.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 bg-brand-red/20 border border-brand-red text-brand-red text-xs text-center font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70 block">
              Partner Email
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 text-sm text-white focus:outline-hidden focus:border-brand-red focus:bg-white/10 transition-colors"
                placeholder="admin@taxmetryx.com"
              />
              <Mail className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold uppercase tracking-wider text-white/70 block">
              Security Key / Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/15 text-sm text-white focus:outline-hidden focus:border-brand-red focus:bg-white/10 transition-colors"
                placeholder="••••••••••••"
              />
              <Lock className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-brand-red hover:bg-[#b80012] text-white text-xs uppercase tracking-[0.16em] font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Access Control Suite"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>


      </div>

      {/* Footer */}
      <div className="text-center text-xs text-white/40 font-mono">
        © 2026 Taxmetryx Advisory Ltd. • Dubai, UAE • Encrypted Access
      </div>
    </div>
  );
}
