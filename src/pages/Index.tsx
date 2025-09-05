import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Experience } from "@/components/Experience"
import { Goals } from "@/components/Goals"
import { Contact } from "@/components/Contact"

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Experience />
      <Goals />
      <Contact />
    </main>
  );
};

export default Index;