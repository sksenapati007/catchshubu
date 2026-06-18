import { forwardRef, useState, MouseEvent, ReactNode, HTMLAttributes } from 'react'

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

/**
 * Div wrapper that renders a radial gradient spotlight following the cursor.
 * Use motion(SpotlightCard) to get Framer Motion animations + spotlight in one element.
 */
export const SpotlightCard = forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ children, style, onMouseMove, onMouseEnter, onMouseLeave, ...rest }, ref) => {
    const [pos, setPos] = useState({ x: 0, y: 0 })
    const [visible, setVisible] = useState(false)

    const handleMove = (e: MouseEvent<HTMLDivElement>) => {
      const el = (ref as React.RefObject<HTMLDivElement>)?.current ?? e.currentTarget
      const rect = el.getBoundingClientRect()
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      onMouseMove?.(e)
    }

    return (
      <div
        ref={ref}
        {...rest}
        style={{ position: 'relative', overflow: 'hidden', ...style }}
        onMouseMove={handleMove}
        onMouseEnter={(e) => { setVisible(true); onMouseEnter?.(e) }}
        onMouseLeave={(e) => { setVisible(false); onMouseLeave?.(e) }}
      >
        {/* Cursor-following spotlight gradient */}
        <div
          aria-hidden="true"
          style={{
            pointerEvents: 'none',
            position: 'absolute',
            inset: 0,
            opacity: visible ? 1 : 0,
            transition: 'opacity 350ms ease',
            background: `radial-gradient(320px circle at ${pos.x}px ${pos.y}px, hsl(var(--accent) / 0.09), transparent 70%)`,
            zIndex: 0,
          }}
        />
        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </div>
    )
  }
)
SpotlightCard.displayName = 'SpotlightCard'
