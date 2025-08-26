'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgressBar() {
  // 1. Lacak progres scroll halaman
  // useScroll() akan mengembalikan MotionValue 'scrollYProgress'
  // nilainya akan otomatis diperbarui dari 0 (paling atas) ke 1 (paling bawah)
  const { scrollYProgress } = useScroll();

  // 2. Buat progres menjadi lebih mulus (smooth)
  // Kita menggunakan useSpring untuk membuat animasi bar terasa lebih cair
  // dan tidak kaku mengikuti scroll yang kadang tersendat.
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    // 3. Render bar progres
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-400 z-[100]"
      // Atur scaleX berdasarkan nilai dari useSpring
      // transformOrigin: 'left' memastikan bar tumbuh dari kiri ke kanan
      style={{ scaleX, transformOrigin: 'left' }}
    />
  );
}