'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Search } from 'lucide-react';

interface Motif {
  id: number;
  title: string;
  slug: string; // ← slug tanpa ID, hanya dari judul
  img: string;
  category: string;
}

export default function GaleriPage() {
  const [activeTab, setActiveTab] = useState('Popular');
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = ['Popular', 'Discussed', 'Recent'];

  // Buat slug: lowercase + ganti spasi jadi -
  const createSlug = (title: string) => title.toLowerCase().replace(/\s+/g, '-');

  // Daftar judul unik (biar slug tidak bentrok)
  const uniqueTitles = [
    'Batik Warak Ngendok',
    'Batik Parang Kusumo',
    'Batik Megamendung',
    'Batik Cendrawasih',
    'Batik Kawung',
    'Batik Tujuh Rupa',
    'Batik Sekar Jagad',
    'Batik Truntum',
    'Batik Sido Mukti',
    'Batik Lereng',
    'Batik Tambal',
    'Batik Ceplok',
  ];

  // Buat 12 motif dengan judul unik
  const motifs: Motif[] = Array.from({ length: 12 }, (_, i) => {
    const title = uniqueTitles[i % uniqueTitles.length];
    return {
      id: i + 1,
      title,
      slug: createSlug(title), // ← slug: batik-warak-ngendok
      img: '/batik.jpg',
      category: activeTab,
    };
  });

  const filteredMotifs = motifs.filter((motif) =>
    motif.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    motif.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 12;
  const paginatedMotifs = filteredMotifs.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const totalPages = Math.ceil(filteredMotifs.length / itemsPerPage);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setPage(1);
    setSearchQuery('');
  };

  return (
    <main className="flex flex-col min-h-screen bg-white">

      {/* SEARCH BAR & TABS */}
      <section className="flex flex-col items-center py-12 px-4 sm:px-6 bg-gradient-to-b from-white to-gray-50">
        <div className="w-full max-w-2xl">
          <div className="flex bg-gray-100 rounded-full overflow-hidden shadow-sm border border-gray-200 hover:border-gray-300 transition">
            <div className="flex items-center px-5 py-3 text-gray-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              placeholder="Cari motif batik semarangan mu"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="flex-1 px-2 py-3 bg-transparent outline-none text-gray-700 placeholder-gray-400"
            />
            <button className="bg-lime-400 hover:bg-lime-500 text-black font-semibold px-6 transition">
              CARI
            </button>
          </div>
        </div>

        <div className="flex gap-8 mt-10 text-gray-500 font-semibold border-b border-gray-200 w-full max-w-2xl px-4 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`pb-3 transition relative ${
                activeTab === tab ? 'text-lime-500 font-bold' : 'hover:text-gray-700'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-lime-500 rounded-t"></div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* GALLERY GRID */}
      <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-12">
        {paginatedMotifs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {paginatedMotifs.map((item) => (
              <Link
                key={item.id}
                href={`/galeri/${item.slug}`}
                className="group block relative bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-lime-400 hover:shadow-lg transition duration-300"
              >
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-lime-400 p-2 rounded-full opacity-0 group-hover:opacity-100 transition transform group-hover:scale-110 duration-300 shadow-md">
                    <ArrowUpRight className="w-5 h-5 text-black" strokeWidth={3} />
                  </div>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-lime-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">{item.category}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="text-gray-400 text-lg font-semibold mb-2">
              Tidak ada motif ditemukan
            </div>
            <p className="text-gray-500 text-sm">
              Coba dengan kata kunci yang berbeda
            </p>
          </div>
        )}
      </section>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-16 px-4">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className={`border border-gray-300 rounded-lg p-2 transition ${
              page === 1 ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-100 hover:border-gray-400'
            }`}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`border rounded-lg px-4 py-2 font-semibold transition ${
                  page === num
                    ? 'bg-lime-400 border-lime-400 text-black shadow-md'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className={`border border-gray-300 rounded-lg p-2 transition ${
              page === totalPages ? 'opacity-40 cursor-not-allowed bg-gray-50' : 'hover:bg-gray-100 hover:border-gray-400'
            }`}
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      )}
    </main>
  );
}