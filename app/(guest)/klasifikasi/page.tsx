'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Upload, ChevronLeft, ChevronRight, ArrowUpRight, X, Check, Download, Share2 } from 'lucide-react';

interface FileItem {
  file: File;
  id: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface Result {
  accuracy: number;
  name: string;
  description: string;
  image: string;
  recommendations: { name: string; image: string }[];
}

export default function KlasifikasiPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const dropRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    dropRef.current?.classList.add('border-[#60a5fa]');
  };

  const handleDragLeave = () => {
    dropRef.current?.classList.remove('border-[#60a5fa]');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dropRef.current?.classList.remove('border-[#60a5fa]');
    const newFiles = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'));
    addFiles(newFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    addFiles(newFiles);
    e.target.value = '';
  };

  const addFiles = (newFiles: File[]) => {
    const fileItems: FileItem[] = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      status: 'pending'
    }));
    setFiles(prev => [...prev, ...fileItems]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleUploadAll = () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    if (pendingFiles.length === 0) return;

    pendingFiles.forEach(item => {
      setFiles(prev => prev.map(f =>
        f.id === item.id ? { ...f, status: 'uploading', progress: 0 } : f
      ));

      let progress = 0;
      const interval = setInterval(() => {
        progress += 20;
        if (progress >= 100) {
          clearInterval(interval);
          const success = Math.random() > 0.1;
          setFiles(prev => prev.map(f =>
            f.id === item.id
              ? { ...f, status: success ? 'success' : 'error', progress: 100, error: success ? undefined : 'Upload failed' }
              : f
          ));
          if (success && !result) showResult();
        } else {
          setFiles(prev => prev.map(f =>
            f.id === item.id ? { ...f, progress } : f
          ));
        }
      }, 400);
    });
  };

  const showResult = () => {
    setResult({
      accuracy: 93,
      name: "Batik Merak Ngendok",
      description: "Motif Merak Ngendok adalah salah satu motif batik khas Semarang yang menggambarkan burung merak dengan kepala terangkat. Motif ini melambangkan keindahan, kebanggaan, dan kemakmuran. Batik ini sering digunakan dalam pakaian adat dan dekorasi rumah untuk membawa aura positif dan estetika tradisional Jawa.",
      image: "/batik.jpg",
      recommendations: [
        { name: "Batik Merak Ngendok Variasi 1", image: "/batik1.jpg" },
        { name: "Batik Merak Ngendok Variasi 2", image: "/batik2.jpg" },
        { name: "Batik Merak Ngendok Variasi 3", image: "/batik3.jpg" },
      ],
    });
  };

  const resetAll = () => {
    setFiles([]);
    setResult(null);
  };

  // Scroll rekomendasi
  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    const newScroll = direction === 'left'
      ? scrollRef.current.scrollLeft - scrollAmount
      : scrollRef.current.scrollLeft + scrollAmount;
    scrollRef.current.scrollTo({ left: newScroll, behavior: 'smooth' });
  };

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    if (result) checkScroll();
  }, [result]);

  const hasPending = files.some(f => f.status === 'pending');
  const allDone = files.length > 0 && files.every(f => f.status === 'success' || f.status === 'error');

  return (
    <main className="min-h-screen bg-white">

      {/* UPLOAD SECTION */}
      <section className="bg-[#C7FF8E] py-20 px-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">

            <h2 className="text-xl font-semibold text-center mb-6">Upload</h2>

            {/* TAMPILAN AWAL: Drag & Drop */}
            <div
              ref={dropRef}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className="border-2 border-dashed border-gray-300 rounded-xl p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#60a5fa] transition"
            >
              <Upload className="w-12 h-12 text-[#60a5fa] mb-4" />
              <p className="text-gray-600">
                <span className="font-medium">Drag & drop files or </span>
                <label htmlFor="file-upload" className="text-[#60a5fa] font-medium hover:underline cursor-pointer">
                  Browse
                </label>
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
              </p>
              <input id="file-upload" type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" />
            </div>

            {/* DAFTAR FILE YANG DIPILIH */}
            {files.length > 0 && (
              <div className="mt-6 space-y-3">
                {files.map(item => (
                  <div key={item.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                    item.status === 'error' ? 'bg-red-50 border-red-200' :
                    item.status === 'success' ? 'bg-green-50 border-green-200' :
                    'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center gap-3 flex-1">
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                        {item.status === 'uploading' && <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-400 border-t-[#60a5fa]" />}
                        {item.status === 'success' && <Check className="w-5 h-5 text-green-600" />}
                        {item.status === 'error' && <X className="w-5 h-5 text-red-600" />}
                        {item.status === 'pending' && <Upload className="w-5 h-5 text-gray-600" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.file.name}</p>
                        <p className="text-xs text-gray-500">{(item.file.size / 1024).toFixed(1)} KB</p>
                        {item.status === 'uploading' && (
                          <div className="mt-1 w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-[#60a5fa] h-1.5 rounded-full transition-all" style={{ width: `${item.progress}%` }} />
                          </div>
                        )}
                      </div>
                    </div>
                    <button onClick={() => removeFile(item.id)} className="text-gray-500 hover:text-red-600 ml-2">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={handleUploadAll}
              disabled={files.length === 0 || !hasPending}
              className="mt-6 w-full bg-[#a5f3fc] hover:bg-[#7dd3fc] disabled:opacity-50 text-gray-800 font-semibold py-3 rounded-xl transition"
            >
              UPLOAD FILES
            </button>

            {allDone && (
              <button onClick={resetAll} className="mt-2 w-full text-sm text-gray-600 hover:text-gray-800 underline">
                Upload Ulang
              </button>
            )}

          </div>
        </div>
      </section>

      {/* HASIL KLASIFIKASI – LEBIH AESTETIK & USER FRIENDLY */}
      {result && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              {/* Gambar Utama */}
              <div className="relative flex-shrink-0 group">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                  <Image src={result.image} alt={result.name} fill className="object-cover" />
                </div>
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition">
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-[#C7FF8E] transition">
                    <Download className="w-5 h-5 text-gray-700" />
                  </button>
                  <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-[#C7FF8E] transition">
                    <Share2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 space-y-6">
                <h3 className="text-3xl font-bold text-gray-900">{result.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-[#C7FF8E] h-2.5 rounded-full" style={{ width: `${result.accuracy}%` }} />
                  </div>
                  <span className="text-lg font-semibold text-[#C7FF8E]">{result.accuracy}% Akurasi</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{result.description}</p>
                <div className="flex gap-4">
                  <button className="flex-1 bg-[#C7FF8E] hover:bg-[#b3f375] text-black font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
                    <ArrowUpRight className="w-5 h-5" />
                    Generate Variasi
                  </button>
                  <button className="flex-1 border-2 border-[#C7FF8E] hover:bg-[#C7FF8E]/10 text-[#C7FF8E] font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2">
                    <Download className="w-5 h-5" />
                    Simpan Hasil
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* REKOMENDASI – AESTETIK */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Rekomendasi Motif Serupa</h3>
            <div className="relative">
              <div
                ref={scrollRef}
                onScroll={checkScroll}
                className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth px-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex-none w-64 snap-center group">
                    <div className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:scale-105">
                      <div className="relative h-48">
                        <Image src={rec.image} alt={rec.name} fill className="object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition" />
                        <button className="absolute top-3 right-3 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition transform group-hover:scale-110">
                          <ArrowUpRight className="w-4 h-4 text-gray-800" />
                        </button>
                      </div>
                      <p className="p-4 text-sm font-semibold text-center text-gray-800">{rec.name}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 transition ${
                  canScrollLeft ? 'hover:bg-[#C7FF8E] hover:text-white' : 'opacity-50'
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center z-10 transition ${
                  canScrollRight ? 'hover:bg-[#C7FF8E] hover:text-white' : 'opacity-50'
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}