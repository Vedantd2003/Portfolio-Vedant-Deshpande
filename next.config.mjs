/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["nodemailer"],
  },
  images: {
    domains: ["github.com"],
  },
};

export default nextConfig;
