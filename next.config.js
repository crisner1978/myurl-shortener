/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/:slug",
        destination: "/api/shorturl/:slug"
      }
    ]
  },
  env: {
    DEV_URL: process.env.DEV_URL,
    PROD_URL: process.env.PROD_URL,
  }
}
