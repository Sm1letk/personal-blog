'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { PostMeta } from '@/lib/posts'

interface BlogListProps {
  posts: PostMeta[]
}

export default function BlogList({ posts }: BlogListProps) {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return posts
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.categoryLabel.toLowerCase().includes(q)
    )
  }, [posts, query])

  // Group by year
  const grouped = useMemo(() => {
    const map = new Map<string, PostMeta[]>()
    for (const post of filtered) {
      const year = post.date.slice(0, 4)
      const group = map.get(year) ?? []
      group.push(post)
      map.set(year, group)
    }
    // Return years sorted descending
    return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]))
  }, [filtered])

  return (
    <div>
      {/* Search toolbar */}
      <div className="flex justify-end mb-8">
        <div className="relative">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-[#bbb] pointer-events-none select-none">⌕</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索文章…"
            className="font-serif text-[12px] text-[#111] bg-transparent border-0 border-b border-[#ddd] px-2 pl-7 py-1.5 w-40 outline-none placeholder:text-[#ccc] placeholder:italic focus:border-[#111] transition-colors"
          />
        </div>
      </div>

      {/* Article list */}
      <div className="mb-16">
        {grouped.length === 0 && (
          <div className="text-[13px] text-[#aaa] py-8 text-center">没有找到相关文章</div>
        )}
        {grouped.map(([year, yearPosts]) => (
          <div key={year}>
            {/* Year divider */}
            <div className="flex items-center gap-3 border-t border-[#eee] pt-5 mt-1 mb-0">
              <span className="text-[10px] tracking-[3px] uppercase text-[#aaa]">{year}</span>
              <div className="flex-1 h-px bg-[#eee]" />
            </div>

            {yearPosts.map((post) => (
              <div key={post.slug} className="py-6 border-b border-[#eee] flex justify-between items-start gap-8">
                <div>
                  <div className="text-[10px] tracking-[1.5px] uppercase text-[#bbb] mb-1.5">{post.categoryLabel}</div>
                  <div className="text-[19px] font-bold text-[#111] leading-snug tracking-[-0.3px] mb-2">{post.title}</div>
                  <div className="text-[13px] text-[#888] leading-relaxed mb-2.5">{post.excerpt}</div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[10px] tracking-[1.5px] uppercase text-[#111] border-b border-[#111] pb-px no-underline"
                  >
                    阅读全文
                  </Link>
                </div>
                <div className="text-[11px] text-[#ccc] whitespace-nowrap shrink-0 mt-1">{post.date}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
