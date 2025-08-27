'use client'

import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { FaGithub, FaLinkedin, FaInstagram, FaDribbble, FaYoutube } from 'react-icons/fa'

// Data untuk Link Sosial Media (Ganti URL '#' dengan link Anda)
const socialLinks = [
  { name: 'GitHub', icon: <FaGithub size={20} />, url: 'https://github.com/lookman17' },
  { name: 'LinkedIn', icon: <FaLinkedin size={20} />, url: 'https://www.linkedin.com/in/luqman-hakim-1374a1329/' },
  { name: 'Instagram', icon: <FaInstagram size={20} />, url: 'https://www.instagram.com/lluminho._/' },
  { name: 'Youtube', icon: <FaYoutube size={20} />, url: 'https://www.youtube.com/@lluminho' },
]

// Varian Animasi untuk efek staggered
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2, delayChildren: 0.5 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.footer 
      // Perubahan: Tidak ada background, hanya border atas
      className="border-t border-purple-900/50 py-6 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
        
        {/* Copyright */}
        <motion.p variants={itemVariants} className="text-neutral-400">
          Designed & Built by <span className="font-semibold text-white">Luqman Hakim</span> &copy; {new Date().getFullYear()}
        </motion.p>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex items-center gap-5">
          {socialLinks.map((link) => (
            <motion.a 
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              // Perubahan: 'hover:text-white' dihapus
              className="text-neutral-400"
              title={link.name}
              // Interaksi sekarang murni berbasis gerakan
              whileHover={{ y: -3, scale: 1.1, color: '#FFFFFF', transition: { duration: 0.2 } }}
            >
              {link.icon}
            </motion.a>
          ))}
        </motion.div>

        {/* Back to top */}
        <motion.button 
          variants={itemVariants}
          onClick={scrollToTop}
          // Perubahan: 'hover:bg...' dan 'transition-colors' dihapus
          className="hidden sm:flex group w-10 h-10 bg-purple-900/30 border border-purple-800/50 rounded-full items-center justify-center"
          title="Back to Top"
        >
          <ArrowUp size={18} className="text-neutral-400 transition-transform duration-300 group-hover:-translate-y-1" />
        </motion.button>
      </div>
    </motion.footer>
  )
}