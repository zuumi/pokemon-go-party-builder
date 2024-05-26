/** @type {import('next').NextConfig} */
const nextConfig = {
  // useEffectの処理が2回呼び出されているのを回避。
  reactStrictMode: false,
  // Googleのプロフィール画像を表示するため
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
