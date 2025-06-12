import {withSentryConfig} from "@sentry/nextjs";
import type { NextConfig } from "next";

const isProxyHost = process.env.VERCEL_URL === 'vieux-carre.vercel.app'

const nextConfig: NextConfig = {
  basePath   : isProxyHost ?  '/support': '',
  assetPrefix: isProxyHost ?  '/support': '',
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