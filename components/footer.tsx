"use client";

import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = data.get("email");
    console.log("[v0] footer email submit:", email);
    form.reset();
  }

  return (
    <footer className="bg-[#ffff] text-gray-400 ">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 lg:px-24">
        {/* Card utama dengan background lebih gelap */}
        <div className="rounded-3xl bg-[#1a1a1a] p-8 md:p-12">
          {/* Top: Contact + Nav */}
          <div className="flex flex-col justify-between gap-10 md:flex-row md:items-start">
            {/* Left: Contact */}
            <div className="max-w-md">
              <h3 className="text-xl font-bold text-white">SmarTik</h3>

              <span className="mt-4 inline-block rounded-full bg-[#a3e635] px-4 py-1.5 text-sm font-medium text-black">
                Contact us:
              </span>

              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span className="text-white">abcdefghi@example.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span className="text-white">08123456789</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                  <div>
                    <span className="block text-white">Universitas Diponegoro</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right: Navigation */}
            <nav className="flex justify-start md:justify-end">
              <ul className="flex flex-wrap gap-6 text-sm font-medium text-gray-400">
                {["Home", "Fitur", "Artikel", "About", "Contact"].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="transition-colors hover:text-[#a3e635]"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Email Form – Tengah, Card Gelap */}
          <form onSubmit={onSubmit} className="mt-10">
            <div className="mx-auto w-full max-w-lg rounded-2xl bg-[#252525] p-4 shadow-lg">
              <div className="flex items-center gap-3">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email"
                  className="flex-1 rounded-lg bg-[#333333] px-5 py-3 text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a3e635] focus:ring-offset-2 focus:ring-offset-[#252525]"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-[#a3e635] px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-[#94d62b] active:scale-95"
                >
                  Kirim
                </button>
              </div>
            </div>
          </form>

          {/* Bottom: Copyright + Privacy */}
          <div className="mt-10 border-t border-gray-800 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-gray-500 md:flex-row">
              <p>© 2025 SmarTik. All Rights Reserved.</p>
              <a
                href="/privacy"
                className="underline underline-offset-2 transition-colors hover:text-[#a3e635]"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}