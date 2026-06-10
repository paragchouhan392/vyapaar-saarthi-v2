// Reads token from localStorage and returns auth headers
export function authHeaders() {
  const token = localStorage.getItem("vs_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";