export function Footer() {
  return (
    <footer className="border-t border-border/60 px-4 py-10">
      <div className="mx-auto max-w-6xl text-center">
        <p className="text-sm text-muted-foreground">
          <span className="font-display font-semibold text-foreground">shubu</span>
          <span className="text-primary">.dev</span> — built with React, Tailwind &amp; Framer Motion.
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Shubhendu Kumar Senapati. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
