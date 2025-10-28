// app/galeri/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Share2, Download, Sparkles } from 'lucide-react';

// Database motif berdasarkan slug
const motifDatabase: Record<string, {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string;
  tags: string[];
  img: string;
  author?: string;
  date?: string;
}> = {
  'batik-warak-ngendok': {
    id: 1,
    title: 'Batik Warak Ngendok',
    slug: 'batik-warak-ngendok',
    category: 'Popular',
    description: 'Warak Ngendok adalah motif batik khas Semarang yang menggambarkan burung mitologi dengan kepala naga dan badan burung. Motif ini melambangkan harmoni antara budaya Jawa dan Tionghoa.',
    tags: ['Semarang', 'Mitologi', 'Harmoni Budaya', 'Imlek'],
    img: '/batik.jpg',
    author: 'Maestro Batik Semarang',
    date: '15 Maret 2025'
  },
  'batik-parang-kusumo': {
    id: 2,
    title: 'Batik Parang Kusumo',
    slug: 'batik-parang-kusumo',
    category: 'Discussed',
    description: 'Motif Parang Kusumo melambangkan harapan dan keabadian. Pola diagonal yang tegas mencerminkan kekuatan dan keteguhan hati.',
    tags: ['Yogyakarta', 'Filosofi', 'Keabadian'],
    img: '/batik.jpg',
  },
  'batik-megamendung': {
    id: 3,
    title: 'Batik Megamendung',
    slug: 'batik-megamendung',
    category: 'Recent',
    description: 'Motif awan dari Cirebon ini melambangkan langit yang luas dan kemurahan hati. Warna gradasi biru menjadi ciri khasnya.',
    tags: ['Cirebon', 'Awan', 'Kemurahan'],
    img: '/batik.jpg',
  },
  // Tambahkan sesuai kebutuhan
};

interface Props {
  params: { slug: string };
}

export default function MotifDetailPage({ params }: Props) {
  const { slug } = params;
  const motif = motifDatabase[slug];

  if (!motif) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/galeri" className="hover:text-lime-600 transition">
            Galeri
          </Link>
          <ChevronLeft className="w-4 h-4 rotate-180" />
          <span className="text-gray-900 font-medium">{motif.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Gambar */}
          <div className="relative group">
            <div className="overflow-hidden rounded-3xl shadow-xl bg-gray-100">
              <Image
                src={motif.img}
                alt={motif.title}
                width={800}
                height={800}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-lime-400 hover:text-black transition">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <span className="inline-block px-4 py-1 bg-lime-100 text-lime-700 text-xs font-semibold rounded-full">
              {motif.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-4">
              {motif.title}
            </h1>

            {motif.author && (
              <p className="text-sm text-gray-500 mb-6">
                Oleh <span className="font-medium text-gray-700">{motif.author}</span> • {motif.date}
              </p>
            )}

            <p className="text-gray-600 leading-relaxed">
              {motif.description}
            </p>

            <div className="flex flex-wrap gap-2 mt-8">
              {motif.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-orange-100 hover:text-orange-600 transition cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex gap-4 mt-10">
              <Link
                href={`/generate?variasi=${motif.slug}`}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-400 to-green-500 text-black font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition"
              >
                <Sparkles className="w-5 h-5" />
                Generate Variasi
              </Link>
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-lime-400 hover:text-lime-600 transition">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}