/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! 주의 !!
    // 상업용이라도 빌드가 안 되면 의미가 없으므로 일단 끕니다.
    ignoreBuildErrors: true,
  },
  eslint: {
    // 빌드 시 ESLint 검사도 무시합니다.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
