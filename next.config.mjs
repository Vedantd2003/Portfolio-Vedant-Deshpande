/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["nodemailer"],
  },
  images: {
    remotePatterns: [{ protocol: "https", hostname: "github.com" }],
  },
};

export default nextConfig;
