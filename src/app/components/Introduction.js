// File: components/Introduction.js

'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { ArrowRight, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import AnimatedHeadline from './AnimatedHeadline' // <-- 1. Impor komponen baru

// Skeleton Loader yang disesuaikan dengan layout
const IntroSkeleton = () => (
    <section className="min-h-screen flex items-center justify-center p-4 animate-pulse">
        <div className="text-center flex flex-col items-center space-y-8 max-w-4xl">
            <div className="h-8 w-48 rounded-md"></div>
            <div className="space-y-4 w-full">
                <div className="h-16 rounded-md w-full"></div>
                <div className="h-16 rounded-md w-3/4 mx-auto"></div>
            </div>
            <div className="h-10 rounded-md w-1/2"></div>
            <div className="flex gap-4 mt-4">
                <div className="h-12 w-36 rounded-full"></div>
                <div className="h-12 w-36 rounded-full"></div>
            </div>
        </div>
    </section>
);

// Varian animasi untuk efek stagger (muncul satu per satu)
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};


export default function Introduction() {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            const { data, error } = await supabase.from('about_me').select('*').eq('id', 1).single()
            if (error) console.error('Supabase error:', error)
            else setProfile(data)
            setLoading(false)
        }
        fetchProfile()
    }, [])

    if (loading) return <IntroSkeleton />
    if (!profile) return null;

    return (
        <section 
            id="home" 
            className="min-h-screen text-white flex flex-col items-center justify-center text-center p-4"
        >
            <motion.div
                className="flex flex-col items-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="mb-8">
                    <p className="text-lg text-neutral-300">
                        Hi Everyone 👋
                    </p>
                </motion.div>

                {/* --- 2. GANTI BAGIAN INI --- */}
                <motion.div variants={itemVariants} className="mb-8">
                    <AnimatedHeadline 
                        text="frontend web developer" 
                        className="text-5xl md:text-7xl" // Kirim style ukuran teks
                    />
                    <AnimatedHeadline 
                        text={`based in ${profile.location}.`}
                        className="text-5xl md:text-7xl justify-center" // Kirim style ukuran teks
                    />
                </motion.div>
                
                <motion.p 
                    variants={itemVariants}
                    className="max-w-xl text-neutral-300 leading-relaxed mb-10"
                >
                    {profile.bio}
                </motion.p>
                
                <motion.div 
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 items-center"
                >
                    {/* ... Tombol tidak berubah ... */}
                    <a href="#contact" className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-neutral-400 rounded-full hover:bg-white/10 transition-colors duration-300">
                        contact me
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </a>
                    <a href="/cv-luqman-hakim.pdf" download className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-neutral-200 transition-colors duration-300">
                        my resume
                        <Download size={16} />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    )
}