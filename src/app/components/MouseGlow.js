"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function MouseGlow() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 }
  const springX = useSpring(cursorX, springConfig)
  const springY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [cursorX, cursorY])

  return (
    <motion.div className="pointer-events-none fixed inset-0 z-[999]">
      <motion.div
        className="absolute w-[100px] h-[100px] rounded-full"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle at center, rgba(167, 139, 250, 0.25), transparent 70%)",
          mixBlendMode: "soft-light",
        }}
        whileTap={{
          scale: 1.5,
          opacity: 0.5,
          transition: { duration: 0.3, ease: "easeOut" },
        }}
      />
    </motion.div>
  )
}
