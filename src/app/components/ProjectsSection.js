'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// --- Data Proyek ---
const projects = [
  {
    title: "E-commerce Modern",
    image: "/projects/ecommerce.jpg",
    description: "Platform e-commerce full-stack yang dibangun dengan Next.js, pembayaran Stripe, dan backend Supabase.",
    tags: ["Next.js", "React", "Stripe", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com/your-username/ecommerce",
    liveUrl: "#"
  },
  {
    title: "Aplikasi Manajemen Tugas",
    image: "/projects/task-app.jpg",
    description: "Aplikasi kanban drag-and-drop untuk manajemen tugas tim, dengan otentikasi dan database real-time Firebase.",
    tags: ["React", "Firebase", "Framer Motion", "Styled Components"],
    githubUrl: "https://github.com/your-username/task-manager",
    liveUrl: "#"
  },
  {
    title: "Landing Page Agensi Kreatif",
    image: "/projects/agency.jpg",
    description: "Landing page interaktif untuk agensi digital, dengan fokus animasi mikro halus.",
    tags: ["HTML5", "CSS3", "JavaScript", "GSAP"],
    githubUrl: "https://github.com/your-username/agency-landing",
    liveUrl: "#"
  },
  {
    title: "Blog Developer",
    image: "/projects/blog.jpg",
    description: "Blog pribadi dengan Markdown, integrasi komentar, dan SEO-friendly.",
    tags: ["Next.js", "MDX", "Tailwind", "SEO"],
    githubUrl: "https://github.com/your-username/blog",
    liveUrl: "#"
  }
]

// --- Animasi Geser ---
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
}

// Tombol Navigasi
const CarouselButton = ({ onClick, children, className }) => (
  <button 
    onClick={onClick}
    className={`w-12 h-12 bg-purple-900/50 border border-purple-800/50 rounded-full flex items-center justify-center text-white hover:bg-purple-900/80 transition-colors z-20 ${className}`}
  >
    {children}
  </button>
)

export default function ProjectsSection() {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(0)

  const totalSlides = Math.ceil(projects.length / 2) // 2 project per slide

  const paginate = (newDirection) => {
    setDirection(newDirection)
    const newPage = (page + newDirection + totalSlides) % totalSlides
    setPage(newPage)
  }

  // Ambil 2 project per page
  const currentProjects = projects.slice(page * 2, page * 2 + 2)

  return (
    <section id="projects" className="py-24 px-4 overflow-hidden">
      <div className="container mx-auto max-w-5xl text-center relative">
        <motion.h2 
          className="font-serif text-5xl md:text-6xl mb-16 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          My Creations
        </motion.h2>

        {/* --- Carousel --- */}
        <div className="relative h-[600px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              className="w-full max-w-5xl absolute grid grid-cols-1 md:grid-cols-2 gap-8"
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
            >
              {currentProjects.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Tombol Navigasi di luar card */}
          <CarouselButton 
            onClick={() => paginate(-1)} 
            className="absolute top-1/2 -left-16 -translate-y-1/2"
          >
            <ChevronLeft />
          </CarouselButton>
          <CarouselButton 
            onClick={() => paginate(1)} 
            className="absolute top-1/2 -right-16 -translate-y-1/2"
          >
            <ChevronRight />
          </CarouselButton>
        </div>

        {/* Indikator (Dots) */}
        <div className="flex justify-center gap-3 mt-8">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > page ? 1 : -1)
                setPage(i)
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                i === page ? 'bg-white' : 'bg-purple-800/50 hover:bg-purple-800'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
