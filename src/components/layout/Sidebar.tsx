import { useEffect, useState } from 'react'
import { Home, LayoutGrid, Mail, User, Code2, Target, Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

const NAV_ITEMS = [
  { id: 'home',             icon: Home,       label: 'Home',             href: '#home',             mobile: true  },
  { id: 'about',            icon: User,       label: 'About',            href: '#about',            mobile: true  },
  { id: 'projects',         icon: LayoutGrid, label: 'Projects',         href: '#projects',         mobile: true  },
  { id: 'personal-projects',icon: Code2,      label: 'Personal',         href: '#personal-projects',mobile: true  },
  { id: 'goals',            icon: Target,     label: 'Goals',            href: '#goals',            mobile: true  },
  { id: 'contact',          icon: Mail,       label: 'Contact',          href: '#contact',          mobile: true  },
]

const SECTION_IDS = ['home', 'about', 'projects', 'personal-projects', 'goals', 'contact']
const HANDWRITTEN = '"LiebeHeide", "Caveat", cursive'

function NavItem({ item, active }: { item: typeof NAV_ITEMS[number]; active: string }) {
  const { id, icon: Icon, label, href } = item
  const isActive = active === id

  return (
    <a
      href={href}
      aria-label={label}
      data-magnetic
      className="group relative flex h-9 w-9 items-center justify-center rounded-[4px]"
      style={{ color: isActive ? 'var(--c-text-1)' : 'var(--c-text-3)', transition: 'color 150ms ease' }}
    >
      <Icon size={18} strokeWidth={1.5} className="transition-colors group-hover:[color:var(--c-text-2)]" />

      {/* Hover tooltip — handwriting arrow + label */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-full z-50 flex items-center gap-1
                   opacity-0 translate-x-[-6px]
                   group-hover:opacity-100 group-hover:translate-x-0
                   transition-all duration-200 ease-out"
        style={{ marginLeft: '10px' }}
      >
        <span style={{ fontFamily: HANDWRITTEN, fontSize: '18px', color: 'var(--c-accent)', lineHeight: 1 }}>→</span>
        <span style={{ fontFamily: HANDWRITTEN, fontSize: '17px', color: 'var(--c-text-1)', whiteSpace: 'nowrap', lineHeight: 1 }}>
          {label}
        </span>
      </span>
    </a>
  )
}

export function Sidebar() {
  const [active, setActive] = useState('home')
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTION_IDS.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      // Fire when the section's top edge crosses the middle of the viewport
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <>
      {/* Desktop sidebar */}
      <nav
        aria-label="Main navigation"
        className="hidden lg:flex fixed left-0 top-0 z-50 h-screen w-[52px] flex-col items-center py-6"
        style={{ background: 'var(--c-base)', borderRight: '1px solid var(--c-border)', transition: 'background 250ms ease, border-color 250ms ease' }}
      >
        <div className="flex flex-col items-center gap-5 flex-1">
          {NAV_ITEMS.map(item => <NavItem key={item.id} item={item} active={active} />)}
        </div>

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          data-magnetic
          className="group relative flex h-9 w-9 items-center justify-center rounded-[4px] mb-3"
          style={{ color: 'var(--c-text-3)', transition: 'color 150ms ease', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          {theme === 'dark'
            ? <Sun size={16} strokeWidth={1.5} className="transition-colors group-hover:[color:var(--c-text-2)]" />
            : <Moon size={16} strokeWidth={1.5} className="transition-colors group-hover:[color:var(--c-text-2)]" />
          }
          {/* Hover tooltip */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-full z-50 flex items-center gap-1
                       opacity-0 translate-x-[-6px]
                       group-hover:opacity-100 group-hover:translate-x-0
                       transition-all duration-200 ease-out"
            style={{ marginLeft: '10px' }}
          >
            <span style={{ fontFamily: HANDWRITTEN, fontSize: '18px', color: 'var(--c-accent)', lineHeight: 1 }}>→</span>
            <span style={{ fontFamily: HANDWRITTEN, fontSize: '17px', color: 'var(--c-text-1)', whiteSpace: 'nowrap', lineHeight: 1 }}>
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </span>
          </span>
        </button>

        <span aria-hidden="true" className="h-1 w-1 rounded-full" style={{ background: 'var(--c-border)' }} />
      </nav>

      {/* Mobile bottom nav — icon-only, all 6 sections + theme toggle */}
      <nav
        aria-label="Mobile navigation"
        className="flex lg:hidden fixed bottom-0 left-0 right-0 z-50 h-12 items-center justify-around"
        style={{ borderTop: '1px solid var(--c-border)', background: 'var(--c-base)', backdropFilter: 'blur(12px)' }}
      >
        {NAV_ITEMS.filter(i => i.mobile).map(({ id, icon: Icon, label, href }) => {
          const isActive = active === id
          return (
            <a
              key={id}
              href={href}
              aria-label={label}
              className="flex h-full flex-1 items-center justify-center"
              style={{ color: isActive ? 'var(--c-accent)' : 'var(--c-text-3)', transition: 'color 150ms ease' }}
            >
              <Icon size={16} strokeWidth={isActive ? 2 : 1.5} />
            </a>
          )
        })}
        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggle}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="flex h-full flex-1 items-center justify-center"
          style={{ color: 'var(--c-text-3)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 150ms ease' }}
        >
          {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
        </button>
      </nav>
    </>
  )
}
