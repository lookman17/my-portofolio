'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Varian Animasi Masuk
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Atur animasi untuk judul dan carousel
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

// Varian Animasi Geser (Carousel)
const carouselVariants = {
  enter: (direction) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => ({ zIndex: 0, x: direction < 0 ? '100%' : '-100%', opacity: 0 }),
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true)
      const { data, error } = await supabase.from('projects').select('*').order('display_order', { ascending: true })
      if (error) console.error('Error fetching projects:', error)
      else setProjects(data)
      setLoading(false)
    }
    fetchProjects()
  }, [])

  // Hook untuk mendeteksi ukuran layar
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile() // Cek saat pertama kali load
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // --- LOGIKA UTAMA YANG DIPERBAIKI ---
  const projectsPerPage = isMobile ? 1 : 2
  const totalPages = projects.length > 0 ? Math.ceil(projects.length / projectsPerPage) : 0
  
  // Ambil proyek untuk halaman saat ini
  const currentProjects = projects.slice(page * projectsPerPage, page * projectsPerPage + projectsPerPage)

  const paginate = (newDirection) => {
    setDirection(newDirection)
    // Gunakan fungsi callback untuk memastikan state `page` yang terbaru
    setPage((prevPage) => (prevPage + newDirection + totalPages) % totalPages)
  }
  
  const handleDragEnd = (event, info) => {
    // Geser hanya berfungsi di mobile
    if (!isMobile) return
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold) {
      paginate(1)
    } else if (info.offset.x > swipeThreshold) {
      paginate(-1)
    }
  }

  if (loading) return <section id="projects" className="py-24 text-center text-white">Loading Projects...</section>
  if (!projects.length) return <section id="projects" className="py-24 text-center text-white">No projects found.</section>

  return (
    <motion.section 
      id="projects" 
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden text-white"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container mx-auto max-w-5xl text-center relative">
        <motion.h2
          variants={itemVariants}
          className="font-serif text-3xl sm:text-4xl md:text-5xl mb-12 sm:mb-16"
        >
          My Creations
        </motion.h2>

        {/* Wrapper untuk Carousel dengan animasi masuk */}
        <motion.div 
          variants={itemVariants}
          className="relative h-[600px] flex items-center justify-center" // Tambahkan tinggi tetap
        >
          {/* Navigasi Kiri (hanya desktop) */}
          {!isMobile && (
            <button onClick={() => paginate(-1)} className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 w-12 h-12 bg-purple-900/50 border border-purple-800/50 rounded-full flex items-center justify-center text-white hover:bg-purple-900/80 transition-colors z-20">
              <ChevronLeft />
            </button>
          )}

          {/* Konten Carousel */}
          <div className="relative w-full h-full overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page} // Key diubah ke `page` agar re-render saat halaman berubah
                className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                variants={carouselVariants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
              >
                {currentProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigasi Kanan (hanya desktop) */}
          {!isMobile && (
             <button onClick={() => paginate(1)} className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 w-12 h-12 bg-purple-900/50 border border-purple-800/50 rounded-full flex items-center justify-center text-white hover:bg-purple-900/80 transition-colors z-20">
              <ChevronRight />
            </button>
          )}
        </motion.div>

        {/* Dots Paginasi */}
        <div className="flex justify-center gap-2 sm:gap-3 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > page ? 1 : -1)
                setPage(i)
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${i === page ? 'bg-white scale-125' : 'bg-purple-800/50 hover:bg-purple-700'}`}
            />
          ))}
        </div>
      </div>
    </motion.section>
  )
}