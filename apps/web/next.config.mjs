import bundleAnalyzer from "@next/bundle-analyzer"
import createNextIntlPlugin from "next-intl/plugin"

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  transpilePackages: ["@library/ui"],
  webpack: (config) => {
    config.cache = false

    return config
  },
  async headers() {
    return [
      {
        source: "/:path*\\.webp",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*\\.svg",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ]
  },
}

const withNextIntl = createNextIntlPlugin("./i18n/request.ts")

export default withBundleAnalyzer(withNextIntl(nextConfig))
