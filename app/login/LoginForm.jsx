"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import apiFetch from "../lib/api";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_BASE}/api/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        throw new Error(text || "Login failed");
      }

      const data = await res.json();
      // store tokens and user
      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user || {}));

      // test an authenticated call
      try {
        const summary = await apiFetch("/api/dashboard/summary/");
        console.log("Authenticated dashboard summary:", summary);
      } catch (err) {
        console.warn("Authenticated call failed:", err);
      }

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Login error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <label className="block">
        <span className="block text-sm font-semibold text-[#2e3347] mb-2">Work Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@company.com"
          required
          className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
        />
      </label>

      <label className="block">
        <span className="block text-sm font-semibold text-[#2e3347] mb-2">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
        />
      </label>

      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="flex items-center gap-2 text-[#6b7280]">
          <input type="checkbox" className="h-4 w-4 rounded border-[rgba(0,0,0,0.15)] accent-[#4f6ef7]" />
          Remember me
        </label>
        <a href="#" className="font-medium text-[#4f6ef7] hover:text-[#3d5ce6] transition-colors">
          Forgot password?
        </a>
      </div>

      <button disabled={loading} className="cursor-pointer w-full rounded-2xl bg-[#4f6ef7] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/30 transition-all hover:-translate-y-0.5 hover:bg-[#3d5ce6] disabled:opacity-60">
        {loading ? "Signing in..." : "Sign In"}
      </button>
      {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

      <div className="mt-8 flex items-center gap-3 text-sm text-[#6b7280]">
        <span className="h-px flex-1 bg-[rgba(0,0,0,0.08)]" />
        <span>New to Inventra?</span>
        <span className="h-px flex-1 bg-[rgba(0,0,0,0.08)]" />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 text-sm">
        <span className="text-[#6b7280]">Create a new account in minutes.</span>
        <Link href="/signup" className="font-semibold text-[#0a0d14] hover:text-[#4f6ef7] transition-colors">
          Sign up
        </Link>
      </div>
    </form>
  );
}
