'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, 
  SiFramer, SiSupabase, SiFigma, SiNodedotjs 
} from 'react-icons/si'
import AnimatedHeadline from './AnimatedHeadline'

// --- 1. VARIAN ANIMASI UNTUK EFEK MASUK ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Jeda 0.3 detik antara animasi anak-anak
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const skills = [
  { name: 'React', icon: <SiReact size={36} className="text-cyan-400" /> },
  { name: 'Next.js', icon: <SiNextdotjs size={36} className="text-white" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={36} className="text-sky-400" /> },
  { name: 'JavaScript', icon: <SiJavascript size={36} className="text-yellow-400" /> },
  { name: 'Framer Motion', icon: <SiFramer size={36} className="text-pink-500" /> },
  { name: 'Supabase', icon: <SiSupabase size={36} className="text-green-500" /> },
  { name: 'Figma', icon: <SiFigma size={36} className="text-purple-400" /> },
  { name: 'Node.js', icon: <SiNodedotjs size={36} className="text-lime-500" /> },
]

const SkillIcon = ({ skill }) => (
  <motion.div 
    className="flex-shrink-0 p-[1.5px] rounded-2xl bg-gradient-to-br from-purple-700/50 to-purple-900/30" 
    whileHover={{ scale: 1.08 }} 
    title={skill.name}
  >
    <div className="w-28 h-28 sm:w-32 sm:h-32 bg-[#0f0c1d] backdrop-blur-md rounded-[14px] flex flex-col items-center justify-center gap-2 transition-colors duration-300 hover:bg-purple-900/60">
      <motion.div whileHover={{ scale: 1.2 }} className="drop-shadow-lg">{skill.icon}</motion.div>
      <span className="text-xs sm:text-sm text-neutral-300 font-medium">{skill.name}</span>
    </div>
  </motion.div>
)

const MarqueeRow = ({ skills, direction = 'left', duration = 30 }) => {
  // ... (kode MarqueeRow tetap sama, tidak perlu diubah) ...
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const controls = useAnimationControls()
  const duplicatedSkills = [...skills, ...skills, ...skills]
  useEffect(() => {
    if (!containerRef.current || !contentRef.current) return
    const distance = contentRef.current.scrollWidth / 3
    const animation = {
      x: direction === 'left' ? [-distance, 0] : [0, -distance],
      transition: { duration, repeat: Infinity, ease: 'linear' }
    }
    controls.start(animation)
  }, [controls, direction, duration])
  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#0a0914] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#0a0914] to-transparent z-10 pointer-events-none" />
      <motion.div ref={contentRef} className="flex gap-6 sm:gap-8 pr-4" animate={controls} style={{ display: 'flex', flexWrap: 'nowrap', transform: 'translateZ(0)' }}>
        {duplicatedSkills.map((skill, index) => <SkillIcon key={index} skill={skill} />)}
      </motion.div>
    </div>
  )
}

export default function TechnologyGrid() {
  const [shuffledSkills, setShuffledSkills] = useState(skills)
  useEffect(() => {
    const newShuffled = [...skills].sort(() => Math.random() - 0.5)
    setShuffledSkills(newShuffled)
  }, [])
  const bgColor = '#0a0914'

  return (
    <>
      {/* 2. UBAH <section> MENJADI <motion.section> DAN TERAPKAN VARIAN */}
      <motion.section 
        id="skills" 
        className="text-white pt-24 pb-12 relative overflow-hidden"
        style={{ backgroundColor: bgColor }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Animasi hanya berjalan sekali saat 20% section terlihat
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-12 space-y-16">
          {/* 3. BUNGKUS HEADER DENGAN <motion.div> */}
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <AnimatedHeadline 
              text="Skills & Technologies" 
              className="text-3xl sm:text-4xl md:text-5xl flex justify-center" 
            />
            <p className="mt-4 text-sm sm:text-lg text-neutral-400">
              My favorite tools and technologies for building modern web applications.
            </p>
          </motion.div>
          
          {/* 4. BUNGKUS MARQUEE DENGAN <motion.div> */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            <MarqueeRow skills={skills} direction="left" />
            <MarqueeRow skills={shuffledSkills} direction="right" />
          </motion.div>
        </div>
      </motion.section>

      {/* Kurva tetap tidak dianimasikan agar transisi mulus */}
      <div className="w-full overflow-hidden leading-none" style={{ marginTop: -1 }}>
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-[120px] block" preserveAspectRatio="none">
          <path d="M0,0 L1440,0 L1440,20 C1080,120 360,120 0,20 Z" fill={bgColor} />
        </svg>
      </div>
    </>
  )
}