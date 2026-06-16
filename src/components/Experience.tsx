import { SectionShell, SectionHeading } from "@/components/ui/section-shell"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building2 } from "lucide-react"
import { motion } from "framer-motion"

const experiences = [
  {
    title: "Senior Product Engineer",
    company: "Cakewalk Information Technologies LLC",
    location: "Dubai, UAE",
    period: "Sep 2021 - Present",
    type: "Full-time",
    achievements: [
      "Integrated 5+ payment gateways on a platform doing 10K–100K txns/day with webhooks, retry logic & reconciliation — lifting successful conversions by 82%",
      "Optimised 4.2M+ record transaction tables with compound indexes, cutting query latency ~80% and eliminating timeout errors",
      "Built dynamic RabbitMQ queue provisioning with vhost isolation and migrated real-time exports from WebSocket to SSE, hardening broker security",
      "Developed EMQX MQTT broker integration (MQTTS + WSS) on the Bun runtime with auto-reconnect for resilient real-time delivery",
      "Architected Express→NestJS (Fastify) migration and a Yarn Workspaces monorepo unifying 5+ codebases — cutting deployment friction 17%",
      "Set up OpenTelemetry distributed tracing to Grafana Cloud Tempo with <5ms overhead, and a multi-cloud benchmarking service informing a 30% infra cost cut",
      "Built browser-based VoIP dialer (JWT, E.164) and memoized per-request auth via WeakMap — cutting auth overhead ~97% on hot routes",
      "Mentored junior engineers, drove coding standards, and refined acceptance criteria with QA for predictable releases",
    ],
    technologies: ["TypeScript", "Node.js", "NestJS", "React", "Remix", "Redis", "RabbitMQ", "PostgreSQL", "MQTT", "OpenTelemetry", "Bun"],
  },
  {
    title: "Smart TV Engineer (BBC TAL)",
    company: "Bufferzero Consultancy",
    location: "Bengaluru, India",
    period: "Jan 2021 - Apr 2021",
    type: "Contract",
    achievements: [
      "Developed Sony LIV Smart TV app features using the BBC Television Application Layer (TAL) framework across Samsung Tizen OS and LG WebOS",
      "Built and tested TV-optimised UI components, navigation flows, and remote-control input handling for consistent cross-device UX",
      "Operated within a multi-vendor delivery chain (Bufferzero → Logituit → Tata ELXSI → Sony LIV) under enterprise delivery constraints",
    ],
    technologies: ["BBC TAL", "Tizen OS", "WebOS", "JavaScript", "Smart TV"],
  },
  {
    title: "Project Manager",
    company: "ODKART Pvt Ltd",
    location: "Bhubaneswar, India",
    period: "Jul 2020 - Sep 2020",
    type: "Full-time",
    achievements: [
      "Directed a remote engineering team to build and ship an HR Windows application in C#, owning the engineering and content roadmap end-to-end",
      "Launched acquisition campaigns across Google, Facebook & LinkedIn Ads with email and WhatsApp outreach — increasing qualified leads by 33%",
      "Produced marketing collateral and UI assets in Figma and Canva, saving the team 2 hours/week in design throughput",
    ],
    technologies: ["C#", "Google Ads", "Facebook Ads", "LinkedIn Ads", "MailChimp", "Figma", "Canva"],
  },
  {
    title: "Full Stack Engineer (Flutter)",
    company: "Higgle.io",
    location: "Bengaluru, India",
    period: "Mar 2020 - May 2020",
    type: "Full-time",
    achievements: [
      "Designed responsive Flutter UIs for a food-networking app, implementing MobX, Bloc & Redux with GraphQL data flows — reducing render issues by 12%",
      "Boosted user engagement by 5% through close product collaboration on UI behaviour refinements across multiple device sizes",
    ],
    technologies: ["Flutter", "GraphQL", "MobX", "Bloc", "Redux", "Mobile"],
  },
]

export function Experience() {
  return (
    <SectionShell id="experience">
      <SectionHeading
        eyebrow="Experience"
        title="A track record of shipping"
        subtitle="6+ years across startups and enterprise — from food-tech and Smart TV in Bengaluru to a B2B iGaming platform in Dubai."
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Timeline spine — centered on the nodes at x = 1.25rem */}
        <div className="absolute left-5 top-3 bottom-3 w-px -translate-x-1/2 bg-gradient-to-b from-primary via-violet/60 to-transparent" />

        <div className="space-y-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              viewport={{ once: true, margin: "-80px" }}
              className="relative pl-14"
            >
              {/* Node — centered on the spine at x = 1.25rem */}
              <span className="absolute left-5 top-3 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center">
                <span className="absolute h-4 w-4 animate-ping rounded-full bg-primary/40" />
                <span className="relative h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
              </span>

              <SpotlightCard className="p-6 text-left">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge className="border-0 bg-primary/15 text-primary">{exp.type}</Badge>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> {exp.period}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Building2 className="h-4 w-4" /> {exp.company}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {exp.location}
                  </span>
                </div>

                <ul className="mt-4 space-y-2">
                  {exp.achievements.map((a, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-r from-primary to-violet" />
                      <span className="text-sm leading-relaxed text-muted-foreground">{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-border/60 bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
