'use client'

import { motion } from 'framer-motion'
import { Code, GraduationCap, Briefcase } from 'lucide-react'

// Data untuk setiap kartu, membuatnya mudah untuk diubah di masa depan
const cardData = [
  {
    icon: <Code size={32} className="mb-4 text-neutral-300" />,
    title: "Languages",
    description: "HTML, CSS, JavaScript, React Js, Next Js, PHP, Laravel",
    isHighlighted: false,
  },
  {
    icon: <GraduationCap size={32} className="mb-4 text-white" />,
    title: "Education",
    description: "I am a software engineering student at Telkom Malang Vocational School.",
    isHighlighted: true, // Kartu ini akan memiliki gaya yang berbeda
  },
  {
    icon: <Briefcase size={32} className="mb-4 text-neutral-300" />,
    title: "Projects",
    description: "Built more than 5 projects",
    isHighlighted: false,
  },
];

// Varian Animasi
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


export default function Highlights() {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      variants={containerVariants}
    >
      {cardData.map((card, index) => (
        <motion.div 
          key={index} 
          className={`
            p-8 rounded-2xl h-full transition-all duration-300
            ${card.isHighlighted
              ? 'bg-[#2A273F] border-2 border-white shadow-2xl shadow-purple-900/50' // Gaya untuk kartu yang ditonjolkan
              : 'bg-purple-900/20 border border-purple-800/50' // Gaya untuk kartu standar
            }
          `}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.03 }} // Efek hover yang sama untuk semua kartu
        >
          {card.icon}
          <h3 className="text-xl font-bold mb-3">{card.title}</h3>
          <p className={card.isHighlighted ? 'text-neutral-200' : 'text-neutral-400'}>
            {card.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}