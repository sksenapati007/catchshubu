import { Button } from "@/components/ui/button"
import { Mail, MapPin, ArrowDown, Github, Linkedin, Sparkles } from "lucide-react"
import profilePhoto from "@/assets/profile-photo.png"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const stats = [
  { value: "6+", label: "Years Experience" },
  { value: "100K+", label: "Peak Txns / Day" },
  { value: "30%", label: "Infra Cost Cut" },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-20 sm:pt-0"
    >
      {/* Aurora + grid backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-bg absolute inset-0" />
        <div className="bg-grid absolute inset-0 opacity-60" />
      </div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        {/* Avatar */}
        <motion.div variants={item} className="mb-8 flex justify-center">
          <div className="relative animate-float">
            <div className="absolute -inset-4 rounded-full bg-gradient-primary opacity-30 blur-2xl" />
            <img
              src={profilePhoto}
              alt="Shubhendu Kumar Senapati"
              className="relative z-10 h-40 w-40 rounded-full border-2 border-white/10 object-cover shadow-glow"
            />
          </div>
        </motion.div>

        {/* Status pill */}
        <motion.div variants={item} className="mb-6 flex justify-center">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="text-muted-foreground">Available for opportunities</span>
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="mb-5 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
        >
          <span className="text-gradient">Shubhendu Kumar</span>
          <br />
          <span className="text-foreground">Senapati</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mb-4 flex flex-wrap items-center justify-center gap-2 text-lg font-medium text-muted-foreground sm:text-xl"
        >
          <Sparkles className="h-4 w-4 text-accent" />
          Senior Full Stack Engineer
          <span className="text-border">·</span>
          Fintech &amp; iGaming
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4 text-primary" /> Dubai, UAE
          </span>
        </motion.p>

        <motion.p
          variants={item}
          className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          6+ years building scalable B2B platforms across fintech, iGaming &amp;
          smart-TV. CSPO-certified with a Google UX credential — bridging
          engineering depth with product thinking. I own requirements, roadmap,
          and release, not just the code.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={item}
          className="mb-14 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group bg-gradient-primary text-primary-foreground transition-smooth hover:shadow-glow"
          >
            <a href="mailto:catchshubu@gmail.com">
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="glass border-border/60 transition-smooth hover:border-primary/50"
          >
            <a href="#experience">
              View My Work
              <ArrowDown className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <div className="ml-1 flex gap-1">
            {[
              { icon: Github, href: "https://github.com/sksenapati007", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/shubhendukumars", label: "LinkedIn" },
            ].map(({ icon: Icon, href, label }) => (
              <Button
                key={label}
                asChild
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-primary"
              >
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={item}
          className="mx-auto grid max-w-md grid-cols-3 gap-3"
        >
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-2 py-5 sm:px-4">
              <div className="text-gradient whitespace-nowrap text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <ArrowDown className="h-5 w-5 text-muted-foreground" />
      </motion.div>
    </section>
  )
}
