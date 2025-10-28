/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        port: '',
        pathname: '/**',
      },
      // Jika butuh hostname lain (contoh: untuk Unsplash atau gambar batik eksternal)
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // Tambah di sini jika ada hostname lain
    ],
  },
  // Tambahkan config lain jika perlu, misal:
  // reactStrictMode: true,
  // swcMinify: true,
};

export default nextConfig;