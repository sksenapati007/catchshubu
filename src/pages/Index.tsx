import { Sidebar } from "@/components/layout/Sidebar"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Projects } from "@/components/Projects"
import { PersonalProjects } from "@/components/PersonalProjects"
import { Goals } from "@/components/Goals"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { CustomCursor } from "@/components/ui/CustomCursor"
import { PageSpotlight } from "@/components/ui/PageSpotlight"
import { MusicPlayer } from "@/components/ui/MusicPlayer"
import { PageLoader } from "@/components/ui/PageLoader"

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <PageLoader />
      <div className="grain" aria-hidden="true" />
      <PageSpotlight />
      <CustomCursor />
      <MusicPlayer />
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-[4px] focus:px-4 focus:py-2 focus:text-sm focus:font-mono focus:outline-none"
        style={{ background: 'var(--c-accent)', color: 'var(--c-base)' }}
      >
        Skip to content
      </a>

      <Sidebar />

      <main id="main-content" className="lg:pl-[52px] pb-14 lg:pb-0">
        <Hero />
        <About />
        <Projects />
        <PersonalProjects />
        <Goals />
        <Contact />
      </main>

      <div className="lg:pl-[52px]">
        <Footer />
      </div>
    </div>
  )
}

export default Index
