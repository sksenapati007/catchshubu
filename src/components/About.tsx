import { ParallaxSection } from "@/components/ui/parallax-section"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, Code, Palette, Globe } from "lucide-react"
import { motion } from "framer-motion"

export function About() {
  const skills = [
    "Remix JS", "React", "Angular", "Flutter", "TypeScript", "JavaScript", "Node.js",
    "NextJS", "TailwindCSS", "Shadcn UI", "Prisma", "PostgreSQL",
    "Redis", "Rabbit MQ", "JWT", "Supabase", "Firebase", "MongoDB", "Express.js",
    "Git", "Docker", "Payment Gateways", "Cloud Operations", "GraphQL"
  ]

  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Proficient in modern frontend frameworks and cross-platform mobile development"
    },
    {
      icon: Palette,
      title: "UI/UX Expertise",
      description: "Strong focus on user-centered design and creating intuitive interfaces"
    },
    {
      icon: Globe,
      title: "International Experience",
      description: "Working across diverse markets with global perspective on tech solutions"
    },
    {
      icon: Target,
      title: "Product Mindset",
      description: "Aspiring Technical Product Manager with strategic thinking and execution skills"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <ParallaxSection id="about" offset={30}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Full Stack Developer with 4+ years of experience building scalable applications, managing teams, and delivering innovative solutions.
          Expertise in modern web technologies, mobile development, and cloud operations with a focus on user-centric design.
        </p>
      </motion.div>

      {/* Highlights Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {highlights.map((highlight, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Card className="shadow-elegant hover:shadow-glow transition-smooth border-border/50 h-full">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <motion.div
                    className="p-3 rounded-lg bg-accent-soft"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <highlight.icon className="w-6 h-6 text-accent-foreground" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold mb-2">{highlight.title}</h3>
                    <p className="text-sm text-muted-foreground">{highlight.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Card className="shadow-elegant border-border/50">
          <CardContent className="p-8">
            <h3 className="font-semibold mb-6 text-center">Core Skills & Technologies</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                >
                  <Badge
                    variant="secondary"
                    className="px-3 py-1 text-sm font-medium hover:bg-accent-soft transition-smooth cursor-default"
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </ParallaxSection>
  )
}