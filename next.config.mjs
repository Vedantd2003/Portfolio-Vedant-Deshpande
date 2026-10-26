/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["nodemailer"],
    // Enables instrumentation.ts (opt-in Gemini startup check).
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "github.com" }],
  },
};

export default nextConfig;
