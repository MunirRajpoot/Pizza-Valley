/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_URL: "https://pizza-valley.vercel.app",
    
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.dominos.co.in",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
