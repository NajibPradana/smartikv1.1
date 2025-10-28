'use client';

import Image from 'next/image';
import PartnersCarousel from '@/components/PartnersCarousel';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* HERO SECTION */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image
          src="/about-hero.jpg"
          alt="Students learning"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-center items-center text-center px-6 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About Us
          </h1>
          <p className="text-lg md:text-xl max-w-3xl leading-relaxed">
            From preschool to pre-tertiary, our students enjoy fun, interactive and relevant lessons and are empowered to think beyond the confines of the classroom.
          </p>
        </div>
      </section>

      {/* HISTORY & COMPANY */}
      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-96 md:h-full rounded-2xl overflow-hidden shadow-xl">
            <Image
              src="/about-team.jpg"
              alt="Our team"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Our History
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Berdirinya sekolah ini di awali oleh sekelompok orang tua yang ingin memberikan pendidikan berkualitas tinggi bagi anak-anak mereka. Didirikan pada tahun 2005, kami terus berkembang menjadi institusi pendidikan yang diakui atas komitmennya terhadap inovasi dan keunggulan.
              </p>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                The Company We Are
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Didirikan sebagai sekolah swasta, kami kini melayani lebih dari 1.200 siswa dari berbagai latar belakang. Kami bangga menjadi bagian dari komunitas yang mendukung pertumbuhan holistik anak-anak, dengan fokus pada akademik, karakter, dan kreativitas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNERS CAROUSEL – DIPANGGIL DI SINI */}
      <PartnersCarousel />

    </main>
  );
}