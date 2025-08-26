// components/Navbar.js (Dengan Animasi Masuk)

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion' // <-- 1. Impor motion

// Data untuk item navigasi
const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About Me', href: '#about' }, // Pastikan href ini sesuai dengan id section
  { name: 'Skills', href: '#skills' }, // Pastikan href ini sesuai dengan id section
  { name: 'Contact Me', href: '#contact', isButton: true },
]

// --- 2. Definisikan Varian Animasi ---

// Varian untuk container navbar, tugasnya mengatur animasi anak-anaknya
const navbarContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3, // Jeda sebelum animasi anak-anak dimulai
      staggerChildren: 0.1, // Jeda 0.1 detik antara setiap item nav
    },
  },
};

// Varian untuk setiap item nav (slide down + fade in)
const navItemVariants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  },
};


export default function Navbar() {
  const [active, setActive] = useState('Home')

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      
      {/* --- 3. Terapkan Animasi pada Container --- */}
      <motion.nav 
        className="flex items-center gap-2 rounded-full p-2 bg-black/30 backdrop-blur-md border border-white/10"
        variants={navbarContainerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {navItems.map((item) => (
          // Cek apakah item adalah tombol spesial atau link biasa
          item.isButton ? (
            // --- 4. Ubah <a> menjadi motion.a dan terapkan varian ---
            <motion.a
              key={item.name}
              href={item.href}
              className="relative inline-block p-[1.5px] rounded-full"
              variants={navItemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-400 rounded-full"></div>
              <div className="relative z-10 px-5 py-2 text-sm font-medium text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors duration-300">
                {item.name}
              </div>
            </motion.a>
          ) : (
            // --- 4. Ubah <a> menjadi motion.a dan terapkan varian ---
            <motion.a
              key={item.name}
              href={item.href}
              onClick={() => setActive(item.name)}
              className={`
                px-5 py-2 text-sm font-medium text-white rounded-full transition-colors duration-300
                ${
                  active === item.name
                    ? 'bg-neutral-700'
                    : 'hover:bg-neutral-800'
                }
              `}
              variants={navItemVariants}
            >
              {item.name}
            </motion.a>
          )
        ))}

      </motion.nav>
    </header>
  )
}