/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["3.bp.blogspot.com", "www.musickorea.asia"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "mosaic.scdn.co",
        port: "",
        pathname: "/640/**",
      },
      {
        protocol: "http",
        hostname: "ticketimage.interpark.com",
        port: "",
        pathname: "/rz/image/**",
      },
    ],
  },
};

module.exports = withPlugins(
  [
    [
      withPWA,
      {
        pwa: {
          dest: "public",
        },
      },
    ],
  ],
  nextConfig
);
