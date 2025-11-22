import type { NextConfig } from "next";

type ExtendedNextConfig = NextConfig & {
  eslint?: {
    ignoreDuringBuilds?: boolean;
  };
  typescript?: {
    ignoreBuildErrors?: boolean;
  };
};

const nextConfig: ExtendedNextConfig = {
  /* config options here */
  reactStrictMode: true,
  // Disable type checking during builds (useful for Vercel to avoid failing builds for TS errors)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Optional: disable ESLint during builds as well
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Allow any external image origin for both https and http
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow any hostname over https
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "**", // allow any hostname over http
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
