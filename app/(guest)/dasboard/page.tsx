'use client';

import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    contactType: 'say-hi' as 'say-hi' | 'get-quote'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactTypeChange = (type: 'say-hi' | 'get-quote') => {
    setFormData(prev => ({ ...prev, contactType: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '', contactType: 'say-hi' });
    alert('Message sent successfully!');
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
              Dari identifikasi mendalam, hingga kreasi tak terhingga
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              Platform untuk menggali makna di setiap motif, mengidentifikasi pola tersembunyi, dan memunculkan variasi tak terbatas baharu.
            </p>
            <button className="mt-8 px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
              Jelajahi Sekarang
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl h-40"></div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl h-40"></div>
            <div className="bg-gray-200 border-2 border-dashed rounded-xl h-48 col-span-2"></div>
          </div>
        </div>
      </section>

      {/* Fitur Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Fitur</h2>
          <p className="mt-3 text-gray-600">
            Jelajahi fitur dan kemampuan luar biasa yang dirancang khusus untuk Anda.
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {/* Klasifikasi */}
            <div className="group bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">K</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Klasifikasi Motif Batik</h3>
              </div>
              <div className="bg-gray-100 border-2 border-dashed rounded-xl h-32 mb-4"></div>
              <p className="text-sm text-gray-600">Dalami Selamanya</p>
            </div>

            {/* Generatif */}
            <div className="group bg-gradient-to-br from-lime-400 to-green-500 p-8 rounded-2xl hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">G</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Generatif Motif Baru</h3>
              </div>
              <div className="bg-white/30 backdrop-blur-sm border-2 border-white/50 border-dashed rounded-xl h-32 mb-4"></div>
              <p className="text-sm text-gray-800 font-medium">Dalami Selamanya</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simpan Hasil Generate */}
      <section className="px-6 md:px-12 lg:px-24 py-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Simpan Hasil Generate.....</h2>
            <p className="mt-6 text-gray-600">
              Biarkan AI kami memberikan saran pilihan dengan asisten seketika untuk hasil yang lebih baik. Hemat waktu dan dapatkan hasil yang maksimal dengan fitur simpan otomatis kami.
            </p>
            <button className="mt-8 px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition">
              Daftar Sekarang
            </button>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl shadow-xl"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-black rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artikel Section */}
      <section className="px-6 md:px-12 lg:px-24 py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Artikel</h2>
          <p className="mt-3 text-gray-600">
            Baca artikel menarik setiap hari tentang batik, fashion, dan desain lainnya hanya di SmarTik kami.
          </p>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
            {[
              'Batik Krimangan Sesuara',
              'Batik Gejang Seramang',
              'Batik Ageng Blossom',
              'Garis Merah Motif Latif Arum',
              'Garis Merdu Megara',
              'Garis Lesmetik Seedosing'
            ].map((title, idx) => (
              <div
                key={idx}
                className="group relative bg-gradient-to-br from-rose-100 to-rose-200 rounded-2xl h-48 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-sm font-semibold leading-tight">{title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bekerjasama Dengan */}
      <section className="px-6 md:px-12 lg:px-24 py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">Bekerjasama Dengan</h2>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-3">Untuk Designer dan Artisan Batik</h3>
              <p className="text-gray-300 text-sm">
                Tingkatkan kreativitas dan produktivitas dengan tools AI kami yang mudah digunakan. Dapatkan inspirasi tak terbatas.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-3">Untuk Fashion Brand dan Retailer</h3>
              <p className="text-gray-300 text-sm">
                Maksimalkan koleksi batik Anda dengan teknologi AI. Ciptakan produk yang unik dan menarik pelanggan lebih banyak.
              </p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl">
              <h3 className="font-bold text-lg mb-3">Untuk Enthusiast dan Kolektor</h3>
              <p className="text-gray-300 text-sm">
                Pelajari dan eksplorasi batik dengan cara baru. Temukan inspirasi dan wujudkan koleksi batik impian Anda.
              </p>
              <a href="#" className="inline-flex items-center gap-1 text-lime-400 text-sm font-semibold mt-4 hover:text-lime-300">
                Distributor Kota Seramang <ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="px-6 md:px-12 lg:px-24 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Contact Us</h2>
          <p className="mt-3 text-gray-600">
            Hubungi kami via form di bawah untuk informasi lebih lanjut
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-12 items-start">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-3">
                {(['say-hi', 'get-quote'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleContactTypeChange(type)}
                    className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition ${
                      formData.contactType === type
                        ? 'bg-gray-900 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full border-2 ${
                        formData.contactType === type
                          ? 'bg-white border-white'
                          : 'border-gray-400'
                      }`}
                    ></div>
                    <span>{type === 'say-hi' ? 'Say Hi' : 'Get a Quote'}</span>
                  </button>
                ))}
              </div>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Name"
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-gray-900 transition"
                required
              />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-gray-900 transition"
                required
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder="Message"
                className="w-full px-5 py-3 rounded-2xl border border-gray-300 focus:outline-none focus:border-gray-900 resize-none transition"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>

            <div className="flex justify-center items-center">
              <div className="relative">
                <div className="w-72 h-72 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-2xl"></div>
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-black rounded-full flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full"></div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-lime-400 to-green-500 rounded-full opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}