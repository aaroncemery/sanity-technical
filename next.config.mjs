/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    domains: ['cdn.sanity.io'],
  },
};

export default nextConfig;
