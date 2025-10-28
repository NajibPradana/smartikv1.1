'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-5 border-b border-gray-200 bg-white">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 group">
        <div className="relative w-8 h-8">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full text-orange-500 group-hover:scale-110 transition-transform"
          >
            <path
              d="M16 2L20.945 8.473L28 9.527L23.5 14.145L24.945 21.473L16 18.055L7.055 21.473L8.5 14.145L4 9.527L11.055 8.473L16 2Z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M16 10L18.473 13.055L22 13.527L19.5 16.145L20.055 19.473L16 17.527L11.945 19.473L12.5 16.145L10 13.527L13.527 13.055L16 10Z"
              fill="white"
            />
          </svg>
        </div>
        <span className="text-xl font-bold text-orange-500">SmarTik</span>
      </Link>

      {/* Menu Items */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="/" className="text-gray-700 hover:text-orange-500 transition">
          Home
        </Link>

        {/* Dropdown Fitur */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition"
          >
            Fitur
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
              <Link
                href="/klasifikasi"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition first:rounded-t-xl"
              >
                Klasifikasi
              </Link>
              <Link
                href="/generatif"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-5 py-3 text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition last:rounded-b-xl"
              >
                Generatif
              </Link>
            </div>
          )}
        </div>

        <Link href="/artikel" className="text-gray-700 hover:text-orange-500 transition">
          Artikel
        </Link>
        <Link href="/about" className="text-gray-700 hover:text-orange-500 transition">
          About
        </Link>
        <Link href="/contact" className="text-gray-700 hover:text-orange-500 transition">
          Contact
        </Link>

        {/* Login Button */}
        <Link
          href="/login"
          className="px-5 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition"
        >
          Login
        </Link>
      </div>

      {/* Mobile Menu Toggle (Opsional) */}
      <button className="md:hidden">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
}