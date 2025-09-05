import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, MapPin, Download } from "lucide-react"
import profilePhoto from "@/assets/profile-photo.png"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"])

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-subtle opacity-50"
      />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          style={{ y: textY }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Profile Photo */}
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <img
                src={profilePhoto}
                alt="Professional profile"
                className="w-52 h-52 rounded-full shadow-glow border-4 border-white object-cover z-10"
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-primary opacity-20"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Shubhendu Kumar Senapati
          </motion.h1>

          <motion.p
            className="text-xl sm:text-2xl text-muted-foreground mb-4 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Full Stack Developer
          </motion.p>

          <motion.p
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            4+ years of experience crafting beautiful, user-centric applications.
            Based in Dubai, seeking opportunities in Southeast Asia, Europe, Australia & Middle East.
          </motion.p>

          {/* Location & Status */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card className="inline-flex items-center gap-3 p-4 mb-8 shadow-elegant border-border/50">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Dubai, UAE</span>
              <motion.div
                className="w-2 h-2 bg-accent rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm text-muted-foreground">Available for opportunities</span>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="mailto:catchshubu@gmail.com">
                <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-smooth">
                  <Mail className="w-5 h-5 mr-2" />
                  Get In Touch
                </Button>
              </a>
            </motion.div>
            {/* <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" size="lg" className="border-primary/20 hover:bg-primary/5 transition-smooth">
                <Download className="w-5 h-5 mr-2" />
                Download CV
              </Button>
            </motion.div> */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}