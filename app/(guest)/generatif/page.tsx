'use client';

import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Upload, ChevronLeft, ChevronRight, ArrowUpRight, X, Check, ArrowRight, Download, RefreshCcw } from 'lucide-react';

interface FileItem {
  file: File;
  id: string;
  progress?: number;
  status: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface Result {
  originalName: string;
  originalImage: string;
  generatedName: string;
  generatedImage: string;
}

export default function GeneratifPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [result, setResult] = useState<Result | null>(null);
  const [isAnimating, setIsAnimating] = useState(false); // Untuk animasi fade in

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
    setIsAnimating(true);
    setResult({
      originalName: "Batik Warak Ngendok Asli",
      originalImage: "/batik-asli.jpg",
      generatedName: "Batik Warak Ngendok Hasil",
      generatedImage: "/batik-hasil.jpg",
    });
    setTimeout(() => setIsAnimating(false), 1000); // Animasi 1 detik
  };

  const resetAll = () => {
    setFiles([]);
    setResult(null);
  };

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

      {/* HASIL GENERATIF – LEBIH AESTETIK & USER FRIENDLY */}
      {result && (
        <section className="max-w-6xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100 overflow-hidden">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-900 animate-fadeIn">Hasil Generatif</h3>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 animate-slideUp">
              {/* Gambar Asli */}
              <div className="flex flex-col items-center group">
                <div className="relative w-64 h-40 md:w-80 md:h-48 rounded-3xl overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={result.originalImage}
                    alt={result.originalName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <p className="mt-4 text-lg font-semibold text-gray-800 text-center">{result.originalName}</p>
              </div>

              {/* Panah Tengah */}
              <ArrowRight className="w-12 h-12 text-blue-600 animate-bounceHorizontal" />

              {/* Gambar Hasil */}
              <div className="flex flex-col items-center group">
                <div className="relative w-64 h-40 md:w-80 md:h-48 rounded-3xl overflow-hidden shadow-xl transform group-hover:scale-105 transition-transform duration-300">
                  <Image
                    src={result.generatedImage}
                    alt={result.generatedName}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition" />
                </div>
                <p className="mt-4 text-lg font-semibold text-gray-800 text-center">{result.generatedName}</p>
              </div>
            </div>

            {/* Button Aksi */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center animate-fadeIn delayed">
              <button className="flex items-center gap-2 px-6 py-3 bg-[#C7FF8E] hover:bg-[#b3f375] text-black font-semibold rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105">
                <Download className="w-5 h-5" />
                Download Hasil
              </button>
              <button onClick={resetAll} className="flex items-center gap-2 px-6 py-3 border-2 border-[#C7FF8E] hover:bg-[#C7FF8E]/10 text-[#C7FF8E] font-semibold rounded-xl shadow-md hover:shadow-lg transition-transform hover:scale-105">
                <RefreshCcw className="w-5 h-5" />
                Generate Lagi
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}