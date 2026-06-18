interface TagProps {
  children: React.ReactNode
  accent?: boolean
}

export function Tag({ children, accent = false }: TagProps) {
  return (
    <span
      className="tag-pill"
      style={
        accent
          ? { borderColor: 'var(--c-accent-20)', color: 'var(--c-accent)' }
          : undefined
      }
    >
      {children}
    </span>
  )
}
