import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: "Sm1le's Odyssey",
  description: '记录 AI 与生活的交汇处',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body className="font-serif antialiased bg-white text-[#111111]">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  )
}
