'use client'
import { motion } from 'framer-motion'

// Varian untuk container yang akan mengatur stagger (jeda) antar huruf
const containerVariants = {
  hover: {
    transition: {
      staggerChildren: 0.04, // Jeda 0.04 detik antara animasi setiap huruf
    },
  },
};

// Varian untuk animasi setiap huruf
const letterVariants = {
  hover: {
    y: -10, // Naik 10px
    scale: 1.2, // Membesar sedikit
    color: '#a78bfa', // Warna ungu muda saat di-hover
    transition: {
      type: 'spring', // Gunakan fisika 'spring' untuk efek memantul
      stiffness: 400,
      damping: 12,
    },
  },
  initial: {
    y: 0,
    scale: 1,
    color: '#ffffff',
  }
};

const AnimatedHeadline = ({ text, className }) => {
  // Pecah string teks menjadi array per huruf
  const letters = Array.from(text);

  return (
    <motion.h1
      className={`font-serif font-normal leading-tight max-w-4xl flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="initial"
      whileHover="hover" // Memicu state 'hover' saat mouse di atas container
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: 'inline-block' }} // Pastikan span tidak collapse
        >
          {/* Ganti spasi biasa dengan non-breaking space agar tidak hilang */}
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default AnimatedHeadline;