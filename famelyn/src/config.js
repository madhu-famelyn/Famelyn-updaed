// Configuration for API Base URL
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

export const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (isLocalhost ? "http://localhost:8000" : "https://famelyn-backend.fly.dev");

// Elfsight Blog Widget App ID
// Go to elfsight.com, create a Blog widget, then paste your App ID here
export const ELFSIGHT_APP_ID = import.meta.env.VITE_ELFSIGHT_APP_ID || "33096bd6-fa59-4103-a6e1-0a84010d13a1";

