/** @type {import('next').NextConfig} */
const nextConfig = {
  // useEffectの処理が2回呼び出されているのを回避。
  reactStrictMode: false,
};

export default nextConfig;
