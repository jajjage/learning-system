import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: [
      "unsplash.com",
      "media.istockphoto.com",
      "uploadthing.com",
      "utfs.io",
    ],
  },
}

export default nextConfig
