import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/posts'
import BlogList from '@/components/BlogList'

export const metadata: Metadata = {
  title: "Blog — Sm1le's Odyssey",
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-[760px] mx-auto px-6">
      {/* Header */}
      <header className="py-12 pb-9 border-b border-[#ddd] mb-9">
        <div className="text-[10px] tracking-[3px] uppercase text-[#aaa] mb-3">全部文章</div>
        <h1 className="text-[36px] font-bold tracking-[-1px] text-[#111] leading-none">Blog</h1>
      </header>

      <BlogList posts={posts} />

      {/* Footer */}
      <footer className="border-t-2 border-black py-6 text-center">
        <div className="text-[10px] tracking-[2px] uppercase text-[#bbb]">© 2025 Sm1le&apos;s Odyssey</div>
      </footer>
    </div>
  )
}
