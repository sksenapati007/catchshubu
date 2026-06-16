import { SectionShell, SectionHeading } from "@/components/ui/section-shell"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { CreditCard, Radio, Gauge, Compass, GraduationCap, BadgeCheck } from "lucide-react"
import { motion } from "framer-motion"

const highlights = [
  {
    icon: CreditCard,
    title: "Payments & Fintech",
    description: "5+ gateways (PayTM, Razorpay, Cashfree…) on a platform doing 10K–100K txns/day — webhooks, retries & reconciliation.",
    span: "lg:col-span-2",
  },
  {
    icon: Radio,
    title: "Real-time Infrastructure",
    description: "RabbitMQ dynamic provisioning, EMQX MQTT (MQTTS+WSS) and SSE pipelines for resilient delivery.",
    span: "",
  },
  {
    icon: Gauge,
    title: "Performance at Scale",
    description: "Optimised 4.2M+ record tables — compound indexing cut query latency ~80% and eliminated timeouts.",
    span: "",
  },
  {
    icon: Compass,
    title: "Product Ownership",
    description: "CSPO-certified with a Google UX credential — owning requirements, roadmap and release, not just code.",
    span: "lg:col-span-2",
  },
]

const skillGroups = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Java", "C++", "SQL", "Rust (learning)"] },
  { label: "Frontend", items: ["React", "Next.js", "Remix", "Angular", "Tailwind CSS", "shadcn/ui", "Flutter", "BBC TAL"] },
  { label: "Backend", items: ["Node.js", "NestJS (Fastify)", "Express", "Bun", "Supabase", "Firebase"] },
  { label: "Databases", items: ["PostgreSQL", "MongoDB", "MySQL", "Oracle", "Redis", "Prisma"] },
  { label: "Messaging & Queue", items: ["RabbitMQ", "EMQX MQTT", "SSE"] },
  { label: "DevOps & Cloud", items: ["Docker", "GitHub Actions", "GitLab CI/CD", "Render", "fly.io", "OpenTelemetry", "Grafana Tempo"] },
  { label: "Payments", items: ["PayTM", "Razorpay", "Cashfree", "Webhooks", "Reconciliation"] },
  { label: "AI & Tooling", items: ["Cursor AI", "Copilot", "n8n", "Ollama", "Multi-repo orchestration"] },
]

const education = {
  degree: "B.Tech, Computer Science + MBA in HRM",
  school: "Siksha O Anusandhan University, Bhubaneswar",
  year: "2018",
}

const certifications = [
  "Certified Scrum Product Owner (CSPO)",
  "Product Management Certification",
  "Google UX Design Certificate",
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
}
const card = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function About() {
  return (
    <SectionShell id="about">
      <SectionHeading
        eyebrow="About"
        title="Engineer with a product heart"
        subtitle="Dubai-based Senior Full Stack Engineer with 6+ years delivering scalable B2B platforms across fintech, iGaming and smart-TV — bridging engineering depth with product thinking."
      />

      {/* Bento highlights */}
      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {highlights.map((h) => (
          <motion.div key={h.title} variants={card} className={h.span}>
            <SpotlightCard className="h-full p-6">
              <div className="mb-4 inline-flex rounded-xl bg-gradient-primary/10 p-3 ring-1 ring-primary/20">
                <h.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{h.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{h.description}</p>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Categorized skills */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <p className="mb-6 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Technical Skills
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.label} className="glass rounded-2xl p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-primary">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-md border border-border/60 bg-secondary/40 px-2.5 py-1 text-xs text-foreground/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education & Certifications */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mt-6 grid gap-3 md:grid-cols-2"
      >
        <SpotlightCard className="p-6">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <GraduationCap className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Education</span>
          </div>
          <p className="font-medium text-foreground">{education.degree}</p>
          <p className="text-sm text-muted-foreground">{education.school}</p>
          <p className="mt-1 text-sm text-muted-foreground">{education.year}</p>
        </SpotlightCard>

        <SpotlightCard className="p-6">
          <div className="mb-3 flex items-center gap-2 text-primary">
            <BadgeCheck className="h-5 w-5" />
            <span className="text-sm font-semibold uppercase tracking-wider">Certifications</span>
          </div>
          <ul className="space-y-2">
            {certifications.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-primary to-violet" />
                {c}
              </li>
            ))}
          </ul>
        </SpotlightCard>
      </motion.div>
    </SectionShell>
  )
}
