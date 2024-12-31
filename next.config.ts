import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer  = bundleAnalyzer ({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['image.tmdb.org'],
  },
};

export default withBundleAnalyzer(nextConfig);
