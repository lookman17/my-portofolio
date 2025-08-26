'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Github, ArrowUpRight } from 'lucide-react'

// Varian animasi untuk item saat di-hover
const hoverVariants = {
  hover: { y: -8, transition: { duration: 0.3 } },
};

export default function ProjectCard({ project }) {
  return (
    <motion.div 
      className="bg-purple-900/30 border border-purple-800/50 rounded-2xl overflow-hidden h-full flex flex-col"
      variants={hoverVariants}
      whileHover="hover"
    >
      {/* Bagian Gambar */}
      <div className="relative w-full aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Lapisan gradasi di atas gambar untuk estetika */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Bagian Konten */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tags Teknologi */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-purple-800/50 text-xs text-purple-200 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Judul & Deskripsi */}
        <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
        <p className="text-neutral-300 leading-relaxed text-sm mb-6 flex-grow">
          {project.description}
        </p>

        {/* Bagian Tombol */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-purple-800/50">
          <a 
            href={project.githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
            title="View on GitHub"
          >
            <Github size={20} />
            <span className="text-sm font-medium">Code</span>
          </a>
          <a 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-auto group flex items-center gap-2 px-4 py-2 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors"
            title="View Live Project"
          >
            <span className="text-sm">View Project</span>
            <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}