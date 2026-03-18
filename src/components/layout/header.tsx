import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 border-b bg-background/80 backdrop-blur-sm">
      <div className="flex h-full max-w-screen-2xl mx-auto items-center justify-between px-6">
        <Link href="/" className="font-semibold text-sm">
          Three.js Learning Lab
        </Link>
        <ThemeToggle />
      </div>
    </header>
  )
}
