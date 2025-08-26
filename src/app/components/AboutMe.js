// File: components/AboutMe.js

'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion } from 'framer-motion'
import PhotoCard3D from './PhotoCard3D'
import AnimatedHeadline from './AnimatedHeadline'
import { Code2, GraduationCap, Boxes } from "lucide-react"  // thin/regular style icons

// ===== Highlight Glassmorphism =====
const Highlights = () => {
  const cards = [
    { 
      title: "Languages", 
      desc: "HTML, CSS, JavaScript, React, Tailwind", 
      icon: <Code2 className="w-8 h-8 text-purple-400" strokeWidth={1} /> 
    },
    { 
      title: "Education", 
      desc: "I am a software engineering graduate", 
      icon: <GraduationCap className="w-8 h-8 text-purple-400" strokeWidth={1} /> 
    },
    { 
      title: "Projects", 
      desc: "Built more than 5 projects with modern tech", 
      icon: <Boxes className="w-8 h-8 text-purple-400" strokeWidth={1} /> 
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {cards.map((c, i) => (
        <motion.div
          key={i}
          whileHover={{ scale: 1.05 }}
          className="p-6 rounded-2xl bg-white/5 backdrop-blur-md 
                     border border-white/10 shadow-lg hover:shadow-purple-500/20 
                     transition space-y-3"
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
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="w-full aspect-[4/5] bg-purple-900/50 rounded-3xl"></div>
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="h-10 bg-purple-900/50 rounded-md w-3/4"></div>
            <div className="h-4 bg-purple-900/50 rounded-md w-full"></div>
            <div className="h-4 bg-purple-900/50 rounded-md w-5/6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-48 bg-purple-900/50 rounded-2xl"></div>
            <div className="h-48 bg-purple-900/50 rounded-2xl"></div>
            <div className="h-48 bg-purple-900/50 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
)

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
      id="aboutme" 
      className="min-h-screen text-white flex items-center py-24 px-6 md:px-12"
    >
      <motion.div 
        className="container mx-auto max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Judul */}
        <motion.h2 
          variants={itemVariants}
          className="text-center font-serif text-5xl md:text-6xl mb-20 tracking-wide"
        >
          About Me
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Foto */}
          <motion.div variants={itemVariants}>
            <PhotoCard3D 
              imageUrl={profile.pp_url} 
              altText={`Foto profil ${profile.name}`} 
            />
          </motion.div>

          {/* Teks + Highlights */}
          <motion.div variants={itemVariants} className="space-y-10">
            <div className='space-y-6'>
              <AnimatedHeadline 
                text={`Hi, I'm ${profile.name}.`}
                className="text-6xl md:text-5xl font-bold text-left"
              />
              <p className="text-lg text-neutral-300 leading-relaxed max-w-xl">
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
