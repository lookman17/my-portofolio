'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const generateWavyPath = (yOffset, viewportWidth) => {
  const points = []
  const segments = 20
  const amplitude = 50 + Math.random() * 50
  const frequency = Math.random() * 0.1

  for (let i = 0; i <= segments; i++) {
    const x = (viewportWidth / segments) * i
    const y = yOffset + Math.sin(i * frequency + Math.random() * 5) * amplitude
    points.push(`${x},${y}`)
  }

  return `M ${points[0]} L ${points.slice(1).join(' ')}`
}

export default function AnimatedBackground() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [paths, setPaths] = useState([])
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateState = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      setDimensions({ width: newWidth, height: newHeight })

      const numberOfLines = 5
      const newPaths = []
      for (let i = 0; i < numberOfLines; i++) {
        const y = (newHeight / (numberOfLines + 1)) * (i + 1)
        newPaths.push({
          y,
          d1: generateWavyPath(y, newWidth * 1.2),
          d2: generateWavyPath(y, newWidth * 1.2),
        })
      }
      setPaths(newPaths)
    }

    updateState()
    window.addEventListener('resize', updateState)

    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', updateState)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (dimensions.width === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Overlay gelap biar warna ga terlalu nabrak */}

      <motion.svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {/* Filter glow+blur */}
        <defs>
          <filter id="glowBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map((path, index) => {
          const distance = Math.abs(mouse.y - path.y)
          const isNear = distance < 100
          const hue = (mouse.x / dimensions.width) * 360
          const color = isNear
            ? `hsl(${hue}, 100%, 60%)`
            : 'rgba(255,255,255,0.15)'

          return (
            <motion.path
              key={index}
              d={path.d1}
              animate={{ d: path.d2 }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
              fill="none"
              stroke={color}
              strokeWidth={2}
              filter={isNear ? 'url(#glowBlur)' : 'none'}
            />
          )
        })}
      </motion.svg>
    </div>
  )
}
