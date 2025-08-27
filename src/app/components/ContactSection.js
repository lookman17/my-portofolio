'use client'

import { motion } from 'framer-motion'
import { Send, CheckCircle, Loader2 } from 'lucide-react' // Menambahkan ikon Loader
import { useState } from 'react';

// Varian Animasi
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// --- Komponen Input Field dengan animasi ---
const AnimatedInput = ({ type = 'text', name, label, required = true, isTextArea = false }) => (
  <div className="relative group">
    <label htmlFor={name} className="block text-sm font-medium text-neutral-400 mb-2">{label}</label>
    {isTextArea ? (
      <textarea 
        name={name} 
        id={name} 
        required={required}
        rows="5"
        className="w-full bg-transparent border-b-2 border-purple-800/50 focus:outline-none text-white py-2 transition-colors duration-300"
      />
    ) : (
      <input 
        type={type} 
        name={name} 
        id={name} 
        required={required}
        className="w-full bg-transparent border-b-2 border-purple-800/50 focus:outline-none text-white py-2 transition-colors duration-300"
      />
    )}
    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left" />
  </div>
);

export default function ContactSection() {
  // --- PENYEMPURNAAN STATE ---
  const [formStatus, setFormStatus] = useState({ submitted: false, message: '' });
  const [isLoading, setIsLoading] = useState(false);
  
  // GANTI INI DENGAN KUNCI ANDA DARI WEB3FORMS
  const accessKey = "4c88e3df-b627-4866-a9f5-00e788bbeddb"; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Mulai loading
    setFormStatus({ submitted: false, message: '' }); // Reset pesan

    const formData = new FormData(e.target);
    formData.append("access_key", accessKey);
    
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: json
      });
      const result = await response.json();
      if (result.success) {
          setFormStatus({ submitted: true, message: 'Thank you! Your message has been sent.' });
      } else {
          console.error("Error from Web3Forms:", result);
          setFormStatus({ submitted: false, message: result.message || 'Something went wrong. Please try again.' });
      }
    } catch (error) {
        console.error("Network or fetch error:", error);
        setFormStatus({ submitted: false, message: 'Network error. Please check your connection and try again.' });
    } finally {
        setIsLoading(false); // Selesai loading
    }
  };

  return (
    <section 
      id="contact"
      className="py-24 px-4 relative overflow-hidden"
    >
      <motion.div
        className="container mx-auto max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-center font-serif text-5xl md:text-6xl mb-4 text-white">
          Lets Connect
        </motion.h2>
        <motion.p variants={itemVariants} className="text-center max-w-xl mx-auto text-neutral-400 mb-16">
          Im always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-md border border-white/10 shadow-lg rounded-3xl p-8 md:p-12"
        >
          {formStatus.submitted ? (
            <div className="text-center py-12">
              <CheckCircle size={64} className="mx-auto text-green-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
              <p className="text-neutral-300">{formStatus.message}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <AnimatedInput name="name" label="Your Name" />
              <AnimatedInput type="email" name="email" label="Your Email" />
              <AnimatedInput name="message" label="Your Message" isTextArea />

              <motion.button
                type="submit"
                disabled={isLoading} // Tombol nonaktif saat loading
                whileHover={{ scale: isLoading ? 1 : 1.05, boxShadow: isLoading ? 'none' : '0px 0px 20px rgba(255, 255, 255, 0.3)' }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                className="group w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-semibold rounded-full shadow-lg shadow-white/20 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send It My Way
                    <Send size={18} className="transition-transform group-hover:rotate-45" />
                  </>
                )}
              </motion.button>
              {formStatus.message && !formStatus.submitted && (
                <p className="text-red-400 text-sm text-center pt-2">{formStatus.message}</p>
              )}
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}