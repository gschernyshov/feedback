import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname, // ← явно указываем корень
  },
}

export default nextConfig
