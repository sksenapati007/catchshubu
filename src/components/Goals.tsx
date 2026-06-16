import { SectionShell, SectionHeading } from "@/components/ui/section-shell"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Lightbulb, Users, TrendingUp, Globe } from "lucide-react"
import { motion } from "framer-motion"

const goals = [
  {
    icon: Lightbulb,
    title: "Product-Minded Engineering",
    description: "CSPO-certified — owning requirements, roadmap and release alongside the code, not just shipping tickets.",
  },
  {
    icon: TrendingUp,
    title: "Scale & Reliability",
    description: "Building systems that hold up under load — payments, real-time infra and high-volume data, measured by real metrics.",
  },
  {
    icon: Users,
    title: "Technical Leadership",
    description: "Mentoring engineers, setting coding standards, and aligning teams around predictable, high-quality releases.",
  },
  {
    icon: Globe,
    title: "Global Opportunities",
    description: "Open to roles across the Middle East, Europe, Australia and Southeast Asia to broaden international impact.",
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
}
const card = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
}

export function Goals() {
  return (
    <SectionShell id="goals">
      <SectionHeading
        eyebrow="Goals"
        title="Where I'm headed"
        subtitle="Leveraging a technical foundation to drive product innovation and meaningful user experiences — globally."
      />

      <motion.div
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {goals.map((goal, index) => (
          <motion.div key={index} variants={card}>
            <SpotlightCard className="h-full p-6">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 rounded-xl bg-gradient-primary opacity-20 blur-md" />
                  <div className="relative rounded-xl bg-gradient-primary p-3">
                    <goal.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">{goal.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{goal.description}</p>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </SectionShell>
  )
}
