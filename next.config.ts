import {withSentryConfig} from "@sentry/nextjs"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
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