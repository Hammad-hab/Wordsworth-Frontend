/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
        {
        protocol: "http",
        hostname: "books.google.com",
      },
      {
        protocol: "https",
        hostname: "covers.openlibrary.org"
      },
      {
        protocol: "https",
        hostname: "i.gr-assets.com"
      }

    ],
  },
};

export default nextConfig;
