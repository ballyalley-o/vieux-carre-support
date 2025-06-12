import {withSentryConfig} from "@sentry/nextjs"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  basePath   : '/support',
  assetPrefix: '/support',
  async redirects() {
    return [
      {
        source     : '/',
        destination: '/support',
        permanent  : false
      }
    ]
  }
}

export default withSentryConfig(nextConfig, {
  org                    : "goodekit",
  project                : "vieux-carre-support",
  silent                 : !process.env.CI,
  widenClientFileUpload  : true,
  tunnelRoute            : "/monitoring",
  disableLogger          : true,
  automaticVercelMonitors: true,
})