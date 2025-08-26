'use client'

import { useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import { 
  SiReact, SiNextdotjs, SiTailwindcss, SiJavascript, 
  SiFramer, SiSupabase, SiFigma, SiNodedotjs 
} from 'react-icons/si'
import AnimatedHeadline from './AnimatedHeadline'
// Data Skillset
const skills = [
  { name: 'React', icon: <SiReact size={36} className="text-cyan-400" /> },
  { name: 'Next.js', icon: <SiNextdotjs size={36} className="text-white" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss size={36} className="text-sky-400" /> },
  { name: 'JavaScript', icon: <SiJavascript size={36} className="text-yellow-400" /> },
  { name: 'Framer Motion', icon: <SiFramer size={36} className="text-pink-500" /> },
  { name: 'Supabase', icon: <SiSupabase size={36} className="text-green-500" /> },
  { name: 'Figma', icon: <SiFigma size={36} className="text-purple-400" /> },
  { name: 'Node.js', icon: <SiNodedotjs size={36} className="text-lime-500" /> },
];

// Card Skill
const SkillIcon = ({ skill }) => (
  <motion.div
    className="flex-shrink-0 p-[1.5px] rounded-2xl 
               bg-gradient-to-br from-purple-700/50 to-purple-900/30"
    whileHover={{ scale: 1.08 }}
    title={skill.name}
  >
    <div className="w-28 h-28 sm:w-32 sm:h-32 
                    bg-[#0f0c1d] backdrop-blur-md rounded-[14px] 
                    flex flex-col items-center justify-center gap-2 
                    transition-colors duration-300 hover:bg-purple-900/60">
      <motion.div whileHover={{ scale: 1.2 }} className="drop-shadow-lg">
        {skill.icon}
      </motion.div>
      <span className="text-xs sm:text-sm text-neutral-300 font-medium">
        {skill.name}
      </span>
    </div>
  </motion.div>
);

// Baris Marquee
const MarqueeRow = ({ skills, direction = 'left', duration = 25 }) => {
  // Gandakan 3x agar loop benar-benar mulus
  const duplicatedSkills = [...skills, ...skills, ...skills];
  const controls = useAnimationControls();

  const marqueeAnimation = {
    x: direction === 'left' ? '-66.6%' : '0%',
    transition: { duration, repeat: Infinity, ease: 'linear' }
  };

  useEffect(() => {
    controls.start(marqueeAnimation);
  }, [controls]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Fade effect di sisi kiri/kanan */}
      <div className="absolute top-0 left-0 w-24 h-full 
                      bg-gradient-to-r from-[#0a0914] to-transparent 
                      z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-24 h-full 
                      bg-gradient-to-l from-[#0a0914] to-transparent 
                      z-10 pointer-events-none" />
      
      <motion.div 
        className="flex gap-8 pr-8"
        animate={controls}
        initial={{ x: direction === 'left' ? '0%' : '-66.6%' }}
      >
        {duplicatedSkills.map((skill, index) => (
          <SkillIcon key={index} skill={skill} />
        ))}
      </motion.div>
    </div>
  );
};

export default function TechnologyGrid() {
  return (
    <section id="skills" className="py-24 relative text-white 
                      bg-purple-950/30 rounded-4xl">
      {/* Glow halus background */}
      <div className="absolute inset-0 -z-10 
                      bg-[radial-gradient(ellipse_at_center,_rgba(167,139,250,0.12),_transparent_70%)]" />
      
      <div className="container mx-auto max-w-6xl space-y-12">
        <AnimatedHeadline 
                        text="Skills & Technologies" 
                        className="text-4xl md:text-5xl text-center" // Kirim style ukuran teks
                    />
        
        {/* Baris 1 (ke kiri) */}
        <MarqueeRow skills={skills} direction="left" duration={30} />
        {/* Baris 2 (ke kanan) */}
        <MarqueeRow skills={skills} direction="right" duration={35} />
      </div>
    </section>
  )
}
