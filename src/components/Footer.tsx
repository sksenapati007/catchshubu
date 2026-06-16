import { Github, Linkedin, Twitter } from "lucide-react"

const socials = [
  { icon: Github, href: "https://github.com/sksenapati007", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/shubhendukumars", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com/shubhendukumars", label: "Twitter" },
]

export function Footer() {
  return (
    <footer className="border-t border-border/60 px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="text-sm text-muted-foreground">
          <span className="font-display font-semibold text-foreground">shubu</span>
          <span className="text-primary">.dev</span> — built with React, Tailwind &amp; Framer Motion.
        </p>
        <div className="flex items-center gap-5">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
      <p className="mt-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Shubhendu Kumar Senapati. All rights reserved.
      </p>
    </footer>
  )
}
