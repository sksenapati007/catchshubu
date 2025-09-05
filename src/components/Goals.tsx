import { ParallaxSection } from "@/components/ui/parallax-section"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, Users, TrendingUp, Globe } from "lucide-react"
import { motion } from "framer-motion"

export function Goals() {
  const goals = [
    {
      icon: Lightbulb,
      title: "Technical Product Management",
      description: "Transitioning to Technical Product Manager role, combining development expertise with product strategy and user-focused thinking."
    },
    {
      icon: Users,
      title: "Team Leadership",
      description: "Building and leading cross-functional teams to deliver innovative products that solve real user problems."
    },
    {
      icon: TrendingUp,
      title: "Strategic Impact",
      description: "Driving product roadmaps and technical decisions that create measurable business value and user satisfaction."
    },
    {
      icon: Globe,
      title: "Global Opportunities",
      description: "Seeking roles in Europe, Australia, Middle East, and Southeast Asia to expand international experience."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6 }
    }
  }

  return (
    <ParallaxSection id="goals" className="bg-gradient-subtle" offset={25}>
      <motion.div 
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Career Objectives</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Leveraging my technical background to drive product innovation and create meaningful user experiences globally.
        </p>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {goals.map((goal, index) => (
          <motion.div key={index} variants={cardVariants}>
            <Card className="shadow-elegant hover:shadow-glow transition-smooth bg-card/80 backdrop-blur-sm h-full">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="p-3 rounded-lg bg-primary/10"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <goal.icon className="w-6 h-6 text-primary" />
                  </motion.div>
                  <CardTitle className="text-lg">{goal.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{goal.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </ParallaxSection>
  )
}