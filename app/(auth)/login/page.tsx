'use client';

import { useState } from 'react';
import { User, Lock, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Di sini bisa tambah logic autentikasi, misal API call ke backend
    console.log('Login attempt:', { email, password });
  };

  return (
    <main className="min-h-screen bg-[#C7FF8E] relative overflow-hidden flex items-center justify-center">
      {/* Bentuk Lingkaran Organik */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#a5f3fc] rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#a5f3fc] rounded-full translate-x-1/2 translate-y-1/2 opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#a5f3fc] rounded-full opacity-30" />

      {/* Form Login */}
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md z-10">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">Login</h1>
        <p className="text-center text-gray-500 mb-8">Please enter your Login and your Password</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input Username/Email */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Username or Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C7FF8E] transition"
              required
            />
          </div>

          {/* Input Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#C7FF8E] transition"
              required
            />
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full bg-[#C7FF8E] hover:bg-[#a5f3fc] text-gray-900 font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-shadow hover:shadow-md"
          >
            Login <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        {/* Sign in with Google */}
        <button
          className="mt-4 w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-shadow hover:shadow-md"
        >
          <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} />
          Sign in with Google
        </button>

        {/* Link Register */}
        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have any account? <a href="/register" className="text-[#60a5fa] hover:underline font-medium">Register!</a>
        </p>
      </div>
    </main>
  );
}