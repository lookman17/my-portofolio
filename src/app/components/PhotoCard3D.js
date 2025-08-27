// File: components/PhotoCard3D.js

'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

const glossySweepVariants = {
  initial: { 
    backgroundPosition: '-200% -200%', 
    opacity: 0 
  },
  hover: { 
    backgroundPosition: '200% 200%', 
    opacity: 1,
    transition: { 
      duration: 1, 
      ease: [0.23, 1, 0.32, 1]
    } 
  }
}

// Komponen ini sekarang dirancang untuk mengisi parent-nya, tidak perlu prop className lagi
export default function PhotoCard3D({ imageUrl, altText }) {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 25, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 25, mass: 0.5 });

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [12, -12]);

  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);
  const glareOpacity = useTransform(mouseY, [-0.5, 0.5], [0, 0.6]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width - 0.5);
    mouseY.set((e.clientY - top) / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-d',
        perspective: '1000px',
        rotateX,
        rotateY,
      }}
      // PERBAIKAN UTAMA: Tambahkan w-full dan h-full secara langsung di sini
      className="relative w-full h-full rounded-3xl overflow-hidden border border-purple-900/50 group"
    >
      {/* 1. Lapisan Gambar Utama */}
      <Image
        src={imageUrl}
        alt={altText}
        fill
        // object-cover adalah kunci agar gambar tidak gepeng
        className="object-cover" // Hapus rounded-3xl dari sini karena sudah ada di parent
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ transform: 'translateZ(25px) scale(1.05)' }}
        priority
      />

      {/* 2. EFEK BARU: Animasi Glossy Sweep saat pertama kali hover */}
      <motion.div
        variants={glossySweepVariants}
        initial="initial"
        whileHover="hover"
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)`,
          backgroundSize: '300% 300%',
        }}
      />
      
      {/* 3. Lapisan Glare Dinamis yang mengikuti mouse */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4), transparent 50%)`,
          opacity: glareOpacity,
          mixBlendMode: 'soft-light',
        }}
      />

      {/* 4. Lapisan Border Neon saat hover */}
      <div 
        className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-400/80 transition-colors duration-300" 
        style={{ transform: 'translateZ(50px)' }}
      />
    </motion.div>
  );
}