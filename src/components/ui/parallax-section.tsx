import { motion, useScroll, useTransform } from "framer-motion"
import { ReactNode, useRef } from "react"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  id?: string
  offset?: number
}

export function ParallaxSection({ children, className, id, offset = 50 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset])

  return (
    <motion.section 
      ref={ref}
      id={id} 
      style={{ y }}
      className={cn(
        "py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto",
        className
      )}
    >
      {children}
    </motion.section>
  )
}