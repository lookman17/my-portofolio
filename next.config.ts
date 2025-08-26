// File: next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Tambahkan atau gabungkan dengan konfigurasi 'images' ini
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        // 'hostname' adalah bagian penting yang perlu Anda tambahkan
        hostname: 'jqwiiakvlddjlakvuqkm.supabase.co', 
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  // Konfigurasi lain yang mungkin sudah Anda miliki bisa tetap di sini
  // reactStrictMode: true,
};

module.exports = nextConfig;