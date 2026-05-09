const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default async function apiFetch(path, options = {}) {
  if (typeof window === "undefined") throw new Error("apiFetch should be used on the client side");

  const token = localStorage.getItem("access_token");
  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    const err = new Error(`Request failed: ${res.status} ${text}`);
    err.status = res.status;
    err.response = res;
    throw err;
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}
