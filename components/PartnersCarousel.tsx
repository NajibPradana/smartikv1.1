'use client';

import Image from 'next/image';
import { useState, useRef, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

// Pindahkan default data ke luar komponen
const DEFAULT_PARTNERS = [
  { name: 'John Carvin', role: 'Senior Advisor', img: '/partner-1.jpg' },
  { name: 'Miss Smith Ellen', role: 'Lead Educator', img: '/partner-2.jpg' },
  { name: 'John Carvin', role: 'Curriculum Director', img: '/partner-3.jpg' },
];

const DEFAULT_BANNERS = [
  { type: 'partners', partners: DEFAULT_PARTNERS },
  {
    type: 'large',
    img: '/banner-2.jpg',
    title: 'Imperdiet Viverra Condim',
    content: `Morbi fermentum velit mi, eget volutpat lorem sagittis et. Etiam fringilla, libero non ultricies commodo, velit mi. Cras euismod vitae odio. Cras sit amet felis, tristique et ligulam et, convallis ac felis. In elementum dolor libero, nec luctus orci rutrum nec.

Phasellus vel auct sem nibh. Etiam accumsan, vestibulum in elementum eros, imperdiet volutpat lorem sagittis et. Etiam fringilla, libero non ultricies commodo, velit mi.

**Annam Lorem Risus** Praesent Conulla, Fermentum Sagittis.`,
    social: true,
  },
  {
    type: 'large',
    img: '/banner-3.jpg',
    title: 'Innovative Learning Methods',
    content: `We implement cutting-edge teaching techniques that foster creativity and critical thinking in every student. Our approach combines technology with traditional values to create a balanced learning environment.

**Student-Centered** | **Future-Ready** | **Holistic Development**`,
    social: true,
  },
  {
    type: 'large',
    img: '/banner-4.jpg',
    title: 'Global Partnership Network',
    content: `Collaborating with leading educational institutions worldwide to bring international perspectives and opportunities to our students.

**50+ Countries** | **200+ Partners** | **1000+ Exchange Programs**`,
    social: true,
  },
] as const;

interface Partner {
  name: string;
  role: string;
  img: string;
}

interface Banner {
  type: 'partners' | 'large';
  partners?: Partner[];
  img?: string;
  title?: string;
  content?: string;
  social?: boolean;
}

interface PartnersCarouselProps {
  banners?: Banner[];
}

export default function PartnersCarousel({ banners: customBanners }: PartnersCarouselProps = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Gunakan useMemo agar referensi tetap stabil
  const banners = useMemo(() => customBanners || DEFAULT_BANNERS, [customBanners]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth * 0.9;
    const newScroll = direction === 'left'
      ? scrollRef.current.scrollLeft - scrollAmount
      : scrollRef.current.scrollLeft + scrollAmount;

    scrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  // Hanya jalankan saat mount & resize
  useEffect(() => {
    checkScroll();
    const handleResize = () => checkScroll();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // ← TIDAK DEPENDENSI `banners`!

  // Cek scroll saat banners berubah (hanya jika customBanners)
  useEffect(() => {
    checkScroll();
  }, [banners]);

  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Partners</h2>
          <div className="w-16 h-1 bg-lime-400 mx-auto mt-3 rounded-full" />
        </div>

        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* BANNER 1: 3 Partner Kecil */}
            <div className="flex-none w-full snap-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {banners[0].type === 'partners' && banners[0].partners?.map((p, i) => (
                  <div key={i} className="group text-center">
                    <div className="relative h-80 mb-6 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition">
                      <Image src={p.img} alt={p.name} fill className="object-cover" />
                      <div className="absolute bottom-4 left-4 bg-white p-2 rounded-full shadow-md">
                        <div className="w-6 h-6 bg-lime-400 rounded-full" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{p.role}</p>
                    <div className="mt-3 w-20 h-1 bg-lime-400 mx-auto rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* BANNER 2–4: Banner Besar */}
            {banners.slice(1).map((banner, idx) => (
              <div key={idx} className="flex-none w-full snap-center">
                {banner.type === 'large' && (
                  <div className="grid md:grid-cols-2 gap-8 bg-gray-900 text-white rounded-3xl overflow-hidden shadow-xl">
                    <div className="relative h-96 md:h-full">
                      <Image src={banner.img!} alt={banner.title!} fill className="object-cover" />
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-lime-400 mb-6">
                        {banner.title}
                      </h3>
                      <div
                        className="text-gray-300 leading-relaxed space-y-4"
                        dangerouslySetInnerHTML={{
                          __html: banner.content!.replace(/\*\*(.*?)\*\*/g, '<strong class="text-lime-400">$1</strong>')
                        }}
                      />
                      {banner.social && (
                        <div className="flex gap-4 mt-8">
                          <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-lime-400 transition"><Facebook className="w-5 h-5" /></a>
                          <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-lime-400 transition"><Twitter className="w-5 h-5" /></a>
                          <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-lime-400 transition"><Instagram className="w-5 h-5" /></a>
                          <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-lime-400 transition"><Linkedin className="w-5 h-5" /></a>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Panah */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 transition ${
              canScrollLeft ? 'hover:bg-lime-400 hover:text-white' : 'opacity-50'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 transition ${
              canScrollRight ? 'hover:bg-lime-400 hover:text-white' : 'opacity-50'
            }`}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}