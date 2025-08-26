'use client'

import { motion } from 'framer-motion'
import { 
  PenTool, Film, LayoutTemplate, 
  MonitorSmartphone, Database, MousePointer2 
} from 'lucide-react'

// --- Data untuk Setiap Kartu Layanan ---
const services = [
  {
    icon: <PenTool size={32} />,
    title: "Illustration",
    description: "Creating custom, high-quality digital illustrations that bring your ideas to life with a unique artistic style."
  },
  {
    icon: <Film size={32} />,
    title: "Motion Graphics",
    description: "Designing captivating animations and motion graphics for videos, websites, and social media to grab attention."
  },
  {
    icon: <LayoutTemplate size={32} />,
    title: "Graphic Design",
    description: "Crafting visually stunning brand identities, marketing materials, and digital assets that communicate your message."
  },
  {
    icon: <MonitorSmartphone size={32} />,
    title: "Front-end Dev",
    description: "Building responsive, fast, and interactive user interfaces with modern technologies like React and Next.js."
  },
  {
    icon: <Database size={32} />,
    title: "Back-end Dev",
    description: "Developing robust and scalable server-side logic, APIs, and database management for your applications."
  },
  {
    icon: <MousePointer2 size={32} />,
    title: "UI/UX Design",
    description: "Designing intuitive and user-friendly interfaces that provide a seamless and enjoyable user experience."
  }
];

// --- Varian Animasi ---
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Komponen Kartu Layanan
const ServiceCard = ({ service, index }) => (
  <motion.div 
    className="group relative p-8 h-full bg-purple-900/50 border border-purple-800/50 rounded-2xl overflow-hidden"
    variants={itemVariants}
    whileHover={{ 
      y: -8, 
      boxShadow: '0px 10px 30px rgba(167, 139, 250, 0.15)',
      borderColor: 'rgba(167, 139, 250, 0.5)',
      transition: { duration: 0.3 }
    }}
  >
    {/* Nomor Dekoratif di Latar Belakang */}
    <div className="absolute top-0 right-0 p-4 text-[100px] font-bold text-white/5 pointer-events-none">
      0{index + 1}
    </div>
    
    <div className="relative z-10">
      <div className="text-purple-400 mb-6 transition-colors duration-300 group-hover:text-white">
        {service.icon}
      </div>
      <h3 className="text-2xl font-bold mb-3 text-white">
        {service.title}
      </h3>
      <p className="text-neutral-400 leading-relaxed group-hover:text-neutral-200 transition-colors duration-300">
        {service.description}
      </p>
    </div>
  </motion.div>
);

export default function ServicesSection() {
  return (
    <section 
      id="services"
      className="py-24 px-4"
    >
      <motion.div 
        className="container mx-auto max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-center font-serif text-5xl md:text-6xl mb-16 text-white"
        >
          My Services
        </motion.h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}