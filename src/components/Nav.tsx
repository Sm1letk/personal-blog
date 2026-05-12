'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-between px-12 py-4 border-b-2 border-black bg-white sticky top-0 z-50">
      <Link
        href="/"
        className="text-xs font-bold tracking-[3px] uppercase text-black no-underline"
      >
        Sm1le&apos;s Odyssey
      </Link>
      <ul className="flex gap-8 list-none">
        <li>
          <Link
            href="/about"
            className={`text-[11px] tracking-[2px] uppercase no-underline transition-colors ${
              pathname === '/about'
                ? 'text-black border-b border-black pb-0.5'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/blog"
            className={`text-[11px] tracking-[2px] uppercase no-underline transition-colors ${
              pathname === '/blog'
                ? 'text-black border-b border-black pb-0.5'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  )
}
