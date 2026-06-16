import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "personal", label: "Personal" },
  { id: "goals", label: "Goals" },
  { id: "contact", label: "Contact" },
]

export function Navbar() {
  const [active, setActive] = useState("home")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -45% 0px" }
    )
    links.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-3 left-0 right-0 z-50 flex justify-center px-4"
    >
      <nav
        className={cn(
          "flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-300",
          scrolled ? "glass shadow-elegant" : "bg-transparent"
        )}
      >
        <button
          onClick={() => go("home")}
          className="px-3 py-1.5 font-display font-bold text-sm tracking-tight"
          aria-label="Go to top"
        >
          <span className="text-gradient">shubu</span>
          <span className="text-primary">.dev</span>
        </button>

        <div className="hidden sm:flex items-center gap-0.5">
          {links.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => go(id)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <AnimatePresence>
                {active === id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </AnimatePresence>
              <span className="relative z-10">{label}</span>
            </button>
          ))}
        </div>
      </nav>
    </motion.header>
  )
}
