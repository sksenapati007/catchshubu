import { ParallaxSection } from "@/components/ui/parallax-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Building } from "lucide-react"
import { motion } from "framer-motion"

export function Experience() {
  const experiences = [
    {
      title: "Sr. Product Engineer & Innovation",
      company: "Cakewalk Information Technologies LLC",
      location: "Dubai, UAE",
      period: "Sept 2021 - Present",
      type: "Full-time",
      achievements: [
        "Led B2B iGaming Platform product development with client meetings and feature feasibility analysis",
        "Built comprehensive admin panel, payment gateway system, and monitoring cloud operations",
        "Implemented data migration scripts and ticket support system with reports and billing",
        "Developed UI components using RemixJS and TailwindCSS, later integrated Shadcn UI",
        "Suggested monorepo architecture using Yarn Workspaces for better code organization",
        "Implemented Redis caching and JWT-based session management for optimal performance",
        "Explored Supabase with ORMs, integrated payment gateways and GitHub webhook support",
        "Created RESTful APIs and monitored cloud operations on Render and Northflank"
      ],
      technologies: ["React", "RemixJS", "TailwindCSS", "Shadcn UI", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "Redis", "JWT", "Supabase"]
    },
    {
      title: "Project Manager",
      company: "ODKART Pvt Ltd",
      location: "Bhubaneswar, Odisha",
      period: "Jul 2020 - Sept 2020",
      type: "Full-time",
      achievements: [
        "Managed HR documentation and single-stop HR solutions product development",
        "Coordinated with remote developers working on C# to create Windows applications",
        "Collaborated with content writers for blog updates and digital marketing campaigns",
        "Created target audience mapping for Google Ad-Sense, Facebook Ads, and LinkedIn Ads",
        "Implemented email marketing via MailChimp and WhatsApp marketing strategies",
        "Designed advertisements including videos and banner posters using Canva and Figma"
      ],
      technologies: ["C#", "Digital Marketing", "Google Ads", "Facebook Ads", "LinkedIn Ads", "MailChimp", "Canva", "Figma"]
    },
    {
      title: "Full Stack Engineer", 
      company: "Higgle.io",
      location: "Bengaluru, Karnataka",
      period: "Mar 2020 - May 2020",
      type: "Full-time",
      achievements: [
        "Developed Fugit - a food connection platform using Flutter with modern design principles",
        "Created utility to adapt UI screens to different mobile devices based on viewport dimensions",
        "Explored state management tools like Mobx, Bloc, Provider, and Redux for optimal solutions",
        "Implemented GraphQL for efficient data fetching across different screens"
      ],
      technologies: ["Flutter", "GraphQL", "Mobx", "Bloc", "Provider", "Redux", "Mobile Development"]
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <ParallaxSection id="experience" offset={40}>
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          4+ years of comprehensive experience in full-stack development, from startup environments to enterprise solutions.
        </p>
      </motion.div>

      <motion.div 
        className="space-y-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {experiences.map((exp, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className="shadow-elegant hover:shadow-glow transition-smooth border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl mb-2">{exp.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <motion.div 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Building className="w-4 h-4" />
                        {exp.company}
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </motion.div>
                      <motion.div 
                        className="flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </motion.div>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge variant="outline" className="self-start sm:self-center">
                      {exp.type}
                    </Badge>
                  </motion.div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {exp.achievements.map((achievement, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <span className="text-sm leading-relaxed">{achievement}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      whileHover={{ scale: 1.1 }}
                      viewport={{ once: true }}
                    >
                      <Badge variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </ParallaxSection>
  )
}