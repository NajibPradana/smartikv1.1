'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // ← TAMBAHAN: untuk navigasi
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft } from 'lucide-react'; // ← TAMBAHAN: ArrowLeft
import { motion, AnimatePresence } from 'framer-motion';

type FormType = 'login' | 'register';

export default function AuthPage() {
  const [formType, setFormType] = useState<FormType>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formType === 'register' && password !== confirmPassword) {
      alert('Password tidak cocok!');
      return;
    }
    console.log(`${formType === 'login' ? 'Login' : 'Register'} attempt:`, { email, password });
  };

  const toggleForm = () => {
    setFormType(prev => (prev === 'login' ? 'register' : 'login'));
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const isFormOnLeft = formType === 'login';

  return (
    <main className="min-h-screen bg-white grid grid-cols-1 lg:grid-cols-2">
      <AnimatePresence mode="wait">
        {/* ====== FORM SECTION ====== */}
        <div
          key={`${formType}-form-section`}
          className={`col-span-1 flex items-center justify-center p-6 lg:p-12 ${
            isFormOnLeft ? 'lg:order-1' : 'lg:order-2'
          } relative`}
        >
          {/* ====== BACK TO DASHBOARD BUTTON ====== */}
          <Link
            href="/dashboard"
            className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Dashboard</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, x: isFormOnLeft ? -300 : 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isFormOnLeft ? 300 : -300 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full max-w-md space-y-6"
          >
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-[#4ade80] to-[#22c55e] rounded-lg" />
              <span className="text-2xl font-bold text-gray-900">Solaria</span>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              {formType === 'login' ? 'Sign in' : 'Sign up'}
            </h1>
            <p className="text-gray-600">
              {formType === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button onClick={toggleForm} className="text-[#22c55e] hover:underline font-medium">
                    Create now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button onClick={toggleForm} className="text-[#22c55e] hover:underline font-medium">
                    Login now
                  </button>
                </>
              )}
            </p>

            {formType === 'login' && (
              <>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-[#22c55e] text-gray-700 font-medium py-3 rounded-xl transition">
                    <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} />
                    Continue with Google
                  </button>
                  <button className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-[#22c55e] text-gray-700 font-medium py-3 rounded-xl transition">
                    <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">f</div>
                    Continue with Facebook
                  </button>
                </div>

                <div className="relative flex items-center justify-center my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative bg-white px-4 text-sm text-gray-500">or</div>
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#22c55e] transition text-gray-900 placeholder:text-gray-900"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#22c55e] transition text-gray-900 placeholder:text-gray-900"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {formType === 'register' && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-700" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirmation Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-[#22c55e] transition text-gray-900 placeholder:text-gray-900"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700 hover:text-gray-900"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              )}

              {formType === 'login' && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 text-[#22c55e] rounded focus:ring-[#22c55e]" />
                    <span className="text-sm text-gray-700">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-[#22c55e] hover:underline">
                    Forgot Password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#166534] hover:bg-[#15803d] text-white font-semibold py-3 rounded-xl transition-shadow hover:shadow-lg flex items-center justify-center gap-2"
              >
                {formType === 'login' ? 'Sign in' : 'Sign up'}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* ====== PROMO SECTION (HIJAU) ====== */}
        <div
          key={`${formType}-promo-section`}
          className={`hidden lg:flex col-span-1 bg-gradient-to-br from-[#4ade80] to-[#22c55e] relative overflow-hidden flex-col justify-between p-12 text-white ${
            isFormOnLeft ? 'lg:order-2' : 'lg:order-1'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, x: isFormOnLeft ? 300 : -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isFormOnLeft ? -300 : 300 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="flex flex-col justify-between h-full"
          >
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit">
              <div className="w-5 h-5 bg-white/30 rounded-full" />
              <span className="text-sm font-medium">Support</span>
            </div>

            <div className="max-w-md">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Reach financial goals faster</h3>
                <p className="text-sm mb-6 opacity-90">
                  Use your Venus card around the world with no hidden fees. Hold, transfer and spend money.
                </p>

                {/* ====== LEARN MORE → /about ====== */}
                <Link
                  href="/about"
                  className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-full transition"
                >
                  Learn more
                </Link>

                <div className="relative mt-8 -mb-20 -mr-8">
                  <Image
                    src="/solaria-card.png"
                    alt="Solaria Card"
                    width={400}
                    height={250}
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute bottom-4 left-4 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-2">
                    <p className="text-xs opacity-80">Earnings</p>
                    <p className="text-xl font-bold">$350.40</p>
                  </div>
                </div>
              </div>

              <div className="mt-32">
                <h2 className="text-3xl font-bold mb-4">Introducing new features</h2>
                <p className="text-sm opacity-90 leading-relaxed">
                  Analyzing previous trends ensures that businesses always make the right decision...
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <div className="w-2 h-2 bg-white/50 rounded-full" />
              <div className="w-2 h-2 bg-white rounded-full" />
              <div className="w-2 h-2 bg-white/50 rounded-full" />
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </main>
  );
}