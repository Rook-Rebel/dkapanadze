import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Georgian (app/(ka)) and English (app/en) have separate root layouts, so a
    // 404 for unmatched URLs cannot be composed from layout + not-found.
    // app/global-not-found.tsx renders a complete bilingual 404 document instead.
    globalNotFound: true,
  },
};

export default nextConfig;
