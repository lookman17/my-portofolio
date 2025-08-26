// File: app/layout.js

import Navbar from './components/Navbar'
import ScrollProgressBar from './components/ScrollProgressBar'
import MouseGlow from './components/MouseGlow'
import './globals.css'
import AnimatedBackground from './components/AnimatedBackground'
import Footer from './components/Footer'

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body 
        className="font-sans bg-[#1E1B2E] text-neutral-200 scrollbar-hide"
      >
        <AnimatedBackground />
        
        <ScrollProgressBar />
        <Navbar />
        <MouseGlow />

        <main>{children}</main>
        <Footer />

      </body>
    </html>
  )
}
