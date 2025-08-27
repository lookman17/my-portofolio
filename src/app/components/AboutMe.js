'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'
import PhotoCard3D from './PhotoCard3D'
import AnimatedHeadline from './AnimatedHeadline'
import { Code2, GraduationCap, Boxes, Wrench, Users, Sparkles } from "lucide-react"

// ===== Highlight Glassmorphism (6 Kartu) =====
const Highlights = () => {
  const cards = [
    { title: "Languages", desc: "HTML, CSS, JavaScript, React, Tailwind", icon: <Code2 className="w-8 h-8 text-purple-400" strokeWidth={1} /> },
    { title: "Education", desc: "I am a software engineering graduate", icon: <GraduationCap className="w-8 h-8 text-purple-400" strokeWidth={1} /> },
    { title: "Projects", desc: "Built more than 5 projects with modern tech", icon: <Boxes className="w-8 h-8 text-purple-400" strokeWidth={1} /> },
    { title: "Tools", desc: "Figma, VS Code, Git, Supabase, Vercel", icon: <Wrench className="w-8 h-8 text-purple-400" strokeWidth={1} /> },
    { title: "Collaboration", desc: "Experienced in team projects and agile workflows", icon: <Users className="w-8 h-8 text-purple-400" strokeWidth={1} /> },
    { title: "Interests", desc: "Exploring new tech, open source, and creative coding", icon: <Sparkles className="w-8 h-8 text-purple-400" strokeWidth={1} /> },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-lg hover:shadow-purple-500/20 transition space-y-3"
        >
          <div>{c.icon}</div>
          <h4 className="text-lg font-semibold">{c.title}</h4>
          <p className="text-neutral-300 text-sm leading-relaxed">{c.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

// ===== Animasi Variants =====
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

// ===== Skeleton Loader =====
const AboutMeSkeleton = () => (
  <section className="min-h-screen text-white flex items-center py-24 px-6 overflow-hidden animate-pulse">
    <div className="container mx-auto max-w-6xl">
      <div className="h-16 bg-purple-900/50 rounded-md w-1/2 mx-auto mb-20"></div>
      <div className="grid md:grid-cols-2 gap-16 items-stretch">
        <div className="w-full aspect-square bg-purple-900/50 rounded-3xl"></div>
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-4">
            <div className="h-10 bg-purple-900/50 rounded-md w-3/4"></div>
            <div className="h-4 bg-purple-900/50 rounded-md w-full"></div>
            <div className="h-4 bg-purple-900/50 rounded-md w-5/6"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {Array(6).fill(0).map((_, i) => (
              <div key={i} className="h-40 bg-purple-900/50 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
)

// ===== Komponen Utama AboutMe =====
export default function AboutMe() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('about_me')
        .select('bio, pp_url, name')
        .eq('id', 1)
        .single()
      if (error) console.error('Supabase error:', error)
      else setProfile(data)
      setLoading(false)
    }
    fetchProfile()
  }, [])

  if (loading) return <AboutMeSkeleton />
  if (!profile) return null

  return (
    <section 
      id="about" 
      className="min-h-screen text-white py-24 px-4 sm:px-6 md:px-12 bg-neutral-950 rounded-4xl"
    >
      <motion.div 
        className="container mx-auto max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-center font-serif text-4xl sm:text-5xl md:text-6xl mb-12 sm:mb-16 tracking-wide"
        >
          About Me
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center md:items-stretch">
          {/* Kolom Kiri: Foto */}
          <motion.div 
            variants={itemVariants} 
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="w-64 sm:w-80 md:w-full max-w-sm md:max-w-md aspect-square">
              <PhotoCard3D 
                imageUrl={profile.pp_url} 
                altText={`Foto profil ${profile.name}`} 
              />
            </div>
          </motion.div>

          {/* Kolom Kanan: Teks + Highlights */}
          <motion.div 
            variants={itemVariants} 
            className="w-full md:w-1/2 flex flex-col justify-between"
          >
            <div className='space-y-6'>
              <AnimatedHeadline 
                text={`Hi, I'm ${profile.name}.`}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-left"
              />
              <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-xl">
                {profile.bio}
              </p>
            </div>

            <Highlights />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
