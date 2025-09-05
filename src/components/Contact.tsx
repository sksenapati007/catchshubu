import { ParallaxSection } from "@/components/ui/parallax-section"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Twitter } from "lucide-react"
import { motion } from "framer-motion"

export function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "catchshubu@gmail.com",
      href: "mailto:catchshubu@gmail.com"
    },
    // {
    //   icon: Phone,
    //   label: "Mobile",
    //   value: "+91-966-734-4733",
    //   href: "tel:+919667344733"
    // },
    {
      icon: MapPin,
      label: "Location",
      value: "Dubai, United Arab Emirates",
      href: null
    }
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/shubhendukumars"
    },
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/sksenapati007"
    },
    {
      icon: Globe,
      label: "Portfolio",
      href: "https://catchshubu.dev"
    },
    {
      icon: Twitter,
      label: "Twitter",
      href: "https://twitter.com/shubhendukumars"
    },

  ]

  const contactVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: index * 0.1 }
    })
  }

  return (
    <ParallaxSection id="contact" offset={20}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Ready to discuss opportunities and how I can contribute to your team's success.
        </p>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="shadow-elegant border-border/50 mb-8">
            <CardContent className="p-8">
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-4"
                    custom={index}
                    variants={contactVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="p-3 rounded-lg bg-accent-soft"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <item.icon className="w-5 h-5 text-accent-foreground" />
                    </motion.div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                      {item.href ? (
                        <motion.a
                          href={item.href}
                          className="text-foreground hover:text-primary transition-smooth"
                          whileHover={{ scale: 1.02 }}
                        >
                          {item.value}
                        </motion.a>
                      ) : (
                        <p className="text-foreground">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {socialLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="icon"
                className="border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-smooth"
                asChild
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  <link.icon className="w-5 h-5" />
                </a>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="lg"
              className="bg-gradient-primary hover:shadow-glow transition-smooth"
              asChild
            >
              <a href="mailto:catchshubu@gmail.com">
                <Mail className="w-5 h-5 mr-2" />
                Send Message
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </ParallaxSection>
  )
}