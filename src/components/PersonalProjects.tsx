import { SectionShell, SectionHeading } from "@/components/ui/section-shell"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Github, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    name: "NutrimentPWA",
    description: "Personal diet & nutrition tracker built as an installable Progressive Web App.",
    repo: "https://github.com/sksenapati007/NutrimentPWA",
    live: "https://nutrimentpwa.onrender.com",
    tags: ["PWA", "Diet Tracker"],
  },
  {
    name: "FarmPlanner",
    description: "Farm planning and management web app for organising layouts and schedules.",
    repo: "https://github.com/sksenapati007/FarmPlanner-v1",
    live: "https://farmplanner-v1.onrender.com",
    tags: ["Web App", "Planner"],
  },
  {
    name: "PawPal",
    description: "MVP built during Certified Scrum Product Owner (CSPO) training.",
    repo: "https://github.com/sksenapati007/PawPal",
    live: "https://sksenapati007.github.io/PawPal",
    tags: ["MVP", "CSPO"],
  },
  {
    name: "Expense Tracker",
    description: "Flutter-based expense tracking app for logging and categorising spend. (Unpublished)",
    repo: "https://github.com/sksenapati007/ExpenseTrackerApp",
    live: null,
    tags: ["Flutter", "Mobile"],
  },
  {
    name: "Simple TODO App",
    description: "Lightweight to-do app — pure client-side, no databases involved.",
    repo: "https://github.com/sksenapati007/Simple-TODO-App",
    live: "https://todo-list-shubu.web.app",
    tags: ["Todo", "Client-side"],
  },
  {
    name: "weather-cli",
    description: "Weather service that returns live conditions by city via a simple API endpoint.",
    repo: "https://github.com/sksenapati007/weather-cli",
    live: "https://weather-cli-mrlm.onrender.com/weather?city=Dubai",
    tags: ["CLI", "API"],
  },
  {
    name: "Employee Management",
    description: "C++ console application for employee records — an early high-school project.",
    repo: "https://github.com/sksenapati007/Employee-Mgmt-C-plus-plus",
    live: null,
    tags: ["C++", "Console"],
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
}
const card = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function PersonalProjects() {
  return (
    <SectionShell id="personal">
      <SectionHeading
        eyebrow="Personal Projects"
        title="Built for the love of it"
        subtitle="Side projects and experiments — from PWAs and Flutter apps to CLIs and a nostalgic C++ console app."
      />

      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {projects.map((p) => (
          <motion.div key={p.name} variants={card}>
            <SpotlightCard className="flex h-full flex-col p-6">
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-secondary/70 px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center gap-4 border-t border-border/60 pt-4 text-sm">
                <a
                  href={p.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  <Github className="h-4 w-4" /> Code
                </a>
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    <ExternalLink className="h-4 w-4" /> Live Demo
                  </a>
                )}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}
