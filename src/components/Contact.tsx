import { SectionShell, SectionHeading } from "@/components/ui/section-shell"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Twitter, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const contactInfo = [
  { icon: Mail, label: "Email", value: "catchshubu@gmail.com", href: "mailto:catchshubu@gmail.com" },
  { icon: Phone, label: "Phone", value: "+971 52 311 6409", href: "tel:+971523116409" },
  { icon: MapPin, label: "Location", value: "Dubai, United Arab Emirates", href: null },
]

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/shubhendukumars" },
  { icon: Github, label: "GitHub", href: "https://github.com/sksenapati007" },
  { icon: Globe, label: "Portfolio", href: "https://catchshubu.dev" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com/shubhendukumars" },
]

export function Contact() {
  return (
    <SectionShell id="contact">
      <SectionHeading
        eyebrow="Contact"
        title="Let's build something"
        subtitle="Ready to discuss opportunities and how I can contribute to your team's success."
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto max-w-3xl"
      >
        <SpotlightCard className="overflow-hidden p-8 sm:p-10">
          {/* Glow accent */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-primary opacity-20 blur-3xl" />

          <div className="relative grid gap-8 sm:grid-cols-2">
            {contactInfo.map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="rounded-xl bg-primary/10 p-3 ring-1 ring-primary/20">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a href={item.href} className="font-medium text-foreground transition-colors hover:text-primary">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium text-foreground">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="relative mt-8 flex flex-col items-center gap-6 border-t border-border/60 pt-8">
            <Button
              asChild
              size="lg"
              className="group bg-gradient-primary text-primary-foreground transition-smooth hover:shadow-glow"
            >
              <a href="mailto:catchshubu@gmail.com">
                <Mail className="mr-2 h-5 w-5" />
                Send a Message
                <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Button>

            <div className="flex gap-2">
              {socialLinks.map((link) => (
                <motion.div key={link.label} whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    variant="outline"
                    size="icon"
                    className="rounded-full border-border/60 transition-smooth hover:border-primary/50 hover:text-primary"
                  >
                    <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                      <link.icon className="h-5 w-5" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </SectionShell>
  )
}
