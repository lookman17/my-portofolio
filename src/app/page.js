import Navbar from '@/app/components/Navbar'
import AboutMe from '@/app/components/AboutMe'
import Introduction from '@/app/components/Introduction'
import TechnologyGrid from '@/app/components/TechnologyGrid'
import ProjectsSection from '@/app/components/ProjectsSection'
import ServicesSection from '@/app/components/ServicesSection'
import ContactSection from '@/app/components/ContactSection'
import Script from 'next/script'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 py-10 scrollbar-hide">
        <Introduction />
        <AboutMe />
        <ServicesSection />
        <TechnologyGrid />
        <ProjectsSection />
        <ContactSection />

        {/* Load external script */}
        <Script src="https://noboxcall-five.vercel.app/AIAgentCall.js" strategy="afterInteractive" />

        {/* Initialize AI Agent */}
        <Script id="ai-agent-init" strategy="afterInteractive">
          {`
            AIAgentCall.init({
              callAgentId: "c2e92bfc-c65c-40d0-8099-eb35f6772e64",
              chatAgentId: "15c92c19-fecf-431c-8e00-11d25de2b178"
            });
          `}
        </Script>
      </main>
    </>
  )
}
