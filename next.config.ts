import type { NextConfig } from "next";

const apiBase = process.env.NEXT_PUBLIC_WP_API_BASE;

if (!apiBase) {
  throw new Error("NEXT_PUBLIC_WP_API_BASE is not defined");
}

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i0.wp.com" }, 
      { protocol: "https", hostname: "public-api.wordpress.com" },
      { protocol: "https", hostname: "nlpharmacymuseum-dbjme.wordpress.com" },
      { protocol: "https", hostname: new URL(apiBase).hostname },
      { protocol: "https", hostname: "secure.gravatar.com" },
      { protocol: "https", hostname: "scontent.fyyt1-1.fna.fbcdn.net" },
      { protocol: "https", hostname: "scontent.xx.fbcdn.net" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

module.exports = nextConfig;

