import Navbar from '@/app/components/Navbar'
import AboutMe from '@/app/components/AboutMe'
import Introduction from '@/app/components/Introduction'
import TechnologyGrid from '@/app/components/TechnologyGrid'
import ProjectsSection from '@/app/components/ProjectsSection'
import ServicesSection from '@/app/components/ServicesSection'
import ContactSection from '@/app/components/ContactSection'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 py-10 scrollbar-hide">
        <Introduction />
        <AboutMe />
        <ServicesSection/>
        <TechnologyGrid />
        <ProjectsSection />
        <ContactSection />
      </main>
    </>
  )
}
