import { ReactNode } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionShellProps {
  id?: string
  className?: string
  children: ReactNode
}

export function SectionShell({ id, className, children }: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:px-8",
        className
      )}
    >
      {children}
    </section>
  )
}

interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  className?: string
}

export function SectionHeading({ eyebrow, title, subtitle, className }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      viewport={{ once: true, margin: "-80px" }}
      className={cn("mx-auto mb-14 max-w-2xl text-center", className)}
    >
      <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-primary">
        {eyebrow}
      </span>
      <h2 className="text-4xl font-bold sm:text-5xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}
