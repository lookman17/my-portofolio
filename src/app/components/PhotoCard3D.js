'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export default function PhotoCard3D({ imageUrl, altText }) {
  const ref = useRef(null);

  // Motion values untuk mouse
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring biar gerakan halus
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 25, mass: 0.5 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 25, mass: 0.5 });

  // Rotasi 3D
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [-15, 15]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [15, -15]);

  // Efek glare mengikuti mouse
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);
  const glareOpacity = useTransform(smoothMouseX, [-0.5, 0.5], [0.15, 0.5]);

  // Event listener
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
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        rotateX,
        rotateY,
      }}
      className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden border border-purple-700/40 group"
    >
      {/* Foto */}
      <Image
        src={imageUrl}
        alt={altText}
        fill
        className="object-cover rounded-3xl"
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ transform: 'translateZ(25px) scale(1.1)' }}
      />

      {/* Lapisan glare bundar */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.7), transparent 60%)`,
          opacity: glareOpacity,
          mixBlendMode: 'screen',
        }}
      />

      {/* Lapisan glossy strip */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 60%)`,
          backgroundPosition: `${glareX} ${glareY}`,
          backgroundSize: '200% 200%',
          mixBlendMode: 'overlay',
        }}
      />

      {/* Neon glow border saat hover */}
      <div className="absolute inset-0 rounded-3xl border border-purple-500/0 group-hover:border-purple-400/80 transition duration-300 shadow-[0_0_30px_rgba(168,85,247,0.35)]" />
    </motion.div>
  );
}
