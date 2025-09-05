import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section 
      id={id} 
      className={cn(
        "py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-fade-in",
        className
      )}
    >
      {children}
    </section>
  )
}