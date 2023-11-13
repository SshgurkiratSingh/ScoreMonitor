/** @type {import('next').NextConfig} */

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "http://ec2-3-88-49-62.compute-1.amazonaws.com:2500/api/userCustom/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
