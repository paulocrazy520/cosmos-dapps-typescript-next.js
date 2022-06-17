// const {
//   PRERENDER_MANIFEST,
//   PHASE_TEST,
//   PHASE_DEVELOPMENT_SERVER } = require('next/constants')

// const withBundleAnalyzer = require("@next/bundle-analyzer");

/*
 * @type {import('next').NextConfig}
 */
module.exports = {
  httpAgentOptions: {
    keepAlive: true,
  },
  poweredByHeader: false,
  // rewrites: async() => {

  // },
  async rewrites() {
    return [
      {
        source: "/pools/:path*",
        destination: "/pool/:path*",
      },
      {
        source: "/pools",
        destination: "/pool",
      },
      {
        source: "/rpc",
        destination: "https://rpc.ollo.zone",
      },
      {
        source: "/rpc/:path*",
        destination: "https://rpc.ollo.zone/:path*",
      },
      {
        source: "/lcd",
        destination: "https://lcd.ollo.zone",
      },
      {
        source: "/lcd/:path*",
        destination: "https://lcd.ollo.zone/:path*",
      },
      {
        source: "/grpc",
        destination: "http://13.56.254.227:9091",
      },
      {
        source: "/grpc/:path*",
        destination: "http://13.56.254.227:9091/:path*",
      },
      {
        source: "/validator/:path*",
        destination: "https://explorer.ollo.zone/ollo/staking/:path*",
      },
      {
        source: "/account/:path*",
        destination: "https://explorer.ollo.zone/ollo/account/:path*",
      },
      {
        source: "/height/:path*",
        destination: "https://explorer.ollo.zone/ollo/:path*",
      },
      {
        source: "/tx/:path*",
        destination: "https://explorer.ollo.zone/ollo/txs/:path*",
      },
    ];
  },
  compress: true,
  env: {
    OLLO_RPC: "https://rpc.ollo.zone",
    OLLO_API: "https://lcd.ollo.zone",
    OLLO_CHAIN_ID: "ollo-testnet-1",
    CHAIN_ID: "ollo-testnet-1",
    TESTNET: true,
    OLLO_DOCS: "https://docs.ollo.zone",
    OLLO_EX: "https://explorer.ollo.zone",
    URL:
      process.env.NODE_ENV == "development"
        ? "http://localhost:3000"
        : "https://on.ollo.zone",
  },
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["testnet.ollo.zone"],
  },
  // enabled: process.env.ANALYZE === "true",
};

// "@tanstack/query-sync-storage-persister": "^4.13.0",
// "@tanstack/react-query-persist-client": "^4.13.0",
