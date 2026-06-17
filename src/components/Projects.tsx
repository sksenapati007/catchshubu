import { SectionShell, SectionHeading } from "@/components/ui/section-shell"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const projects = [
  {
    name: "B2B iGaming Platform",
    client: "Insidebeehive · Cakewalk",
    status: "Live",
    href: "https://betstudio.io",
    hrefLabel: "betstudio.io",
    description:
      "Enterprise iGaming platform with admin tooling, payment processing and reporting dashboards. Led the Yarn Workspaces monorepo migration unifying 5+ codebases (−17% deployment friction); centralised logging and flame-graph profiling cut crash incidents by 8%.",
    tags: ["Monorepo", "Payments", "Reporting", "Observability"],
  },
  {
    name: "Account Aggregator",
    client: "Cakewalk",
    status: "Unreleased",
    href: null,
    hrefLabel: null,
    description:
      "Mobile-first account aggregator UI built with Next.js + Tailwind CSS — achieving an 80% improvement in mobile page performance. Interactive rotating card components lifted key engagement metrics by 5%.",
    tags: ["Next.js", "Tailwind CSS", "Mobile-first"],
  },
  {
    name: "DocLabel — Doctor Evidence",
    client: "Cakewalk",
    status: "Live",
    href: "https://drevidence.com",
    hrefLabel: "drevidence.com",
    description:
      "Healthcare UI component library and in-house headless UI tooling. Resolved priority defects (−9% UI bugs), implemented Angular CDK drag-and-drop, and automated environment setup — saving 1 hour per sprint.",
    tags: ["Angular", "Component Library", "Healthcare"],
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function Projects() {
  return (
    <SectionShell id="projects">
      <SectionHeading
        eyebrow="Work"
        title="Things I've shipped"
        subtitle="Selected professional work spanning iGaming, fintech and healthcare — from platform architecture to polished product UI."
      />

      <motion.div
        className="grid grid-cols-1 gap-5 md:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {projects.map((p) => (
          <motion.div key={p.name} variants={card}>
            <SpotlightCard className="flex h-full flex-col p-6">
              <div className="mb-3 flex items-center justify-between gap-2">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    p.status === "Live"
                      ? "bg-accent/15 text-accent"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {p.status}
                </span>
                {p.href && (
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md text-xs text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {p.hrefLabel}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>

              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mb-3 text-xs uppercase tracking-wider text-muted-foreground">{p.client}</p>
              <p className="flex-1 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

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
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}
