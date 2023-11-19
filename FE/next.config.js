/** @type {import('next').NextConfig} */
const withPlugins = require("next-compose-plugins");
const withPWA = require("next-pwa");
const nextConfig = {
  reactStrictMode: false,
  images: {
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
      {
        protocol: "https",
        hostname: "i1.ruliweb.com",
        port: "",
        pathname: "/img/**",
      },
      {
        protocol: "https",
        hostname: "velog.velcdn.com",
        port: "",
        pathname: "/img/**",
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
