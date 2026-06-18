import React, { useState } from 'react'
import { Tag } from './Tag'
import type { Project } from '@/data/projects'

const disciplineStyle = (d: Project['discipline']) => {
  if (d === 'Design Engineering') return { color: 'var(--c-accent)', borderColor: 'var(--c-accent-20)' }
  return { color: 'var(--c-text-2)', borderColor: 'var(--c-border)' }
}

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { year, name, discipline, description, stack, metric, role, status } = project
  const dStyle = disciplineStyle(discipline)
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 })
  const [spotVisible, setSpotVisible] = useState(false)

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <article
      role="listitem"
      className="flex flex-col flex-shrink-0"
      style={{
        width: '280px',
        background: 'var(--c-surface)',
        border: '1px solid var(--c-border)',
        borderRadius: '4px',
        padding: '20px',
        transition: 'border-color 200ms ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={handleMove}
      onMouseEnter={e => { setSpotVisible(true); e.currentTarget.style.borderColor = 'var(--c-muted)' }}
      onMouseLeave={e => { setSpotVisible(false); e.currentTarget.style.borderColor = 'var(--c-border)' }}
    >
      {/* Spotlight overlay */}
      <div
        aria-hidden="true"
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          opacity: spotVisible ? 1 : 0,
          transition: 'opacity 350ms ease',
          background: `radial-gradient(280px circle at ${spotPos.x}px ${spotPos.y}px, hsl(var(--accent) / 0.09), transparent 70%)`,
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header row */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <span
          className="font-mono text-[10px] uppercase tracking-widest"
          style={{ color: 'var(--c-text-3)' }}
        >
          {year}
        </span>
        <span
          className="font-mono text-[10px] uppercase tracking-widest border px-2 py-0.5 rounded-[4px]"
          style={dStyle}
        >
          {discipline}
        </span>
      </div>

      {/* Name */}
      <h3
        className="font-serif leading-snug mb-3"
        style={{ fontSize: '20px', color: 'var(--c-text-1)' }}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        className="text-[13px] leading-relaxed flex-1 mb-4"
        style={{ color: 'var(--c-text-2)' }}
      >
        {description}
      </p>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {stack.map(s => <Tag key={s}>{s}</Tag>)}
      </div>

      {/* Metric */}
      <div
        className="flex items-center justify-between pt-3"
        style={{ borderTop: '1px solid var(--c-border)' }}
      >
        <span className="font-mono text-[11px] uppercase tracking-wider" style={{ color: 'var(--c-text-3)' }}>
          {metric.label}
        </span>
        <span className="font-mono text-[13px] font-medium" style={{ color: 'var(--c-accent)' }}>
          {metric.value}
        </span>
      </div>

      {/* Role + unpublished badge */}
      <div className="mt-2 flex items-center gap-2">
        <span className="font-mono text-[10px]" style={{ color: 'var(--c-text-3)' }}>{role}</span>
        {status === 'unpublished' && (
          <span
            className="font-mono text-[9px] uppercase tracking-widest border px-1.5 py-0.5 rounded-[3px]"
            style={{ color: 'var(--c-text-3)', borderColor: 'var(--c-border)' }}
          >
            unpublished
          </span>
        )}
      </div>
      </div>
    </article>
  )
}
