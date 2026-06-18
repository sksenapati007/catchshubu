export function Footer() {
  return (
    <footer
      className="px-4 sm:px-6 lg:px-10 xl:px-14 pb-16 lg:pb-12"
      style={{ borderTop: '1px solid var(--c-border)', transition: 'border-color 250ms ease' }}
    >
      <div className="mx-auto max-w-[720px] lg:mx-0 pt-8">
        <div
          className="flex items-center justify-between flex-wrap gap-2"
          style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--c-text-3)' }}
        >
          <span>SHUBHENDU · DUBAI, UAE</span>
          <span aria-hidden="true">DXB · 25.2048° N, 55.2708° E</span>
        </div>
      </div>
    </footer>
  )
}
