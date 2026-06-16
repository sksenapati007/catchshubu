import { Navbar } from "@/components/Navbar"
import { ScrollProgress } from "@/components/ScrollProgress"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Experience } from "@/components/Experience"
import { Projects } from "@/components/Projects"
import { PersonalProjects } from "@/components/PersonalProjects"
import { Goals } from "@/components/Goals"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="grain" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <PersonalProjects />
        <Goals />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default Index
