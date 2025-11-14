// next.config.ts

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Tambahkan objek 'images' di sini
  images: {
    // Daftarkan hostname eksternal yang Anda gunakan
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
      },
    ],
  },
  // Anda bisa menambahkan konfigurasi lain di sini jika ada
};

export default nextConfig;