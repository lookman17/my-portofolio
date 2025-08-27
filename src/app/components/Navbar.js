'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from './useActiveSection' // Pastikan path ini benar
import { Menu, X } from 'lucide-react'

// Data untuk item navigasi
const navItems = [
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About Me', href: '#about', id: 'about' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Contact Me', href: '#contact', id: 'contact', isButton: true },
]

// Varian Animasi
const desktopContainerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const desktopItemVariants = { hidden: { y: -20, opacity: 0 }, visible: { y: 0, opacity: 1 } }
const mobileMenuVariants = { hidden: { opacity: 0, transition: { duration: 0.3, ease: 'easeOut' } }, visible: { opacity: 1, transition: { duration: 0.3, ease: 'easeIn' } } }
const mobileLinkContainerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }
const mobileLinkVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: 'easeOut' } } }

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)
  const sectionIds = navItems.map((item) => item.id)
  const activeSectionId = useActiveSection(sectionIds, { rootMargin: '-50% 0px -50% 0px' })

  const handleScroll = (e, href) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    const targetId = href.replace(/.*#/, '')
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    // PERBAIKAN 1: Gunakan React Fragment <>...</> untuk membungkus dua elemen terpisah
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full px-4 flex justify-center">
        {/* Navbar Desktop dan Tombol Hamburger TETAP di dalam header */}
        <motion.nav
          className="hidden md:flex items-center gap-2 rounded-full p-2 bg-black/30 backdrop-blur-md border border-white/10"
          variants={desktopContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {navItems.map((item) => (
            item.isButton ? (
              <motion.a key={item.name} href={item.href} onClick={(e) => handleScroll(e, item.href)} variants={desktopItemVariants} className="relative inline-block p-[1.5px] rounded-full">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-400 rounded-full"></div>
                <div className="relative z-10 px-5 py-2 text-sm font-medium text-white bg-neutral-900 rounded-full hover:bg-neutral-800 transition-colors duration-300">{item.name}</div>
              </motion.a>
            ) : (
              <motion.a key={item.name} href={item.href} onClick={(e) => handleScroll(e, item.href)} variants={desktopItemVariants} className={`px-5 py-2 text-sm font-medium text-white rounded-full transition-colors duration-300 ${activeSectionId === item.id ? 'bg-neutral-700' : 'hover:bg-neutral-800'}`}>{item.name}</motion.a>
            )
          ))}
        </motion.nav>

        <div className="md:hidden w-full flex justify-end">
          <motion.button onClick={() => setMobileMenuOpen(true)} className="p-3 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} aria-label="Open menu">
            <Menu size={24} />
          </motion.button>
        </div>
      </header>

      {/* PERBAIKAN 2: Pindahkan Overlay Menu Mobile KELUAR dari <header> */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 bg-[#0a0914] z-[60] flex items-center justify-center p-4" // Beri z-index lebih tinggi
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-white" aria-label="Close menu">
              <X size={32} />
            </button>

            <motion.nav className="flex flex-col items-stretch text-center gap-6 w-full max-w-xs" variants={mobileLinkContainerVariants} initial="hidden" animate="visible">
              {navItems.map((item) => (
                item.isButton ? (
                  <motion.div key={item.name} variants={mobileLinkVariants} className="pt-6 mt-6 border-t border-neutral-800">
                    <a href={item.href} onClick={(e) => handleScroll(e, item.href)} className="relative inline-block p-[1.5px] rounded-lg w-full">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-orange-400 rounded-lg"></div>
                      <div className="relative z-10 w-full px-6 py-3 text-xl font-medium text-white bg-neutral-900 rounded-[7px] hover:bg-neutral-800 transition-colors">{item.name}</div>
                    </a>
                  </motion.div>
                ) : (
                  <motion.a key={item.name} href={item.href} onClick={(e) => handleScroll(e, item.href)} variants={mobileLinkVariants} className={`text-2xl font-medium transition-colors ${activeSectionId === item.id ? 'text-white' : 'text-neutral-500 hover:text-white'}`}>{item.name}</motion.a>
                )
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}