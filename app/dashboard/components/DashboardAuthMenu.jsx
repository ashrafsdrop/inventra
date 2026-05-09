"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardAuthMenu() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [displayName, setDisplayName] = useState("Account");

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        const rawUser = localStorage.getItem("user");
        if (rawUser) {
          const user = JSON.parse(rawUser);
          const name = [user.first_name, user.last_name].filter(Boolean).join(" ").trim();
          setDisplayName(name || user.username || user.email || "Account");
        }
      } catch (error) {
        console.warn("Unable to read stored user:", error);
      } finally {
        setReady(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="hidden md:flex items-center gap-3 rounded-2xl border border-[rgba(0,0,0,0.08)] bg-white px-4 py-3 shadow-sm">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4f6ef7]/10 text-sm font-bold text-[#4f6ef7]">
        {ready ? displayName.charAt(0).toUpperCase() : "A"}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-medium text-[#6b7280]">Signed in as</div>
        <div className="max-w-[160px] truncate text-sm font-semibold text-[#0a0d14]">{ready ? displayName : "Loading..."}</div>
      </div>
      <button
        type="button"
        onClick={handleLogout}
        className="ml-2 rounded-xl border border-[rgba(0,0,0,0.08)] bg-[#f4f6fb] px-3 py-2 text-xs font-semibold text-[#2e3347] transition hover:border-[#4f6ef7] hover:text-[#4f6ef7]"
      >
        Logout
      </button>
    </div>
  );
}
