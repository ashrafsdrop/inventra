"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import apiFetch from "../lib/api";

export default function SignupForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const username = useMemo(() => {
    const value = email.trim();
    return value || "";
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!agreed) {
      setError("You need to accept the terms before creating an account.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const res = await fetch(`${API_BASE}/api/accounts/signup/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          role: companyName,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const message =
          typeof data === "object" && data
            ? Object.values(data)
                .flat()
                .join(" ")
            : "Unable to create account.";
        throw new Error(message || "Unable to create account.");
      }

      const loginResponse = await fetch(`${API_BASE}/api/accounts/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const loginData = await loginResponse.json().catch(() => ({}));

      if (!loginResponse.ok) {
        throw new Error(
          loginData?.detail ||
            loginData?.non_field_errors?.[0] ||
            "Account created, but automatic sign-in failed. Please sign in manually."
        );
      }

      localStorage.setItem("access_token", loginData.access);
      localStorage.setItem("refresh_token", loginData.refresh);
      localStorage.setItem("user", JSON.stringify(loginData.user || data || {}));

      try {
        await apiFetch("/api/dashboard/summary/");
      } catch (authError) {
        console.warn("Authenticated post-signup check failed:", authError);
      }

      setSuccess(`Account created for ${data.username || email}. Redirecting to your dashboard...`);
      setTimeout(() => router.push("/dashboard"), 1400);
    } catch (err) {
      setError(err.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-semibold text-[#2e3347] mb-2">First Name</span>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Jane"
            className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-[#2e3347] mb-2">Last Name</span>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
          />
        </label>
      </div>

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
        <span className="block text-sm font-semibold text-[#2e3347] mb-2">Company Name</span>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Inventra Holdings"
          className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
        />
      </label>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-semibold text-[#2e3347] mb-2">Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            required
            className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
          />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold text-[#2e3347] mb-2">Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat password"
            required
            className="w-full rounded-2xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-4 py-3.5 text-[#0a0d14] outline-none transition-all focus:border-[#4f6ef7] focus:ring-4 focus:ring-[#4f6ef7]/10"
          />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-[#6b7280]">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-[rgba(0,0,0,0.15)] accent-[#4f6ef7]"
        />
        <span>
          I agree to the <a href="#" className="font-medium text-[#4f6ef7] hover:text-[#3d5ce6] transition-colors">Terms</a> and <a href="#" className="font-medium text-[#4f6ef7] hover:text-[#3d5ce6] transition-colors">Privacy Policy</a>.
        </span>
      </label>

      <button disabled={loading} className="cursor-pointer w-full rounded-2xl bg-[#4f6ef7] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4f6ef7]/30 transition-all hover:-translate-y-0.5 hover:bg-[#3d5ce6] disabled:opacity-60">
        {loading ? "Creating account..." : "Create Account"}
      </button>

      {error && <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {success && <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{success}</div>}

      <div className="mt-8 flex items-center gap-3 text-sm text-[#6b7280]">
        <span className="h-px flex-1 bg-[rgba(0,0,0,0.08)]" />
        <span>Already have an account?</span>
        <span className="h-px flex-1 bg-[rgba(0,0,0,0.08)]" />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 text-sm">
        <span className="text-[#6b7280]">Return to the sign-in page.</span>
        <Link href="/login" className="font-semibold text-[#0a0d14] hover:text-[#4f6ef7] transition-colors">
          Sign in
        </Link>
      </div>
    </form>
  );
}
