import { useRef, useState, ReactNode, MouseEvent } from "react"
import { cn } from "@/lib/utils"

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

/**
 * Glass card with a cursor-following radial spotlight and gradient hairline border.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "card-glow glass relative overflow-hidden rounded-2xl",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, hsl(var(--primary) / 0.12), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  )
}
