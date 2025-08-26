'use client'

import { motion } from 'framer-motion'
import { Mail, Send, MapPin } from 'lucide-react'

// Varian Animasi
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ContactSection() {
  // Ganti dengan Access Key yang Anda dapatkan dari Web3Forms
  const accessKey = "YOUR_ACCESS_KEY_HERE"; 

  return (
    <section 
      id="contact"
      className="py-24 px-4"
    >
      <motion.div
        className="container mx-auto max-w-5xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 
          variants={itemVariants}
          className="text-center font-serif text-5xl md:text-6xl mb-4 text-white"
        >
          Get in Touch
        </motion.h2>
        <motion.p 
          variants={itemVariants}
          className="text-center max-w-xl mx-auto text-neutral-400 mb-16"
        >
          Have a project in mind or just want to say hi? I'd love to hear from you. Fill out the form or send me an email.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Kolom Kiri: Info Kontak */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="mt-1 w-10 h-10 flex-shrink-0 bg-purple-900/50 border border-purple-800/50 rounded-full flex items-center justify-center">
                <Mail size={20} className="text-purple-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Email Me</h3>
                <p className="text-neutral-400">Reach out directly via email.</p>
                <a 
                  href="mailto:youremail@example.com" // Ganti dengan email Anda
                  className="text-purple-300 hover:text-white transition-colors mt-1 inline-block"
                >
                  youremail@example.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="mt-1 w-10 h-10 flex-shrink-0 bg-purple-900/50 border border-purple-800/50 rounded-full flex items-center justify-center">
                <MapPin size={20} className="text-purple-300" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Location</h3>
                <p className="text-neutral-400">Based in Malang, Indonesia. Available for remote work globally.</p>
              </div>
            </div>
          </motion.div>

          {/* Kolom Kanan: Form Kontak */}
          <motion.form 
            action="https://api.web3forms.com/submit" 
            method="POST"
            variants={containerVariants}
            className="space-y-6"
          >
            <input type="hidden" name="access_key" value={accessKey} />
            
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-300 mb-2">Your Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required
                className="w-full bg-purple-900/30 border border-purple-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Your Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required
                className="w-full bg-purple-900/30 border border-purple-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-300 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows="5" 
                required
                className="w-full bg-purple-900/30 border border-purple-800/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              ></textarea>
            </motion.div>

            <motion.button
              type="submit"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors"
            >
              Send Message
              <Send size={16} className="transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  )
}