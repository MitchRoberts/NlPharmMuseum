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
      { protocol: "https", hostname: new URL(apiBase).hostname },
    ],
  },
};

module.exports = nextConfig;

